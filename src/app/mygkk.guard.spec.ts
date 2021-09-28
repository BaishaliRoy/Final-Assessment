import { TestBed } from '@angular/core/testing';

import { MygkkGuard } from './mygkk.guard';

describe('MygkkGuard', () => {
  let guard: MygkkGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MygkkGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
