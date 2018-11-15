import { Action } from '@ngrx/store';

import { IPhoto } from '../api/photo.interface';

export enum PhotoActionTypes {
  LOAD = '[Photo] Load photos',
  LOAD_SUCCESS = '[Photo] Load photos success',
  LOAD_FAILURE = '[Photo] Load photos failure',

  SELECT = '[Photo] Select photo',
};

export class LoadAction implements Action {
  readonly type = PhotoActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = PhotoActionTypes.LOAD_SUCCESS;

  constructor(public photos: Array<IPhoto>) { }
}

export class LoadFailureAction implements Action {
  readonly type = PhotoActionTypes.LOAD_FAILURE;

  constructor(public error: string) { }
}

export class SelectAction implements Action {
  readonly type = PhotoActionTypes.SELECT;

  constructor(public direction: number) { }
}

export type PhotoActions =
  LoadAction |
  LoadSuccessAction |
  LoadFailureAction |
  SelectAction;
