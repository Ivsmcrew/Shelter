export default class Modal {
    constructor({name, 
                 img, 
                 type, 
                 breed, 
                 description,
                 age,
                 inoculations,
                 diseases,
                 parasites}) {
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;

        this.backLayer = this.createBackLayerNode();
    }

    createModalNodes() {
        this.modalWrapperNode = this.createElementNode(`div`, `modal-wrapper`);

        this.modalContainerNode = this.createElementNode(`div`, `modal-container`);
        
        this.closeButtonNode = this.createElementNode(`button`, `circleButton`);

        this.closeIconNode = document.createElement(`img`);
        this.closeIconNode.setAttribute(`src`, `../../assets/icons/close.svg`);
        this.closeIconNode.setAttribute(`alt`, `close button`);

        this.modalWindowNode = this.createElementNode(`div`, `modalWindow`);

        this.modalImageNode = this.createElementNode(`img`, `modalImage`);
        this.modalImageNode.setAttribute(`src`, this.img);
        this.modalImageNode.setAttribute(`alt`, `image of a dog`);

        this.contentNode = this.createElementNode(`div`, `content`);

        this.nameNode = this.createElementNode(`h3`, `name`);
        this.nameNode.prepend(this.name);
        
        this.typeAndBreedNode = this.createElementNode(`h4`, `typeAndBreed`);
        this.typeAndBreedNode.prepend(`${this.type} - ${this.breed}`);
        
        this.descriptionNode = this.createElementNode(`p`, `description`);
        this.descriptionNode.prepend(this.description);
        
        this.parametersNode = this.createElementNode(`ul`, `parameters`);

        this.ageNode = this.createElementNode(`li`, `age`);
        this.ageNode.prepend(`Age: ${this.age}`);

        this.inoculationsNode = this.createElementNode(`li`, `inoculations`);
        this.inoculationsNode.prepend(`Inoculations: ${this.inoculations}`);

        this.diseasesNode = this.createElementNode(`li`, `diseases`);
        this.diseasesNode.prepend(`Diseases: ${this.diseases}`);

        this.parasitesNode = this.createElementNode(`li`, `parasites`);
        this.parasitesNode.prepend(`Parasites: ${this.parasites}`);
    }

    assembleModalNodes() {
        document.body.prepend(this.modalWrapperNode);
        this.modalWrapperNode.prepend(this.modalContainerNode);
        this.modalContainerNode.prepend(this.closeButtonNode, this.modalWindowNode);
        this.closeButtonNode.prepend(this.closeIconNode);
        this.modalWindowNode.prepend(this.modalImageNode, this.contentNode);
        this.contentNode.prepend(this.nameNode, this.typeAndBreedNode, this.descriptionNode, this.parametersNode);
        this.parametersNode.prepend(this.ageNode, this.inoculationsNode, this.diseasesNode, this.parasitesNode);
    }

    createBackLayerNode() {
        let backLayer = this.createElementNode(`div`, `backLayer`);
        
        return backLayer
    }

    createElementNode(elem, ...classes) {
        let elementNode = null;

        if (typeof elem === `string`) {
            elementNode = document.createElement(elem)
        } else {
            elementNode = document.createElement(`div`)
        }
        
        elementNode.classList.add(...classes);

        return elementNode
    }
}