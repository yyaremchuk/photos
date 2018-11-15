import { ActionReducerMap } from '@ngrx/store';

import { IPhotoState } from './photo.state.interface';
import { photoReducer as PhotoReducer} from './photo.reducer';
// import { WeatherEffects } from './effects/weather';

export interface IState {
  photos: IPhotoState;
}

export const reducers: ActionReducerMap<IState> = {
  photos: PhotoReducer
}
