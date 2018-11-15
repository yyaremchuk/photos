import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IState } from './store';
import { LoadAction, SelectAction } from './store/photo.actions';
import { PhotoSelectors } from './store/photo.selectors';
import { IPhoto } from './api/photo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public current$: Observable<IPhoto>;
  public previous$: Observable<IPhoto>;
  public next$: Observable<IPhoto>;

  private state: IState;
  private photos: Array<IPhoto>;

  constructor(
    private store: Store<IState>
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadAction());

    this.current$ = this.store.select<IPhoto>(PhotoSelectors.current);
    this.previous$ = this.store.select<IPhoto>(PhotoSelectors.previous);
    this.next$ = this.store.select<IPhoto>(PhotoSelectors.next);
  }

  public update(direction: number): void {
    this.store.dispatch(new SelectAction(direction));
  }
}
