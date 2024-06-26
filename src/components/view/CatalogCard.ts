import { ICatalogCard, TCatalogCard } from "../../types";
import { View } from './View';
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
export class CatalogCard extends View<TCatalogCard> implements ICatalogCard {
    protected _id: string;
    protected _image: HTMLImageElement;
    protected _title: HTMLHeadElement;
    protected _category: HTMLSpanElement;
    protected _price: HTMLSpanElement;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._image = ensureElement<HTMLImageElement>(settings.card.image, this._element);
        this._title = ensureElement<HTMLHeadElement>(settings.card.title, this._element);
        this._category = ensureElement<HTMLSpanElement>(settings.card.category, this._element);
        this._price = ensureElement<HTMLSpanElement>(settings.card.price, this._element);
        this._element.addEventListener('click', () => {
            this._events.emit(settings.event.card.clicked, ({id: this._id}))
        })
    }
    set id(id: string) {
        this._id = id;
    }
    set image(link: string) {
        this.setImage(this._image, link);
    }
    set title(title: string) {
        this.setTextContent(this._title, title);
    }
    set category(category: string) {
        this.setTextContent(this._category, category);
        if (category in settings.card.categoryClasses) {
            this.addClass(
                this._category,
                settings.card.categoryClasses[category as keyof typeof settings.card.categoryClasses]
            )
        }
    }
    set price(price: number) {
        this.setTextContent(this._price, price ? `${price} синапсов` : 'Бесценно');
    }
}