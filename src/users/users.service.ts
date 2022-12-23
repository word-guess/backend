import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'users/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(userId: number) {
    return this.usersRepository.findOne({ where: { id: userId } })
  }

  async count() {
    return (
      (await this.usersRepository.findOne({ where: {}, order: { id: `desc` } }))
        ?.id || 0
    )
  }

  create() {
    return this.usersRepository.save({})
  }
}
