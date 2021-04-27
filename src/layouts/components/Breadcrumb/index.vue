<template>
  <el-breadcrumb class="breadcrumb-container" separator=">">
    <el-breadcrumb-item v-for="item in levelList" :key="item.path">
      <span>
        <vab-remix-icon
          v-if="item.meta.remixIcon"
          :icon-class="item.meta.remixIcon"
        />
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "Breadcrumb",
    data() {
      return {
        levelList: null,
      };
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      },
    },
    created() {
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(
          (item) => item.meta && item.meta.title
        );
        const first = matched[0]
        this.levelList = matched.filter(
          (item) =>
            item.meta && item.meta.title && item.meta.breadcrumb !== false
        );
      },
      isIndex(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim().toLocaleLowerCase() === "Index".toLocaleLowerCase()
      },
    },
  };
</script>

<style lang="scss" scoped>
  .breadcrumb-container {
    display: inline-block;
    font-size: $base-font-size-default;
    line-height: 50px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  svg {
    width: 1.3em !important;
    height: 1.3em !important;
    position: relative;
    top: 0.3em;
  }
</style>
