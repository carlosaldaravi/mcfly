import { IsString, IsNumber } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  readonly text: string;

  @IsString()
  readonly favorite: boolean;
}
