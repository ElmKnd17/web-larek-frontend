import { IProductsData, IProduct } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";
import { Model } from "./Model";

export class Products extends Model implements IProductsData {
    products: IProduct[];
    constructor(events: IEvents) {
        super(events);
    }
    setProducts(products: IProduct[]): void {
        this.products = products.slice();
        this.events.emit(settings.event.products.received, (this.products));
    }
    getProducts(): IProduct[] {
        return this.products;
    }
    getProductByID(id: string): IProduct {
        return this.products.find((product) => {
            return (product.id === id)
        });
    }
}