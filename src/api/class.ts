import Axios from './axios'
import { HttpResponse } from '@/@types'
import Qs from 'qs'

interface ClassParams {
  method: string;
  GSH: any
  CXBM: any
  KSRQ: any
  JSRQ: any
  pagesize: number
  pagesindex: number
}

interface ClassTypeParams {
  method: string;
  GSH: any
}

interface SaveClassParams {
  GSH: any
  CXBM: any
  BCBM: any
  SCRQ: any
  CJYH: any
  BZ: any
  data: Array<any>
}

interface CheckClassParams {
  method: string;
  GSH: any
  CXBM: any
  BCBM: any
  SCRQ: any
}

interface DeleteClassParams {
  method: string;
  GSH: any
  CXBM: any
  BCBM: any
}

export class ClassService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取排班列表
  static async getClass(params: ClassParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 获取排班类型列表
  static async getClassType(params: ClassTypeParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 保存排班
  static async saveClass(data: any): Promise<any> {
    return Axios('/do?method=GKJ_PBJL_TJ', {
      method: 'post',
      data
    })
  }
  // 查看排班
  static async CheckClass(params: CheckClassParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 删除排班
  static async DeleteClass(params: DeleteClassParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
}