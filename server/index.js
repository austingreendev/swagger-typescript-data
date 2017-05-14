const express = require('express');
const app = express();

const ANIMAL_TYPE = {
    DOG: 'dog',
    CAT: 'cat'
};

const COLOR = {
    BROWN: 'brown',
    YELLOW: 'yellow'
};

function createPet(id, firstName, lastName, color, type) {
    return {
        id,
        firstName,
        lastName,
        color,
        type
    }
}

app.get('/api/pet', (req, res) => {
    const pets = [];

    for (let x = 0; x < 5; x++) {
        const isEven = x % 2 === 0;
        pets.push(createPet(x + 1, `First${x}`, `Last${x}`,
            isEven ? COLOR.BROWN : COLOR.YELLOW,
            isEven ? ANIMAL_TYPE.DOG : ANIMAL_TYPE.CAT));
    }

    res.send(pets)
});

app.get('/api/pet/:petId', (req, res) => {
    res.send({
        id: req.params.petId,
        name: 'Sullivan',
        color: COLOR.BROWN,
        type: ANIMAL_TYPE.DOG,
        description: 'This is a really long description for a pet. ' +
            'This is a really long description for a pet. This is a ' +
            'really long description for a pet.'
    });
});

app.listen(3500, () => {
  console.log('Example server listening on port 3500...')
});
