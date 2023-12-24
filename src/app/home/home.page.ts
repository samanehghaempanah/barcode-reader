import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseService } from '../services/base.service';
import { BarcodeService } from '../services/barcode.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('barcodeInput') barcodeInput: IonInput | any;
  @ViewChild('weightInput') weightInput: IonInput | any;

  pageData = {
    storageId: 100,
    barcodeReports: {} as any,
    barcode: null as any,
    weight: null as any,
    showFrom: false,
  }

  constructor(public baseService: BaseService, public barcodeService: BarcodeService) { }

  ngOnInit() {
    this.loadData();
  };

  async loadData() {
    try {
      let result = await this.barcodeService.Get(this.pageData.storageId);
      if (result) {
        if (result.data) {
          this.pageData.barcodeReports = result.data;
          this.pageData.barcodeReports.data = JSON.parse(this.pageData.barcodeReports.data)[0];
        }
      }
      this.barcodeInput.setFocus();
    }
    catch { }
  }

  async onSubmitBarcode() {
    try {
      if (this.pageData.barcode != null && this.pageData.barcode != 0) {
        let body = {
          "barcode": this.pageData.barcode,
          "userId": 0,
          "warehouseId": 0,
          "storageId": this.pageData.storageId
        };

        let result = await this.barcodeService.CHECK_POST(body);
        if (result) {
          if (result.isSuccess) {
            // this.baseService.toast('بارکد مورد تایید است.', 'success');
            this.pageData.showFrom = true;
            this.weightInput.setFocus();
          }
          else {
            this.baseService.toast('بارکد مورد تایید نمی باشد!', 'danger');
          }
        }
      }
      else {
        this.baseService.toast('لطفا مقدار صحیح برای بارکد وارد کنید!', 'danger');
      }
    }
    catch { }
  }

  async onSubmitWeight() {
    this.barcodeInput.setFocus();
    try {
      if (this.pageData.weight != null && this.pageData.weight != 0) {
        let body = {
          "barcode": this.pageData.barcode,
          "weight": this.pageData.weight,
          "userId": 0,
          "warehouseId": 0,
          "storageId": this.pageData.storageId
        };

        let result = await this.barcodeService.POST(body);
        if (result) {
          if (result.isSuccess) {
            this.pageData.showFrom = false;
            this.pageData.barcode = null;
            this.pageData.weight = null;
            this.baseService.toast(result.message, 'success');
            this.loadData();
          }
          else {
            this.baseService.toast(result.message, 'danger');
          }
        }
      }
      else {
        this.baseService.toast('لطفا مقدار صحیح برای وزن وارد کنید!', 'danger');
      }
    }
    catch { }
  }
}
