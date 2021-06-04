import Axios from './axios'
import { HttpResponse } from '@/@types'

interface OrderParams {
  method: string;
  gsh: any,
  jgdybh: any,
  pagesize: number,
  pagesindex:number
}

interface StatusParams {
  method: string;
  ZTID: any
  SCXBH: any
  RWDH: any
  GXH: any
  ZT: number
}

interface NowOrderParams {
  method: string;
  CXXX: any
  GSH: any
}

interface ChangeStatusParams {
  method: string;
  ZTID: any
  SCXBH: any
  XMFLDM: any
}
interface OrdersParams {
  method: string
  GSH: any
  cxbm: any
  gdh: any
  wph: any
  kssj: any
  jssj: any
  pageSize: number
  pageIndex: number
}

interface InformationParams {
  method: string
  WPH: any
}

export class OrderService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取执行中工单
  static async getOrder(params: OrderParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取待执行工单
  static async getOrder2(params: OrderParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 开工 暂停 结束工单
  static async orderStatus(params: StatusParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取待执行工单
  static async getNowOrder(params: NowOrderParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 变更状态
  static async changeStatus(params: ChangeStatusParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 叫料单列表
  static async getOrderList(params: OrdersParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 根据物品号获得相关信息
  static async getInformation(params: InformationParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
}