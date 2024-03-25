<template>
  <!-- <svg class="ring-container" :style="`width: ${size}; height: ${size}`">
    <circle
      :cx="cx"
      :cy="cx"
      :r="r"
      :stroke="backgroundColor"
      :stroke-width="width"
      stroke-linecap="round"
      fill="none"
    ></circle>
    <circle
      :cx="cx"
      :cy="cx"
      :r="r"
      class="ring"
      :stroke-width="width"
      :stroke="color"
      :stroke-dasharray="`${circum}`"
      stroke-linecap="round"
      fill="none"
    >
      <animate
        attributeName="stroke-dashoffset"
        :from="circum"
        :to="endCircum"
        :dur="originCountDown"
      />
    </circle>
    <text
      :x="cx + 12"
      :y="cx + 12"
      text-anchor="end"
      :font-size="fontSize + 5"
      :fill="fontColor"
    >
      {{ countDown }}
    </text> -->
    <!-- <text :x="cx + 5" :y="cx + 10" text-anchor="start" :font-size="fontSize - 5" :fill="fontColor">
      
    </text> -->
  <!-- </svg> -->
</template>
<!-- 
<script>
import { notice } from "../api/index";
export default {
  name: "CircleLoad",
  data() {
    return {
      endCircum: 0,
      countDown: this.originCountDown,
    };
  },
  computed: {
    cx() {
      // 中心点位置
      return this.size / 2;
    },
    r() {
      // 半径
      return this.size / 2 - this.width + 2;
    },
    circum() {
      return parseInt(this.r * Math.PI * 2);
    },
  },
  props: {
    fontSize: {
      type: Number,
      default: 25,
    },
    size: {
      type: Number,
      default: 100,
    },
    width: {
      type: Number,
      default: 5,
    },
    backgroundColor: {
      type: String,
      // default: "#f0f0f0",
    },
    color: {
      type: String,
      default: "#fff",
    },
    fontColor: {
      type: String,
      default: "#fff",
    },
    originCountDown: {
      type: Number,
      default: 10,
    },
  },
  mounted() {
    this.intervals();
  },
  methods: {
    intervals() {
      this.interval = setInterval(() => {
        let diff = "1";
        this.countDown -= diff;
        if (this.countDown <= 0) {
          notice(1);
          clearInterval(this.interval);
        }
      }, 1000);
    },
  },
  destroyed() {
    clearInterval(this.myInterval);
  },
};
</script>

<style lang="scss">
.ring-container {
  border-radius: 50%;
  background: rgba($color: #fff, $alpha: 0.3);

  .ring {
    width: 100px !important;
    height: 100px !important;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
}
</style> -->
