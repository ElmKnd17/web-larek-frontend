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
            this._button.setAttribute('disabled', 'true');
        } else {
            this._button.removeAttribute('disabled');
        }
    }

    set basketList(basketList: HTMLElement[]) {
        this._basketList.replaceChildren(...basketList);
    }

    set total(total: number) {
        this._total.textContent = total.toString();
    }

    set button(button: HTMLButtonElement) {
        this._button = button;
    }

}