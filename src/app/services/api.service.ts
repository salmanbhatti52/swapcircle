import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseURL = 'https://swap.eigix.net/api'
  baseURL = 'https://portal.swapcircle.trade/api';
  fingerPrintVal:any;
  wallets = [];
  offers = [];
  private appID = '3e72c5cc-01d7-4486-90cd-95a58b7a8d7a'; // Replace with your OneSignal App ID
  private apiUrl = 'https://onesignal.com/api/v1/notifications';
  constructor(public http: HttpClient) { }

  sendRequest(action: any, data?: any) {

    let header;

    header = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    header.append("Access-Control-Allow-Origin", "*");
    header.append(
      "Access-Control-Allow-Methods",
      "POST, GET, DELETE, PUT,OPTIONS"
    );
    let dataToPost = data;
    let url = `${this.baseURL}/${action}`;
    return this.http.post(url, dataToPost, {
      headers: header,
    });
  }

  getRequest(action: any, data?: any) {

    let header;

    header = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    header.append("Access-Control-Allow-Origin", "*");
    header.append(
      "Access-Control-Allow-Methods",
      "POST, GET, DELETE, PUT,OPTIONS"
    );
    let dataToPost = data;
    let url = `${this.baseURL}/${action}`;
    return this.http.get(url, {
      headers: header,
    });
  }

  sendNotification(tokenIdList?: string[], contents?: string, heading?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'NDYxMzFmNjctOTA3ZS00OGNjLTgyMzItN2YzZDUwOTc2YTM1'
    });

    const body = {
      app_id: this.appID,
      include_player_ids: [
        // '4cddce29-939a-4bc3-83c8-eb1bd4bfb93c',
        '8dfff78a-8769-4d22-ade2-216b481aec5c'
      ],
      android_accent_color: 'FF9976D2',
      small_icon: 'ic_stat_onesignal_default',
      large_icon: 'https://www.filepicker.io/api/file/zPloHSmnQsix82nlj9Aj?filename=name.jpg',
      headings: { en: 'Notification From Front-end' },
      contents: { en: 'Debug Engineer has transfered amount in your wallet' }
    };

    return this.http.post(this.apiUrl, JSON.stringify(body), { headers });
  }
}
