import { Component } from '@angular/core';
import { Persona } from '../persona.model';
import { LoggingService } from '../LoggingService.service';
import { PersonasService } from '../personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  personas:Persona[]=[];

  constructor(private router: Router, private personasService:PersonasService ){}

  ngOnInit(): void {
   //this.personas=this.personasService.personas;
   this.personasService.obtenerPersonas()
   .subscribe(
       (personas1:Persona[]) => {
        this.personas=personas1;
        this.personasService.setPersona(personas1);
      }
   );
  }

  agregar(){
    this,this.router.navigate(['personas/agregar'])
  }
}
