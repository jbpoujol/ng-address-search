import { TestBed } from '@angular/core/testing';

import { NgAddressSearchService } from './ng-address-search.service';

describe('NgAddressSearchService', () => {
  let service: NgAddressSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAddressSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
