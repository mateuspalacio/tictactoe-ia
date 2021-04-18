import { Injectable } from '@angular/core';
import { IRow, State } from './matrix.service';
import { easyStrategy } from './strategy-easy';
import { hardStrategy } from './strategy-hard';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  constructor() {}

  public easyMode = false;

  public executeStrategy(rows: IRow[], targetState: State) {
    const strategy: (rows: IRow[], targetState: State) => void = hardStrategy;
    strategy(rows, targetState);
  }
}
