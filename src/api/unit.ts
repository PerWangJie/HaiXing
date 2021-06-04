import Axios from './axios'
import { HttpResponse } from '@/@types'

interface UnitParams {
  method: string;
  RYXX: any;
}

interface UnitListParams {
  method: string;
  GSH: any
  pagesize: number
  pagesindex: number
}

interface DeleteUnitParams {
  method: string;
  GSH: any
}

interface TotalParams {
  method: string;
  GSH: any
}

export class UnitService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 根据用户名获取公司号和加工单元
  static async getUnit(params: UnitParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取加工单元列表
  static async getUnitList(params: UnitListParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 删除加工单元
  static async DeleteUnit(params: UnitListParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取加工单元列表
  static async getUnitTotal(params: TotalParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
}