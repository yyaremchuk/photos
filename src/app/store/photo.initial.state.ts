import { environment } from '../../environments/environment';
import { IPhotoState } from './photo.state.interface';

export const photoInitialState: IPhotoState = {
  currentIndex: 0,
  frameStart: null,
  frameEnd: null,
  nextFrameStart: 0,
  photos: [],
  loading: false,
  preload: false,
};
