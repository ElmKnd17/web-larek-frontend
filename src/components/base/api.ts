export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...((options.headers as object) ?? {})
            }
        };
    }

    protected _handleResponse(response: Response): Promise<Object> { 
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    protected _request(url: string, options: RequestInit) {
        return fetch(url, options).then(this._handleResponse)
      }

    get(uri: string) {
        // return fetch(this.baseUrl + uri, {
        //     ...this.options,
        //     method: 'GET'
        // }).then(this._handleResponse<T>);
        return this._request(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        });
    }

    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        // return fetch(this.baseUrl + uri, {
        //     ...this.options,
        //     method,
        //     body: JSON.stringify(data)
        // }).then(this._handleResponse);
        return this._request(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        });
    }
}
