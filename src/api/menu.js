import request from '@/utils/request'
import axios from "axios";

// 获取路由
export const getRouters = () => {
  // return request({
  //   url: '/getRouters',
  //   method: 'get'
  // })
  return axios.get("json/router.json").then(res => { return res = res.data})
}
