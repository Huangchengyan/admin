import request from "@/utils/request";

//增加设备
export function addDevice(data) {
  return request({
    url: "/air/device/add",
    method: "post",
    data
  })
}

//搜索
export function queryAll(data) {
  return request({
    url: "/air/device/queryAll",
    method: "post",
    data
  })
}

//删除设备
export function deleteDevice(data) {
  return request({
    url: "/air/device/deleteDevice",
    method: "post",
    data
  })
}

//搜索
export function queryDeviceStatus(data) {
  return request({
    url: "/air/device/countByStatus",
    method: "post",
    data
  })
}

//修改
export function updateDevice(data) {
  return request({
    url: "/air/device/updateDevice",
    method: "post",
    data
  })
}

//下发记录
export function query(data) {
  return request({
    url: "/air/PhotoSynPlan/query",
    method: "post",
    data
  })
}

//以图搜图
export function faceSearchRequest(data) {
  return request({
    url: "/air/device/faceSearchRequest",
    method: "post",
    data
  })
}
 