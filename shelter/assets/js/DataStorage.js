let response = await fetch("../../assets/data/pets.json");
let json = await response.json();

export default class DataStorage {
    #allPets;

    constructor() {
        this.#allPets = json;
    }

    getPet(name) {
        let petObject = null;

        this.#allPets.forEach( (item) => {
            if (item.name == name) {
                petObject = item
            }
        } )

        return petObject
    }

    getAllPets() {
        return this.#allPets
    }
}