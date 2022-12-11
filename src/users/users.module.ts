import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
