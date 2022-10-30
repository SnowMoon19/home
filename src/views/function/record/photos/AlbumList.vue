<template>
  <div class="album-list-container">
    <van-config-provider :theme-vars="themeVars">
      <div class="album-list-card">
          <div class="album-list-tittle">相 册</div>
          <div class="album-list-main">
            <van-grid :border="false" :column-num="2">
              <van-grid-item v-for="album in albumList" :key="album.albumId" >
                <van-button type="primary" class="album-list-item" @click="goToAlbum(album.albumId)">{{ formatAlbumName(album.name) }}</van-button>
              </van-grid-item>
            </van-grid>
          </div>
          <van-button icon="plus" class="album-list-add-btn" @click="showAddAlbumPopup()"/>
      </div>
    </van-config-provider>

    <!-- 添加窗口 -->
    <van-popup v-model:show="showAddAlbum" style="border: white solid 1vw; box-shadow: 0 0 1.5vw rgba(255, 255, 255, 0.5);">
      <van-form inset class="album-list-add-form">
        <van-cell-group>
          <div class="album-list-add-form-tittle">添 加</div>
          <van-field
              label="相册名"
              v-model="addAlbum.name"
              style="width: 80vw"
          />
          <div>
            <van-button
                block
                type="primary"
                @click="showAddAlbum=false"
                class="album-list-request-btn">
              取 消
            </van-button>
            <van-button
                block
                type="primary"
                native-type="submit"
                @click="request_addAlbum"
                class="album-list-request-btn"
                style="background:cornflowerblue">
              提 交
            </van-button>
          </div>
        </van-cell-group>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import {ref} from "vue";
import {isNull, nameDealt} from "@/utils/validate";
import {addAlbum, getAlbumList} from "@/api/record/photos";
import {Toast} from "vant";

export default {
  name: "AlbumList",
  mounted() {
    this.request_getAlbumList();
  },
  setup() {
    const active = ref(0);
    const themeVars = {
      gridItemContentPadding: '0',
      gridItemContentBackgroundColor: 'whitesmoke',
      gridItemContentActiveColor: 'blue',
    };
    // 格式化相册名，超出6个字以省略号替代
    const formatAlbumName = (name)=> {
      return nameDealt(name, 10);
    };
    return {
      active,
      themeVars,
      formatAlbumName,
    }
  },
  data() {
    return {
      userId: 0,
      anotherId: 1,

      albumList: [
        {
          albumId: 0,
          name: 'test011dd2',
          creatorId: 0,
        },
        {
          albumId: 1,
          name: '顶顶顶顶顶顶顶顶顶顶',
          creatorId: 0,
        },
        {
          albumId: 2,
          name: 'test2',
          creatorId: 0,
        },
        {
          albumId: 3,
          name: 'test3',
          creatorId: 0,
        },
        {
          albumId: 4,
          name: 'test4',
          creatorId: 0,
        },
        {
          albumId: 5,
          name: 'test5',
          creatorId: 0,
        },
        {
          albumId: 6,
          name: 'test6',
          creatorId: 0,
        }
      ],

      /*
      添加窗口
       */
      showAddAlbum: false, // 添加Popup
      // 添加记录信息
      addAlbum: {
        name: '', // 名称
      },
    }
  },
  methods: {
    // 进入相册
    goToAlbum(albumId) {
      this.$router.push({ path: '/albumList/albumShow', query: { albumId: albumId }})
    },
    // 展示添加相册
    showAddAlbumPopup() {
      this.showAddAlbum = true;
      this.addAlbum.name = '';
    },
    /**
     * 获取相册列表
     */
    request_getAlbumList() {
      let formData = new FormData();
      formData.append('userId', this.userId);
      formData.append('anotherId', this.anotherId);
      getAlbumList(formData).then(resp => {
        if (resp.msg === 'OK') {
          console.log('request_getAlbumRecordList --success');
          let data = resp.data;
          // 先初始化列表
          this.albumList = [];
          // 按类型添加到对应的列表中
          for (let i = 0; i < data.length; ++i) {
            this.albumList.append(data[i]);
          }
        } else {
          console.log('request_getAlbumRecordList --fail, msg=', resp.msg);
        }
      }).catch(err => {
        console.log('request_getAlbumRecordList --error, ', err);
      })
    },
    /**
     * 添加相册
     */
    request_addAlbum() {
      if (isNull(this.addAlbum.name)) {
        Toast('相册名不能为空');
      } else {
        let formData = new FormData();
        formData.append('creatorId', this.userId);
        formData.append('name', this.addAlbum.name);
        addAlbum(formData).then(resp => {
          if (resp.msg === 'OK') {
            console.log('request_addAlbum --success');
            Toast.success('添加成功');
            // 重置添加参数
            this.addAlbum.name = '';
            // 添加成功后重新请求列表
            this.request_getAlbumList();
          } else {
            Toast.fail('添加失败');
            console.log('request_addAlbum --fail, msg=', resp.msg);
          }
        }).catch(err => {
          Toast.fail('出错了');
          console.log('request_addAlbum --error, ', err);
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>

.album-list-container {
  /*todo 只能通过内置边距的形式来控制距离，不然背景就跟着一起下移了*/
  padding-top: 10vh;
}

.album-list-card {
  margin: auto;
  width: 80vw;
  padding: 0;
  //height: 70vh;
  background: whitesmoke;
  border:1.5vw solid cornflowerblue;
  border-radius: 3.5vw;
  box-shadow: 0 0 1.2vw rgba(0, 0, 0, 60);
}

.album-list-tittle {
  font-size: 6vw;
  font-weight: bold;
  color: white;
  margin: auto;
  padding-top: 1vw;
  padding-bottom: 1vw;
  border-bottom: 1.5vw solid cornflowerblue;
  border-top-left-radius: 1.2vw;
  border-top-right-radius: 1.2vw;
  background: #f0cfd4;
}

.album-list-main {
  overflow: auto;
  height: 59.5vh;
}

.album-list-item {
  width:33vw;
  height: 12vh;
  margin: 3vh auto;
  color: white;
  font-size: 6vw;
  background: rgba(100, 149, 237, 0.72);
  border-radius: 3.5vw;
  border:1vw #f0cfd4 solid;
  box-shadow: 0 0 1.5vw rgba(0, 0, 0, 60);
}

.album-list-add-btn {
  width: 100%;
  height: 6vh;
  border-bottom-left-radius: 1.2vw;
  border-bottom-right-radius: 1.2vw;
  color: white;
  font-size: 7vw;
  border-top: 1.5vw solid cornflowerblue;
  background: #f0cfd4;
}

.album-list-add-form {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.album-list-add-form-tittle {
  font-size: 6vw;
  color: white;
  margin: auto auto 1.5vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
  background: cornflowerblue;
}

.album-list-request-btn {
  margin-top: 8vw; font-size: 6vw; background: grey; float: left; width: 50%; border: 0
}

</style>