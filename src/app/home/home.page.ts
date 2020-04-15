import { Component } from '@angular/core';
import { ANIMALES } from '../data/data.animales';
import { AnimalInterface } from '../interfaces/animal.interface';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: AnimalInterface[];
  audio = new Audio();
  audioTiempo: any;
  ordenando: boolean;

  constructor() {
    this.animales = Object.assign([], ANIMALES);
    this.ordenando = true;
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

  public reordenarAnimales(ev: any): void {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    // ev.detail.complete();
    this.animales = ev.detail.complete(this.animales);
  }
}
