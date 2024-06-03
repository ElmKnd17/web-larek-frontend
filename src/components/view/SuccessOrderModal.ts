import { ISuccessOrderModal, TSuccessOrderModal } from "../../types";
import { View } from './View';
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
export class SuccessOrderModal extends View<TSuccessOrderModal> implements ISuccessOrderModal {
    protected _description: HTMLParagraphElement;
    protected _successButton: HTMLButtonElement;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._description = ensureElement<HTMLParagraphElement>(settings.order.successDescription, this._element);
        this._successButton = ensureElement<HTMLButtonElement>(settings.order.successButton, this._element);
        this._successButton.addEventListener('click', () => {
            this._events.emit(settings.event.order.success.button.clicked)
        })
    }
    set total(total: number) {
        this.setTextContent(this._description, `Списано ${total} синапсов`);
    }
    set successButton(successButton: HTMLButtonElement) {
        this._successButton = successButton;
    }
}