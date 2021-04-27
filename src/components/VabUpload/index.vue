<template>
  <div class="upload">
    <div class="imgList">
      <div class="imgBox" v-for="(item, index) in attachedFiles" :key="index">
        <el-image style="width: 124px; height: 124px" :src="item" />
        <div class="imgMask"></div>
        <div class="themBar">
          <!-- <i class="el-icon-zoom-in" @click="preImg(item)"></i>
          <span style="width: 10px"></span> -->
          <i class="el-icon-delete" @click="removeImg(index)"></i>
        </div>
      </div>
    </div>
    <el-upload
      ref="upload"
      class="upload-content"
      action="#"
      :data="data"
      :on-change="imgPreview"
      :on-remove="handleRemove"
      :show-file-list="false"
      :multiple="true"
      :auto-upload="false"
      accept="image/png, image/jpeg"
      list-type="picture-card"
      :close-on-click-modal="false"
    >
      <i slot="trigger" class="el-icon-plus" />
    </el-upload>
    <el-alert
      :closable="false"
      type="info"
    />
  </div>
</template>
<script>
export default {
  name: "VabUpload",
  props: {
    limit: {
      type: Number,
      default: 3,
    },
    imgList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    imgList(n, o) {
      this.imgList = n;
      this.attachedFiles = n;
    },
  },
  data() {
    return {
      show: false,
      loading: false,
      dialogVisible: false,
      dialogImageUrl: "",
      action: "",
      headers: {},
      picture: "picture",
      imgNum: 0,
      imgSuccessNum: 0,
      imgErrorNum: 0,
      typeList: null,
      filesCon: [],
      title: "上传",
      dialogFormVisible: false,
      data: {},
      upData: {
        jpgContent: "",
      },
      attachedFiles: this.imgList,
    };
  },
  methods: {
    preImg(item) {
      this.$previewImg({ src: item });
    },
    removeImg(index) {
      this.imgList.splice(index, 1);
      this.attachedFiles.splice(index, 1);
    },
    handleProgress(event, file, fileList) {
      this.loading = true;
      this.show = true;
    },
    imgPreview(file) {
      this.blobToBase64(file.raw).then((res) => {
        this.upData.jpgContent = res.replace(/^data:image\/\w+;base64,/, "");
        let params = {
          src: res,
          base64Url: res.replace(/^data:image\/\w+;base64,/, ""),
        };
        this.attachedFiles.push(res);
        this.$emit("file-change", params);
      });
    },
    async uImg() {
      if (this.attachedFiles.length >= this.limit) {
        this.$baseMessage("最大上传数量为" + this.limit, "error");
        return;
      }
    },
    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
          reject(new Error("blobToBase64 error"));
        };
      });
    },
    handleRemove(file, fileList) {
      this.imgNum = this.imgNum - 1;
      this.allNum = this.allNum - 1;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$baseMessage(
        `当前限制选择 ${this.limit} 个文件，本次选择了
             ${files.length}
             个文件`,
        "error"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.imgBox {
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #c0ccda;
  width: 124px;
  height: 124px;
  transition: all 0.3s;
  display: flex;
  position: relative;
  float: left;
  top: 2px;
  margin-right: 10px;
}
.imgBox:last-child {
  margin-right: 5px;
}
.imgMask {
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
}
.imgBox:hover .imgMask {
  background-color: rgba(0, 0, 0, 0.7);
}
.themBar {
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.themBar i {
  font-size: 20px;
  color: #fff;
  transition: all 0.3s;
  opacity: 0;
}
.imgBox:hover .themBar i {
  opacity: 1;
}
.el-button{
  width: 135px;
  margin-left: 3px;
}
.upload {
  .upload-content {
    .el-upload__tip {
      display: block;
      height: 30px;
      line-height: 30px;
    }

    ::v-deep {
      .el-upload--picture-card {
        width: 128px;
        height: 128px;
        margin: 3px 8px 8px 8px;
        border: 2px dashed #c0ccda;
      }

      .el-upload-list--picture {
        margin-bottom: 20px;
      }

      .el-upload-list--picture-card {
        .el-upload-list__item {
          width: 128px;
          height: 128px;
          margin: 3px 8px 8px 8px;
        }
      }
    }
  }
}
</style>
