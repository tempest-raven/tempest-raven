import { TestBed } from '@angular/core/testing';

import { SonnyTranslationService } from './sonny-translation.service';

describe('SonnyTranslationService', () => {
  let service: SonnyTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonnyTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
