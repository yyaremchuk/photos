import { environment } from '../../environments/environment';
import { IPhoto } from '../api/photo.interface';
import { IPhotoState } from './photo.state.interface';
import { PhotoActions, PhotoActionTypes } from './photo.actions';
import { photoInitialState } from './photo.initial.state';

export function photoReducer(state = photoInitialState, action: PhotoActions): IPhotoState {

  switch (action.type) {

    case PhotoActionTypes.SELECT: {
      let { currentIndex, nextFrameStart, preload } = state;

      if (action.direction === -1 && state.currentIndex === 0) {
        return state;
      }

      currentIndex += action.direction;

      // check if we need to pre-load next frame
      if (action.direction === 1 &&
          (state.frameEnd - state.currentIndex === environment.newFrameLoadThreshold)) {
        nextFrameStart = state.frameEnd + 1;
        preload = true;
      }

      if (action.direction === -1 && state.currentIndex === environment.newFrameLoadThreshold) {
        nextFrameStart = state.frameStart - environment.frameSize;
        preload = true;
      }

      return {
        ...state,
        currentIndex,
        nextFrameStart,
        preload
      };
    }

    case PhotoActionTypes.LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case PhotoActionTypes.LOAD_SUCCESS: {
      let { currentIndex, frameStart, frameEnd, nextFrameStart } = state;
      const { frameSize } = environment;
      let photos: Array<IPhoto> = action.photos;
      const length: number = action.photos.length;

      // handle initial load
      if (frameStart === null) {
        frameStart = nextFrameStart;
        frameEnd = length - 1;
      }

      console.log(frameStart, nextFrameStart);

      // check whether we need to remove one of old frames and adjust indexes
      if (nextFrameStart > frameStart) {
        photos = [
          ...state.photos,
          ...photos
        ];

        console.log('frameEnd...', frameEnd, ', length...', length, ', frameSize...', frameSize);

        frameEnd += length;

        // we do not want photos array to grow
        if (photos.length > 2 * frameSize) {
          photos = photos.slice(frameSize);
          frameStart += frameSize;
        }
      }

      return {
        ...state,
        photos,
        currentIndex,
        frameStart,
        frameEnd,
        loading: false,
        preload: false
      };
    }

    case PhotoActionTypes.LOAD_FAILURE: {
      return {
        ...state,
        loading: false,
        preload: false
      };
    }

    default: {
      return state;
    }
  }
}
