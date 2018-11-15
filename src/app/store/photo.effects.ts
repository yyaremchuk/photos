import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IState } from './index';
import { PhotoService } from '../api/photo.service';
import { IPhoto } from '../api/photo.interface';

import {
  PhotoActionTypes,
  LoadAction,
  LoadSuccessAction,
  LoadFailureAction,
  SelectAction
} from './photo.actions';

@Injectable()
export class PhotoEffects {

  @Effect()
  public loadPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.LOAD),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [LoadAction, IState]) => {
      const start: number = state.photos.nextFrameStart;
      const limit: number = environment.frameSize;

      return this.photoService.getPhotos(start, limit).pipe(
        map((photos: Array<IPhoto>) => new LoadSuccessAction(photos)),
        catchError(() => of(new LoadFailureAction('Failed to load photos')))
      );
    })
  );

  @Effect()
  public selectPhoto$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.SELECT),
    withLatestFrom(this.store$),
    filter(([action, state]: [LoadAction, IState]) =>
      !state.photos.loading && state.photos.preload
    ),
    map(([action, state]: [LoadAction, IState]) => {
      return new LoadAction();
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<IState>,
    private photoService: PhotoService
  ) {}
}
