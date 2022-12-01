import { TestBed } from '@angular/core/testing';

import { CatergorieJeuxServiceService } from './catergorie-jeux-service.service';

describe('CatergorieJeuxServiceService', () => {
  let service: CatergorieJeuxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatergorieJeuxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
