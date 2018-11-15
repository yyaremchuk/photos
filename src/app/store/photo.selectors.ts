import { createSelector, MemoizedSelector } from '@ngrx/store';
import { IPhoto } from '../api/photo.interface';
import { IState } from './index';
import { IPhotoState } from './photo.state.interface';

export const selectFeature = (state: IState) => state.photos;

export class PhotoSelectors {

  public static current: MemoizedSelector<IState, IPhoto> = createSelector(selectFeature,
    (state: IPhotoState) => state.photos[state.currentIndex - state.frameStart]
  );

  public static next: MemoizedSelector<IState, IPhoto> = createSelector(selectFeature,
    (state: IPhotoState) => {
      const internalIndex: number = state.currentIndex - state.frameStart + 1;
      return state.photos.length > internalIndex ? state.photos[internalIndex] : null;
    }
  );

  public static previous: MemoizedSelector<IState, IPhoto> = createSelector(selectFeature,
    (state: IPhotoState) => {
      const internalIndex: number = state.currentIndex - state.frameStart - 1;
      return internalIndex >= 0 ? state.photos[internalIndex] : null;
    }
  );
}
