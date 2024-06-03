import { ICardModal, TCardModal } from "../../types";
import {View} from './View';
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class CardModal extends View<TCardModal> implements ICardModal {
    protected _id: string;
    protected _button: HTMLButtonElement;
    protected _description: HTMLParagraphElement;
    protected _image: HTMLImageElement;
    protected _title: HTMLHeadElement;
    protected _category: HTMLSpanElement;
    protected _price: HTMLSpanElement;
    protected _boundAddToBasketButtonHandler: () => void;
    protected _boundRemoveFromBasketButtonHandler: () => void;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._image = ensureElement<HTMLImageElement>(settings.card.image, this._element);
        this._title = ensureElement<HTMLHeadElement>(settings.card.title, this._element);
        this._category = ensureElement<HTMLSpanElement>(settings.card.category, this._element);
        this._price = ensureElement<HTMLSpanElement>(settings.card.price, this._element);
        this._description = ensureElement<HTMLParagraphElement>(settings.card.text, this._element);
        this._button = ensureElement<HTMLButtonElement>(settings.card.button, this._element);
        this._boundAddToBasketButtonHandler = this.addToBasketButtonHandler.bind(this);
        this._boundRemoveFromBasketButtonHandler = this.removeFromBasketButtonHandler.bind(this);
    }
    set isInBasket(isInBasket: boolean) {
        if(isInBasket) {
            // this._button.textContent = 'Убрать из корзины';
            this.setTextContent(this._button, 'Убрать из корзины')
            this._button.removeEventListener('click', this._boundAddToBasketButtonHandler);
            this._button.addEventListener('click', this._boundRemoveFromBasketButtonHandler);
        } else {
            // this._price.textContent === 'Бесценно'
            //     ? this._button.textContent = 'Недоступно'
            //     : this._button.textContent = 'В корзину';
            this.setTextContent(this._button, this._price.textContent === 'Бесценно' ? 'Недоступно' : 'В корзину');
            this._button.addEventListener('click', this._boundAddToBasketButtonHandler);
            this._button.removeEventListener('click', this._boundRemoveFromBasketButtonHandler);
        }
    }
    set id(id: string) {
        this._id = id;
    }
    set image(link: string) {
        // this._image.src = value;
        this.setImage(this._image, link);
    }
    set title(title: string) {
        // this._title.textContent = title;
        this.setTextContent(this._title, title);
    }
    set category(category: string) {
        // this._category.textContent = category;
        this.setTextContent(this._category, category);
        Object.values(settings.card.categoryClasses).forEach(value => {
            // this._category.classList.remove(value);
            this.removeClass(this._category, value);
        })
        if (category in settings.card.categoryClasses) {
            // this._category.classList.add(
            //     settings.card.categoryClasses[category as keyof typeof settings.card.categoryClasses]
            // );
            this.addClass(
                this._category,
                settings.card.categoryClasses[category as keyof typeof settings.card.categoryClasses]
            )
        }
    }
    set price(price: number) {
        if(!price) {
            // this._price.textContent = 'Бесценно';
            // this._button.setAttribute('disabled', 'true');
            this.setTextContent(this._price, 'Бесценно');
            this.setDisabled(this._button);
        } else {
            // this._price.textContent = `${value} синапсов`;
            // this._button.removeAttribute('disabled');
            this.setTextContent(this._price, `${price} синапсов`);
            this.removeDisabled(this._button);
        }
    }
    set description(description: string) {
        // this._description.textContent = value;
        this.setTextContent(this._description, description);
    }
    private addToBasketButtonHandler() {
        this._events.emit(settings.event.addToBasketButton.added, {id: this._id});
    }
    private removeFromBasketButtonHandler() {
        this._events.emit(settings.event.addToBasketButton.removed, {id: this._id});
    }
}