<template>
  <div class="first-record-container">
    <!-- 自定义切换主题 -->
    <van-config-provider :theme-vars="themeVars">
      <van-cell-group class="first-record-card" inset>
        <van-tabs v-model:active="active"
                  swipeable
                  color="white"
                  background="#42b983">
          <van-tab title="已完成">
            <van-cell-group class="first-record-tab-content">
              <van-cell v-for="firstRecord_done in firstRecord_doneList"
                        :key="firstRecord_done.recordId"
                        class="first-record-item">
              <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  {{ firstRecord_done.content }}
                  <van-icon name="like" :color="getColorByPriority(firstRecord_done.priority)"/>
                </template>
                <template #value>
                  {{ firstRecord_done.time }}
                </template>
              </van-cell>
            </van-cell-group>
          </van-tab>
          <van-tab title="待完成">
            <van-cell-group class="first-record-tab-content">
              <van-swipe-cell v-for="(firstRecord_todo, index) in firstRecord_todoList"
                              :key="firstRecord_todo.recordId"
                              >
                <van-cell class="first-record-item">
                  <template #title>
                    {{ firstRecord_todo.content }}
                    <van-icon name="like-o" :color="getColorByPriority(firstRecord_todo.priority)"/>
                  </template>
                  <template #value>
                    <!-- 待完成列表-->
                    <van-button size="small"
                                class="check-button"
                                color="#42b983"
                                icon="success"
                                @click="showConfirmPopup(index)"/>
                  </template>
                </van-cell>
                <!-- 滑块右移出现删除 -->
                <template #right>
                  <van-button square type="danger" text="删除"
                              @click="showDeleteConfirm=true; deleteRecordId=firstRecord_todo.recordId"
                              style="float:left; height:100%; background: crimson; border:0"
                  />
                </template>
              </van-swipe-cell>
            </van-cell-group>
          </van-tab>
        </van-tabs>
        <van-button icon="plus" class="first-record-add-btn" @click="showAddPopup"/>
      </van-cell-group>
    </van-config-provider>
    <!-- 添加窗口 -->
    <van-popup v-model:show="show" style="border: white solid 1vw; box-shadow: 0 0 1.5vw rgba(255, 255, 255, 0.5);">
      <van-form inset class="first-record-add-form">
        <van-cell-group>
          <div class="first-record-add-form-tittle">添 加</div>
          <van-field name="radio" label="类型" style="width:80vw">
            <template #input>
              <van-radio-group v-model="addFirstRecord.type" direction="horizontal">
                <van-radio name="已完成" checked-color="#42b983">已完成</van-radio>
                <van-radio name="待完成" checked-color="#42b983">待完成</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            v-model="addFirstRecord.priority"
            is-link
            readonly
            name="priority"
            label="等级"
            placeholder="点击选择等级"
            @click="showPicker = true;"
          />
            <van-popup v-model:show="showPicker" position="bottom" :overlay="false">
              <van-picker
                  :columns="priorities"
                  @confirm="onConfirmPriority"
                  @cancel="showPicker = false"
              />
            </van-popup>

          <van-field
              label="内容"
              v-model="addFirstRecord.content"
          />

          <van-field
              v-model="addFirstRecord.time"
              is-link
              readonly
              name="time"
              label="日期"
              placeholder="点击选择日期"
              @click="showCalendar = true"
          />
          <van-calendar v-model:show="showCalendar"
                        @confirm="onConfirmCalendar"
                        row-height="5vh"
                        :min-date="minDate"
                        :show-title="false"
                        :show-confirm="false"
                        :overlay="false"
                        :style="{ height: '50vh' }"/>

          <div>
            <van-button
                block
                type="primary"
                @click="show=false"
                class="first-record-request-btn">
              取 消
            </van-button>
            <van-button
                block
                type="primary"
                native-type="submit"
                @click="addFirstRecordFilter()"
                class="first-record-request-btn"
                style="background:#42b983">
              提 交
            </van-button>
          </div>
        </van-cell-group>
      </van-form>
    </van-popup>

    <!-- 确认窗口 -->
    <van-popup v-model:show="showConfirm" style="border: white solid 1vw; box-shadow: 0 0 1.5vw rgba(255, 255, 255, 0.5);">
      <van-form inset class="first-record-add-form">
        <van-cell-group>
          <div class="first-record-add-form-tittle">确 认</div>
          <van-field
              label="类型"
              v-model="confirmFirstRecord.type"
              disabled
              style="width:80vw"
          />
          <van-field
              v-model="confirmFirstRecord.priority"
              is-link
              readonly
              name="priority"
              label="等级"
              placeholder="点击选择等级"
              @click="showConfirmPicker = true;"
          />
          <van-popup v-model:show="showConfirmPicker" position="bottom" :overlay="false">
            <van-picker
                :columns="priorities"
                @confirm="onConfirmConfirmPriority"
                @cancel="showConfirmPicker = false"
            />
          </van-popup>

          <van-field
              label="内容"
              v-model="confirmFirstRecord.content"
          />
          <van-field
              v-model="confirmFirstRecord.time"
              is-link
              readonly
              name="time"
              label="日期"
              placeholder="点击选择日期"
              @click="showConfirmCalendar = true"
          />
          <van-calendar v-model:show="showConfirmCalendar"
                        @confirm="onConfirmConfirmCalendar"
                        row-height="5vh"
                        :min-date="minDate"
                        :show-title="false"
                        :show-confirm="false"
                        :overlay="false"
                        :style="{ height: '50vh' }"/>

          <div>
            <van-button
                block
                type="primary"
                @click="showConfirm=false"
                class="first-record-request-btn">
              取 消
            </van-button>
            <van-button
                block
                type="primary"
                native-type="submit"
                @click="confirmFirstRecordFilter()"
                class="first-record-request-btn"
                style="background:#42b983">
              提 交
            </van-button>
          </div>
        </van-cell-group>
      </van-form>
    </van-popup>

    <!-- 最终确认窗口 -->
    <van-popup v-model:show="showFinalConfirm"
               position="bottom"
               style="border: white solid 1vw; box-shadow: 0 0 1.5vw rgba(255, 255, 255, 0.5);">
      <div class="final-tittle">
        确定后就不能删除了哦，确定添加吗？
      </div>
      <div>
        <van-button
            block
            @click="showFinalConfirm=false"
            class="final-btn">
          取 消
        </van-button>
        <van-button
            block
            native-type="submit"
            @click="finalConfirm(); showFinalConfirm=false"
            class="final-btn"
            style="color: #42b983">
          确 定
        </van-button>
      </div>
    </van-popup>

    <!-- 删除确认窗口 -->
    <van-popup v-model:show="showDeleteConfirm"
               position="bottom"
               style="border: white solid 1vw; box-shadow: 0 0 1.5vw rgba(255, 255, 255, 0.5);">
      <div class="final-tittle">
        确定删除该条记录吗？
      </div>
      <div>
        <van-button
            block
            @click="showDeleteConfirm=false"
            class="final-btn">
          取 消
        </van-button>
        <van-button
            block
            native-type="submit"
            @click="request_deleteTodoFirstRecord(); showDeleteConfirm=false"
            class="final-btn"
            style="color: crimson">
          确 定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {ref} from 'vue';
