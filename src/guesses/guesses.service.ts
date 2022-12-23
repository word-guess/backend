import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { Session } from '@fastify/secure-session'
import { CreateGuessDto } from './dto/create-guess.dto'
import { UsersService } from 'users/users.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Guess } from 'guesses/entities/guess.entity'
import { UserGuess } from 'guesses/entities/user-guess.entity'
import { Repository } from 'typeorm'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { Word } from 'words/entities/word.entity'
import { Cron, CronExpression } from '@nestjs/schedule'
import { User } from 'users/entities/user.entity'

enum SessionKey {
  UserId = `userId`,
}

@Injectable()
export class GuessesService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,

    @InjectRepository(Guess)
    private guessesRepository: Repository<Guess>,

    @InjectRepository(UserGuess)
    private userGuessesRepository: Repository<UserGuess>,

    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,

    private readonly httpService: HttpService,
  ) {}

  getDateString() {
    return `${new Date().getUTCFullYear()}-${
      new Date().getUTCMonth() + 1
    }-${new Date().getUTCDate()}`
  }

  async getUser(session: Session) {
    let user: User | null = null

    const userId = session.get(SessionKey.UserId)
    if (userId) {
      user = await this.usersService.findOne(userId)
    }

    if (!user) {
      user = await this.usersService.create()

      const expirationDate = new Date()
      expirationDate.setUTCDate(expirationDate.getUTCDate() + 1)
      expirationDate.setUTCHours(0, 0, 0, 0)
      session.options({
        expires: expirationDate,
        sameSite: `none`,
        secure: true,
      })

      session.set(SessionKey.UserId, user.id)
    }

    return user
  }

  async getGuess({ text }: CreateGuessDto) {
    let guess = await this.guessesRepository.findOne({
      where: { text },
    })

    if (!guess) {
      const word = await this.wordsRepository.findOne({
        where: {
          availableSince: this.getDateString(),
        },
      })

      if (!word) {
        throw new InternalServerErrorException(`Слово дня отсутствует`)
      }

      const { data } = await lastValueFrom(
        this.httpService.get<Pick<Guess, `similarity` | `rank`>>(
          `${process.env.WORDS_SIMILARITY_ENDPOINT as string}/${
            word.text
          }/${text}`,
        ),
      )

      guess = await this.guessesRepository.save({
        text: text,
        rank: data.rank,
        similarity: data.similarity,
      })
    }

    return guess
  }

  async create(session: Session, createGuessDto: CreateGuessDto) {
    const user = await this.getUser(session)
    const guess = await this.getGuess(createGuessDto)

    await this.userGuessesRepository.save({
      userId: user.id,
      guessId: guess.id,
    })

    return guess
  }

  async findAll(session: Session) {
    const user = await this.getUser(session)
    return this.guessesRepository.find({
      where: { userGuesses: { userId: user.id } },
      relations: { userGuesses: true },
      order: {
        rank: `asc`,
      },
    })
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteAll() {
    await this.userGuessesRepository.clear()
    await this.guessesRepository.query(`TRUNCATE TABLE guess CASCADE`)
  }
}
