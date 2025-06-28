import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CollectionService } from '../services/dashboard/collection.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  constructor(private collectionService: CollectionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/api/collections') && req.method === 'GET') {
      return this.collectionService.getCollections().pipe(
        switchMap((collections) =>
          of(new HttpResponse({ status: 200, body: collections }))
        )
      );
    }
    return next.handle(req);
  }
}
