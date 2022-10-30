<template>
  <div class="main-container">
    <swiper
        ref="mySwiper"
        :effect="'cards'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :cards-effect="{
          perSlideOffset: 14,
          perSlideRotate: 3,
          slideShadows: false,
        }"
        @slideChange="onSlideChange"
        :loop="true"
        :modules="modules"
    >
      <swiper-slide v-for="(functionBar, index) in functionBars" :key="functionBar">
        <button class="functionBar" :style="randomRgb(index)" @click="goToFunctionPage(index)">
          {{ functionBar.name }}
        </button>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import {Swiper, SwiperSlide} from "swiper/vue";

import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCards } from "swiper";

export default {
  name: "HomePage",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      functionBars: [
        {
          name: "测试1",
          url: "/firstRecord"
        },
        {
          name: "测试2",
          url: "/firstRecord"
        },
        {
          name: "测试3",
          url: "/firstRecord"
        },
        {
          name: "测试4",
          url: "/firstRecord"
        },
      ],
      nowFunctionIndex: 0, // 当前的索引
    }
  },
  methods: {
    /**
     * 只有swiper对象才可以触发，滑动时更新当前的索引值
     */
    onSlideChange(swiper) {
      this.nowFunctionIndex = swiper.activeIndex % this.functionBars.length;
      console.log(this.nowFunctionIndex);
    },
    goToFunctionPage(index) {
      if (index === this.nowFunctionIndex) {
        this.$router.push(this.functionBars[index].url);
      }
    }
  },
  setup() {
    const randomRgb = (index) => {
      let colorList = [
        "#f1dbff", "#8cd5fe", "#bde3cc", "#fed9a5",
        "#f1fe88", "#feafaf", "#b8b7fe"
      ]
      return {
        backgroundColor: colorList[index % colorList.length]
      };
    };
    return {
      modules: [EffectCards],
      randomRgb
    };
  },
};
</script>

<style lang="scss">
.main-container {
  width: 100vw;
  height: 100vh;
}
.swiper {
  width: 80vw;
  height: 50vh;
  padding-top: 20vh;
  padding-right: 17vw;
}

.swiper-slide {
  border-radius: 8vw; //外边框设置的弧度要与内按键相同，不然就出现残影
  width: 45vw;
  height: 45vh;
}

.functionBar {
  color: black;
  height: 40vh;
  width: 60vw;
  font-size: 10vw;
  font-family: "黑体","微软雅黑","宋体",sans-serif;
  font-weight: bold;
  border-radius: 8vw;
  border-left-color: black;
  border-right-color: black;
  border-width: 2vw;
  border-top-color: black;
  border-bottom-color: black;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 60);
  background: center;
  &:hover {
    //background: white !important; // 子模块的hover背景色
    color: white;
    cursor: pointer;
    //color:
  }
}

</style>