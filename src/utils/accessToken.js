import { storage, tokenTableName,userInfoTableName } from "@/config/settings"

/**
 * @copyright Guoyu
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
*/
export function getAccessToken() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.getItem(tokenTableName)
    } else if ("sessionStorage" === storage) {
      return sessionStorage.getItem(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}

/**
 * @copyright Guoyu
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if ("sessionStorage" === storage) {
      return sessionStorage.setItem(tokenTableName, accessToken)
    } else {
      return localStorage.setItem(tokenTableName, accessToken)
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken)
  }
}

/**
 * @copyright Guoyu
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem(tokenTableName)
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}

export function setUserInfo(userInfo) {
  let dd = JSON.stringify(userInfo)
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.setItem(userInfoTableName, dd)
    } else if ("sessionStorage" === storage) {
      return sessionStorage.setItem(userInfoTableName, dd)
    } else {
      return localStorage.setItem(userInfoTableName, dd)
    }
  } else {
    return localStorage.setItem(userInfoTableName, dd)
  }
}

export function getInfo() {
  if (storage) {
    if ("localStorage" === storage) {
      let data = JSON.parse(localStorage.getItem(userInfoTableName))
      return data
    } else if ("sessionStorage" === storage) {
      let data = JSON.parse(sessionStorage.getItem(userInfoTableName))
      return data
    } else {
      let data = JSON.parse(localStorage.getItem(userInfoTableName))
      return data
    }
  } else {
    let data = JSON.parse(localStorage.getItem(userInfoTableName))
    return data
  }
}
export function removeUserInfo() {
  if (storage) {
    if ("localStorage" === storage) {

      return localStorage.removeItem(userInfoTableName)

    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else {
      return localStorage.removeItem(userInfoTableName)
    }
  } else {
    return localStorage.removeItem(userInfoTableName)
  }
}
