<template>
  <div class="table-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form class="seachBar" :model="queryForm" :inline="true">
          <el-form-item label="设备名字">
            <el-input
              v-model="queryForm.devicename"
              placeholder="请输入名字"
              size="medium"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="queryForm.devicestatus"
              placeholder="请选择状态"
            >
              <el-option label="全部" :value="undefined"></el-option>
              <el-option label="在线" :value="1"></el-option>
              <el-option label="离线" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input
              v-model="queryForm.ip"
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
        <div class="topBarMe">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="medium"
            @click="changeForm('', 'add')"
          >
            添加
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="medium"
            @click="handleDelete('', 'more')"
          >
            删除
          </el-button>
        </div>
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
              label="编号"
              prop="id"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="是否禁用"
              align="center"
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.disabled | formartDisabled }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="设备类型"
              align="center"
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.type | formartDeviceType }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="设备名称"
              prop="devicename"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="IP地址"
              prop="ip"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="设备位置"
              prop="location"
              align="center"
            ></el-table-column>
            <el-table-column show-overflow-tooltip label="备注" align="center">
              <template slot-scope="scope">
                <span>
                  {{ scope.row.remark || "暂无" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="创建时间"
              prop="createtime"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="绑定人数"
              prop="number"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="设备状态"
              prop="devicestatus"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag :type="scope.row.devicestatus | formartType">
                  {{ scope.row.devicestatus | formartStatus }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="230" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="changeForm(scope.row, 'edit')"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.row, 'one',scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
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

    <!-- 添加的信息 -->
    <el-dialog :title="fullPageTitle" width="40%" :visible.sync="fullPageShow">
      <el-form :model="xform" label-position="right" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item>
              <span slot="label">
                <span class="required">*</span>
                编号
              </span>
              <el-input
                v-model="xform.id"
                size="medium"
                placeholder="输入设备编号"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span class="required">*</span>
                创建时间
              </span>
              <el-date-picker
                v-model="xform.createtime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span class="required">*</span>
                名称
              </span>
              <el-input
                v-model="xform.devicename"
                size="medium"
                placeholder="输入设备名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <span slot="label">
                <span class="required">*</span>
                状态
              </span>
              <el-radio-group v-model="xform.disabled">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <span slot="label">
                <span class="required">*</span>
                类型
              </span>
              <el-select v-model="xform.type" placeholder="请选择">
                <el-option label="面板机" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <span slot="label">
                <span class="required">*</span>
                地址
              </span>
              <el-input
                v-model="xform.location"
                size="medium"
                placeholder="输入地址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <span slot="label">
                <span class="required">*</span>
                设备IP
              </span>
              <el-input
                v-model="xform.ip"
                size="medium"
                placeholder="输入设备IP"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subxform">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addDevice,
  queryAll,
  deleteDevice,
  updateDevice,
} from "@/api/management";
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
        newStr = "离线";
      } else {
        newStr = "在线";
      }
      return newStr;
    },
    formartDeviceType(type) {
      let newStr = "";
      if (type === 1) {
        newStr = "面板机";
      } else {
        newStr = "其他";
      }
      return newStr;
    },
    formartDisabled(status) {
      let newStr = "";
      if (status === 0) {
        newStr = "启用";
      } else {
        newStr = "禁用";
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
        id: undefined,
        devicename: undefined, //设备名字
        devicestatus: undefined, //设备状态
        disabled: 0, //设备是否禁用
        ip: undefined, //设备IP
        lastconnectiontime: undefined, //设备最后一次在线时间
        location: undefined, //设备地址
        message: undefined,
        message2: undefined,
        noper: undefined,
        ntag: undefined,
        ntag2: undefined,
        remark: undefined, //备注
        type: 1, //设备类型
        uuid: undefined,
        workmodel: undefined,
      },
      list: [],
      listLoading: false,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      elementLoadingText: "正在加载...",
      queryForm: {
        deviceId: undefined, //设备ID
        deviceName: undefined, //设备名字
        devicestatus: undefined, //设备状态
        ip: undefined,
        pageNum: 1,
        pageSize: 20, //分页
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
        deviceId: 0,
        deviceName: "",
        devicestatus: undefined,
        ip: "",
        pageNum: 1,
        pageSize: 20,
      };
      this.fetchData();
      this.$router.go(0);
    },
    //删除
    handleDelete(data,type,index) {
      if (type == "one") {
        let pamrams = {
          id: data.id,
        };
        this.$baseConfirm(
          "你确定要删除" + data.devicename + "吗",
          null,
          async () => {
            const res = await deleteDevice(pamrams);
            if (res.code===0) {
              this.$baseMessage("已删除", "success");
              this.list.splice(index,1)
              this.fetchData();
            } else {
              this.$baseMessage("删除出错", "error");
            }
          }
        );
      } else {
        this.$baseMessage("暂时不支持多选删除", "error");
      }
      // this.$forceUpdate();
      this.fetchData();
    },
    changeForm(item, type) {
      this.fullPageShow = true;
      if (type == "add") {
        this.fullPageTitle = "增加设备";
        this.xform = {
          devicename: undefined,
          devicestatus: undefined,
          disabled: 0,
          ip: undefined,
          lastconnectiontime: undefined,
          location: undefined,
          message: undefined,
          message2: undefined,
          noper: undefined,
          ntag: undefined,
          ntag2: undefined,
          remark: undefined,
          type: 1,
          uuid: undefined,
          workmodel: undefined,
          id: undefined,
        };
      } else {
        this.fullPageTitle = "编辑人员";
        this.xform.devicename = item.devicename;
        this.xform.devicestatus = item.devicestatus;
        this.xform.disabled = item.disabled;
        this.xform.ip = item.ip;
        this.xform.lastconnectiontime = item.lastconnectiontime;
        this.xform.location = item.location;
        this.xform.message = item.message;
        this.xform.message2 = item.message2;
        this.xform.noper = item.noper;
        this.xform.ntag = item.ntag;
        this.xform.remark = item.remark;
        this.xform.type = item.type;
        this.xform.uuid = item.uuid;
        this.xform.workmodel = item.workmodel;
        this.xform.id = item.id;
        this.xform.createtime = item.createtime;
      }
    },
    async subxform() {
      if (this.fullPageTitle === "增加设备") {
        const data = await addDevice(this.xform);
        if (data) {
          this.$baseMessage("已添加", "success");
          this.fullPageShow = false;
          this.fetchData();
        } else {
          this.$baseMessage("添加失败", "error");
        }
      } else {
        const res = await updateDevice(this.xform);
        if (res !== 0) {
          this.$baseMessage("编辑成功", "success");
          this.fullPageShow = false;
          this.fetchData();
        } else {
          this.$baseMessage("编辑失败", "error");
        }
      }
    },
    async fetchData() {
      this.listLoading = true;
      const data = await queryAll(this.queryForm);
      if (data) {
        this.list = data.items;
        this.total = data.count;
        setTimeout(() => {
          this.listLoading = false;
        }, 200);
      } else {
        setTimeout(() => {
          this.listLoading = false;
        }, 200);
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
// .uiFormTitle {
//   font-weight: 600;
//   font-size: 20px;
//   padding-left: 50px;
//   margin-top: 40px;
//   margin-bottom: 10px;
// }
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

