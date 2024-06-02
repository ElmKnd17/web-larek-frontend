import { IAddressOrderModal } from "../../types";
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { OrderModal } from "./orderModal";

export class AddressOrderModal extends OrderModal implements IAddressOrderModal {
    protected _cardMethodButton: HTMLButtonElement;
    protected _cashMethodButton: HTMLButtonElement;
    protected _addresInput: HTMLInputElement;
    protected _addres: string;
    protected _payment: string;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._cardMethodButton = ensureElement<HTMLButtonElement>(settings.order.cardMethodButton, this._element);
        this._cashMethodButton = ensureElement<HTMLButtonElement>(settings.order.cashMethodButton, this._element);
        this._addresInput = ensureElement<HTMLInputElement>(settings.order.addresInput, this._element);
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._events.emit(settings.event.order.paymentMethodAndAddresOrder.button.clicked, {
                payment: this._payment,
                address: this._addresInput.value
            });
        });
        this._cardMethodButton.addEventListener('click', this.setSelection.bind(this));
        this._cashMethodButton.addEventListener('click', this.setSelection.bind(this));
        this._addresInput.addEventListener('input', (evt) => {
            this.setValidity();
            this.setError();
            this._addres = (evt.target as HTMLInputElement).value;
        });
        this._events.on(settings.event.modal.closed, this.resetAll.bind(this));
        this._events.on(settings.event.modal.opened, this.setValidity.bind(this));
    }
    set cardMethodButton(cardMethodButton: HTMLButtonElement) {
        this._cardMethodButton = cardMethodButton;
    }
    set cashMethodButton(cashMethodButton: HTMLButtonElement) {
        this._cashMethodButton = cashMethodButton;
    }
    set addresInput(addresInput: HTMLInputElement) {
        this._addresInput = addresInput;
    }
    set payment(payment: string) {
        this._payment = payment;
    }
    set address(address: string) {
        this._addres = address;
    }
    setSelection(evt: MouseEvent): void {
        this.resetSelection();
        (evt.target as HTMLButtonElement).classList.add(settings.order.activeButton);
        this._payment = (evt.target as HTMLButtonElement).name;
        this.setError();
        this.setValidity();
    }
    resetSelection(): void {
        this._cardMethodButton.classList.remove(settings.order.activeButton);
        this._cashMethodButton.classList.remove(settings.order.activeButton);
    }
    resetAll(): void {
        this._addresInput.value = '';
        this._errorMessage.textContent = '';
        this.resetSelection();
    }
    isValid(): boolean {
        return (this._cardMethodButton.classList.contains(settings.order.activeButton) ||
        this._cashMethodButton.classList.contains(settings.order.activeButton)) &&
        (this._addresInput.value.length !== 0)
    }
    setValidity(): void {
        this.isValid()
            ? this._submitButton.removeAttribute('disabled')
            : this._submitButton.setAttribute('disabled', 'true');
    }
    setError(): void {
        this.isValid()
            ? this._errorMessage.textContent = ''
            : this._errorMessage.textContent = 'Заполните все поля';
    }
}