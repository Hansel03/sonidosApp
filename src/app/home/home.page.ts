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
}
