import Axios from './axios'
import { HttpResponse } from '@/@types'

interface equipmentParams {
  method: string;
  RYXX: any
}

interface FaultParams {
  method: string;
  gsh: any
}

interface SubmitFaultParams {
  method: string;
  SCRWDH: any
  GSH: any
  ZJRYID: any
  WPH: any
  BZS: number
  JGDYBH: any
  PZBLYYBH: any
  CJRID: any
}

interface PersonParams {
  method: string;
  RYXX: any
}

interface ReportParams {
  method: string
  ZTID: any
  SCXBH: any
  RWDH: any
  GXH: any
  SBBM: any
  BGSL: any
  USERID: any
}

interface StatusParams {
  method: string
}

interface EquipmentStatusParams {
  method: string
  ZTID: any
  SCXBH: any
}

interface UnitCodeParams {
  method: string
  GSH: any
  RYXX: any
}

interface addUnitParams {
  method: string
  GSH: any
  JGDYBH: string
  CJR: any
}

interface deleteUnitParams {
  method: string
  GSH: any
  JGDYBH: string
  CJR: any
}

export class equipmentService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取认领时间
  static async getEquipment(params: equipmentParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 获取不良现象
  static async getFault(params: FaultParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 提交不良现象
  static async submitFault(params: SubmitFaultParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 根据人员获取设备
  static async getPerson(params: PersonParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 根据人员获取设备
  static async Report(params: ReportParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 获取设备状态
  static async getStatus(params: StatusParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 进入页面获取设备状态
  static async getEquipmentStatus(params: EquipmentStatusParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 获取添加加工单元页面列表
  static async getUnitCode(params: UnitCodeParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 添加加工单元
  static async addUnit(params: addUnitParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 删除加工单元
  static async deleteUnit(params: deleteUnitParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
}