import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './services/base.service';
// import { AuthenticationService } from './services/authentication.service';
// import { StorageService } from './services/storage.service';

// @Injectable()
// export class Interceptor implements HttpInterceptor {
//     constructor(
//         private router: Router,
//         private navCtrl: NavController,
//         // private authService: AuthenticationService,
//         private baseService: BaseService,
//         // private storageService: StorageService,
//         ) { }

//     intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//         // httpRequest = httpRequest.clone({
//         //     setHeaders: {
//         //         // Authorization: `Bearer ${(this.storageService.Token) ? this.storageService.Token : ' '}`,
//         //         // UserLanguage: `${(this.baseService.language().Symbol) ? this.baseService.language().Symbol : ' '}`
//         //     }
//         // });

//         // return next.handle(httpRequest).pipe(
//         //     tap(evt => {
                
//         //         if (evt instanceof HttpResponse) {
//         //             if (evt.body && evt.body.ExceptionCode > 0) {
//         //                 this.baseService.toast(evt.body.ExceptionMessage, (evt.body.ExceptionCode >= 1000) ? 'warning' : 'danger');
//         //                 if (evt.body.ExceptionCode == 401) {
//         //                     this.authService.Logout();
//         //                     let currentURL = this.baseService.pageUrl(this.router);
//         //                     if (currentURL == '' || currentURL.startsWith('login') || currentURL.startsWith('password')) {
//         //                         this.navCtrl.navigateRoot('/login');
//         //                     }
//         //                     else {
//         //                         this.navCtrl.navigateRoot('/login?return=' + currentURL);
//         //                     }
//         //                 }
//         //             }
//         //         }
//         //     }),
//         //     catchError((error: HttpErrorResponse) => {
                
//         //         this.baseService.toast(this.baseService.translate('common-error-unknownerror'), 'danger');
//         //         // if (error.status == 401 || error.status == 409 || error.status == 500 || error.status == 400) {
//         //         //     if (error.status === 401) {
//         //         //         this.authService.Logout();
//         //         //         this.navCtrl.navigateRoot('/login');
//         //         //     } else {
//         //         //         if (error.error.exception) {
//         //         //             this.baseService.toast(error.error.exception.message, 'danger');
//         //         //         } else {
//         //         //             this.baseService.toast(error.error.message);
//         //         //         }
//         //         //     }
//         //         // } else {
//         //         //     this.baseService.toast(this.baseService.translate('common-error-unknownerror'), 'danger');
//         //         // }
//         //         // return EMPTY;
//         //         return throwError(error);
//         //     })
//         // ) as Observable<HttpEvent<any>>;
//     }
// }
