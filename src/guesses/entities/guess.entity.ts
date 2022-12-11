import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiHideProperty } from '@nestjs/swagger'
import { UserGuess } from 'guesses/entities/user-guess.entity'

@Entity()
@Unique([`text`])
export class Guess {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Exclude()
  @ApiHideProperty()
  @OneToMany(() => UserGuess, (userGuess) => userGuess.guess)
  userGuesses: UserGuess[]

  @Column(`float`)
  similarity: number

  @Column()
  rank: number
}
