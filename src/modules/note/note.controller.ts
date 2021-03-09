import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ReadNoteDto, CreateNoteDto } from './dto';
  import { NoteService } from './note.service';
  
  @Controller('notes')
  export class NoteController {
    constructor(private readonly _noteService: NoteService) {}
  
    @Get('favoritas')
    getFavoritesNotes(): Promise<ReadNoteDto[]> {
      return this._noteService.getFavoritesNotes();
    }
    
    @Get(':noteId')
    getNote(
      @Param('noteId', ParseIntPipe) noteId: number,
    ): Promise<ReadNoteDto> {
      return this._noteService.get(noteId);
    }
  
    @Get()
    async getNotes(): Promise<ReadNoteDto[]> {
      return this._noteService.getAll();
    }
  
    @Post()
    createNote(@Body() note: Partial<CreateNoteDto>): Promise<ReadNoteDto> {
      return this._noteService.create(note);
    }
  
    @Patch(':noteId')
    updateNote(
      @Param('noteId', ParseIntPipe) noteId: number,
    ): Promise<ReadNoteDto> {
      return this._noteService.update(noteId);
    }
  
    @Delete(':noteId')
    deleteNote(@Param('noteId', ParseIntPipe) noteId: number): Promise<void> {
      return this._noteService.delete(noteId);
    }
  }
  