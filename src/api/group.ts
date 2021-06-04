import Axios from './axios'
import { HttpResponse } from '@/@types'

interface GroupParams {
  method: string;
  ZYXM: any
  pageSize: number
  pageIndex: number
}

export class GroupService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取认领时间
  static async getGroup(params: GroupParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
}