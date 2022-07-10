import { TestBed } from '@angular/core/testing';

import { RundownItemService } from './rundown-item.service';

describe('RundownItemService', () => {
  let service: RundownItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RundownItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
