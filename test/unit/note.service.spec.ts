import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from '../../src/modules/note/note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '../../src/modules/note/note.entity';
import { Repository } from 'typeorm';

describe('NoteService', () => {
  let service: NoteService;
  // declaring the repo variable for easy access later
  let repo: Repository<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(Note),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    // Save the instance of the repository and set the correct generics
    repo = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array with notes', async () => {
    // mock file for reuse
    const testNote: any =  {
      id: 234352345,
      text: 'hello',
      favorite: true,
    };
    // notice we are pulling the repo variable and using jest.spyOn with no issues
    jest.spyOn(repo, 'find').mockResolvedValueOnce([testNote]);
    expect(await service.getAll()).toEqual([testNote]);
  });
});