import {Toast} from "vant";
import {formatDay} from "@/utils/timeUtils";
import {
  addFirstRecord, confirmTodoFirstRecord,
  deleteTodoFirstRecord,
  getFirstRecordList
} from "@/api/record/firstRecord";

export default {
  components: {
    // Dialog: Dialog.Component//！！！！血妈坑
  },
  name: "FirstRecord",
  setup() {
    const active = ref(0);
    const themeVars = {
      tabFontSize: "6vw",
      tabLineHeight: "10vh",
      tabActiveTextColor: "white",
      tabTextColor: "#525C56",
    };
    /**
     * 根据记录的优先级返回颜色
     */
    const getColorByPriority = (priority)=> {
      if (priority === "意义非凡") {
        return "crimson";
      } else if(priority === "难忘") {
        return "deeppink";
      } else {
        return "pink";
      }
    };
    const priorities = ['意义非凡', '难忘', '重要']; // 优先级列表
    const minDate = new Date(2018, 0, 1); // 最小可选择日期
    return {
      active,
      themeVars,
      priorities,
      minDate,
      getColorByPriority,
    }
  },
  mounted() {
    this.request_getFirstRecordList();
  },
  data() {
    return {
      userId: 0,
      anotherId: 1,

      deleteBtn: false,

      // 待完成列表
      firstRecord_todoList: [
        {
          recordId: 0,
          recordListId: 0,
          type: "待完成",
          content: "第一次吃饭顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
          time: "2022-10-21",
          priority: "意义非凡",
          creatorId: 0,
          history: "",
          gmtCreate: "123" ,
          gmtModified: "123"
        },
        {
          recordId: 1,
          recordListId: 0,
          type: "待完成",
          content: "第一次吃饭",
          time: "123",
          priority: "难忘",
          creatorId: 0,
          history: "",
          gmtCreate: "123" ,
          gmtModified: "123"
        },
        {
          recordId: 2,
          recordListId: 0,
          type: "待完成",
          content: "第一次吃饭",
          time: "123",
          priority: "重要",
          creatorId: 0,
          history: "",
          gmtCreate: "123" ,
          gmtModified: "123"
        }
      ],

      // 已完成列表
      firstRecord_doneList: [
        {
          recordId: 3,
          recordListId: 1,
          type: "已完成",
          content: "第一次看电影",
          time: "2022-02-19",
          priority: "意义非凡",
          creatorId: 0,
          history: "",
          gmtCreate: "2022-02-19" ,
          gmtModified: "123"
        },
        {
          recordId: 4,
          recordListId: 1,
          type: "已完成",
          content: "第一次吃饭",
          time: "123",
          priority: "难忘",
          creatorId: 0,
          history: "",
          gmtCreate: "123" ,
          gmtModified: "123"
        },
        {
          recordId: 5,
          recordListId: 1,
          type: "已完成",
          content: "第一次逛街",
          time: "123",
          priority: "重要",
          creatorId: 0,
          history: "",
          gmtCreate: "123" ,
          gmtModified: "123"
        },
      ],

      /*
      添加窗口
       */
      show: false, // 添加Popup
      showCalendar: false, // 选择日期
      showPicker: false, // 选择优先级
      // 添加记录信息
      addFirstRecord: {
        type: '', // 类型
        content: '', // 内容
        time: formatDay(), // 时间，默认为今天
        priority: '难忘', // 优先级，默认为难忘
      },

      /*
      确认窗口
       */
      showConfirm: false, // 待确认弹窗
      showConfirmCalendar: false, // 待确认日历
      showConfirmPicker: false, // 待确认选择器
      // 待确认的记录信息
      confirmFirstRecord: {
        recordId: '', // 记录id
        type: '', // 类型
        content: '', // 内容
        time: formatDay(), // 时间
        priority: '难忘', // 优先级
      },

      showFinalConfirm: false, // 最终确认的弹窗

      tag: 0, // tag为0表示为添加的操作，为1表示确认的操作

      showDeleteConfirm: false, // 删除确认的窗口
      deleteRecordId: '', // 待删除记录的id
    }
  },
  methods: {
    /**
     * 获取firstRecord列表
     */
    request_getFirstRecordList() {
      let formData = new FormData();
      formData.append('userId', this.userId);
      formData.append('anotherId', this.anotherId);
      getFirstRecordList(formData).then(resp => {
        if (resp.msg === 'OK') {
          console.log('request_getFirstRecordList --success');
          let data = resp.data;
          // 先初始化列表
          this.firstRecord_todoList = [];
          this.firstRecord_doneList = [];
          // 按类型添加到对应的列表中
          for (let i = 0; i < data.length; ++i) {
            if (data[i].type === 'todo') {
              this.firstRecord_todoList.push(data[i]);
            } else if (data[i].type === 'done'){
              this.firstRecord_doneList.push(data[i]);
            }
          }
        } else {
          console.log('request_getFirstRecordList --fail, msg=', resp.msg);
        }
      }).catch(err => {
        console.log('request_getFirstRecordList --error, ', err);
      })
    },

    // 添加记录弹窗
    showAddPopup() {
      this.show = true;
      this.showPicker = false;
      this.showCalendar = false;
      this.tag = 0;
    },
    // 添加一条firstRecord的过滤阶段
    addFirstRecordFilter() {
      let firstRecord = this.addFirstRecord;
      // 类型未选择时/内容为空时提示
      if (firstRecord.type !== '已完成' &&
          firstRecord.type !== '待完成') {
        Toast('请选择类型');
      } else if (firstRecord.content === '') {
        Toast('内容不能为空');
      } else {
        if (firstRecord.type === '已完成') {
          // 已完成的记录需要confirm一下
          this.showFinalConfirm = true;
        } else {
          this.request_addFirstRecord();
        }
      }
    },
    /**
     * 添加一条firstRecord的正式请求
      */
    request_addFirstRecord() {
      let formData = new FormData();
      formData.append('type', this.addFirstRecord.type);
      formData.append('priority', this.addFirstRecord.priority);
      formData.append('content', this.addFirstRecord.content);
      formData.append('time', this.addFirstRecord.time);
      formData.append('creatorId', this.addFirstRecord.userId);
      addFirstRecord(formData).then(resp => {
        if (resp.msg === 'OK') {
          console.log('request_addFirstRecord --success');
          Toast.success('添加成功');
          // 重置添加参数
          this.addFirstRecord.priority = '难忘';
          this.addFirstRecord.content = '';
          this.addFirstRecord.time = formatDay();
          // 添加成功后重新请求列表
          this.request_getFirstRecordList();
        } else {
          Toast.fail('添加失败');
          console.log('request_addFirstRecord --fail, msg=', resp.msg);
        }
      }).catch(err => {
        Toast.fail('出错了');
        console.log('request_addFirstRecord --error, ', err);
      })
    },

    // 确认消息弹窗 index: todoList中的索引
    showConfirmPopup(index) {
      const tmp = this.firstRecord_todoList[index];
      this.confirmFirstRecord.recordId = tmp.recordId
      this.confirmFirstRecord.type = '已完成'; // 固定为已完成
      this.confirmFirstRecord.content = tmp.content;
      this.confirmFirstRecord.date = tmp.date;
      this.confirmFirstRecord.priority = tmp.priority;
      this.showConfirm = true;
      this.tag = 1;
    },
    // 确认一条firstRecord的过滤阶段
    confirmFirstRecordFilter() {
      if (this.confirmFirstRecord.content === '') {
        Toast('内容不能为空');
      } else {
        this.showFinalConfirm = true;
      }
    },
    /**
     * 将待完成确认为已完成
     */
    request_confirmTodoFirstRecord() {
      let formData = new FormData();
      formData.append('type', this.confirmFirstRecord.type);
      formData.append('priority', this.confirmFirstRecord.priority);
      formData.append('content', this.confirmFirstRecord.content);
      formData.append('time', this.confirmFirstRecord.time);
      formData.append('creatorId', this.confirmFirstRecord.userId);
      formData.append('recordId', this.confirmFirstRecord.recordId);
      confirmTodoFirstRecord(formData).then(resp => {
        if (resp.msg === 'OK') {
          console.log('request_confirmTodoFirstRecord --success');
          Toast.success('确认成功');
          // 确认成功后重新请求列表 todo 或者不做网络io
          this.request_getFirstRecordList();
        } else {
          Toast.fail('确认失败');
          console.log('request_confirmTodoFirstRecord --fail, msg=', resp.msg);
        }
      }).catch(err => {
        Toast.fail('出错了');
        console.log('request_confirmTodoFirstRecord --error, ', err);
      })
    },

    // 最后的确认
    finalConfirm() {
      console.log(this.tag)
      if (this.tag === 0) this.request_addFirstRecord();
      else if (this.tag === 1) this.request_confirmTodoFirstRecord();
    },

    /**
     * 删除待完成记录
     */
    request_deleteTodoFirstRecord() {
      let formData = new FormData();
      formData.append('recordId', this.deleteRecordId);
      deleteTodoFirstRecord().then(resp => {
        if (resp.msg === 'OK') {
          console.log('request_deleteTodoFirstRecord --success');
          Toast.success('删除成功');
          // 删除成功后重新请求列表
          this.request_getFirstRecordList();
        } else {
          Toast.fail('删除失败');
          console.log('request_deleteTodoFirstRecord --fail, msg=', resp.msg);
        }
      }).catch(err => {
        Toast.fail('出错了');
        console.log('request_deleteTodoFirstRecord --error, ', err);
      })
    },

    // 选择器确认
    onConfirmPriority(priority) {
      this.addFirstRecord.priority = priority;
      this.showPicker = false;
    },

    // 选择器确认
    onConfirmConfirmPriority(priority) {
      this.confirmFirstRecord.priority = priority;
      this.showConfirmPicker = false;
    },

    // 日期确认
    onConfirmCalendar(date) {
      this.addFirstRecord.time = formatDay(date);
      this.showCalendar = false;
    },

    onConfirmConfirmCalendar(date) {
      this.confirmFirstRecord.time = formatDay(date);
      this.showConfirmCalendar = false;
    },
  },
}
</script>

