const express = require('express');
const app = express();

function getPet(id) {
    return {
        id,
        name: `Pet Name ${id}`,
        createdAt: (new Date()).toString(),
        type: 'Pet'
    };
}

app.get('/api/pet', (req, res) => {
    const limit = req.query.limit || 10;
    const pets = [];

    for (let x = 0; x < limit; x++) {
        pets.push(getPet(x + 1));
    }

    res.send(pets);
});

app.get('/api/pet/:petId', (req, res) => {
    const petId = req.params.petId;
    const pet = getPet(petId);
    pet.description = 'This is a really long description for a pet. ' +
        'This is a really long description for a pet. This is a ' +
        'really long description for a pet.';
    pet.age = petId;
    pet.weight = petId * 2.64;
    pet.type = 'DetailedPet';

    res.send(pet);
});

app.listen(3500, () => {
  console.log('Example server listening on port 3500...');
});
