import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { Device } from '@awesome-cordova-plugins/device/ngx';
import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';

type Colors =
  | 'warning'
  | 'danger'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'dark';

type Positions = 'top' | 'bottom' | 'middle';

@Injectable({
  providedIn: 'root',
})

export class BaseService {

  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    // private platform: Platform,
    // private device: Device,
    // private alertCtrl: AlertController,
  ) { }

  async loading_Show(
    message: string = "درحال بارگذاری",
    duration: number = 10000
  ) {
    let loading = await this.loadingCtrl.create({
      message: message,
      duration: duration,
    });
    loading.present();
    return loading;
  }

  loading_Close(loading: HTMLIonLoadingElement) {
    if (loading != null) {
      loading.dismiss();
    }
  }

  async toast(
    message: string,
    color: Colors = 'warning',
    buttonText: string = '',
    duration: number = 2000,
    position: Positions = 'top'
  ) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      color: color,
      buttons: buttonText
        ? [{ text: buttonText, role: 'cancel', side: 'start' }]
        : undefined,
    });
    toast.present();
  }

  private getHttpHeader() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'text/plain',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      // 'Access-Control-Allow-Headers': 'Content-Type',
    };
  }

  httpGET(serviceUrl: string, body: any = null, showLoadingPopup: boolean = false, apiRootUrl: string = environment.apiUrl) {
    return new Promise(async (resolve, reject) => {
      let loading: any; if (showLoadingPopup) { loading = await this.loading_Show(); }
      if (body) {
        let dataParams = new HttpParams().set('serviceData', JSON.stringify(body));
        this.http.get(apiRootUrl + serviceUrl, { headers: this.getHttpHeader(), params: dataParams, }).subscribe((res: any) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } resolve(res.Result); }, (err) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } reject(err); });
      }
      else {
        this.http.get(apiRootUrl + serviceUrl, { headers: this.getHttpHeader(), }).subscribe((res: any) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } resolve(res); }, (err) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } reject(err); });
      }
    });
  }

  httpPOST(serviceUrl: string, body: any, showLoadingPopup: boolean = false) {
    return new Promise(async (resolve, reject) => {
      let loading: any;
      if (showLoadingPopup) {
        loading = await this.loading_Show();
      }
      this.http
        .post(
          environment.apiUrl + serviceUrl,
          body,
          { headers: this.getHttpHeader() }
        )
        .subscribe(
          (res: any) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            resolve(res);
          },
          (err) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            reject(err);
          }
        );
    });
  }

  httpPUT(serviceUrl: string, body: any, showLoadingPopup: boolean = false) {
    return new Promise(async (resolve, reject) => {
      let loading: any;
      if (showLoadingPopup) {
        loading = await this.loading_Show();
      }
      this.http
        .put(
          environment.apiUrl + serviceUrl,
          body ? JSON.stringify(body) : {},
          { headers: this.getHttpHeader() }
        )
        .subscribe(
          (res: any) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            resolve(res.Result);
          },
          (err) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            reject(err);
          }
        );
    });
  }

  httpDELETE(serviceUrl: string, showLoadingPopup: boolean = false) {
    return new Promise(async (resolve, reject) => {
      let loading: any;
      if (showLoadingPopup) {
        loading = await this.loading_Show();
      }
      this.http
        .delete(environment.apiUrl + serviceUrl, {
          headers: this.getHttpHeader(),
        })
        .subscribe(
          (res: any) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            resolve(res.Result);
          },
          (err) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            reject(err);
          }
        );
    });
  }
}
