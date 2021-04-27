
import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "@/layouts"
import { publicPath, routerMode } from "@/config/settings"
Vue.use(VueRouter);
export const constantRoutes = [{
  path: "/login",
  component: () => import("@/views/login/index"),
  hidden: true,
},
{
  path: "/401",
  name: "401",
  component: () => import("@/views/401"),
  hidden: true,
},
{
  path: "/404",
  name: "404",
  component: () => import("@/views/404"),
  hidden: true,
},
];
export const asyncRoutes = [{
  path: "/",
  component: Layout,
  redirect: "index",
  children: [{
    path: "index",
    name: "Dashboard",
    component: () => import("@/views/index/index"),
    meta: {
      title: "首页",
      affix: true,
    },
  },],
},
{
  path: "/home",
  component: Layout,
  redirect: "noRedirect",
  meta: { title: "设备管理", permissions: ["admin"] },
  children: [
    {
      path: "index",
      name: "index",
      component: () => import("@/views/home/index"),
      meta: { title: "设备管理", permissions: ["admin"] },
    },
  ],
},

{
  path: "/management",
  component: Layout,
  redirect: "noRedirect",
  meta: { title: "下发记录", permissions: ["admin"] },
  children: [
    {
      path: "PersonnelManagement",
      name: "PersonnelManagement",
      component: () => import("@/views/management/PersonnelManagement"),
      meta: { title: "下发记录", permissions: ["admin"] },
    },
  ],
},
{
  path: "/seachPic",
  component: Layout,
  redirect: "noRedirect",
  meta: { title: "以图搜图", permissions: ["admin"] },
  children: [
    {
      path: "pic",
      name: "Pic",
      component: () => import("@/views/seachPic/index"),
      meta: { title: "以图搜图", permissions: ["admin"] },
    },
  ],
},
{
  path: "*",
  redirect: "/404",
  hidden: true,
},
]

const router = new VueRouter({
  base: routerMode === "history" ? publicPath : "/",
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

//重置路由
export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === "history" ? publicPath : "/",
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}
export default router
