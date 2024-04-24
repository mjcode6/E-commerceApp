import { TestBed } from '@angular/core/testing';

import { X8shoppingFormService } from './x8shopping-form.service';

describe('X8shoppingFormService', () => {
  let service: X8shoppingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(X8shoppingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
