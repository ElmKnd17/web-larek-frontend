import { Api, ApiListResponse } from '../base/api';
import { IAppAPI, IProduct, TOrder, TOrderResponse } from '../../types';
import { settings } from '../../utils/constants';
export class AppAPI extends Api implements IAppAPI {
    readonly cdn: string;
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    postOrder(order: TOrder): Promise<TOrderResponse> {
        return this.post(settings.api.order, order).then((orderResponse: TOrderResponse) => {
            return orderResponse;
        })
    }
    getProducts(): Promise<IProduct[]> {
        return this.get(settings.api.product).then((data: ApiListResponse<IProduct>) => {
            return data.items.map((product) => {
                product.image = this.cdn + product.image;
                return product;
            })
        });
    };
}