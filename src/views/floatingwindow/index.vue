<template>
  <div id="maskedlayer" @click.self="maskCkick">
    <div class="floatingwindow">
      <!-- <SvgaComponent :src="imageUrl" class-name="svga-icon"></SvgaComponent> -->
      <div id="demoCanvas" ref="demoCanvas"></div>
      <div class="countdown">
        <CountDown v-if="countdownShow == true"></CountDown>
      </div>
      <p class="copywriting">Get more coins to continue video chatting</p>
      <div class="commodity">
        <img src="../../assets/floatingwindow/floatingwindowgoldcoin.png" alt="" />
        <p class="commodity-name">{{ moneyList.name }}</p>
        <p class="commodity-price" @click="placeClick">
          {{ moneyList.price }}
        </p>
      </div>
      <div class="button" @click="placeClick">Continue</div>
    </div>
  </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
