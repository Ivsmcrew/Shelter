import Data from "../../assets/js/Data.js";

export default class Modal {
    constructor() {
        this.name = ``;
        this.img = ``;
        this.type = ``;
        this.breed = ``;
        this.description = ``;
        this.age = ``;
        this.inoculations = ``;
        this.diseases = ``;
        this.parasites = ``;

        this.isOpen = false;
    }

    //main methods
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

    modalHandler() {
        document.addEventListener(`click`, (event) => {
                let card;
                let button;
                let modalWrapper;

                if (!this.isOpen) {
                    card = event.target.closest(`.card`);
                    if (card) {
                        this.openModal(card);

                        if (document.documentElement.clientWidth > 750) {
                            document.body.style.paddingRight = `17px`;
                        }
                        document.body.style.overflow = `hidden`;
                    }  

                    
                } else {
                    button = event.target.closest(`.modal-container > .circleButton`)
                    if (button) {
                        this.closeModal();
                        document.body.style.overflow = `auto`;
                        document.body.style.paddingRight = `0px`;
                    }

                    modalWrapper = document.querySelector(`.modal-wrapper`)
                    if (event.target == modalWrapper) {
                        this.closeModal();
                        
                        if (document.documentElement.clientWidth > 750) {
                            document.body.style.paddingRight = `0px`;
                        }
                        document.body.style.overflow = `auto`;
                    }
                }
                
        })
    }

    openModal(card) {
        let name = card.firstElementChild.nextElementSibling.innerHTML;
        let petObj = this.getPetObjFromJSON(name);
        this.assignModalData(petObj);

        this.createModalNodes();
        this.assembleModalNodes();

        this.isOpen = !this.isOpen;
    }

    closeModal() {
        document.querySelector(`.modal-wrapper`).remove();
        this.isOpen = !this.isOpen;
    }

    assignModalData(pet) {
        this.name = pet.name;
        this.img = pet.img;
        this.type = pet.type;
        this.breed = pet.breed;
        this.description = pet.description;
        this.age = pet.age;
        this.inoculations = pet.inoculations;
        this.diseases = pet.diseases;
        this.parasites = pet.parasites;

        this.backLayer = this.createBackLayerNode();
    }

    getPetObjFromJSON(name) {
        let pet = null;
        let data = new Data();
        data.pullData();

        pet = data.getPet(name)
        return pet
    }

    //auxiliary methods
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