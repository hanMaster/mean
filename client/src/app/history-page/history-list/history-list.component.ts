import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnInit, OnDestroy {
  @Input() orders: Order[];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
