/// <reference types="request" />
import * as request from 'request';
export declare class RequestBase {
    debug: boolean;
    constructor(debug: boolean);
    /**
     * 发起 HTTP 请求
     */
    request(url: string, options?: request.UriOptions | request.CoreOptions): Promise<object>;
}
