export default class Card{
    constructor(petObject) {
        this.name = petObject.name;
        this.imgPath = petObject.img;
        this.type = petObject.type;
        this.breed = petObject.breed;
        this.description = petObject.description;
        this.age = petObject.age;
        this.inoculations = petObject.inoculations;
        this.diseases = petObject.diseases;
        this.parasites = petObject.parasites; 
    }

    BUTTON_TEXT = `Learn more`;

    CSS_CLASSES = {
        CARD: `card`,
        SECONDARY: `secondary`,
        LONG_BUTTON: `longButton`,
    }

    createComponent() {
        let card = this.createElementNode(`article`, this.CSS_CLASSES.CARD);

        let image = this.createElementNode(`img`);
        image.setAttribute(`src`, this.imgPath);
        image.setAttribute(`alt`, this.name);

        let name = this.createElementNode(`h4`);
        name.prepend(this.name);

        let button = this.createElementNode(`button`, this.CSS_CLASSES.SECONDARY, this.CSS_CLASSES.LONG_BUTTON);
        button.prepend(this.BUTTON_TEXT);

        card.prepend(image, name, button);

        return card
    }

    createElementNode(elem, ...classes) {
        let elementNode;

        if (typeof elem === `string`) {
            elementNode = document.createElement(elem)
        } else {
            elementNode = document.createElement(`div`)
        }
        
        elementNode.classList.add(...classes);

        return elementNode
    }
}