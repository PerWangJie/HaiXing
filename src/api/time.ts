import Axios from './axios'
import { HttpResponse } from '@/@types'

interface TimeParams {
  method: string;
  ZTID: any
  SCXBH: any
}

interface ReasonParams {
  method: string
}

interface TimeChangeParams {
  method: string
  DJGUID: number
  YYBM: any
}

export class TimeService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取认领时间
  static async getTime(params: TimeParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 获取不良原因
  static async getReason(params: ReasonParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 确定时间认领
  static async TimeChange(params: TimeChangeParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
}