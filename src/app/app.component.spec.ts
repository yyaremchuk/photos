import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CarrouselComponent
      ],
      providers: [{
        provide: Store,
        useValue: jasmine.createSpyObj('Store', ['dispatch', 'select'])
      }],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
