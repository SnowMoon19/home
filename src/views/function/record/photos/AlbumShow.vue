<template>
  <div class="album-show-container">
    <van-button @click="sortPhotosByDate">sd</van-button>
    <div class="album-show-card">
      <div class="album-show-main">
        <van-cell-group v-for="(photoShow, index) in photoShowList" :key="photoShow" style="overflow: auto;">
          <van-divider style="font-size: 6vw">{{ photoShow[0].gmtCreate }}</van-divider>
          <el-image
              v-for="(photo, idx) in photoShow" :key="photo.photoId"
              style="width: 31vw; height: 31vw; float: left; margin-left: 0.5vw; margin-bottom: 0.5vw;"
              :src="photo.photoUrl"
              :preview-src-list="photoShowUrlList[index]"
              :initial-index=idx
              fit="cover"
          />
        </van-cell-group>
      </div>
      <van-button icon="plus" class="album-show-add-btn" @click="showUploadPhotos=true"/>
    </div>

    <!-- 添加窗口 -->
    <van-popup v-model:show="showUploadPhotos" style="border: white solid 1vw; box-shadow: 0 0 1.5vw rgba(255, 255, 255, 0.5);">
      <van-form inset class="album-show-add-form">
        <van-cell-group>
          <div class="album-show-add-form-tittle">上 传</div>
          <van-uploader
              style="width: 88vw;"
              v-model="uploadFileList"
              multiple
              :max-count="5"
              :max-size="20 * 500 * 1024"
              @oversize="onOversize"
          />
          <div>
            <van-button
                block
                type="primary"
                @click="showUploadPhotos=false"
                class="album-show-request-btn">
              取 消
            </van-button>
            <van-button
                block
                type="primary"
                native-type="submit"
                @click="request_uploadPhotos"
                class="album-show-request-btn"
                style="background:#f0cfd4">
              确 认
            </van-button>
          </div>
        </van-cell-group>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "AlbumShow",
  data() {
    return {
      photoList: [
        {
          photoId: 0,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          extra: 1,
          gmtCreate: '2022/10/22',
          gmtModified: 1,
        },
        {
          photoId: 0,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          extra: 1,
          gmtCreate: '2022/10/22',
          gmtModified: 1,
        },
        {
          photoId: 0,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          extra: 1,
          gmtCreate: '2022/10/22',
          gmtModified: 1,
        },
        {
          photoId: 0,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          extra: 1,
          gmtCreate: '2022/10/22',
          gmtModified: 1,
        },
        {
          photoId: 1,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
          extra: 1,
          gmtCreate: '2022/10/22',
          gmtModified: 1,
        },
        {
          photoId: 2,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          extra: 1,
          gmtCreate: '2022/10/23',
          gmtModified: 1,
        },
        {
          photoId: 3,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
          extra: 1,
          gmtCreate: '2022/10/23',
          gmtModified: 1,
        },
        {
          photoId: 4,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          extra: 1,
          gmtCreate: '2022/10/23',
          gmtModified: 1,
        },
        {
          photoId: 4,
          albumId: 0,
          creatorId: 1,
          photoUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          extra: 1,
          gmtCreate: '2022/10/24',
          gmtModified: 1,
        },
      ], // 获取全部相册照片

      photoShowList: [], // 展示相册的列表，按时间归类
      photoShowUrlList: [], // url预览列表，相当于单独提取url供预览

      showUploadPhotos: false,
      uploadFileList: [],

    }
  },
  mounted() {
    // this.sortPhotosByDate();
  },
  methods: {
    request_getPhotoList() {

    },

    // 对照片按时间进行分类
    sortPhotosByDate() {
      let date = new Map;
      for (let i = 0; i < this.photoList.length; ++i) {
        let tmp = this.photoList[i].gmtCreate;
        if (date.has(tmp)) {
          this.photoShowList[date.get(tmp)].push(this.photoList[i]);
          this.photoShowUrlList[date.get(tmp)].push(this.photoList[i].photoUrl);
        } else {
          date.set(tmp, this.photoShowList.length);
          let tmp_list = [];
          tmp_list.push(this.photoList[i]);
          let tmp_url_list = [];
          tmp_url_list.push(this.photoList[i].photoUrl);
          this.photoShowList.push(tmp_list);
          this.photoShowUrlList.push(tmp_url_list);
        }
      }
    },

    // 照片设置最大20MB
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 20mb');
    },

  }
}
</script>

<style scoped lang="scss">
.album-show-container {
  /*todo 只能通过内置边距的形式来控制距离，不然背景就跟着一起下移了*/
  padding-top: 10vh;
}

.album-show-card {
  margin: auto;
  width: 95vw;
  padding: 0;
  background: whitesmoke;
  border:2vw solid #f0cfd4;
  border-radius: 3.5vw;
  box-shadow: 0 0 1.2vw rgba(0, 0, 0, 60);
}

.album-show-main {
  overflow: auto;
  height: 79.5vh;
}

.album-show-add-btn {
  width: 100%;
  height: 6vh;
  border-bottom-left-radius: 1.2vw;
  border-bottom-right-radius: 1.2vw;
  color: white;
  font-size: 7vw;
  border-top: 2vw solid #f0cfd4;
  background: cornflowerblue;
}

.album-show-add-form {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.album-show-add-form-tittle {
  font-size: 6vw;
  color: white;
  margin: auto auto 1.5vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
  background: #f0cfd4;
}

.album-show-request-btn {
  margin-top: 8vw; font-size: 6vw; background: grey; float: left; width: 50%; border: 0
}

</style>