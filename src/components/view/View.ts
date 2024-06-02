import { IView } from "../../types";
import { IEvents } from "../base/events";

export abstract class View<T extends Object> implements IView<T> {
    protected _element: HTMLElement;
    protected _events: IEvents;
    constructor(element: HTMLElement, events: IEvents) {
        this._element = element;
        this._events = events;
    }
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this, data ? data : {});
        return this._element;
    }
    set element(element: HTMLElement) {
        this._element = element;
    }
    set events(events: IEvents) {
        this._events = events;
    }
}