import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Word } from 'words/entities/word.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
})
export class WordsModule {}
