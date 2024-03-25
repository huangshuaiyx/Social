<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg,}" />
    <div class="sidebar-resize" title="收缩侧边栏">
			⋮
		</div>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'Layout',
  data () {
    return{
        SideBarW: ''
    }
  },
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables() {
      return variables;
    }
  },
  created() {

  },
  mounted() {
    var system = {};
    system.pingtai = /(Win32|Win16|WinCE|Mac68K|MacIntel|MacIntel|MacPPC|Linux mips64)/i.test(navigator.platform);
    if (system.pingtai) {
    //电脑
    } else {  
    //手机
    document.getElementsByClassName('sidebar-resize')[0].style.display = 'none'
    }
    document.getElementsByClassName('sidebar-container')[0].style.width =  window.localStorage.getItem('SideBarW') ? window.localStorage.getItem('SideBarW') + 'px': '260px'
  document.getElementsByClassName('sidebar-resize')[0].style.marginLeft =  window.localStorage.getItem('SideBarW') ? window.localStorage.getItem('SideBarW') + 'px': '260px'
    // window.localStorage.removeItem('SideBarW')
    this.dragControllerDiv()
  },
  methods: {
    dragControllerDiv () {
        let that = this
        var resize = document.getElementsByClassName('sidebar-resize');
        var left = document.getElementsByClassName('sidebar-container');
        var mid = document.getElementsByClassName('main-container');
        var box = document.getElementsByClassName('app-wrapper');
        for (let i = 0; i < resize.length; i++) {
            // 鼠标按下事件
            resize[i].onmousedown = function (e) {
                //颜色改变提醒
                resize[i].style.background = '#818181';
                var startX = e.clientX;
                resize[i].left = resize[i].offsetLeft;
                // 鼠标拖动事件
                document.onmousemove = function (e) {
                    var endX = e.clientX;
                    var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
                    var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
                    if (moveLen < 60) moveLen = 60; // 左边区域的最小宽度为56px
                    if (moveLen > maxT - 300) moveLen = maxT - 300; //右边区域最小宽度为300px
                    resize[i].style.left = moveLen; // 设置左侧区域的宽度
                    for (let j = 0; j < left.length; j++) {
                        left[j].style.width = moveLen + 'px';
                        mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px';
                    }
                    document.querySelector('.sidebar-resize').style.marginLeft =  moveLen + 'px';
                    // window.localStorage.setItem('SideBarW',moveLen)
                    window.localStorage.removeItem('SideBarW')
                    that.$store.commit('app/CHANGESIDEBAR')
                };
                // 鼠标松开事件
                document.onmouseup = function (evt) {
                    //颜色恢复
                    resize[i].style.background = '#a3a1a1';
                    document.onmousemove = null;
                    document.onmouseup = null;
                    resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                    var endX = evt.clientX;
                    var moveLen = resize[i].left + (endX - startX);
                    if(moveLen < 60) moveLen = 60
                    // window.localStorage.setItem('SideBarW',moveLen)
                };
                resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
                return false;
            };
        }
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style scoped lang="scss">

  /* 拖拽相关样式 */
    /*包围div样式*/
    .app-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
    }
    /*左侧div样式*/
    .sidebar-container {
        // width: calc(32% - 10px);  /*左侧初始化宽度*/   
        height: 100%;
        background: #FFFFFF;
        float: left !important;
    }
    /*拖拽区div样式*/
    .sidebar-resize {
        cursor: col-resize;
        float: left !important;
        position: relative;
        // left: 200px;
        top: 45%;
        height: 40px;
        background-color: #a3a1a1;
        border-radius: 5px;
        margin-top: -10px;
        width: 10px;
        background-size: cover;
        background-position: center;
        z-index: 999;
        font-size: 32px;
        color: white;
    }
    /*拖拽区鼠标悬停样式*/
    .sidebar-resize:hover {
        color: #444444;
    }
    /*右侧div'样式*/
    .main-container {
        flex: 1;
        float: left;
        margin-left: -10px !important;
        width:calc(100% - 200px); /*右侧初始化宽度*/
        height: 100%;
        background: #fff;
        box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
        overflow: auto
    }



</style>
<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
