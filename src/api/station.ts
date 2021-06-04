import Axios from './axios'
import { HttpResponse } from '@/@types'

interface ClassParams {
  GSH: any
  CXBM: any
  BCBM: any
  pageSize: number
  pageIndex: number
}

interface PersonParams {
  method: string
  RYXX: any
  gsh: any
}

interface LeaveParams {
  method: string
  GSH: any
  BCBM: any
  JGDYBH: any
  pageSize: number
  pageIndex: number
}

interface LaidOFFParams {
  method: any
  GSH: any
  BCBM: any
  CXBM: any
  pageSize: number
  pageIndex: number
}

interface StationParams {
  method: any
  GSH: any
  SCXBH: any
}

interface getPersonParams {
  method: string,
  GSH: any
  CXBM: any
  BCBM: any
  GWBH: any
}

interface ReasonParams {
  method: string
}

interface LeaveStationParams {
  method: string
  GSH: any
  YGBH: any
  JGDYBH: any
  LGYY: any
  CJRID: any
  BCBM: any
  LGSJ: any
  SGSJ: any
}

interface SubstituteParams {
  method: string
  GSH: any
  YGBH: any
}

interface AffirmParams {
  method: string
  GSH: any
  JGDYBH: any
  BCBM: any
  YGBH: any
  TBYGBH: any
}

interface DeleteParams {
  method: string
  GSH: any
  JGDYBH: any
  BCBM: any
  YGBH: any
}

interface laidOffParams {
  method: string
  GSH: any
  CXBM: any
  BCBM: any
  pageSize: number
  pageIndex: number
}

export class StationService {
  /**
   * @description 
   * @param {number}  
   * @return {HttpResponse} 
   */
  // 获取班次列表
  static async getClass(params: ClassParams): Promise<any> {
    return Axios('/do?method=GKJ_CKBCDYLBQB', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 根据班次获取人员信息
  static async getPerson(params: PersonParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 开班
  static async openClass(data: any): Promise<any> {
    return Axios('/do?method=GKJ_KBDJ_TJ', {
      method: 'post',
      data
    })
  }
  // 离岗列表
  static async getPersonList(params: getPersonParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 离岗列表根据工位获取人员信息
  static async leaveClass(params: LeaveParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 下岗列表
  static async laidOFF(params: LaidOFFParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 获取工位列表
  static async getStation(params: StationParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 获取离岗原因列表
  static async getReason(params: ReasonParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 确认离岗登记
  static async LeaveStation(params: LeaveStationParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 获取替补人员
  static async SubstitutePerson(params: SubstituteParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 确认替补人员
  static async SubstitutePersonAffirm(params: AffirmParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 删除离岗人员
  static async DeletePerson(params: DeleteParams): Promise<any> {
    return Axios('/do?', {
      method: 'post',
      params: {
        ...params
      },
    })
  }
  // 获取下岗人员
  static async laidOffPerson(params: laidOffParams): Promise<any> {
    return Axios('/do?', {
      method: 'get',
      params: {
        ...params
      },
    })
  }
  // 下岗
  static async laidOffPersonHandle(data: any): Promise<any> {
    return Axios('/do?method=GKJ_XBDJ_TJ', {
      method: 'post',
      data
    })
  }
}