import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {BadTurnService} from '../bad-turn.service';
import {QuotesService} from '../quotes.service';
import {State} from '../matrix.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cell',
  templateUrl: 'cell.component.html',
  styleUrls: ['cell.component.css'],
  providers: [BadTurnService, QuotesService]
})
export class CellComponent implements OnInit,
    OnChanges {
  // tslint:disable-next-line: variable-name
  private static _counter = 1;

  public id: number;

  @Input() public row: number;

  @Input() public col: number;

  @Input() public cellState: State;

  @Input() public validTurn: boolean;

  @Input() public winningCell: boolean;

  @Output() public stateChangeRequested: EventEmitter<boolean> = new EventEmitter<boolean>();

  private cellQuote = 'Zzzzz....';

  public score = 0;

  ngOnInit(): void { this.cellQuote = this.quoteService.getQuote(); }

  ngOnChanges(): void {
    if (Math.random() < 0.5) {
      this.cellQuote = this.quoteService.getQuote();
    }
  }

  public get cellText(): string {
    if (this.cellState === State.O) {
      return 'O';
    }
    if (this.cellState === State.X) {
      return 'X';
    }
    return this.cellQuote;
  }

  constructor(public quoteService: QuotesService, public badTurn: BadTurnService) {
    this.id = CellComponent._counter;
    CellComponent._counter += 1;
  }

  public set(): void {
    if (this.cellState === State.None) {
      if (this.validTurn) {
        this.stateChangeRequested.emit(true);
      } else {
        this.cellQuote = this.badTurn.getBadTurn();
      }
    }
  }
}
