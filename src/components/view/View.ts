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
    setDisabled(button: HTMLButtonElement): void {
        button.setAttribute('disabled', 'true');
    }
    removeDisabled(button: HTMLButtonElement): void {
        button.removeAttribute('disabled');
    }
    setTextContent(element: HTMLElement, textContent: string): void {
        element.textContent = textContent;
    }
    setInputValue(input: HTMLInputElement, value: string): void {
        input.value = value;
    }
    addClass(element: HTMLElement, value: string): void {
        element.classList.add(value);
    }
    removeClass(element: HTMLElement, value: string): void {
        element.classList.remove(value);
    }
    isContainsClass(element: HTMLElement, value: string): boolean {
        return element.classList.contains(value);
    }
    setImage(image: HTMLImageElement, link: string): void {
        image.src = link;
    }
    set element(element: HTMLElement) {
        this._element = element;
    }
    set events(events: IEvents) {
        this._events = events;
    }
}