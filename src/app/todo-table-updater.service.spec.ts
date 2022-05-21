import { TestBed } from '@angular/core/testing';

import { TodoTableUpdaterService } from './todo-table-updater.service';

describe('TodoTableUpdaterService', () => {
  let service: TodoTableUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoTableUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
