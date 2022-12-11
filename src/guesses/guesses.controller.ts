import { Controller, Get, Post, Body, Session } from '@nestjs/common'
import { GuessesService } from './guesses.service'
import { CreateGuessDto } from './dto/create-guess.dto'
import { Session as SecureSession } from '@fastify/secure-session'

@Controller('guesses')
export class GuessesController {
  constructor(private readonly guessesService: GuessesService) {}

  @Post()
  create(
    @Session() session: SecureSession,
    @Body() createGuessDto: CreateGuessDto,
  ) {
    return this.guessesService.create(session, createGuessDto)
  }

  @Get()
  findAll(@Session() session: SecureSession) {
    return this.guessesService.findAll(session)
  }
}
