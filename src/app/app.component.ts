import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { PetService, Pet, DetailedPet } from 'swagger-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pets: Pet[];
  selectedPets: DetailedPet[];

  constructor(private api: PetService) {}

  ngOnInit() {
    this.selectedPets = [];

    this.api.getPets()
      .toPromise()
      .then(pets => {
        this.pets = pets;
      });
  }

  loadDetail(selectedPet: Pet) {
    this.api.getPetById(selectedPet.id)
      .toPromise()
      .then(pet => {
        this.selectedPets.push(pet);
      });
  }

  getAverageWeight(pets: DetailedPet[]) {
    if (pets.length === 0) {
      return 0;
    }

    const totalWeight = pets.reduce((current, pet) => current + pet.weight, 0);
    return totalWeight / pets.length;
  }

  removeSelection(index: number) {
    console.log(index);
    this.selectedPets.splice(index, 1);
  }
}
