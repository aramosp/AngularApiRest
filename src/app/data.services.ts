import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';

@Injectable()//Usamos este decorador cuando implementamos un servicio dentro de otro.
export class DataServices{
  constructor(private httpClient: HttpClient){}

  urlBase="https://listado-personas-c0d09-default-rtdb.firebaseio.com/datos.json";

  listarPersonas() {
    return this.httpClient.get<Persona[]>(this.urlBase);
  }

  guardarPersonas(personas: Persona[]){
      this.httpClient.put(this.urlBase, personas)
      .subscribe({
        next: (response) => console.log("Resultado Guardar Personas: " + response),
        error: (error)=> console.log("Error al guardar Personas: " + error)
        });
  }


  updatePersona(index:number, persona:Persona){
    let url:string;
    url='https://listado-personas-c0d09-default-rtdb.firebaseio.com/datos/' + index + '.json';
    this.httpClient.put(url, persona)
    .subscribe({
      next: response => console.log("Resultado modificar Persona: " + response),
      error: error => console.log("Error en modificar Persona: " + error)
    });
  }

  delete(index:number){
    let url:string;
    url='https://listado-personas-c0d09-default-rtdb.firebaseio.com/datos/' + index + '.json';
    this.httpClient.delete(url)
    .subscribe({
      next: response => console.log("Resultado Eliminar Persona: " + response),
      error: error => console.log("Error en Eliminar Persona: " + error)
    });
  }
}
