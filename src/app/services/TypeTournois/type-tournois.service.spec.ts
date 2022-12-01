import { TestBed } from '@angular/core/testing';

import { TypeTournoisService } from './type-tournois.service';

describe('TypeTournoisService', () => {
  let service: TypeTournoisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeTournoisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
