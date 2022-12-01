import { TestBed } from '@angular/core/testing';

import { TutorielsService } from './tutoriels.service';

describe('TutorielsService', () => {
  let service: TutorielsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorielsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
