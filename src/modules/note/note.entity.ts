import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('notes')
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ default: false })
  favorite: boolean;
}
