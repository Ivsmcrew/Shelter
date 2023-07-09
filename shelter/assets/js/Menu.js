export default class Menu {
    constructor() {
        this.burger = document.querySelector(`.burger`);
        this.menu = document.querySelector(`header > nav`);
        this.isMenuOpened = false;
        this.menuBackLayer = this.createBackLayerNode();
    }

    menuDeviceChangeHandler() {
        if (document.documentElement.clientWidth < 751) {
            this.menu.className = `menu-mobile`
        }
        window.addEventListener(`resize`, () => {
            if (document.documentElement.clientWidth < 751) {
                this.menu.className = `menu-mobile`
            } else {
                this.menu.className = `menu-desktop`
            }
        })
    }

    menuHandler() {
        document.addEventListener(`click`, (event) => {
            if (event.target == this.burger) {
                this.menuOpenToggler();
            } else {
                if (this.burger.classList.contains(`burger_opened`) && event.target != this.menu) {
                    this.burger.classList.toggle(`burger_opened`);
                    this.menu.classList.toggle(`menu-mobile_opened`);
                    document.body.style.overflow = `auto`;
                    this.backLayerOfElementToggler(this.menu, this.menuBackLayer);
                }
            } 
        })
    }
    
    menuOpenToggler() {
        this.burger.classList.toggle(`burger_opened`);
    
        if (this.burger.classList.contains(`burger_opened`)) {
            document.body.style.overflow = `hidden`;
        } else {
            document.body.style.overflow = `auto`;
        }
    
        this.menu.classList.toggle(`menu-mobile_opened`);

        this.backLayerOfElementToggler(this.menu, this.menuBackLayer);
    }

    backLayerOfElementToggler(elem, backLayer) {
       if (elem.previousElementSibling.classList.contains(`backLayer`)) {
            backLayer.remove()
       } else {
            elem.before(backLayer)
       }
    }

    createBackLayerNode() {
        let backLayer = document.createElement(`div`);
        backLayer.classList.add(`backLayer`);

        return backLayer
    }


}