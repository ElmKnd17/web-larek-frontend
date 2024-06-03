import {IEvents} from '../components/base/events'

/////////////////////////// TYPES ///////////////////////////
export type TId = {id: string};
export type TPaymentMethodAndAddress = {
    paymentMethod: string;
    address: string;
}
export type TPage = {
    cardList: HTMLElement[];
    basketCounter: number;
}
export type TCatalogCard = Omit<IProduct, 'description'>;
export type TModal = {
    content: HTMLElement;
}
export type TCardModal = IProduct | {
    isInBasket: boolean
};
export type TBasketCard = Pick<IProduct, 'id' | 'title' | 'price'> | {
    index: number;
}
export type TBasketModal = {
    isEmpty: boolean;
    basketList: HTMLElement[];
    total: number;
    button: HTMLButtonElement;
}
export type TOrder = {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}
export type TAddressOrderModal = Pick<IOrder, | 'payment' | 'address'>
export type TContactsOrderModal = Pick<IOrder, | 'email' | 'phone'>
export type TOrderResponse = {
    id: string;
    total: number;
}
export type TSuccessOrderModal = {
    total: number;
}

/////////////////////////// MODEL ///////////////////////////

export interface IModel {
    events: IEvents;
}

export interface IProductsData {
    products: IProduct[];
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IBasket {
    products: IProduct[];
    addProduct(product: IProduct): void;
    removeProduct(product: IProduct): void;
    getProducts(): IProduct[];
    removeAll(): void;
    getTotalPrice(): number;
    getPrice(id: string): number;
    getTotalQuantity(): number;
    checkAvailability(id: string): boolean;
    getIndex(id: string): number;
    getAllIDs(): string[];
    isEmpty(): boolean;
}

export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    getValues(): TOrder;
    removeAll(): void;
}

// export interface IUser {
//     address: string;
//     email: string;
//     phoneNumber: string;
//     paymentMethod: TPaymentMethod;
//     basket: IBasket;
//     setAddress(address: string): void;
//     setEmail(email: string): void;
//     setPhoneNumber(phoneNumber: string): void;
//     setPaymentMethod(paymentMethod: TPaymentMethod): void;
//     addProductToBasket(product: IProduct): void;
//     removeProductFromBasket(product: IProduct): void;
//     getProductsFromBasket(): IProduct[];
//     clearBasket(): void;
// }

// export interface IForm {
//     address: string;
//     email: string;
//     phoneNumber: string;
//     paymentMethod: string;
// }

export interface IAPI {
    readonly cdn: string;
}

export interface IProductAPI extends IAPI {
    getProducts(): Promise<IProduct[]>;
}

export interface IOrderAPI extends IAPI {
    postOrder(order: TOrder): Promise<TOrderResponse>;
}

export interface IAppAPI {
    readonly cdn: string;
    getProducts(): Promise<IProduct[]>;
    postOrder(order: TOrder): Promise<TOrderResponse>;
}

/////////////////////////// VIEW ///////////////////////////

export interface IView<T> {
    element: HTMLElement;
    events: IEvents;
    render(data?: T): HTMLElement;
    setDisabled(button: HTMLButtonElement): void;
    removeDisabled(button: HTMLButtonElement): void;
    setTextContent(element: HTMLElement, textContent: string): void;
    setInputValue(input: HTMLInputElement, value: string): void;
    addClass(element: HTMLElement, value: string): void;
    removeClass(element: HTMLElement, value: string): void;
    isContainsClass(element: HTMLElement, value: string): boolean;
    setImage(image: HTMLImageElement, link: string): void;
}

export interface IOrderModal {
    element: HTMLElement;
    events: IEvents;
    submitButton: HTMLButtonElement;
    errorMessage: HTMLSpanElement;
    isValid(): boolean;
    setValidity(): void;
    setError(): void;
    resetAll(): void;
}

export interface IAddressOrderModal {
    cardMethodButton: HTMLButtonElement;
    cashMethodButton: HTMLButtonElement;
    addresInput: HTMLInputElement;
    payment: string;
    address: string;
    setSelection(evt: MouseEvent): void;
    resetSelection(): void;
    resetAll(): void;
    setValidity(): void;
    isValid(): boolean;
    setError(): void
}

export interface IContantsOrderModal {
    emailInput: HTMLInputElement;
    phoneNumberInput: HTMLInputElement;
    email: string;
    phoneNumber: string;
    resetAll(): void;
    setValidity(): void;
    isValid(): boolean;
    setError(): void
}

export interface IPage {
    cardList: HTMLElement[];
    basketCounter: number;
    lockScreen(): void;
    unlockScreen(): void;
}

// export interface ICard {
//     id: string;
//     description: HTMLParagraphElement;
//     image: HTMLImageElement;
//     title: HTMLHeadElement;
//     category: HTMLSpanElement;
//     price: HTMLSpanElement;
// }

export interface ICatalogCard {
    id: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IModal {
    content: HTMLElement;
    setModalListeners(): void;
    removeModalListeners(): void;
    open(): void;
    close(): void;
}

export interface ICardModal extends ICatalogCard {
    isInBasket: boolean;
    description: string;
}

export interface IBasketModal {
    cardList: HTMLElement[];
    orderButton: HTMLButtonElement;
}

export interface ISuccessOrderModal {
    total: number;
    successButton: HTMLButtonElement;
}

export interface IBasketCard extends Pick<ICatalogCard, 'id' | 'title' | 'price'> {
    index: number;
}