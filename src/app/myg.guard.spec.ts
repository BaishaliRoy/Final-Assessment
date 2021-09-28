import { TestBed } from '@angular/core/testing';

import { MygGuard } from './myg.guard';

describe('MygGuard', () => {
  let guard: MygGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MygGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
