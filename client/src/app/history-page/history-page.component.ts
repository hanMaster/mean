import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MaterialInstance,
  MaterialService,
} from '../shared/classes/material.service';
import { Order } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { OrdersService } from '../shared/services/orders.service';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;

  offset = 0;
  limit = STEP;
  orders: Order[] = [];
  oSub: Subscription;
  loading = false;
  haveMoreOrders = true;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetch();
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  private fetch() {
    this.loading = true;
    const params = {
      offset: this.offset,
      limit: this.limit,
    };
    this.oSub = this.ordersService.fetch(params).subscribe(
      (orders) => {
        this.orders = this.orders.concat(orders);
        this.haveMoreOrders = orders.length === STEP
      },
      (error) => MaterialService.toast(error.error.message),
      () => (this.loading = false)
    );
  }

  loadMore() {
    this.offset += STEP;
    this.fetch();
  }
}
