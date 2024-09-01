import { TestBed } from '@angular/core/testing';

import { AngularMaterialIconFlagsService } from './angular-material-icon-flags.service';

describe('AngularMaterialIconFlagsService', () => {
  let service: AngularMaterialIconFlagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularMaterialIconFlagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
