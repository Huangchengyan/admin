import request from "@/utils/request"

export async function uploadImage(data) {
  return request({
    url: "/air/device/faceSearchRequest",
    method: "post",
    data,
  })
}


