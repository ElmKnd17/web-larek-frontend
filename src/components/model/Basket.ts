import { IBasket, IProduct } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";
import { Model } from "./Model";
export class Basket extends Model implements IBasket {
    products: IProduct[];
    constructor(events: IEvents) {
        super(events);
        this.products = [];
    }
    addProduct(product: IProduct): void {
        if(!this.products.some(data => {
            return data.id === product.id;
        })) {
            this.products.push(product);
            this.events.emit(settings.event.basket.changed, {id: product.id});
        }
    }
    removeProduct(product: IProduct): void {
        if(this.products.some(data => {
            return data.id === product.id;
        })) {
            this.products = this.products.filter(data => {
                return data.id !== product.id;
            })
            this.events.emit(settings.event.basket.changed, {id: product.id});
        }
    }
    getProducts(): IProduct[] {
        return this.products;
    }
    removeAll(): void {
        this.products = [];
        this.events.emit(settings.event.basket.changed);
    }
    getTotalQuantity(): number {
        return this.products.length;
    }
    getTotalPrice(): number {
        return this.products.reduce((sum, data) => {
            return (sum + data.price);
          }, 0)
    }
    getPrice(id: string): number {
        return this.products.find(product => {
            return (product.id === id);
        }).price;
    }
    checkAvailability(id: string): boolean {
        return this.products.some(product => product.id === id);
    }
    getIndex(id: string): number {
        for (let i: number = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return (i + 1);
            }
        }
        return 0;
    }
    getAllIDs(): string[] {
        return this.products.map((product) => {
            return product.id;
        })
    }
    isEmpty(): boolean {
        return (this.getTotalQuantity() === 0) ? true : false;
    }
}