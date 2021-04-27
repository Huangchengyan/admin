<template>
  <div class="table-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form class="seachBar" :model="queryForm" :inline="true">
          <el-form-item label="员工名字">
            <el-input
              v-model="queryForm.cname"
              placeholder="请输入名字"
              size="medium"
            />
          </el-form-item>
          <el-form-item label="卡号">
            <el-input
              v-model="queryForm.cardnumber"
              placeholder="卡号"
              size="medium"
            />
          </el-form-item>
          <el-form-item label="执行结果">
            <el-select v-model="queryForm.nsyntag" placeholder="请选择状态">
              <el-option label="全部" :value="undefined"></el-option>
              <el-option label="已执行" :value=1></el-option>
              <el-option label="未执行" :value=0></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input
              v-model="queryForm.ipaddress"
              placeholder="请输入IP地址"
              size="medium"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              size="medium"
              @click="handleQuery"
            >
              搜索
            </el-button>
            <el-button icon="el-icon-refresh" size="medium" @click="resetQuery">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="tableBox">
          <el-table
            ref="tableSort"
            v-loading="listLoading"
            :data="list"
            :element-loading-text="elementLoadingText"
            @selection-change="setSelectRows"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="员工名字"
              prop="cname"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="卡号"
              prop="cardnumber"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="执行结果"
              prop="nsyntag"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag :type="scope.row.nsyntag | formartType">
                  {{ scope.row.nsyntag | formartStatus }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="IP地址"
              prop="ipaddress"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="更新时间"
              prop="upatedatetime"
              align="center"
            ></el-table-column>
          </el-table>
          <el-pagination
            :current-page="queryForm.pageIndex"
            :layout="layout"
            :page-size="queryForm.count"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { query } from "@/api/management";
export default {
  name: "Management",
  filters: {
    formartType(status) {
      let newStr = "";
      if (status === 0) {
        newStr = "error";
      } else {
        newStr = "success";
      }
      return newStr;
    },
    formartStatus(status) {
      let newStr = "";
      if (status === 0) {
        newStr = "未执行";
      } else {
        newStr = "已执行";
      }
      return newStr;
    },
  },
  data() {
    return {
      fullPageShow: false,
      fullPageTitle: "",
      formDisplay: false,
      xform: {
        cardnumber: undefined,
        cname: undefined,
        ipaddress: undefined,
        nsyntag: undefined,
      },
      list: [],
      listLoading: false,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      elementLoadingText: "正在加载...",
      queryForm: {
        cardnumber: undefined,
        cname: undefined,
        ipaddress: undefined,
        nsyntag: undefined,
        upatedatetime: undefined,
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNum = val;
      this.fetchData();
    },
    handleQuery() {
      this.queryForm.pageNum = 1;
      this.fetchData();
    },
    resetQuery() {
      this.queryForm = {
        cardnumber: "",
        cname: undefined,
        nsyntag: undefined,
        ipaddress: undefined,
        upatedatetime: undefined,
        pageNum: 1,
        pageSize: 20,
      };
      this.fetchData();
    },

    async fetchData() {
      this.listLoading = true;
      const data = await query(this.queryForm);
      if (data) {
        this.list = data.items;
        this.total = data.count;
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      } else {
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.uiTableBtn {
  height: 30px;
  border-radius: 30px;
  background-color: $base-color-default;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  width: 70px;
}
.tabBtnIcon {
  font-size: 15px;
  margin-right: 3px;
}
.seachBar {
  background-color: #fff;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
}
.tableBox {
  background-color: #fff;
  padding: 0px 20px 20px 20px;
}
.topBarMe {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 20px;
}
.topBarMe > div {
  margin-right: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.fullPage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  z-index: 999;
  padding-top: 30px;
}

.closeFullPage {
  position: absolute;
  right: 50%;
  margin-right: -455px;
  top: 30px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #fff;
  color: $base-txt-color;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.closeFullPage svg {
  font-size: 20px;
}
.closeFullPage:hover {
  background-color: $base-color-default;
  color: #fff;
}
.zoomin {
  animation-name: zoomin;
}
.zoomout {
  animation-name: zoomout;
}
.fullContent {
  box-sizing: border-box;
  animation-duration: 0.3s;
  width: 800px;
  background-color: #fff;
  border-radius: 10px;
  padding-bottom: 50px;
  padding-left: 30px;
  padding-right: 60px;
}
.fullPageTitle {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  padding: 50px 0px 30px 0px;
}
.uiFormInfo {
  padding-left: 50px;
  color: $base-info-color;
}
.uiFormBox {
  padding-left: 50px;
  padding-right: 50px;
}
@keyframes zoomin {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
@keyframes zoomout {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  100% {
    opacity: 0;
  }
}
.fullPageBtn {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}
.fullPageBtn .el-button {
  width: 400px;
  margin: 0 auto;
}
.faceImg {
  width: 148px;
  height: 148px;
  display: inline-block;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.faceImg .faseMask {
  position: absolute;
  color: #fff;
  font-size: 36px;
  width: 148px;
  height: 148px;
  text-align: center;
  line-height: 148px;
  top: 0;
  left: 0;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.4);
}
.upload-demo {
  display: flex;
  margin-left: 10px;
}
.upload-demo .el-upload {
  float: left;
}
.required {
  color: #f56c6c;
}
</style>

