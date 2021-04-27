<template>
  <div class="table-container">
    <el-row :gutter="20">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <vabUpload
          :limit="1"
          :imgList="faceFile"
          @file-change="faceFileChange"
        />
        <el-button type="primary">搜索</el-button>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18"></el-col>
    </el-row>
  </div>
</template>
<script>
import vabUpload from "@/components/VabUpload";
import faceSearchRequest from "../../api/management";
export default {
  data() {
    return {
      faceFile: [],
    };
  },
  components: {
    vabUpload,
  },
  computed: {},
  created() {},

  methods: {
    faceFileChange(e) {
      this.faceFile[0] = e.src;
      console.log(this.faceFile);
    },
  },
};
</script>
<style scoped>
.el-button {
  width: 140px;
  border-radius: 5%;
}
</style>