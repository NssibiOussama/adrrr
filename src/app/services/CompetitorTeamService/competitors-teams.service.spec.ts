import { TestBed } from '@angular/core/testing';

import { CompetitorsTeamsService } from './competitors-teams.service';

describe('CompetitorsTeamsService', () => {
  let service: CompetitorsTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitorsTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
