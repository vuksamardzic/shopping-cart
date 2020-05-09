import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set data', () => {
    const KEY = 'sc-test';
    service.saveToLocalStorage({test: true}, KEY);
    expect(service.getLocalStorage(KEY)).toBeTruthy();
  });

  it('should remove data', () => {
    const KEY = 'sc-test';
    service.saveToLocalStorage({test: true}, KEY);
    service.clearLocalStorage(KEY);
    expect(service.getLocalStorage(KEY)).toBeNull();
  });
});
