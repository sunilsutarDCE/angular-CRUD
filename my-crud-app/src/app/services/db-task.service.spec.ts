import { TestBed , async, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DbService } from './db-task.service';

describe('DbService', () => {
  let taskService: DbService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      DbService
    ],
  }));

  taskService = TestBed.get(DbService);
  httpMock = TestBed.get(HttpTestingController);

  it('should be created', () => {
    const service: DbService = TestBed.get(DbService);
    expect(service).toBeTruthy();
  });

  it(`should fetch tasks as an Observable`, async(inject([HttpTestingController, DbService],
    (httpClient: HttpTestingController, taskService: DbService) => {

      const taskItem = [
        {
          id: 1,
          description: 'Task1',
          status:'Not Started',
          priority:"Low"
        },
        {
          id: 2,
          description: 'Task2',
          status:'Started',
          priority:"High"
        },
        {
          id: 3,
          description: 'Task3',
          status:'Not Started',
          priority:"Medium"
        }
      ];


      taskService.getTasksList()
        .subscribe((tasks: any) => {
          expect(tasks.length).toBe(3);
        });

        let req = httpMock.expectOne('http://localhost:1337/api/v1/tasks');
        expect(req.request.method).toBe("GET");

      req.flush(taskItem);
      httpMock.verify();

    })));
});
