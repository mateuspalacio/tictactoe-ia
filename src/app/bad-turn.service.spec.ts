import { TestBed } from '@angular/core/testing';

import { BadTurnService } from './bad-turn.service';

describe('BadTurnService', () => {
  let service: BadTurnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadTurnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
