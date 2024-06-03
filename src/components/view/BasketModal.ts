import { TBasketModal } from "../../types";
import { View } from './View';
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
export class BasketModal extends View<TBasketModal> implements TBasketModal {
    protected _basketList: HTMLDivElement;
    protected _total: HTMLSpanElement;
    protected _button: HTMLButtonElement;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._basketList = ensureElement<HTMLDivElement>(settings.basket.list, this._element);
        this._total = ensureElement<HTMLSpanElement>(settings.basket.price, this._element);
        this._button = ensureElement<HTMLButtonElement>(settings.basket.button, this._element);
        this._button.addEventListener('click', () => {
            this._events.emit(settings.event.basket.submitButtonClicked);
        })
    }
    set isEmpty(isEmpty: boolean) {
        if(isEmpty) {
            this.setDisabled(this._button);
        } else {
            this.removeDisabled(this._button);
        }
    }
    set basketList(basketList: HTMLElement[]) {
        this._basketList.replaceChildren(...basketList);
    }
    set total(total: number) {
        this.setTextContent(this._total, total.toString() + ' синапсов');
    }
    set button(button: HTMLButtonElement) {
        this._button = button;
    }
}