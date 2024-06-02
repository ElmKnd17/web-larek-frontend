import { Api } from '../base/api';
import { IOrderAPI, TOrder, TOrderResponse } from '../../types';
import { settings } from '../../utils/constants';

export class OrderAPI extends Api implements IOrderAPI {
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

}