import { photoReducer } from './photo.reducer';
import { IPhotoState } from './photo.state.interface';
import { SelectAction } from './photo.actions';
import { photoInitialState } from './photo.initial.state';

describe('Photo reducer', () => {

  describe('SELECT', () => {
    it('should not set preload to true when is enough data loaded', () => {
      const currentState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 19,
        frameStart: 0,
        nextFrameStart: 0,
        currentIndex: 14,
        preload: false,
        loading: false
      };

      const expectedState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 19,
        frameStart: 0,
        nextFrameStart: 0,
        currentIndex: 15,
        preload: false,
        loading: false
      };

      const result: IPhotoState = photoReducer(currentState, new SelectAction(1));
      expect(result).toEqual(expectedState);
    });

    it('should set preload to true when threshold reached', () => {
      const currentState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 19,
        frameStart: 0,
        nextFrameStart: 0,
        currentIndex: 15,
        preload: false,
        loading: false
      };

      const expectedState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 19,
        frameStart: 0,
        nextFrameStart: 20,
        currentIndex: 16,
        preload: true,
        loading: false
      };

      const result: IPhotoState = photoReducer(currentState, new SelectAction(1));
      expect(result).toEqual(expectedState);
    });

    it('should not set preload to true threshold is reached but data has been preloaded already', () => {
      const currentState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 59,
        frameStart: 20,
        nextFrameStart: 40,
        currentIndex: 35,
        preload: false,
        loading: false
      };

      const expectedState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 59,
        frameStart: 20,
        nextFrameStart: 40,
        currentIndex: 36,
        preload: false,
        loading: false
      };

      const result: IPhotoState = photoReducer(currentState, new SelectAction(1));
      expect(result).toEqual(expectedState);
    });

    it('should set preload to true when threshold is reached for the left edge of the frame', () => {
      const currentState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 59,
        frameStart: 20,
        nextFrameStart: 40,
        currentIndex: 25,
        preload: false,
        loading: false
      };

      const expectedState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 59,
        frameStart: 20,
        nextFrameStart: 0,
        currentIndex: 24,
        preload: true,
        loading: false
      };

      const result: IPhotoState = photoReducer(currentState, new SelectAction(-1));
      expect(result).toEqual(expectedState);
    });

    it('should not set preload to true when nextFrameStart is 0', () => {
      const currentState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 39,
        frameStart: 0,
        nextFrameStart: 0,
        currentIndex: 5,
        preload: false,
        loading: false
      };

      const expectedState: IPhotoState = {
        ...photoInitialState,
        frameEnd: 39,
        frameStart: 0,
        nextFrameStart: 0,
        currentIndex: 4,
        preload: false,
        loading: false
      };

      const result: IPhotoState = photoReducer(currentState, new SelectAction(-1));
      expect(result).toEqual(expectedState);
    });
  });
});
