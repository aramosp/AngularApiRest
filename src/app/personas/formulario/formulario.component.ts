import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../../persona.model';
import { LoggingService } from '../../LoggingService.service';
import { PersonasService } from '../../personas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],

})
export class FormularioComponent implements OnInit{

  nombreInput:string;
  apellidoInput:string;
  index:number;
  modoEdicion:number;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private loggingServicio:LoggingService,
              private personasService: PersonasService){
    this.personasService.saludar.subscribe(
      (indice:number)=>alert("El indice es: " + indice)
    );
  }
  ngOnInit(){
    this.index=this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
    //Alex el +comvierte el queryParmas de String a number
    if(this.modoEdicion != null && this.modoEdicion === 1){
      let personaService:Persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput= personaService.nombre;
      this.apellidoInput = personaService.apellido;
    }
  }

  agregarPersona(){
    let persona1 =new Persona(this.nombreInput, this.apellidoInput);
    if(this.modoEdicion != null && this.modoEdicion === 1){
       this.personasService.modificarPersona(this.index , persona1);
    }else{
    this.personasService.personaAgregada(persona1);
    this.loggingServicio.enviarMensajeAconsola(" Persona nombre:" + persona1.nombre + " Apellido:" + persona1.apellido);
    }
    this.router.navigate(['personas']);
  }

  delete(){
    if(this.modoEdicion != null && this.modoEdicion === 1){
    this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }
}
