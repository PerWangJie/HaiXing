import Axios from './axios'
import { HttpResponse } from '@/@types'

interface PersonParams {
  method: string;
  YGBH: any
  gsh: any
}

export class PersonService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取认领时间
  static async getPerson(params: PersonParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
}