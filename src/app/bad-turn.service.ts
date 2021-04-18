import {Injectable} from '@angular/core';

@Injectable()
export class BadTurnService {
  public quotes: string[] =
      [
        'Não é sua vez'
      ];

      constructor() {}

  public getBadTurn(): string { return this.quotes.sort(() => 0.5 - Math.random())[0]; }
}
