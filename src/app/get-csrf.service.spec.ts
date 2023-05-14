import { TestBed } from '@angular/core/testing';

import { GetCsrfService } from './get-csrf.service';

describe('GetCsrfService', () => {
  let service: GetCsrfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCsrfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
