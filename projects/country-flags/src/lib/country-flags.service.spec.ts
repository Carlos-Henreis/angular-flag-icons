import { TestBed } from '@angular/core/testing';

import { CountryFlagsService } from './country-flags.service';

describe('CountryFlagsService', () => {
  let service: CountryFlagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFlagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
