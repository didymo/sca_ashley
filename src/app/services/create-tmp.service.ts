/**
 * Create new TMP (Traffic Management Plan)
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})

export class CreateTMPService {

  api = Config.api.createTMP;

  constructor(
    private http: HttpClient
  ) { }

  post(tmp)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Basic ${Config.api.auth.base64}`
      })
    };

    return this.http.post(this.api, tmp, httpOptions);
  }

}
