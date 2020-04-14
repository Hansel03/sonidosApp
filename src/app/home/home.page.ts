import { Component } from '@angular/core';
import { ANIMALES } from '../data/data.animales';
import { AnimalInterface } from '../interfaces/animal.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: AnimalInterface[];
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    this.animales = Object.assign([], ANIMALES);
  }

  public reproducir(animal: AnimalInterface) {
    console.log(animal);

    this.pausarAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(() => {
      animal.reproduciendo = false;
    }, animal.duracion * 1000);
  }

  private pausarAudio(animalSel: AnimalInterface) {
    clearTimeout(this.audioTiempo);

    this.audio.pause();
    this.audio.currentTime = 0;

    for (const animal of this.animales) {
      if (animal.nombre !== animalSel.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  public borrarAnimal(index: number) {
    this.animales.splice(index, 1);
  }

  public doRefresh(event: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.animales = Object.assign([], ANIMALES);
      event.target.complete();
    }, 1500);
  }
}
