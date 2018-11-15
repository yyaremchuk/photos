import { IPhoto } from '../api/photo.interface';

export interface IPhotoState {
  currentIndex: number;
  frameStart: number;
  frameEnd: number;
  nextFrameStart: number;
  photos: Array<IPhoto>;
  loading: boolean;
  preload: boolean;
}