<style lang="scss" scoped>

.first-record-container {
  /*todo 只能通过内置边距的形式来控制距离，不然背景就跟着一起下移了*/
  padding-top: 10vh;
}

.first-record-card {
  margin: auto;
  width: 80vw;
  //height: 70vh;
  border-radius: 3.5vw;
  border: seashell solid 1.5vw;
  box-shadow: 0 0 1.2vw rgba(0, 0, 0, 60);
}

.first-record-tab-content {
  height:59.5vh;
  background: seashell;
  overflow: auto;
}

.first-record-item {
  margin-bottom: 0.8vw;
  font-size: 4vw;
  //width: 78.4vw;
  //margin-left: 0.8vw;
  text-align: left;
}

.check-button-container {
  height: 6vw;
  width: 12vw;
  background: #42b983;
  padding-bottom: 1vw;
}
.check-button {
  height: 6vw;
  width: 12vw;
  font-size: 3vw;
  float: right;
  text-align: center;
}

.first-record-add-btn {
  width: 100%;
  height: 6vh;
  //display: inline;
  color: white;
  font-size: 7vw;
  background: #42b983;
  border-bottom-left-radius: 1.2vw;
  border-bottom-right-radius: 1.2vw;
}

.first-record-add-form {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.first-record-add-form-tittle {
  font-size: 6vw;
  color: white;
  margin: auto auto 1.5vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
  background: #42b983;
}

.first-record-request-btn {
  margin-top: 32vw; font-size: 6vw; background: grey; float: left; width: 50%; border: 0
}

.final-tittle {
  margin-top: 8vh;
  margin-bottom: 8vh;
  font-size: 5vw;
}

.final-btn {
  font-size: 5vw; background: white; float: left; width: 50%; border: 0.2vw solid grey;
}

</style>