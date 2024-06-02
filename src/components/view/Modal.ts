import { IModal, TModal } from '../../types';
import { View } from './View';
import { settings } from '../../utils/constants';
import { ensureElement } from "../../utils/utils";
import { IEvents } from '../base/events';

export class Modal extends View<TModal> implements IModal {
    protected _content: HTMLElement;
    protected _closeButton: HTMLButtonElement;
    private _boundCloseByEscapeHandler: (evt: KeyboardEvent) => void;
    private _boundCloseByOverlayHandler: (evt: MouseEvent) => void;
    private _boundCloseByButtonHandler: () => void;
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this._content = ensureElement<HTMLElement>(settings.modal.content, this._element);
        this._closeButton = ensureElement<HTMLButtonElement>(settings.modal.closeButton, this._element);
        this._boundCloseByEscapeHandler = this.closeByEscapeHandler.bind(this);
        this._boundCloseByOverlayHandler = this.closeByOverlayHandler.bind(this);
        this._boundCloseByButtonHandler = this.closeByButtonHandler.bind(this);
    }
    private closeByEscapeHandler(evt: KeyboardEvent) {
        if(evt.key === 'Escape') {
            this.close();
        }
    }
    private closeByOverlayHandler(evt: MouseEvent) {
        if(evt.target === evt.currentTarget) {
            this.close();
        };
    }
    private closeByButtonHandler() {
        this.close();
    }
    open(): void {
        this._element.classList.add(settings.modal.active);
        document.addEventListener('keydown', this._boundCloseByEscapeHandler);
        this._element.addEventListener('click', this._boundCloseByOverlayHandler);
        this._closeButton.addEventListener('click', this._boundCloseByButtonHandler);
        this._events.emit(settings.event.modal.opened)
    }
    close(): void {
        this._element.classList.remove(settings.modal.active);
        document.removeEventListener('keydown', this._boundCloseByEscapeHandler);
        this._element.removeEventListener('click', this._boundCloseByOverlayHandler);
        this._closeButton.removeEventListener('click', this._boundCloseByButtonHandler);
        this._events.emit(settings.event.modal.closed)
    }
    set content(content: HTMLElement) {
        this._content.replaceChildren(content);
    }
}