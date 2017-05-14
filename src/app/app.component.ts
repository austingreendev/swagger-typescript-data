import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Observable } from 'rxjs/Rx';

import { PetApi, DefaultApi, Pet } from 'swagger-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Loading...';

  constructor(private api: DefaultApi, private petsApi: PetApi) {}

  ngOnInit() {
    this.api.getPets()
        .subscribe(pets => {
          const petNames = _.map(pets, pet => pet.firstName + ' ' + pet.lastName);
          this.title = petNames.join(', ');
        });

    this.petsApi.getPetById(1)
      .subscribe(pet => {
        console.log(pet);
      });
  }
}
