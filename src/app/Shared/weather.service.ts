import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  accuApi = '8yQZiQy8A3PHWLgnJz0dx7AorGPGi456';
  constructor(private http: HttpClient) { }

  getCityDetails(city: string): Observable<any> {
    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search' ;
    const parm = `?apikey=${this.accuApi}&q=${city}`;
    return this.http.get(baseUrl + parm);
  }

  getWeatherDetails(city: string): Observable<any> {
    return this.getCityDetails(city).pipe(exhaustMap(data => {
      const key = data[0].Key;
      console.log(key);
      const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
      const parm = `${key}?apikey=${this.accuApi}`;
      return this.http.get(baseUrl + parm);
    }
    ));
  }
}