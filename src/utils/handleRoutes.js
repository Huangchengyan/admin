
export function filterAllRoutes(constantRoutes) {
  return constantRoutes.filter((route) => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = (resolve) => require(["@/layouts"], resolve)
      } else if (route.component === "EmptyLayout") {
        route.component = (resolve) =>
          require(["@/layouts/EmptyLayout"], resolve)
      } else {
        let path = "views/" + route.component
        if (
          new RegExp("^/views/.*$").test(route.component) ||
          new RegExp("^views/.*$").test(route.component)
        ) {
          path = route.component
        } else if (new RegExp("^/.*$").test(route.component)) {
          path = "views" + route.component
        } else if (new RegExp("^@views/.*$").test(route.component)) {
          path = route.component.str.slice(2)
        } else {
          path = "views/" + route.component
        }
        route.component = (resolve) => require([`@/${path}`], resolve);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAllRoutes(route.children)
    }
    if (route.children && route.children.length === 0) {
      delete route.children
    }
    return true
  })
}
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role))
  } else {
    return true
  }
}
export function filterAsyncRoutes(routes, permissions) {
  const finallyRoutes = []
  routes.forEach((route) => {
    const item = { ...route }
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}
