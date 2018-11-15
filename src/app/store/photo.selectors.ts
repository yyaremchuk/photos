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
      return state.photos.length > state.currentIndex + 1 ? state.photos[state.currentIndex + 1] : null;
    }
  );

  public static previous: MemoizedSelector<IState, IPhoto> = createSelector(selectFeature,
    (state: IPhotoState) => state.currentIndex > 0 ? state.photos[state.currentIndex - 1] : null
  );
}
