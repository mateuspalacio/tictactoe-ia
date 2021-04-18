import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  public quotes: string[] =
      [

      ];

      constructor() {}

  public getQuote(): string { return this.quotes.sort(() => 0.5 - Math.random())[0]; }
}
