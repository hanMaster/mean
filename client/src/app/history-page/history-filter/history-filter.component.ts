import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Filter } from '../../shared/interfaces';
import {
  MaterialDatepicker,
  MaterialService,
} from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  @Output() eventFilter = new EventEmitter<Filter>();

  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  orderNumber: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  isValid = true;

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }
  ngAfterViewInit(): void {
    this.start = MaterialService.initDatepicker(
      this.startRef,
      this.handleCloseDatepicker.bind(this)
    );
    this.end = MaterialService.initDatepicker(
      this.endRef,
      this.handleCloseDatepicker.bind(this)
    );
  }
  handleCloseDatepicker() {
    MaterialService.updateTextInputs();
    if (this.start.date === null || this.end.date === null) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }

  submitFilter() {
    const filter: Filter = {};
    if (this.orderNumber) {
      filter.order = this.orderNumber;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.eventFilter.emit(filter);
  }
}
