import { IPage, TPage } from '../../types';
import { View } from './View';
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from '../base/events';

export class Page extends View<TPage> implements IPage {
    protected _catalog: HTMLDivElement;
    protected _basketButton: HTMLButtonElement;
    protected _screen: HTMLElement;
    protected _basketCounter: HTMLSpanElement;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._screen = ensureElement<HTMLDivElement>(settings.page.wrapper, this._element);
        this._basketButton = ensureElement<HTMLButtonElement>(settings.page.basketButton, this._element);
        this._basketCounter = ensureElement<HTMLSpanElement>(settings.page.basketCounter, this._basketButton);
        this._catalog = ensureElement<HTMLDivElement>(settings.page.catalog, this._element);
        this._events.on(settings.event.modal.opened, this.lockScreen.bind(this));
        this._events.on(settings.event.modal.closed, this.unlockScreen.bind(this));
        this._basketButton.addEventListener('click', () => {
            this._events.emit(settings.event.basketButton.clicked)
        })
    }
    set cardList(cardList: HTMLElement[]) {
        this._catalog.replaceChildren(...cardList);
    }
    set basketCounter(value: number) {
        // this._basketCounter.textContent = value.toString();
        this.setTextContent(this._basketCounter, value.toString());
    }
    lockScreen(): void {
        // this._screen.classList.add(settings.page.lockedWrapper);
        this.addClass(this._screen, settings.page.lockedWrapper);
    };
    unlockScreen(): void {
        // this._screen.classList.remove(settings.page.lockedWrapper);
        this.removeClass(this._screen, settings.page.lockedWrapper);
    };
    // setBasketCounter(value: string): void {
    //     // this._basketCounter.textContent = value;
    //     // this.setTextContent(this._basketCounter, value);
    // };
}