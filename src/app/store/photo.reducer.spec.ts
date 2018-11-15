import { photoReducer } from './photo.reducer';
import { IPhotoState } from './photo.state.interface';
import { SelectAction } from './photo.actions';
import { photoInitialState } from './photo.initial.state';

describe('Photo reducer', () => {

  describe('SELECT', () => {
    it('should not set preload to true', () => {
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

    it('should set preload to true', () => {
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

    it('should not set preload to true', () => {
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
  });
});
