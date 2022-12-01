import { TestBed } from '@angular/core/testing';

import { VideoUplaodService } from './video-uplaod.service';

describe('VideoUplaodService', () => {
  let service: VideoUplaodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoUplaodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
