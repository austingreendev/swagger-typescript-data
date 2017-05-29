import { Component, OnInit } from '@angular/core';

import { PetApi, Pet, DetailedPet } from 'swagger-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PetApi]
})
export class AppComponent implements OnInit {
  pets: Pet[] = [];
  selectedPets: DetailedPet[] = [];

  constructor(private api: PetApi) {}

  ngOnInit() {
    this.api.getPets()
      .subscribe(pets => {
        this.pets = pets;
      });
  }

  loadDetail(selectedPet: Pet) {
    this.api.getPetById(selectedPet.id)
      .subscribe(pet => {
        this.selectedPets.push(pet);
      });
  }

  getAverageWeight(pets: DetailedPet[]) {
    if (pets.length === 0) {
      return 0;
    }

    const totalWeight = pets.reduce((total, pet) => total + pet.weight, 0);
    return totalWeight / pets.length;
  }

  removeSelection(index: number) {
    this.selectedPets.splice(index, 1);
  }
}
