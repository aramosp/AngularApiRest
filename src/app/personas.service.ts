import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./LoggingService.service";
import { Persona } from "./persona.model";
import { DataServices } from './data.services';

@Injectable()//este decorador lo usamos para inyectar un servicio en otro
export class PersonasService{
  personas:Persona [] = [];

   saludar = new EventEmitter<number>();

  constructor(private loggingService: LoggingService, private dataService: DataServices){}

  //se encarga de actualizar el arreglo una vez lo recupermos de la base de datos
  setPersona(personas:Persona[]){
     this.personas = personas;
  }

  obtenerPersonas(){
    return this.dataService.listarPersonas();
  }

  personaAgregada(persona:Persona){
    this.loggingService.enviarMensajeAconsola("agregamos PersoNA" + persona.nombre )
    if(this.personas == null){
      this.personas=[];
    }
    this.personas.push(persona);
    this.dataService.guardarPersonas(this.personas);

  }

 encontrarPersona(index:number){
   let persona:Persona = this.personas[index];
   return persona;
 }
 modificarPersona(index:number , persona:Persona){
    let persona1 = this.personas[index];
    persona1.nombre=persona.nombre;
    persona1.apellido= persona.apellido;
    this.dataService.updatePersona(index, persona);

 }

  eliminarPersona(index:number){
     this.personas.splice(index,1);
     this.dataService.delete(index);
     //mandamos a recargar nuevamentos todos los elementos de la bd para que se generen los indices de nuevo
      //se vuelve a guardar el arreglo;
      this.modificarPersonas();
    }

    modificarPersonas(){
       if(this.personas != null){
         this.dataService.guardarPersonas(this.personas);
       }
    }
}
