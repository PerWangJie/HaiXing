import Axios from './axios'
import { HttpResponse } from '@/@types'

interface loginParams {
  method: string;
  ygbh: string;
  mm: string;
  // Order: number;
}
export class UserService {
  /**
   * @description 
   * @param {number} teamId 
   * @return {HttpResponse} 
   */
  static async login(params: loginParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
}