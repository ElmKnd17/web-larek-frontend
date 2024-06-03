import { IOrderModal } from "../../types";
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

export abstract class OrderModal extends View<{}> implements IOrderModal {
    // protected _element: HTMLElement;
    // protected _events: IEvents;
    protected _submitButton: HTMLButtonElement;
    protected _errorMessage: HTMLSpanElement;
    constructor(element: HTMLElement, events: IEvents) {
        // this._element = element;
        // this._events = events;
        super(element, events);
        this._submitButton = ensureElement<HTMLButtonElement>(settings.order.submitButton, this._element);
        this._errorMessage = ensureElement<HTMLSpanElement>(settings.order.error, this._element);
    }
    // render(): HTMLElement {
    //     return this._element;
    // }
    // set element(element: HTMLElement) {
    //     this._element = element;
    // }
    // set events(events: IEvents) {
    //     this._events = events;
    // }
    set submitButton(submitButton: HTMLButtonElement) {
        this._submitButton = submitButton;
    }
    set errorMessage(errorMessage: HTMLSpanElement) {
        this._errorMessage = errorMessage;
    }
    abstract isValid(): boolean;
    abstract resetAll(): void;
    setValidity(): void {
        // this.isValid()
        //     ? this._submitButton.removeAttribute('disabled')
        //     : this._submitButton.setAttribute('disabled', 'true');
        this.isValid()
            ? this.removeDisabled(this._submitButton)
            : this.setDisabled(this._submitButton);
    }
    setError(): void {
        // this.isValid()
        //     ? this._errorMessage.textContent = ''
        //     : this._errorMessage.textContent = 'Заполните все поля';
        this.setTextContent(this._errorMessage, this.isValid() ? '' : 'Заполните все поля');
    }
}