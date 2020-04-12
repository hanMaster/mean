import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Message } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`api/category/${id}`);
  }

  create(name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    fd.append('name', name);
    if (image) {
      fd.append('image', image, image.name);
    }
    return this.http.post<Category>('api/category', fd);
  }

  udate(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    fd.append('name', name);
    if (image) {
      fd.append('image', image, image.name);
    }
    return this.http.patch<Category>(`api/category/${id}`, fd);
  }

  delete(id: string):Observable<Message> {
    return this.http.delete<Message>(`api/category/${id}`);
  }
}
