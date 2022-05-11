import { TestBed } from '@angular/core/testing';

import { LoginVendeurService } from './login-vendeur.service';

describe('LoginVendeurService', () => {
  let service: LoginVendeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginVendeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
