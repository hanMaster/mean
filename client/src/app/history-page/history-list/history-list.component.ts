import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Order } from '../../shared/interfaces';
import {
  MaterialInstance,
  MaterialService,
} from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Order[];

  @ViewChild('orderModal') modalRef: ElementRef;

  modal: MaterialInstance;
  selectedOrder: Order;

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  showModal(order: Order): void {
    this.selectedOrder = order;
    this.modal.open();
  }
  hideModal(): void {
    this.modal.close();
  }

  computePrice(order: Order): number {
    return order.list.reduce((acc, item) => {
      return (acc += item.cost * item.quantity);
    }, 0);
  }
}
