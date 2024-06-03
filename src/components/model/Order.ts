import { IOrder, TOrder } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";
import { Model } from "./Model";
export class Order extends Model implements IOrder {
    protected _payment: string;
    protected _email: string;
    protected _phone: string;
    protected _address: string;
    protected _total: number;
    protected _items: string[];
    constructor(events: IEvents) {
        super(events);
        this._items = [];
        this.events.on(settings.event.modal.closed, this.removeAll.bind(this));
    }
    getValues(): TOrder {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address,
            total: this._total,
            items: this._items
        }
    }
    removeAll() {
        this._payment = undefined;
        this._address = undefined;
        this._email = undefined;
        this._phone = undefined;
        this._total = undefined;
        this._items = undefined;
    }
    set payment(payment: string) {
        this._payment = payment;
    }
    set email(email: string) {
        this._email = email;
    }
    set phone(phone: string) {
        this._phone = phone;
    }
    set address(address: string) {
        this._address = address;
    }
    set total(total: number) {
        this._total = total;
    }
    set items(items: string[]){
        this._items = items.slice();
    }
}