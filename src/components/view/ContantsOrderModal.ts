import { IContantsOrderModal } from "../../types";
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { OrderModal } from "./orderModal";
export class ContantsOrderModal extends OrderModal implements IContantsOrderModal {
    protected _emailInput: HTMLInputElement;
    protected _phoneNumberInput: HTMLInputElement;
    protected _email: string;
    protected _phoneNumber: string;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._emailInput = ensureElement<HTMLInputElement>(settings.order.emailInput, this._element);
        this._phoneNumberInput = ensureElement<HTMLInputElement>(settings.order.phoneNumberInput, this._element);
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._events.emit(settings.event.order.contacts.button.clicked, {
                email: this._email,
                phone: this._phoneNumber
            })
            this.setDisabled(evt.target as HTMLButtonElement);
        });
        this._emailInput.addEventListener('input', (evt) => {
            this.setValidity();
            this.setError();
            this._email = (evt.target as HTMLInputElement).value;
        });
        this._phoneNumberInput.addEventListener('input', (evt) => {
            this.setValidity();
            this.setError();
            this._phoneNumber = (evt.target as HTMLInputElement).value;
        });
        this._events.on(settings.event.modal.closed, this.resetAll.bind(this));
        this._events.on(settings.event.modal.opened, this.setValidity.bind(this));
    }
    resetAll(): void {
        this.setInputValue(this._emailInput, '');
        this.setInputValue(this._phoneNumberInput, '');
    }
    isValid(): boolean {
        return ((this._emailInput.value.length !== 0) &&
        (this._phoneNumberInput.value.length !== 0))
    }
    set emailInput(emailInput: HTMLInputElement) {
        this._emailInput = emailInput;
    }
    set phoneNumberInput(phoneNumberInput: HTMLInputElement) {
        this._phoneNumberInput = phoneNumberInput;
    }
    set email(email: string) {
        this._email = email
    }
    set phoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }
}