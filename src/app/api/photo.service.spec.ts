import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { PhotoService } from './photo.service';
import { IPhoto } from './photo.interface';

const TEST_URL: string = 'http://jsonplaceholder.typicode.com';

xdescribe('PhotoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PhotoService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([PhotoService], (service: PhotoService) => {
    expect(service).toBeTruthy();
  }));


  it('should make GET call', () => {
    const testData: Array<any> = [
      { id: 1 },
      { id: 2 }
    ];

    // Make an HTTP GET request
    const photoService: PhotoService = TestBed.get(PhotoService);
    photoService.getPhotos(0, 10).subscribe((response: Array<IPhoto>) =>
        expect(response).toEqual(testData)
      );

    // @TODO: Fix query params
    const req = httpTestingController.expectOne(`${TEST_URL}/photos`);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);
  });
});
