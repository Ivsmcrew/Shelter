import Card from "./Card.js";

export default class Slider{
    constructor() {
        this.sliderContainer;
        this.sliderWrapper;
        this.blocksContainer;
        this.sliderBlocks = [];
        this.leftButton;
        this.rightButton;
        this.leftArrow;
        this.rightArrow;
    }

    #petsDataObj;
    #moveDirection;

    ARROW_IMG_PATH = `../../assets/icons/arrow.svg`;
    SLIDER_BLOCKS_QUANTITY = 3;
    BLOCK_CARDS_QUANTITY = this.setCardsQuantity();
    PET_CARDS = [];
    MEMORY_VISIBLE_CARDS = [];
    MEMORY_HIDING_CARDS = [];
    VISIBLE_ORDER_INDEX = 2; 

    CSS_CLASSES = {
        SLIDER_CONTAINER: `sliderContainer`,
        SLIDER_WRAPPER: `sliderWrapper`,
        CIRCLE_BUTTON: `circleButton`,
        ROTATED: `rotated`,
        SLIDER_BLOCK: `sliderBlock`,
        BLOCKS_CONTAINER: `blocksContainer`,
        SWIPE_LEFT: `swipeLeft`,
        SWIPE_RIGHT: `swipeRight`,
    }

    createComponent() {
        this.PET_CARDS = this.createPetCards();

        this.initializeSliderNodes();

        this.assembleSliderNodes();

        this.leftButton.addEventListener(`click`, () => {
            this.swipeLeft()
        })

        this.rightButton.addEventListener(`click`, () => {
            this.swipeRight()
        })

        this.blocksContainer.addEventListener(`animationend`, () => {
            this.changePropertyOrder();
           
            this.toggleButtonDisable();
        })

        return this.sliderContainer
    }

    initializeSliderNodes() {
        this.sliderContainer = this.createElementNode(`section`, this.CSS_CLASSES.SLIDER_CONTAINER);

        this.sliderWrapper = this.createElementNode(`div`, this.CSS_CLASSES.SLIDER_WRAPPER);

        this.leftButton = this.createElementNode(`button`, this.CSS_CLASSES.CIRCLE_BUTTON);
        
        this.rightButton = this.createElementNode(`button`, this.CSS_CLASSES.CIRCLE_BUTTON, this.CSS_CLASSES.ROTATED);

        this.leftArrow = this.createElementNode(`img`);
        this.leftArrow.setAttribute(`src`, this.ARROW_IMG_PATH);
        this.leftArrow.setAttribute(`alt`, `arrow-left`);

        this.rightArrow = this.createElementNode(`img`);
        this.rightArrow.setAttribute(`src`, this.ARROW_IMG_PATH);
        this.rightArrow.setAttribute(`alt`, `arrow-right`);

        this.blocksContainer = this.createElementNode(`div`, this.CSS_CLASSES.BLOCKS_CONTAINER);

        for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
            let sliderBlock = this.createElementNode(`div`, this.CSS_CLASSES.SLIDER_BLOCK);
            sliderBlock.style.order = i + 1;
            this.sliderBlocks.push( sliderBlock );
        }

