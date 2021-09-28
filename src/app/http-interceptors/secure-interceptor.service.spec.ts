import { TestBed } from '@angular/core/testing';

import { SecureInterceptorService } from './secure-interceptor.service';

describe('SecureInterceptorService', () => {
  let service: SecureInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
