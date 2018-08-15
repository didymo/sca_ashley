import { TestBed, inject } from '@angular/core/testing';

import { Addr2coordService } from './addr2coord.service';

describe('Addr2coordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Addr2coordService]
    });
  });

  it('should be created', inject([Addr2coordService], (service: Addr2coordService) => {
    expect(service).toBeTruthy();
  }));
});
