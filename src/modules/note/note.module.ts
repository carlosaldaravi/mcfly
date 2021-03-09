import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepository } from './note.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoteRepository])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
