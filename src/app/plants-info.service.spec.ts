import { TestBed } from '@angular/core/testing';

import { PlantsInfoService } from './plants-info.service';

describe('PlantsInfoService', () => {
  let service: PlantsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
