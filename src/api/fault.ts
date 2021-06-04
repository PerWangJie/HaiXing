import Axios from './axios'
import { HttpResponse } from '@/@types'

interface FaultParams {
  method: string;
  GZBH: any;
  SBBH: any
  BXR: any
  GSH: any
}

interface CodeParams {
  method: string;
}

interface InformationParams {
  method: string;
  SBXX: any
  GSH: any
}

interface submitFaultParams {
  method: string;
  GSH: any
  SBXX: any
  GZBM: any 
  JHGS: any
  MS: any
  CJR: any
  CJRID: any
}

export class FaultService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取故障报修列表
  static async getFault(params: FaultParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取故障编码列表
  static async getCode(params: CodeParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 根据设备编号带出信息
  static async getInformation(params: InformationParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取报警信息列表
  static async getWarnList(params: CodeParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  // 获取报警信息列表
  static async submitFault(params: submitFaultParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
}