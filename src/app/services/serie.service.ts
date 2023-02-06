import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Serie} from "../common/serie";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  baseURL = 'http://localhost:3000/api/series';
// Inyectamos el Cliente Http que nos
// permitirá reealizar peticiones Http a la API REST
  constructor(private http: HttpClient) { }
// Creamos la función que nos devolverá
// el array de Películas
  getSerieList(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseURL);
  }
  // Función para actualizar una película
  updateSerie(id: string, serie: Serie): Observable<any> {
    return this.http.put(this.baseURL+'/'+id,serie);
  }
// Función para cargar los géneros de la base de datos
  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL+'/genres');
  }
// Función para añadir una nueva película
  newSerie(serie: Serie): Observable<any> {
    return this.http.post(this.baseURL,serie);

  }
}
