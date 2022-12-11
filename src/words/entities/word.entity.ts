import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Word {
  @PrimaryColumn()
  text: string

  @Column(`date`)
  availableSince: string
}
