import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { CoreService } from './core.service';

@Injectable()
export class CoreInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    const core = this.injector.get(CoreService);
    const coreRequest = req.clone({
      headers: req.headers.set('Authorization', 'token ' + core.token)
    });
    return next.handle(coreRequest);
  }
}
