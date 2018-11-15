import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { PhotoService } from './api/photo.service';
import { IPhoto } from './api/photo.interface';

// number of preloaded objects
const FRAME_SIZE: number = 20;

// distance to the frame border when next frame load is triggered
const THRESHOLD: number = 4;

interface IState {
  currentIndex: number;
  frameStart: number;
  frameEnd: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public current$: BehaviorSubject<IPhoto> = new BehaviorSubject(null);
  public previous$: BehaviorSubject<IPhoto> = new BehaviorSubject(null);
  public next$: BehaviorSubject<IPhoto> = new BehaviorSubject(null);

  public direction$: BehaviorSubject<number> = new BehaviorSubject(0);

  private state: IState;
  private photos: Array<IPhoto>;

  constructor(
    private photoService: PhotoService
  ) { }

  public ngOnInit(): void {
    console.log('about to load data');

    // initialise state
    this.state = {
      currentIndex: 0,
      frameStart: 0,
      frameEnd: FRAME_SIZE - 1
    };

    // load inital frame
    this.photoService.getPhotos(this.state.frameStart, FRAME_SIZE).pipe(take(1)).subscribe((data: Array<IPhoto>) => {
      this.photos = [
        ...data
      ];
      console.log('data...', data);

      if (data && data.length > 0) {
        this.current$.next(data[0]);

        if (data.length > 1) {
          this.next$.next(data[1]);
        }
      }
    });

    // if current image changes check whether to load new frame of data or not
    this.direction$.subscribe((value: number) => {

      console.log('direction...', this.state);

      if (value === 1 &&
          (this.state.frameEnd - (this.state.currentIndex + this.state.frameStart) === THRESHOLD)) {
        this.photoService.getPhotos(this.state.frameEnd + 1, FRAME_SIZE).pipe(take(1)).subscribe(
          (data: Array<IPhoto>) => {
            this.photos = [
              ...this.photos,
              ...data
            ];

            this.state.frameEnd += data.length;

            // we do not want photos array to grow
            if (this.photos.length > 2 * FRAME_SIZE) {
              this.photos = this.photos.slice(FRAME_SIZE);
              this.state.currentIndex -= FRAME_SIZE;
              this.state.frameStart += FRAME_SIZE;
            }
          }
        );
      }

      if (value === -1 && this.state.currentIndex === THRESHOLD) {
        this.photoService.getPhotos(this.state.frameStart - FRAME_SIZE, FRAME_SIZE).pipe(take(1)).subscribe(
          (data: Array<IPhoto>) => {
            this.photos = [
              ...data,
              ...this.photos,
            ];

            this.state.frameStart -= data.length;

            // we do not want photos array to grow
            if (this.photos.length > 2 * FRAME_SIZE) {
              this.photos = this.photos.slice(0, 2 * FRAME_SIZE);
              this.state.currentIndex += FRAME_SIZE;
              this.state.frameEnd -= FRAME_SIZE;
            }
          }
        );
      }

      console.log('data...', this.photos);
    });

  }

  public update(direction: number): void {

    if (direction === -1 && this.state.currentIndex === 0) {
      return;
    }

    this.state.currentIndex += direction;
    this.direction$.next(direction);
    this.current$.next(this.photos[this.state.currentIndex]);

    if (this.photos.length > this.state.currentIndex + 1) {
      this.next$.next(this.photos[this.state.currentIndex + 1]);
    } else {
      this.next$.next(null);
    }

    if (this.state.currentIndex > 0) {
      this.previous$.next(this.photos[this.state.currentIndex - 1]);
    } else {
      this.previous$.next(null);
    }
  }
}