        for (let j = 0; j < this.BLOCK_CARDS_QUANTITY; j++) {
            let card = this.getUniqueRandomCard();

            this.MEMORY_VISIBLE_CARDS.push( card );
            this.sliderBlocks[1].append( card );
        }
    }

    assembleSliderNodes() {
        this.sliderContainer.append( this.leftButton, this.sliderWrapper, this.rightButton );
        this.sliderWrapper.append( this.blocksContainer );
        this.blocksContainer.append( ...this.sliderBlocks );
        this.leftButton.append( this.leftArrow );
        this.rightButton.append( this.rightArrow );
    }

    swipeLeft() {
        if (this.#moveDirection == `right`) {
            let temporaryVault = this.MEMORY_VISIBLE_CARDS;
            this.MEMORY_VISIBLE_CARDS = this.MEMORY_HIDING_CARDS.slice(0);
            this.MEMORY_HIDING_CARDS = temporaryVault.slice(0);
        } else {
            //clear reduntant cards
            for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                if (this.sliderBlocks[i].style.order == 3) {
                    this.sliderBlocks[i].innerHTML = ``;
                }
            }

            //generation of the content in block with order = 3
            this.MEMORY_HIDING_CARDS = this.MEMORY_VISIBLE_CARDS.slice(0);
            this.MEMORY_VISIBLE_CARDS = [];

            for (let j = 0; j < this.BLOCK_CARDS_QUANTITY; j++) {
                let card = this.getUniqueRandomCard();

                this.MEMORY_VISIBLE_CARDS.push( card );
                for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                    if (this.sliderBlocks[i].style.order == 3) {
                        this.sliderBlocks[i].append( card )
                    }
                }
            } 
        }

        this.#moveDirection = `left`;

        

        //add class with smooth animation
        this.blocksContainer.classList.add( this.CSS_CLASSES.SWIPE_LEFT );

        this.toggleButtonDisable();
    }

    swipeRight() {
        if (this.#moveDirection == `left`) {
            let temporaryVault = this.MEMORY_VISIBLE_CARDS;
            this.MEMORY_VISIBLE_CARDS = this.MEMORY_HIDING_CARDS.slice(0);
            this.MEMORY_HIDING_CARDS = temporaryVault.slice(0);
        } else {
            //clear reduntant cards
            for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                if (this.sliderBlocks[i].style.order == 1) {
                    this.sliderBlocks[i].innerHTML = ``;
                }
            }

            //generation of the content in block with order = 1
            this.MEMORY_HIDING_CARDS = this.MEMORY_VISIBLE_CARDS.slice(0);
            this.MEMORY_VISIBLE_CARDS = [];

            for (let j = 0; j < this.BLOCK_CARDS_QUANTITY; j++) {
                let card = this.getUniqueRandomCard();

                this.MEMORY_VISIBLE_CARDS.push( card );
                for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                    if (this.sliderBlocks[i].style.order == 1) {
                        this.sliderBlocks[i].append( card )
                    }
                }
            } 
        }

        this.#moveDirection = `right`;

 

        //add class with smooth animation
        this.blocksContainer.classList.add( this.CSS_CLASSES.SWIPE_RIGHT );

        this.toggleButtonDisable()
    }

    changePropertyOrder() {
        if (this.#moveDirection == `left`) {
            for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                let order = this.sliderBlocks[i].style.order;
                
                this.sliderBlocks[i].style.order = order - 1;
            }
    
            for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                if (this.sliderBlocks[i].style.order == 0) {
                    this.sliderBlocks[i].style.order = this.SLIDER_BLOCKS_QUANTITY;
                }
            }

            this.blocksContainer.classList.remove( this.CSS_CLASSES.SWIPE_LEFT );
        }

        if (this.#moveDirection == `right`) {
            for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                let order = this.sliderBlocks[i].style.order;
                
                this.sliderBlocks[i].style.order = +order + 1;
            }
    
            for (let i = 0; i < this.SLIDER_BLOCKS_QUANTITY; i++) {
                if (this.sliderBlocks[i].style.order == 4) {
                    this.sliderBlocks[i].style.order = 1;
                }
            }

            this.blocksContainer.classList.remove( this.CSS_CLASSES.SWIPE_RIGHT );
        }
    }

    toggleButtonDisable() {
        if ( this.leftButton.hasAttribute(`disabled`) ) {
            this.leftButton.removeAttribute(`disabled`)
        } else {
            this.leftButton.setAttribute(`disabled`, `true`)
        }

        if ( this.rightButton.hasAttribute(`disabled`) ) {
            this.rightButton.removeAttribute(`disabled`)
        } else {
            this.rightButton.setAttribute(`disabled`, `true`)
        }
    }

    getUniqueRandomCard() {
        let randomNumber = null;

        while (!randomNumber) {
            randomNumber = Math.floor( Math.random() * (this.PET_CARDS.length - 1) );

            if ( this.MEMORY_HIDING_CARDS.includes(this.PET_CARDS[randomNumber]) || this.MEMORY_VISIBLE_CARDS.includes(this.PET_CARDS[randomNumber]) ) {
                randomNumber = null
            }
        }

        return this.PET_CARDS[randomNumber]
    }


    //auxiliary methods
    setCardsQuantity() {
        let html = document.documentElement;
        let width = html.clientWidth;
        let cardsQuantity;

        if (width > 1280) {
            cardsQuantity = 3
        } else if (width > 768) {
            cardsQuantity = 2
        } else {
            cardsQuantity = 1
        }

        return cardsQuantity
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

    createPetCards() {
        let pets = [];

        let petObjs = this.#petsDataObj.getAllPets();
        
        pets = petObjs.map( (item) => {
            let card = new Card(item);
            return card.createComponent();
        } )

        return pets
    }

    getPetsData( petsDataObj ) {
        this.#petsDataObj = petsDataObj;
    }
}