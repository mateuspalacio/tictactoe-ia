import {IRow, ICell, State} from './matrix.service';

export enum RowValue {
  Draw = 0,
  Empty = 1,
  OneOpponent = 10,
  OneMine = 50,
  TwoOpponent = 100,
  TwoMine = 1000
}

export interface IRank { id: number; weight: number; cell: ICell; }

export function hardStrategy(rows: IRow[], targetState: State): void {
  // tslint:disable-next-line: one-variable-per-declaration tslint:disable-next-line: no-shadowed-variable
  const idFunc = (cell: ICell) => cell.row * 3 + cell.col, rank: IRank[] = [];

  for (let x = 0; x < 9; x += 1) {
    rank.push({id: x, weight: 0, cell: null});
  }

  // tslint:disable-next-line: prefer-for-of
  for (let x = 0; x < rows.length; x += 1) {
    // tslint:disable-next-line: one-variable-per-declaration tslint:disable-next-line: prefer-const
    let row = rows[x], myCount = 0, theirCount = 0, value = RowValue.Draw;
    // tslint:disable-next-line: prefer-for-of
    for (let y = 0; y < row.length; y += 1) {
      // tslint:disable-next-line: one-variable-per-declaration tslint:disable-next-line: no-shadowed-variable
      const cell = row[y], id = idFunc(cell);
      if (rank[id].cell === null) {
        rank[id].cell = cell;
      }
      if (cell.state !== State.None) {
        rank[id].weight = -99999;
        if (cell.state === targetState) {
          myCount += 1;
        } else {
          theirCount += 1;
        }
      }
    }
    if (myCount === 0) {
      value = theirCount === 0 ? RowValue.Empty :
                                 (theirCount === 1 ? RowValue.OneOpponent : RowValue.TwoOpponent);
    } else {
      value =
          theirCount > 0 ? RowValue.Draw : (myCount === 1 ? RowValue.OneMine : RowValue.TwoMine);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let y = 0; y < row.length; y += 1) {
      // tslint:disable-next-line: one-variable-per-declaration tslint:disable-next-line: no-shadowed-variable
      const cell = row[y], id = idFunc(cell);
      rank[id].weight += value;
    }
  }

  rank.sort((a, b) => b.weight - a.weight);

  // tslint:disable-next-line: one-variable-per-declaration
  const shortList: ICell[] = [], weight = rank[0].weight;

  shortList.push(rank[0].cell);
  for (let x = 1; x < rank.length; x += 1) {
    if (rank[x].weight === weight) {
      shortList.push(rank[x].cell);
    }
  }

  shortList.sort(() => 0.5 - Math.random());
  let cell: ICell;
  // tslint:disable-next-line: no-conditional-assignment
  while (cell = shortList.pop()) {
    if (cell.state === State.None) {
      cell.state = targetState;
      break;
    }
  }
}
