import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IPhoto } from '../../api/photo.interface';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {

  @Input()
  public current: IPhoto;

  @Input()
  public previous: IPhoto;

  @Input()
  public next: IPhoto;

  @Output()
  public onChange: EventEmitter<number> = new EventEmitter();
}
