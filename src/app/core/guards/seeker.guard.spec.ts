import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { seekerGuard } from './seeker.guard';

describe('seekerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => seekerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
