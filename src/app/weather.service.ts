import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";

import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) { }

  getInfo(ciudad: string): Observable<any>{
    return this.http.get<any>(environment.apiUrl + "?query=" + ciudad);
  }

}
