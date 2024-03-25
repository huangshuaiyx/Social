<template>
  <div class="carousel">
    <transition-group name="carousel">
      <div v-for="(item, index) in images" :key="item.id" :class="getSlideClasses(index)">
        <img :src="item.url" alt="Slide" @click="selectSlide(index)" />
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { id: 1, url: require('../assets/editData/avtarone.png') },
        { id: 2, url: require('../assets/editData/avtarthree.png') },
        { id: 3, url: require('../assets/editData/avtartwo.png') },
        // 添加更多图片...
      ],
      selectedSlide: 0,
    };
  },
  methods: {
    selectSlide(index) {
      this.selectedSlide = index;
    },
    getSlideClasses(index) {
      return {
        'carousel-slide': true,
        'carousel-slide-selected': index === this.selectedSlide,
        'carousel-slide-left': index === this.selectedSlide - 1,
        'carousel-slide-right': index === this.selectedSlide + 1,
      };
    },
  },
};
</script>

<style lang="scss">
.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 200px;

  /* 轮播容器的高度 */
  span {
    display: flex;
  }
}

.carousel-slide {
  flex: 1;
  transition: transform 0.5s infinite;
}

.carousel-slide-selected {
  transform: scale(1.2);
  /* 中间图片放大 */
}

.carousel-slide-left {
  transform: scale(0.8);
  /* 左边图片缩小 */
}

.carousel-slide-right {
  transform: scale(0.8);
  /* 右边图片缩小 */
}</style>
