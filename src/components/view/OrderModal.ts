import { IOrderModal } from "../../types";
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";
export abstract class OrderModal extends View<{}> implements IOrderModal {
    protected _submitButton: HTMLButtonElement;
    protected _errorMessage: HTMLSpanElement;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._submitButton = ensureElement<HTMLButtonElement>(settings.order.submitButton, this._element);
        this._errorMessage = ensureElement<HTMLSpanElement>(settings.order.error, this._element);
    }
    abstract isValid(): boolean;
    abstract resetAll(): void;
    setValidity(): void {
        this.isValid()
            ? this.removeDisabled(this._submitButton)
            : this.setDisabled(this._submitButton);
    }
    setError(): void {
        this.setTextContent(this._errorMessage, this.isValid() ? '' : 'Заполните все поля');
    }
    set submitButton(submitButton: HTMLButtonElement) {
        this._submitButton = submitButton;
    }
    set errorMessage(errorMessage: HTMLSpanElement) {
        this._errorMessage = errorMessage;
    }
}