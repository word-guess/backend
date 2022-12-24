import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'users/entities/user.entity'
import { Repository } from 'typeorm'
import { Session } from '@fastify/secure-session'

enum SessionKey {
  UserId = `userId`,
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(userId: number) {
    return this.usersRepository.findOne({ where: { id: userId } })
  }

  async getUser(session: Session) {
    let user: User | null = null

    const userId = session.get(SessionKey.UserId)
    if (userId) {
      user = await this.findOne(userId)
    }

    if (!user) {
      user = await this.create()

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

  create() {
    return this.usersRepository.save({})
  }
}
