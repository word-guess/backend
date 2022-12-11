import { IsString } from 'class-validator'

export class CreateGuessDto {
  @IsString()
  text: string
}
