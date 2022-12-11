import { Module } from '@nestjs/common'
import { GuessesService } from './guesses.service'
import { GuessesController } from './guesses.controller'
import { UsersModule } from 'users/users.module'
import { Guess } from 'guesses/entities/guess.entity'
import { UserGuess } from 'guesses/entities/user-guess.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { Word } from 'words/entities/word.entity'

@Module({
  imports: [
    UsersModule,
    HttpModule,
    TypeOrmModule.forFeature([Guess, UserGuess, Word]),
  ],
  controllers: [GuessesController],
  providers: [GuessesService],
})
export class GuessesModule {}
