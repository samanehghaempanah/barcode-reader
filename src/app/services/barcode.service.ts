import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

let preUrl = 'ApiHandling';

@Injectable({
  providedIn: 'root'
})

export class BarcodeService {

  constructor(public baseService: BaseService) { }

  async Get(StorageId: number) {
    try {
      let result: any = await this.baseService.httpGET(preUrl + '/barcode-report/' + StorageId, null, true);
      return result;
    } catch { }
    return null;
  }

  async POST(body: any) {
    try {
      let result: any = await this.baseService.httpPOST(preUrl + '/barcode', body, true);
      return result
    } catch { }
    return null;
  }

  async CHECK_POST(body: any) {
    try {
      let result: any = await this.baseService.httpPOST(preUrl + '/barcode-cheak', body, true);
      return result
    } catch { }
    return null;
  }

  async DELETE(body: any) {
    try {
      let result: any = await this.baseService.httpPOST(preUrl + '/barcode-delete', body, true);
      return result;
    } catch { }
    return null;
  }
}
