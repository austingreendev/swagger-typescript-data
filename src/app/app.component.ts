import { Component, OnInit } from '@angular/core';

// import { PetService, Pet, DetailedPet } from 'swagger-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PetService]
})
export class AppComponent implements OnInit {
  pets: Pet[] = [];
  selectedPets: DetailedPet[] = [];

  constructor() {}
  // constructor(private api: PetService) {}

  /**
   * On render, we want to display 15 generic pets.
   */
  ngOnInit() {
    // this.api.getPets(15)
    //   .subscribe(pets => {
    //     this.pets = pets;
    //   });
  }

  /**
   * Retrieve details for the selected pet.
   * @param selectedPet The generic pet to retrieve details for
   */
  loadDetail(selectedPet: Pet) {
    // this.api.getPetById(selectedPet.id)
    //   .subscribe(pet => {
    //     this.selectedPets.push(pet);
    //   });
  }

  /**
   * Calaculates the average weight of a collection of detailed pets.
   * @param pets Detailed pets to calaculate average weight
   */
  getAverageWeight(pets: DetailedPet[]) {
    if (pets.length === 0) {
      return 0;
    }

    const totalWeight = pets.reduce((total, pet) => total + pet.weight, 0);
    return totalWeight / pets.length;
  }

  /**
   * Removes a detailed pets selection.
   * @param index The index to remove.
   */
  removeSelection(index: number) {
    this.selectedPets.splice(index, 1);
  }
}
