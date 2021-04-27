<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            class="fold-unfold"
            @click="handleCollapse"
          ></i>
          <breadcrumb class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <error-log></error-log>
          <full-screen-bar @refresh="refreshRoute"></full-screen-bar>
          <theme-bar class="hidden-xs-only"></theme-bar>
          <vab-remix-icon title="重载所有路由" icon-class="shuaxin" :pulse="pulse" @click="refreshRoute"/>
          <avatar></avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import {
    Avatar,
    Breadcrumb,
    ErrorLog,
    FullScreenBar,
    ThemeBar,
  } from "@/layouts/components";

  export default {
    name: "NavBar",
    components: {
      Avatar,
      Breadcrumb,
      ErrorLog,
      FullScreenBar,
      ThemeBar,
    },
    data() {
      return {
        pulse: false,
      }
    },
    created() {
      this.cashMenu()
      console.log(this.routes)
    },
    computed: {
      ...mapGetters({
        collapse: "settings/collapse",
        visitedRoutes: "tagsBar/visitedRoutes",
        device: "settings/device",
        routes: "routes/routes",
      }),
      showAdmin() {
        let userType = this.$store.getters["user/userType"]
        if (userType === 'Admin') {
          return true
        } else {
          return false
        }
      }
    },

    methods: {
      cashMenu(){
        console.log(this.routes, this.showAdmin, '111111111')
        if ( !this.showAdmin ) {
          this.routes[4]['hidden'] = true
        }
      },
      handleCollapse() {
        this.$store.dispatch("settings/changeCollapse")
      },
      async refreshRoute() {
        this.$baseEventBus.$emit("reloadRouterView")
        this.pulse = true;
        setTimeout(() => {
          this.pulse = false;
        }, 1000);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .nav-bar-container {
    position: relative;
    height: $base-nav-bar-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;

    .left-panel {
      height: $base-nav-bar-height;
      display: flex;
      align-items: center;
      justify-items: center;

      .fold-unfold {
        font-size: 20px;
        color: $base-color-gray;
        cursor: pointer;
      }

      ::v-deep {
        .breadcrumb-container {
          margin-left: 10px;
        }
      }
    }
    .right-panel {
      height: $base-nav-bar-height;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      ::v-deep {
        svg {
          width: 1.2em;
          height: 1.2em;
          margin-right: 15px;
          font-size: $base-font-size-big;
          color: $base-color-gray;
          cursor: pointer;
          fill: $base-color-gray;
        }
        button {
          svg {
            margin-right: 0;
            cursor: pointer;
            color: #333 !important;
          }
        }

        .el-badge {
          margin-right: 15px;
        }
      }
    }
  }
</style>
