<template>
  <div :class="'logo-container-' + layout">
    <router-link to="/">
      <vab-remix-icon class="logo" icon-class="logozh"/>
      <div class="title">EXHIBITION</div>
    </router-link>
  </div>
</template>
<script>
  import { mapGetters } from "vuex"
  import { logo } from "@/config/settings"
  export default {
    name: "Logo",
    data() {
      return {
        title: this.$baseTitle,
      }
    },
    computed: {
      ...mapGetters({
        logo: "settings/logo",
        layout: "settings/layout",
      }),
    },
  }
</script>
<style lang="scss" scoped>
  @mixin container {
    position: relative;
    height:65px !important;
    overflow: hidden;
    line-height:65px;
    background: $base-menu-background;
    position: relative;
  }

  @mixin logo {
    display: inline-block;
    width:60px;
    height:60px;
    margin-right: 5px;
    margin-top:-1px;
    vertical-align: middle;
  }

  @mixin title {
    display: inline-block;
    overflow: hidden;
    font-size: 20px;
    font-weight: 600;
    line-height: 55px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .logo-container-horizontal {
    @include container;

    .logo {
      @include logo;
    }

    .title {
      @include title;
    }
  }

  .logo-container-vertical {
    @include container;
    height: $base-logo-height;
    line-height: $base-logo-height;
    text-align: center;
    .logo {
      @include logo;
    }
    .title {
      @include title;
      max-width: calc(#{$base-left-menu-width} - 60px);
    }
  }
</style>
