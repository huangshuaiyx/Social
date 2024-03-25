<template>
  <div class="Customerservicecenter">
    <van-nav-bar
      title="客服中心"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.go(-1)"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" />
      </template>
      <template #right>
        <van-icon name="cross" size="20" color="#333" />
      </template>
    </van-nav-bar>

    <div class="selfHelp">
      <p>自助服务</p>
      <figure>
        <figcaption></figcaption>
      </figure>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.Customerservicecenter {
  width: 100%;
  height: 100%;
  .selfHelp{
      width: 90%;
      height: 5rem;
      border: solid 1px;
      border-radius: 0.5rem;
      margin: 0 auto;
  }
} 
</style>