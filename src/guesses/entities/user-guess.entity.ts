import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from 'users/entities/user.entity'
import { Guess } from 'guesses/entities/guess.entity'

@Entity()
export class UserGuess {
  @PrimaryColumn()
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: `userId` })
  user: User

  @PrimaryColumn()
  guessId: number

  @ManyToOne(() => Guess)
  @JoinColumn({ name: `guessId` })
  guess: Guess
}
