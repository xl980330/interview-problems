import { AxiosRequestConfig, AxiosResponse } from 'axios';

class Request {
  instance: AxiosRequestConfig;

  constructor (config: AxiosRequestConfig) {
    this.instance = config;
  }

  request (config: AxiosRequestConfig): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      console.log(config, resolve, reject)
    })
  }
}

export default {
  Request,
}
