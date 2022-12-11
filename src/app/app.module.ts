import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuessesModule } from 'guesses/guesses.module'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: `postgres`,
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    GuessesModule,
  ],
})
export class AppModule {}
