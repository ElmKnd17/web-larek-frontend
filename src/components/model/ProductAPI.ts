import { Api, ApiListResponse } from '../base/api';
import { IProduct, IProductAPI } from '../../types';
import { settings } from '../../utils/constants';

 export class ProductAPI extends Api implements IProductAPI {

    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProducts(): Promise<IProduct[]> { // получить продукты с сервера
        return this.get(settings.api.product).then((data: ApiListResponse<IProduct>) => {
            return data.items.map((product) => {
                product.image = this.cdn + product.image;
                return product;
            })
        });
    };

    // getProductById(id: string): Promise<IProduct> {
    //     return this.get(`/product/${id}`).then((product: IProduct) => {
    //         product.image = this.cdn + product.image;
    //         return product;
    //     });
    // }

 }