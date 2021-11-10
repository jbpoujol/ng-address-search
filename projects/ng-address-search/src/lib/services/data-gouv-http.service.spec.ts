import { TestBed } from '@angular/core/testing';

import { DataGouvHttpService } from './data-gouv-http.service';

describe('DataGouvHttpService', () => {
  let service: DataGouvHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGouvHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
