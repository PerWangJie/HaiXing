export interface HttpResponse {
  status: number
  statusText: string
  count: number
  data: {
    count: number
    code: number
    desc: string
    [key: string]: any
  }
}