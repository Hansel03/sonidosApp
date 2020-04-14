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

  constructor() {
    this.animales = Object.assign([], ANIMALES);
  }

  public reproducir(animal: AnimalInterface) {
    console.log(animal);
    const audio = new Audio();
    audio.src = animal.audio;
    audio.load();
    audio.play();

    animal.reproduciendo = true;

    setTimeout(() => {
      animal.reproduciendo = false;
    }, animal.duracion * 1000);
  }
}
