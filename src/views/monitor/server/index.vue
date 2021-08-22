<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <cpu />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        内存
        <cpu />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        硬盘
        <cpu />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        负载
        <cpu />
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header"><span>CPU</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="is-leaf"><div class="cell">属性</div></th>
                  <th class="is-leaf"><div class="cell">值</div></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="cell">核心数</div></td>
                  <td><div v-if="server.cpu" class="cell">{{ server.cpu.cpuNum }}</div></td>
                </tr>
                <tr>
                  <td><div class="cell">用户使用率</div></td>
                  <td><div v-if="server.cpu" class="cell">{{ server.cpu.used }}%</div></td>
                </tr>
                <tr>
                  <td><div class="cell">系统使用率</div></td>
                  <td><div v-if="server.cpu" class="cell">{{ server.cpu.sys }}%</div></td>
                </tr>
                <tr>
                  <td><div class="cell">当前空闲率</div></td>
                  <td><div v-if="server.cpu" class="cell">{{ server.cpu.free }}%</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header"><span>内存</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="is-leaf"><div class="cell">属性</div></th>
                  <th class="is-leaf"><div class="cell">内存</div></th>
                  <th class="is-leaf"><div class="cell">JVM</div></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="cell">总内存</div></td>
                  <td><div v-if="server.mem" class="cell">{{ server.mem.total }}G</div></td>
                  <td><div v-if="server.jvm" class="cell">{{ server.jvm.total }}M</div></td>
                </tr>
                <tr>
                  <td><div class="cell">已用内存</div></td>
                  <td><div v-if="server.mem" class="cell">{{ server.mem.used }}G</div></td>
                  <td><div v-if="server.jvm" class="cell">{{ server.jvm.used }}M</div></td>
                </tr>
                <tr>
                  <td><div class="cell">剩余内存</div></td>
                  <td><div v-if="server.mem" class="cell">{{ server.mem.free }}G</div></td>
                  <td><div v-if="server.jvm" class="cell">{{ server.jvm.free }}M</div></td>
                </tr>
                <tr>
                  <td><div class="cell">使用率</div></td>
                  <td><div v-if="server.mem" class="cell" :class="{'text-danger': server.mem.usage > 80}">{{ server.mem.usage }}%</div></td>
                  <td><div v-if="server.jvm" class="cell" :class="{'text-danger': server.jvm.usage > 80}">{{ server.jvm.usage }}%</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span>服务器信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td><div class="cell">服务器名称</div></td>
                  <td><div v-if="server.sys" class="cell">{{ server.sys.computerName }}</div></td>
                  <td><div class="cell">操作系统</div></td>
                  <td><div v-if="server.sys" class="cell">{{ server.sys.osName }}</div></td>
                </tr>
                <tr>
                  <td><div class="cell">服务器IP</div></td>
                  <td><div v-if="server.sys" class="cell">{{ server.sys.computerIp }}</div></td>
                  <td><div class="cell">系统架构</div></td>
                  <td><div v-if="server.sys" class="cell">{{ server.sys.osArch }}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span>Java虚拟机信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td><div class="cell">Java名称</div></td>
                  <td><div v-if="server.jvm" class="cell">{{ server.jvm.name }}</div></td>
                  <td><div class="cell">Java版本</div></td>
                  <td><div v-if="server.jvm" class="cell">{{ server.jvm.version }}</div></td>
                </tr>
                <tr>
                  <td><div class="cell">启动时间</div></td>
                  <td><div v-if="server.jvm" class="cell">{{ server.jvm.startTime }}</div></td>
                  <td><div class="cell">运行时长</div></td>
                  <td><div v-if="server.jvm" class="cell">{{ server.jvm.runTime }}</div></td>
                </tr>
                <tr>
                  <td colspan="1"><div class="cell">安装路径</div></td>
                  <td colspan="3"><div v-if="server.jvm" class="cell">{{ server.jvm.home }}</div></td>
                </tr>
                <tr>
                  <td colspan="1"><div class="cell">项目路径</div></td>
                  <td colspan="3"><div v-if="server.sys" class="cell">{{ server.sys.userDir }}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span>磁盘状态</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="is-leaf"><div class="cell">盘符路径</div></th>
                  <th class="is-leaf"><div class="cell">文件系统</div></th>
                  <th class="is-leaf"><div class="cell">盘符类型</div></th>
                  <th class="is-leaf"><div class="cell">总大小</div></th>
                  <th class="is-leaf"><div class="cell">可用大小</div></th>
                  <th class="is-leaf"><div class="cell">已用大小</div></th>
                  <th class="is-leaf"><div class="cell">已用百分比</div></th>
                </tr>
              </thead>
              <tbody v-if="server.sysFiles">
                <tr v-for="sysFile in server.sysFiles">
                  <td><div class="cell">{{ sysFile.dirName }}</div></td>
                  <td><div class="cell">{{ sysFile.sysTypeName }}</div></td>
                  <td><div class="cell">{{ sysFile.typeName }}</div></td>
                  <td><div class="cell">{{ sysFile.total }}</div></td>
                  <td><div class="cell">{{ sysFile.free }}</div></td>
                  <td><div class="cell">{{ sysFile.used }}</div></td>
                  <td><div class="cell" :class="{'text-danger': sysFile.usage > 80}">{{ sysFile.usage }}%</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getServer } from '@/api/monitor/server'
import Cpu from '@/views/monitor/server/profile/cpu'

export default {
  name: 'Server',
  components: { Cpu },
  data() {
    return {
      // 加载层信息
      loading: [],
      // 服务器信息
      server: []
    }
  },
  created() {
    this.getList()
    this.openLoading()
  },
  methods: {
    /** 查询服务器信息 */
    getList() {
      getServer().then(response => {
        this.server = response.data
        this.loading.close()
      })
    },
    // 打开加载层
    openLoading() {
      this.loading = this.$loading({
        lock: true,
        text: '拼命读取中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
