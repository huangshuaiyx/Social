<template>
  <div id="app">

    <div class="button-group">
      <!-- <div class="btn btn-primary btn-sm" @click="sharRTC">Join</div> -->
      <p style="margin-left: 20px; color: #999">
        退出时或没视频时, 请点击Leave,退出当前房间
      </p>
      <div class="btn btn-primary btn-sm" @click="Leave">Leave</div>
      <!-- <div class="btns" @click="toDetail">遮罩</div> -->
    </div>
    <figure style="border: solid 1px #97a8be">
      <div style="background: #1890ff; color: #fff">
        <p>角色</p>
        <p>昵称</p>
        <p>短ID</p>
        <p>UID</p>
      </div>
      <figcaption>
        <div style="background: #f8f8f9">
          <p>主播</p>
          <p>{{ this.anchor.nickName }}</p>
          <p>{{ this.anchor.userCode }}</p>
          <p style="color: red">{{ this.anchor.userCode }}</p>
        </div>
        <div style="background: #fff">
          <p>用户</p>
          <p>{{ this.users.nickName }}</p>
          <p>{{ this.users.userCode }}</p>
          <p style="color: red">{{ this.users.userCode }}</p>
        </div>
      </figcaption>
    </figure>

    <div class="row video-group">
      <!-- <div class="col">
        <p id="local-player-name" class="player-name"></p>
        <div id="local-player" class="player"></div>
      </div> -->

      <div class="w-100"></div>
      <div class="col">
        <div id="remote-playerlist">
          <div :class="maskShow == true ? 'mask' : 'masks'" @click="xss"></div>
          <div
            :class="maskShows == true ? 'maskc' : 'maskcs'"
            @click="xsss"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  getChannelUserINFO,
  getChannelUsers,
} from "@/api/operate/channel/index";

export default {
  name: "App",
  data() {
    return {
      appid: "dc65b512483b42f5a21430e9e2c33465", // appId
      token: "", // 根据房间号生成的token(房间号和token对应)
      channel: "", // 房间号(房间号和token对应)
      uid: null,
      agoraClient: null, //实例
      localTracks: {
        //信道
        videoTrack: null,
        audioTrack: null,
      },
      options: {},
      remoteUsers: {},
      users: {},
      anchor: {},
      tableData: {},
      maskShow: true,
      maskShows: true,
    };
  },
  created() {
    window.toDetail = this.toDetail; // 解决字符串模板@click无效的问题
    this.initList();
  },
  mounted() {
    let data = JSON.parse(localStorage.getItem("value"));
    this.token = data.token;
    this.channel = data.channel;
    this.appid = data.appid;
    this.sharRTC();
    this.queryRole();
  },
  methods: {
    xss() {
      if (this.maskShow == true) {
        this.maskShow = false;
      } else {
        this.maskShow = true;
      }
    },
    xsss() {
      if (this.maskShows == true) {
        this.maskShows = false;
      } else {
        this.maskShows = true;
      }
    },
    toDetail(val) {
      let asd = document.getElementById("fake");
      console.log(asd.className, val);
      if (val != this.anchor.userCode) {
        console.log("用户");
        this.maskShow = "masks";
      }
    },
    // 初始
    queryRole() {
      getChannelUserINFO({ channelName: this.channel }).then((ress) => {
        console.log(ress.data, "角色");
        this.users = ress.data.user;
        this.anchor = ress.data.provider;
        this.tableData = ress.data;
        console.log(this.users.userCode, "用户的Code");
      });
    },
    // 刷新
    shua() {
      location.href = `${window.location.origin}/#/operate/channel/channelList`;
    },
    // 开始
    sharRTC() {
      // 创建本地客户端 AgoraRTC 的实例
      this.agoraClient = AgoraRTC.createClient({
        mode: "live",
        codec: "vp8",
        role: "audience",
      });
      // 角色切换: 观众
      // this.agoraClient.setClientRole("audience");
      // 用户信息
      this.options = {
        appid: this.appid,
        channel: this.channel,
        uid: null,
        token: this.token,
      };
      // 连接
      this.join();
    },
    // 获取
    async join() {
      // 添加事件侦听器以在远程用户发布时播放远程曲目.
      this.agoraClient.on("user-published", this.handleUserPublished);
      this.agoraClient.on("user-unpublished", this.handleUserUnpublished);
      // 加入频道
      [this.uid, localTracks.audioTrack, localTracks.videoTrack] =
        await Promise.all([
          // join the channel
          this.agoraClient.join(this.appid, this.channel, this.token || null),
          // 使用麦克风和摄像头
          AgoraRTC.createMicrophoneAudioTrack(),
          AgoraRTC.createCameraVideoTrack(),
        ]);

      // 将本地曲目发布到频道
      await this.agoraClient.publish(Object.values(localTracks));
      // 播放本地视频曲目
      localTracks.videoTrack.play("local-player");
      // this.$("#local-player-name").text(`localVideo(${options.uid})`);
    },
    handleUserPublished(user, mediaType) {
      const id = user.uid;
      this.remoteUsers[id] = user;
      this.subscribe(user, mediaType);
    },

    handleUserUnpublished(user, mediaType) {
      const id = user.uid;
      delete this.remoteUsers[id];
      // this.$(`#player-wrapper-${id}`).remove();
    },

    async subscribe(user, mediaType) {
      const uid = user.uid;
      // 订阅远程用户
      await this.agoraClient.subscribe(user, mediaType);

      if (mediaType === "video") {
        const player = this.$(`
          <div id="player-wrapper-${uid}" >
            <p class="player-name" >ID: ${uid}</p>
            <div id="player-${uid}" class="player" ></div>
          </div>
        `);
        this.$("#remote-playerlist").append(player);
        user.videoTrack.play(`player-${uid}`);
      }
      if (mediaType === "audio") {
        // const player = this.$(`
        //   <div id="player-wrapper-${uid}">
        //     <p class="player-name">失败</p>

        //   </div>
        // `);
        user.audioTrack.play();
      }
    },
    // 客户离开信道
    async Leave() {
      console.log("客户离开渠道成功-123", this.localTracks);
      // this.localTracks.videoTrack.stop();
      // this.localTracks.videoTrack.close();
      // this.localTracks.audioTrack.stop();
      // this.localTracks.audioTrack.close();
      // remove remote users and player views
      this.remoteUsers = {};
      this.$("#remote-playerlist").html("");
      this.$("#local-player-name").text("");
      // leave the channel
      await this.agoraClient.leave();
      console.log("客户离开渠道成功 ");
      location.href = `${window.location.origin}/#/operate/channel/channelList`;
    },
    initList() {
      this.myInterval = setTimeout(() => {
        this.Leave();
      }, 30000);
    },
  }, 
  destroyed() {
    clearInterval(this.myInterval);
  },
};
</script>


