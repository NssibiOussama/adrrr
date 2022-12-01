import { TestBed } from '@angular/core/testing';

import { TournoisServiceService } from './tournois-service.service';

describe('TournoisServiceService', () => {
  let service: TournoisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournoisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
