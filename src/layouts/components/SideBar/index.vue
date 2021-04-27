<template>
  <el-scrollbar class="side-bar-container" :class="{ 'is-collapse': collapse }">
    <logo/>
    <el-menu
      :background-color="variables['menu-background']"
      :text-color="variables['menu-color']"
      :active-text-color="variables['menu-color-active']"
      :default-active="activeMenu"
      :collapse="collapse"
      :collapse-transition="false"
      :default-openeds="defaultOpens"
      :unique-opened="uniqueOpened"
      mode="vertical"
    >
      <template v-for="route in routes" >
        <side-bar-item
          :key="route.path"
          :full-path="route.path"
          :item="route"
        ></side-bar-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script>
  import { Logo } from "@/layouts/components"
  import SideBarItem from "./components/SideBarItem"
  import variables from "@/styles/variables.scss"
  import { mapGetters } from "vuex"
  import { defaultOopeneds, uniqueOpened } from "@/config/settings"
  export default {
    name: "SideBar",
    components: { SideBarItem, Logo },
    data() {
      return {
        uniqueOpened,
        menuList:[]
      }
    },
    computed: {
      ...mapGetters({
        collapse: "settings/collapse",
        routes: "routes/routes",
      }),
      defaultOpens() {
        if (this.collapse) {
        }
        return defaultOopeneds
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      variables() {
        return variables
      },
      userInfo() {
        return this.$store.getters["user/userInfo"]
      },
      showCompany() {
        if (this.userInfo.companyId) {
          return true
        } else {
          return false
        }
      },
    },
    methods:{
      cashMenu(){
        let roleMenu = this.userInfo.menu
        //巡检
        if ( roleMenu[1].status !== 1 ) {
          this.routes[4]['hidden'] = true
        }
        //巡检管理
        if ( roleMenu[2].status !== 1 ) {
          this.routes[4].children[0]['hidden'] = true
        }
        //巡检模板
        if ( roleMenu[3].status !== 1 ) {
          this.routes[4].children[1]['hidden'] = true
        }
        //人员
        if ( roleMenu[4].status !== 1 ) {
          this.routes[5]['hidden'] = true
        }
        //人员管理
        if ( roleMenu[5].status !== 1 ) {
          this.routes[5].children[0]['hidden'] = true
        }
        //角色管理
        if ( roleMenu[6].status !== 1 ) {
          this.routes[5].children[1]['hidden'] = true
        }

        //组织机构
        if ( roleMenu[7].status !== 1 ) {
          this.routes[6]['hidden'] = true
        }

        //机房
        if ( roleMenu[8].status !== 1 ) {
          this.routes[7]['hidden'] = true
        }
        //机房管理
        if ( roleMenu[9].status !== 1 ) {
          this.routes[7].children[0]['hidden'] = true
        }
        //区域管理
        if ( roleMenu[10].status !== 1 ) {
          this.routes[7].children[1]['hidden'] = true
        }
        //设备管理
        if ( roleMenu[11].status !== 1 ) {
          this.routes[7].children[2]['hidden'] = true
        }

        //申请
        if ( roleMenu[12].status !== 1 ) {
          this.routes[8]['hidden'] = true
        }
        //进入机房申请
        if ( roleMenu[13].status !== 1 ) {
          this.routes[8].children[0]['hidden'] = true
        }
        //审核流程
        if ( roleMenu[14].status !== 1 ) {
          this.routes[8].children[1]['hidden'] = true
        }

        //识别记录
        if ( roleMenu[16].status !== 1 ) {
          this.routes[9]['hidden'] = true
        }
        //告警记录
        if ( roleMenu[17].status != 1 ) {
          this.routes[10]['hidden'] = true
        }
        //操作记录
        if ( roleMenu[18].status != 1 ) {
          this.routes[11]['hidden'] = true
        }
        //系统设置
        if ( roleMenu[19].status != 1 ) {
          this.routes[12]['hidden'] = true
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-color-white;
    }

    &.is-active {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }
  }
  .side-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: $base-menu-background;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: width $base-transition-time;

    &.is-collapse {
      width: $base-left-menu-width-min;
      border-right: 0;

      ::v-deep {
        .el-menu {
          transition: width $base-transition-time;
        }
        .el-menu--collapse {
          border-right: 0;
          .el-submenu__icon-arrow {
            right: 10px;
            margin-top: -3px;
          }
        }
      }
    }

    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-menu {
        border: 0;

        .vab-fas-icon {
          padding-right: 3px;
          font-size: $base-font-size-default;
        }

        .vab-remix-icon {
          padding-right: 3px;
          font-size: $base-font-size-default + 2;
        }
        .menuText {
          padding-left: 5px;
          display: inline-block;
        }
      }


      .el-submenu__title {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .el-menu-item {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .el-menu-item {
        @include active;
      }
    }
  }

</style>
