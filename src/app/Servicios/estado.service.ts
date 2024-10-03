import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Estado } from '../Interfaces/estado';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {
    private URL:string = environment.endPoint;
    constructor(private http:HttpClient) { }

    listar():Observable<Estado[]>{
        return this.http.get<Estado[]>(`${this.URL}/listar`);
    }

    guardar(nuevo:Estado):Observable<Estado>{
        return this.http.post<Estado>(`${this.URL}/guardar`, nuevo);
    }

    actualizar(editado:Estado):Observable<Estado>{
        return this.http.put<Estado>(`${this.URL}/actualizar`, editado);
    }

    eliminar(id:number):Observable<string>{
        return this.http.delete<string>(`${this.URL}/eliminar/${id}`);
    }
}
