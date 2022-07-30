import { AxiosRequestConfig } from 'axios';


export interface AxiosResponse<T> {
  header: any,
  status: number,
  statusText: string,
  config: AxiosRequestConfig,
  request: any
  data: T,
}
