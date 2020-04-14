import { Injectable } from '@angular/core';
import { OrderPosition, Position } from '../shared/interfaces';

@Injectable()
export class OrderService {
  public list: OrderPosition[] = [];
  public price = 0;
  add(position: Position) {
    this.price += position.quantity * position.cost;
    this.list.push({
      _id: position._id,
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
    });
  }

  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex((pos) => pos._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.price -= orderPosition.quantity * orderPosition.cost;
  }

  clear() {
    this.list = [];
    this.price = 0;
  }
}
