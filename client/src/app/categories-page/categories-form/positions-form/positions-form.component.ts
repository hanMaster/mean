import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PositionsService } from '../../../shared/services/positions.service';
import { Position, Message } from '../../../shared/interfaces';
import {
  MaterialInstance,
  MaterialService,
} from '../../../shared/classes/material.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  positions: Position[] = [];
  loading = false;
  modal: MaterialInstance;
  form: FormGroup;
  positionId: string = '';

  @ViewChild('modal') modalRef: ElementRef;
  @Input('categoryId') categoryId: string;
  constructor(private positionsService: PositionsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    MaterialService.updateTextInputs();
    this.modal.open();
  }

  handleAddPosition() {
    this.positionId = '';
    MaterialService.updateTextInputs();
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
    this.form.reset();
  }

  onDeletePosition(event: Event, position: Position) {
    //останавливаем проброс события выше по дереву DOM
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию ${position.name}?`);
    if (decision) {
      this.positionsService.delete(position).subscribe(
        (message: Message) => {
          MaterialService.toast(message.message);
          this.positions = this.positions.filter(pos => pos._id !== position._id)
        },
        (error) => MaterialService.toast(error.error.message)
      );
    }
  }

  completed = () => {
    this.modal.close();
    this.form.enable();
  };

  onSubmit(event: Event) {
    event.preventDefault();
    this.form.disable();
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(
        (position) => {
          const idx = this.positions.findIndex(
            (pos) => pos._id === position._id
          );
          this.positions[idx] = position;
          MaterialService.toast('Позиция успешно изменена');
          this.form.reset();
        },
        (error) => MaterialService.toast(error.error.message),
        this.completed
      );
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position) => {
          this.positions.push(position);
          MaterialService.toast('Позиция успешно добавлена');
          this.form.reset();
        },
        (error) => MaterialService.toast(error.error.message),
        this.completed
      );
    }
  }
}
