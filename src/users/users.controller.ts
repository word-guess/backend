import { Controller, Get, Session } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { Session as SecureSession } from '@fastify/secure-session'

@ApiTags(`users`)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(`me`)
  me(@Session() session: SecureSession) {
    return this.usersService.getUser(session)
  }
}
