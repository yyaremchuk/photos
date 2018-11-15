import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPhoto } from './photo.interface';

const API_ROOT_URL = 'http://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient
  ) { }

  public getPhotos(start: number, limit: number): Observable<Array<IPhoto>> {
    const params: { [key: string]: string } = {
      _start: start.toString(),
      _limit: limit.toString()
    };

    return this.http.get<Array<IPhoto>>(`${API_ROOT_URL}/photos`, { params }).pipe(
      catchError((err: any) => {
        console.log('error => ', err);
        return Observable.throw(err);
      })
    );
  }
}
