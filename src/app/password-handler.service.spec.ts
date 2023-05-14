import { TestBed } from '@angular/core/testing';

import { PasswordHandlerService } from './password-handler.service';

describe('PasswordHandlerService', () => {
  let service: PasswordHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
