import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import Domain from '../Domain/Domain';
import { Types } from 'phaser';
import { DOMAIN_TYPE } from '../Domain/Domain.constant';
import { JWT_TOKEN_KEY } from '../../config/App.config';

interface IHttpRequest {
  send<T, R = any>(pathname: string, method: Method, body?: T): AxiosPromise<R>;
}

class Request implements IHttpRequest {
  private readonly isWithToken: boolean;
  private domainInstance: Domain;

  constructor(privateRequest?: boolean) {
    this.domainInstance = new Domain(DOMAIN_TYPE.HTTP);
    this.isWithToken = privateRequest;
  }

  static getCoreLoaderHeaders = (responseType = ''): Types.Loader.XHRSettingsObject => {
    const token = Request.getToken();

    return {
      responseType,
      header: 'authorization',
      headerValue: `Bearer ${token}`,
    } as Types.Loader.XHRSettingsObject;
  };

  static getToken = () => localStorage.getItem(JWT_TOKEN_KEY);

  public send<T, R = any>(pathname: string, method: Method, body?: T): AxiosPromise<R> {
    const config: AxiosRequestConfig = {
      url: `${this.domainInstance.api}${pathname}`,
      method,
      data: body,
    };

    const interceptorId = axios.interceptors.request.use(
      (axiosConfig) => {
        const { origin } = new URL(axiosConfig.url);
        const allowedOrigins = [axiosConfig.url, window.location.origin];

        const token = localStorage.getItem('token');

        if (allowedOrigins.includes(origin) && this.isWithToken) {
          axiosConfig.headers.authorization = `Bearer ${token}`;
        }

        axios.interceptors.request.eject(interceptorId);

        return axiosConfig;
      },
      (error) => {
        axios.interceptors.request.eject(interceptorId);
        return Promise.reject(error);
      }
    );

    return axios(config);
  }
}

export default Request;
