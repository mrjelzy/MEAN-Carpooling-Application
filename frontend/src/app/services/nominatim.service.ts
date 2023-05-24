import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interfaces/City';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private apiUrl = 'https://nominatim.openstreetmap.org';

  constructor(private http: HttpClient) {}

  getCity(cityName : String) : Observable<City[]>{
    const url = `${this.apiUrl}/search?city=${cityName}&format=json&limit=1`;
    return this.http.get<City[]>(url, httpOptions);
  }

  getDistance(lon1 : number, lat1: number, lon2 : number, lat2 : number) : Observable<any>{
      const osrmApi = `http://router.project-osrm.org/route/v1/car/${lon1},${lat1};${lon2},${lat2}`;
      return this.http.get<any>(osrmApi, httpOptions);
  }
}
