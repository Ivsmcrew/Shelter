let response = await fetch("../../assets/data/pets.json");
let json = await response.json();

export default class Data {
    constructor() {
        this.allPets = [];
    }

    pullData() {
        this.allPets = json;
    }

    getPet(name) {
        let petObject = null;

        this.allPets.forEach( (item) => {
            if (item.name == name) {
                petObject = item
            }
        } )

        return petObject
    }
}