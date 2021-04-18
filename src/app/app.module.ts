import { BoardComponent } from './board/board.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { FormsModule } from '@angular/forms';
import { GameService } from './game.service';
import { CellComponent } from './cell/cell.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BoardComponent, SquareComponent, CellComponent],
  bootstrap:    [ AppComponent ],
  providers:  [GameService]
})
export class AppModule { }