<style lang="scss" scoped>
.banner {
  padding: 0;
  background-color: #52575c;
  color: white;
}

.banner-text {
  padding: 8px 20px;
  margin: 0;
}


#join-form {
  margin-top: 10px;
}

.tips {
  font-size: 12px;
  margin-bottom: 2px;
  color: gray;
}

.join-info-text {
  margin-bottom: 2px;
}

input {
  width: 100%;
  margin-bottom: 2px;
}

.player {
  width: 400px;
  height: 625px;
  margin: 0 220px;
}

.player-name {
  margin: 8px 220px;
}

#success-alert,
#success-alert-with-token {
  display: none;
}

@media (max-width: 640px) {
  .player {
    width: 640px;
    height: 360px;
  }
}

.btn {
  width: 150px;
  height: 30px;
  border: none;
  background: rgb(250, 67, 67);
  text-align: center;
  line-height: 30px;
  color: aliceblue;
  margin: 13px 0 0 115px;
}

#remote-playerlist {
  display: flex;
  justify-content: flex-start;
  position: relative;
  padding-bottom: 20px;
}

.button-group {
  display: flex;
}

.btns {
  width: 150px;
  height: 30px;
  border: none;
  background: rgb(0, 238, 255);
  text-align: center;
  line-height: 30px;
  color: aliceblue;
  margin: 50px;
}

td {
  width: 130px;
}

figure {
  width: 600px;
  height: 125px;
  margin-top: 0;
  margin-bottom: 0;
}

figure>div {
  width: 600px;
  display: flex;
  justify-content: space-around;

}

figure>div>p {
  width: 120px;
  height: auto;
  text-align: center;
  line-height: 9px;
}

figcaption>div {
  display: flex;
  justify-content: space-around;
  text-align: center;
  line-height: 9px;
}

figcaption>div>p {
  width: 120px;
  height: auto;
  text-align: center;
  line-height: 9px;
}

.mask {
  width: 400px;
  height: 625px;
  background: url("https://img0.baidu.com/it/u=232669904,3631393573&fm=26&fmt=auto");
  position: absolute;
  top: 34px;
  left: 219px;
  z-index: 99;
  /* filter: blur(45px); */

}

.masks {
  width: 460px;
  height: 625px;
  position: absolute;
  top: 34px;
  left: 219px;
  z-index: 99;
  opacity: 0;
  /* filter: blur(15px); */
}


.maskc {
  width: 400px;
  height: 625px;
  border: solid 1px;
  background: url("https://img0.baidu.com/it/u=232669904,3631393573&fm=26&fmt=auto");
  position: absolute;
  top: 34px;
  left: 1060px;
  z-index: 99;
  /* filter: blur(15px); */
}

.maskcs {
  width: 460px;
  height: 619px;
  border: solid 1px;
  position: absolute;
  top: 210px;
  left: 1060px;
  z-index: 99;
  opacity: 0;
}

.col {
  position: relative;
}

</style>
