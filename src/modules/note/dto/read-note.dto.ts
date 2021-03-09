import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ReadNoteDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly text: string;

  @Expose()
  @IsString()
  readonly favorite: boolean;
}
