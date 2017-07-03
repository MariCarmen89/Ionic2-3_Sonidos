import { Component } from '@angular/core';

import { ANIMALES } from "../../data/data.animales";
import { Animal } from "../../interaces/animal.interface";

import { Refresher, reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio(); //objeto
  audioTiempo: any;   //para controlar el setTimeout
  ordenando: boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0); //Hago un clon de ANIMALES para poder trabajar con esos datos y modif.
  }

  reproducir(animal:Animal){
    this.pausar_audio( animal );

    //para pausar el animal
    if( animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;
    this.audioTiempo = setTimeout( () => animal.reproduciendo = false, animal.duracion *1000 );
  }

  //PARA PAUSAR AUDIO
  private pausar_audio( animalSele:Animal ){
    clearTimeout( this.audioTiempo ); //Resetear/limpiar setTimeout

    this.audio.pause();         //pausamos el audio
    this.audio.currentTime = 0; //para que se ponga al inicio del audio

    //Para que ninguno se reproduzca
    for( let animal of this.animales ){
      if( animal.nombre != animalSele.nombre ){
        animal.reproduciendo = false;
      }
    }
  }

    //BORRAR ANIMALES
    borrar_animal( idx: number ){
      this.animales.splice(idx, 1); //eliminar el animal
    }

    //Refrescar aplicacion
    recargar_animales( refresher:Refresher ){
      console.log("Inicio del refresh");

      //Para que se vea más tiempo
      setTimeout(() => {
        console.log("Termino el refresh");
        this.animales = ANIMALES.slice(0);

        refresher.complete();
      }, 1500)
    }

    //REORDENAD
    reordenar_animales( indices:any ){
      console.log(indices);
      this.animales = reorderArray( this.animales, indices);
    }
}
