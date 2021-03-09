import { IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {

  @IsString()
  readonly text: string;

  @IsString()
  @IsOptional()
  readonly favorite: boolean;
}
