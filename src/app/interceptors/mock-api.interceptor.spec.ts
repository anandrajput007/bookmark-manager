import { TestBed } from '@angular/core/testing';

import { MockApiInterceptor } from './mock-api.interceptor';

describe('MockApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MockApiInterceptor = TestBed.inject(MockApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
