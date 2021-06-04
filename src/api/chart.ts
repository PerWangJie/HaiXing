import Axios from './axios'
import { HttpResponse } from '@/@types'

interface LineParams {
  method: string
  jgzxh: any
}

interface GaugeParams {
  method: string
  ZTID: any
  SCXBH: any
}

export class ChartService {
  /**
   * @description 
   * @param {number} teamId 
   * @return {HttpResponse} 
   */
  // 获取地方柱形图
  static async getLine(params: LineParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取OEE
  static async getGauge(params: GaugeParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
}