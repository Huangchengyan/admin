import request from "@/utils/request"

export async function login(data) {
  return request({
    url: "/api/common/login",
    method: "post",
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: "/userInfo",
    method: "post",
    data: {
      [tokenName]: accessToken,
    },
  })
}

