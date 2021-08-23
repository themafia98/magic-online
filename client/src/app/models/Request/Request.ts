import axios, { AxiosRequestConfig, Method } from 'axios';
import Domain from '../Domain/Domain';
import { DOMAIN_TYPE } from '../Domain/Domain.constant';

interface IHttpRequest {
  send<T = null>(pathname: string, method: Method, body?: T);
}

class Request implements IHttpRequest {
  private domainInstance: Domain;

  constructor() {
    this.domainInstance = new Domain(DOMAIN_TYPE.HTTP);
  }

  public send<T>(pathname: string, method: Method, body?: T) {
    const config: AxiosRequestConfig = {
      url: `${this.domainInstance.api}${pathname}`,
      method,
      data: body,
    };

    return axios(config);
  }
}

export default Request;
