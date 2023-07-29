import Card from "./Card.js";

export default class Pagination {
    constructor() {
        this.showCase;
        this.scroller;
        this.doubleLeftButton;
        this.leftButton;
        this.doubleRightButton;
        this.rightButton;
        this.paginationButton;
    }

    #petsDataObj;

    CSS_CLASSES = {
        CARDS_CONTAINER: `cards-container`,
        NAVIGATION: `navigation`,
        DOUBLE_LEFT: `double-left`,
        SINGLE_LEFT: `single-left`,
        PAGINATION: `pagination`,
        SINGLE_RIGHT: `single-right`,
        DOUBLE_RIGHT: `double-right`,
        CIRCLE_BUTTON: `circleButton`,
    }

    PET_CARDS = [];
    DOUBLE_LEFT = `<<`;
    SINGLE_LEFT = `<`;
    DOUBLE_RIGHT = `>>`;
    SINGLE_RIGHT = `>`;
    START_PAGE = 1;
    LAST_PAGE = 5;
    SHOWCASE_CARDS_QUANTITY = 8;

    currentPage = 1;
    currentPageCards = [];

    //main methods
    createComponent() {
        let showcase = this.createShowcase();
        let scroller = this.createScroller();

        this.doubleLeftButton.addEventListener(`click`, () => {
            this.currentPage = this.START_PAGE;
            this.startPageButton.innerHTML = `${this.currentPage}`;
            this.redrawCards();
            this.setScrollStatus();
        })

        this.singleLeftButton.addEventListener(`click`, () => {
            this.currentPage--;
            this.startPageButton.innerHTML = `${this.currentPage}`;
            this.redrawCards();
            this.setScrollStatus();
        })

        this.singleRightButton.addEventListener(`click`, () => {
            this.currentPage++;
            this.startPageButton.innerHTML = `${this.currentPage}`;
            this.redrawCards();
            this.setScrollStatus();
        })

        this.doubleRightButton.addEventListener(`click`, () => {
            this.currentPage = this.LAST_PAGE;
            this.startPageButton.innerHTML = `${this.currentPage}`;
            this.redrawCards();
            this.setScrollStatus();
        })


        return [showcase, scroller]
    }

    createShowcase() {
        this.PET_CARDS = this.createPetCards();

        this.showCase = this.createElementNode(`div`, this.CSS_CLASSES.CARDS_CONTAINER);

        for (let i = 0; i < this.SHOWCASE_CARDS_QUANTITY; i++) {
            let card = this.getUniqueRandomCard();

            this.currentPageCards.push( card );
            this.showCase.append( card );
        }

        return this.showCase
    }

    createScroller() {
        this.scroller = this.createElementNode(`div`, this.CSS_CLASSES.NAVIGATION);

        this.doubleLeftButton = this.createElementNode(`button`, this.CSS_CLASSES.DOUBLE_LEFT, this.CSS_CLASSES.CIRCLE_BUTTON);
        this.doubleLeftButton.setAttribute(`disabled`, `true`);
        this.doubleLeftButton.append( this.DOUBLE_LEFT )

        this.singleLeftButton = this.createElementNode(`button`, this.CSS_CLASSES.SINGLE_LEFT, this.CSS_CLASSES.CIRCLE_BUTTON);
        this.singleLeftButton.setAttribute(`disabled`, `true`);
        this.singleLeftButton.append( this.SINGLE_LEFT );

        this.startPageButton = this.createElementNode(`button`, this.CSS_CLASSES.PAGINATION, this.CSS_CLASSES.CIRCLE_BUTTON);
        this.startPageButton.append( this.currentPage);

        this.singleRightButton = this.createElementNode(`button`, this.CSS_CLASSES.SINGLE_RIGHT, this.CSS_CLASSES.CIRCLE_BUTTON);
        this.singleRightButton.append( this.SINGLE_RIGHT);

        this.doubleRightButton = this.createElementNode(`button`, this.CSS_CLASSES.DOUBLE_RIGHT, this.CSS_CLASSES.CIRCLE_BUTTON);
        this.doubleRightButton.append( this.DOUBLE_RIGHT);

        this.scroller.append( this.doubleLeftButton, this.singleLeftButton, this.startPageButton, this.singleRightButton, this.doubleRightButton );

        return this.scroller
    }

    getUniqueRandomCard() {
        let randomNumber = null;

        while (randomNumber === null) {
            randomNumber = Math.floor( Math.random() * this.PET_CARDS.length ) ;

            if ( this.currentPageCards.includes( this.PET_CARDS[randomNumber] ) ) {
                randomNumber = null
            }
        }

        return this.PET_CARDS[randomNumber]
    }

    redrawCards() {
        this.currentPageCards = [];
        this.showCase.innerHTML = ``;

        for (let i = 0; i < this.SHOWCASE_CARDS_QUANTITY; i++) {
            let card = this.getUniqueRandomCard();

            this.currentPageCards.push( card );
            this.showCase.append( card );
        }
    }

    setScrollStatus() {
        if ( this.currentPage == this.START_PAGE ) {
            this.doubleLeftButton.setAttribute(`disabled`, `true`);
            this.singleLeftButton.setAttribute(`disabled`, `true`);
            this.singleRightButton.removeAttribute(`disabled`);
            this.doubleRightButton.removeAttribute(`disabled`);
        } else if ( this.currentPage == this.LAST_PAGE ) {
            this.doubleRightButton.setAttribute(`disabled`, `true`);
            this.singleRightButton.setAttribute(`disabled`, `true`);
            this.singleLeftButton.removeAttribute(`disabled`);
            this.doubleLeftButton.removeAttribute(`disabled`);
        } else {
            this.doubleLeftButton.removeAttribute(`disabled`);
            this.singleLeftButton.removeAttribute(`disabled`);
            this.singleRightButton.removeAttribute(`disabled`);
            this.doubleRightButton.removeAttribute(`disabled`);
        }
    }

    //auxiliary methods
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