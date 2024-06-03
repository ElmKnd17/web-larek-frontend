import { IBasketCard, TBasketCard } from "../../types";
import {View} from './View';
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class BasketCard extends View<TBasketCard> implements IBasketCard {
    protected _id: string;
    protected _title: HTMLSpanElement;
    protected _price: HTMLSpanElement;
    protected _index: HTMLSpanElement;
    protected _deleteButton: HTMLButtonElement;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._title = ensureElement<HTMLSpanElement>(settings.card.title, this._element);
        this._price =  ensureElement<HTMLSpanElement>(settings.card.price, this._element);
        this._index =  ensureElement<HTMLSpanElement>(settings.basket.itemIndex, this._element);
        this._deleteButton = ensureElement<HTMLButtonElement>(settings.card.button, this._element);
        this._deleteButton.addEventListener('click', () => {
            this._events.emit(settings.event.basket.removeButtonClicked, {id: this._id});
        })
    }
    set id(id: string) {
        this._id = id;
    }
    set title(title: string) {
        // this._title.textContent = title;
        this.setTextContent(this._title, title);
    };
    set price(price: number) {
        // this._price.textContent = price.toString();
        this.setTextContent(this._price, price.toString());
    };
    set index(index: number) {
        // this._index.textContent = index.toString();
        this.setTextContent(this._index, index.toString());
    };
}