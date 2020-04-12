import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from '../../shared/classes/material.service';
import { Category, Message } from '../../shared/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef: ElementRef;
  isNew = true;
  form: FormGroup;
  image: File;
  imagePreview: any = '';
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.form.disable();
    //Если есть id значит редактируем категорию, нужно сделать запрос на back категории по id
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoriesService.getById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category;
            this.form.patchValue({ name: category.name });
            this.imagePreview = category.imageSrc;
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        (error) => MaterialService.toast(error.error.message)
      );
  }

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.image);
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.udate(
        this.category._id,
        this.form.value.name,
        this.image
      );
    }
    obs$.subscribe(
      (category) => {
        this.form.enable();
        this.category = category;
        MaterialService.toast('Изменения сохранены');
        this.router.navigate(['/categories']);
      },
      (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

  deleteCategory() {
    const decision = window.confirm(
      `Вы уверены, что хотите удалить категорию "${this.category.name}"`
    );

    if (decision) {
      this.categoriesService.delete(this.category._id).subscribe(
        (message: Message) => {
          MaterialService.toast(message.message);
        },
        (error) => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/categories'])
      );
    }
  }
}
