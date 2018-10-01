import { TestBed, inject } from '@angular/core/testing';

import { CreateTMPService } from './create-tmp.service';

describe('CreateTMPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateTMPService]
    });
  });

  it('should be created', inject([CreateTMPService], (service: CreateTMPService) => {
    expect(service).toBeTruthy();
  }));
});
