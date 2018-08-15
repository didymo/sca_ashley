import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class Addr2coordService {

  api = Config.api.addr2coord;

  constructor(
    private http: HttpClient
  ) { }

  get(address: string)
  {
    return this.http.get(this.api + '&q=' + encodeURI(address));
  }
}
