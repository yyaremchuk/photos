import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeLogger } from 'ngrx-store-logger';

import { environment } from '../environments/environment';
import { IState, reducers } from './store';
import { PhotoEffects } from './store/photo.effects';

import { AppComponent } from './app.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';

export function logger(reducer: ActionReducer<IState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [
    AppComponent,
    CarrouselComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ PhotoEffects ]),
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
