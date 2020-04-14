import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  MaterialInstance,
  MaterialService,
} from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { Order, OrderPosition } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef;

  rSub: Subscription;
  isRoot: boolean;
  modal: MaterialInstance;
  constructor(
    private router: Router,
    private orderService: OrderService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.rSub = this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.rSub.unsubscribe();
    this.modal.destroy();
  }

  onFinishPressed() {
    this.modal.open();
  }

  onCancelPressed() {
    this.modal.close();
  }

  removeOrderItem(orderPosition: OrderPosition) {
    this.orderService.remove(orderPosition);
  }

  storeOrder() {
    const order: Order = {
      list: this.orderService.list,
    };
    this.ordersService.storeOrder(order).subscribe(
      (response) => MaterialService.toast('Заказ сохранен'),
      (error) => MaterialService.toast(error.error.message),
      () => this.modal.close()
    );
  }
}
