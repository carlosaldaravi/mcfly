import {
    Injectable,
    BadRequestException,
    NotFoundException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { NoteRepository } from './note.repository';
  import { ReadNoteDto, CreateNoteDto } from './dto';
  import { plainToClass } from 'class-transformer';
  import { Note } from './note.entity';
  
  @Injectable()
  export class NoteService {
    constructor(
      @InjectRepository(NoteRepository)
      private readonly _noteRepository: NoteRepository,
    ) {}
  
    async get(noteId: number): Promise<ReadNoteDto> {
      if (!noteId) {
        throw new BadRequestException('noteId must be sent');
      }
      const note: Note = await this._noteRepository.findOne(noteId);
      if (!note) {
        throw new HttpException('This note does not exists', HttpStatus.OK);
      }
      return plainToClass(ReadNoteDto, note);
    }
  
    async getAll(): Promise<ReadNoteDto[]> {
      const notes: Note[] = await this._noteRepository.find();
  
      if (!notes) {
        throw new NotFoundException();
      }
  
      return notes.map((note: Note) => plainToClass(ReadNoteDto, note));
    }
  
    async getFavoritesNotes(): Promise<ReadNoteDto[]> {
      const notes: Note[] = await this._noteRepository.find({where: { favorite: true }});
  
      return notes.map(note => plainToClass(ReadNoteDto, note));
    }
  
    async create(note: Partial<CreateNoteDto>): Promise<ReadNoteDto> {
      const foundNote: Note = await this._noteRepository.findOne({
        where: { text: note.text },
      });
  
      if (foundNote) {
        throw new HttpException('This note already exists', HttpStatus.OK);
      } else {
        const savedNote: Note = await this._noteRepository.save({
          text: note.text,
          favorite: note.favorite,
        });
        return plainToClass(ReadNoteDto, savedNote);
      }
    }
  
    /**
     * Favorite will be changed to true if was false and to false if was true
     */
    async update(
      noteId: number,
    ): Promise<ReadNoteDto> {
      const foundNote = await this._noteRepository.findOne(noteId);
  
      if (!foundNote) {
        throw new HttpException('This note does not exists', HttpStatus.OK);
      }
  
      foundNote.favorite = !foundNote.favorite;
  
      await foundNote.save();
  
      return plainToClass(ReadNoteDto, foundNote);
    }
  
    async delete(noteId: number): Promise<void> {
      await this._noteRepository.delete(noteId);
    }
  }
  