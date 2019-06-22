import { TestBed } from '@angular/core/testing';

import { RendererHelperService } from './renderer-helper.service';

describe('RendererHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RendererHelperService = TestBed.get(RendererHelperService);
    expect(service).toBeTruthy();
  });
});
