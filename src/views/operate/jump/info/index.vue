<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header"><span>基本信息</span>
          </div>

          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%" id="table-min">
              <tbody>
                <tr>
                  <td style="width: 140px;">
                    <div class="cell">昵称</div>
                  </td>
                  <td style="width: 140px;">
                    <div class="cell">
                      <span v-if="baseInfo.nickName"> {{ baseInfo.nickName }} </span> <el-button type="text"
                        @click="editNikeName" icon="el-icon-edit">修改</el-button>
                    </div>
                  </td>
                  <td style="width: 140px;">
                    <div class="cell">ID</div>
                  </td>
                  <td style="width: 140px;">
                    <div class="cell" v-if="baseInfo.userId">
                      {{ baseInfo.userId }}
                    </div>
                  </td>
                  <td style="width: 140px;">
                    <div class="cell">角色</div>
                  </td>
                  <td style="width: 200px;">
                    <div class="cell" v-if="baseInfo.userType">
                      {{ baseInfo.userType === 1 ? "用户" : "服务者" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">用户代码</div>
                  </td>
                  <td>
                    <div class="cell" v-if="baseInfo.userCode">
                      {{ baseInfo.userCode }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">注册时间</div>
                  </td>
                  <td>
                    <div class="cell" v-if="baseInfo.regTime">
                      {{ baseInfo.regTime }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">注册渠道</div>
                  </td>
                  <td>
                    <div class="cell" v-if="baseInfo.platform">
                      {{ baseInfo.platform }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">用户状态</div>
                  </td>
                  <td>
                    <div class="cell" v-if="baseInfo.userStatus">
                      {{ asd(baseInfo.userStatus) }}
                      <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(baseInfo.userStatus)">
                        修改
                      </el-button>
                    </div>
                  </td>
                  <td>
                    <div class="cell">代理人</div>
                  </td>
                  <td>
                    <div class="cell">
                      <span style="color: #ff0000;" v-if="baseInfo.agents && baseInfo.agents.toUpperCase() == 'PHCODE'">{{
                        baseInfo.agents }}</span>
                      <span v-else>{{ baseInfo.agents }}</span>
                      <el-button size="mini" type="text" icon="el-icon-edit" @click="celledit(baseInfo.agents)">
                        {{ baseInfo.agents == null ? "添加" : "修改" }}
                      </el-button>
                    </div>
                  </td>
                  <td>
                    <div class="cell">注册来源</div>
                  </td>
                  <td>
                    <div class="cell" v-if="baseInfo.regSource">
                      {{ baseInfo.regSource }}
                    </div>
                  </td>
                </tr>
                <tr v-show="userType != 1">
                  <td>
                    <div class="cell">修改禁止匹配状态</div>
                  </td>
                  <td>
                    <div class="cell">
                      {{ asdgol(baseInfo.goliveStatus) }}
                      <el-button size="mini" type="text" icon="el-icon-edit" @click="handle(baseInfo.goliveStatus)">修改
                      </el-button>
                    </div>
                  </td>
                  <td style="width: 100px;">
                    <div class="cell">营销主播状态:</div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-switch @change="editAnchorStatus" v-model="baseInfo.marketStatus" active-color="#13ce66"
                        inactive-color="#dcdfe6">
                      </el-switch>
                    </div>
                  </td>
                  <td style="width: 200px;">
                    <div class="languagetd" style="display: flex; justify-content: space-between; align-items: center;">
                      <div class="cell">第一语言:</div>
                      <div> {{ dataInfo.language }} <el-button type="text" @click="editlanguage"
                          icon="el-icon-edit">修改</el-button></div>
                    </div>
                    <div class="languagetd" style="display: flex; justify-content: space-between; align-items: center;">
                      <div class="cell">英语熟练度:</div>
                      <div>{{ dataInfo.englishLevel }} <el-button type="text" @click="editProficiency"
                          icon="el-icon-edit">修改</el-button></div>
                    </div>
                  </td>
                </tr>
                <tr v-show="userType != 1">
                  <td>
                    <div class="cell">
                      <el-button type="primary" round @click="resetDisabled = true"
                        :disabled="radio != 1 || radio == null">重置等级</el-button>
                    </div>
                  </td>
                  <td style="width: 100px;">
                    <div class="cell">设置为F等级:</div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-switch @change="editAnchorgrade" v-model="baseInfo.marketgrade" active-color="#13ce66"
                        inactive-color="#dcdfe6">
                      </el-switch>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header"><span>设备信息</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%" id="table-min">
              <tbody>
                <tr>
                  <td>
                    <div class="cell">设备ID</div>
                  </td>
                  <td>
                    <div class="cell" v-if="deviceInfo.deviceId">
                      {{ deviceInfo.deviceId }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">设备语言</div>
                  </td>
                  <td>
                    <div class="cell" v-if="deviceInfo.deviceLanguage">
                      {{ deviceInfo.deviceLanguage }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">设备地区</div>
                  </td>
                  <td>
                    <div class="cell" v-if="deviceInfo.deviceRegion">
                      {{ deviceInfo.deviceRegion }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">设备时区</div>
                  </td>
                  <td>
                    <div class="cell" v-if="deviceInfo.deviceTimeZone">
                      {{ deviceInfo.registerAccount }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">设备品牌</div>
                  </td>
                  <td>
                    <div class="cell" v-if="deviceInfo.deviceBrand">
                      {{ deviceInfo.deviceBrand }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">设备型号</div>
                  </td>
                  <td>
                    <div class="cell" v-if="deviceInfo.deviceModel">
                      {{ deviceInfo.deviceModel }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">SIM运营商</div>
                  </td>
                  <td>
                    <div class="cell" v-if="deviceInfo.simOperator">
                      {{ deviceInfo.simOperator }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header"><span>资料信息</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%" id="table-min">
              <tbody>
                <tr>
                  <td>
                    <div class="cell">头像</div>
                  </td>
                  <td>
                    <div class="authorphoto">
                      <div class="cell" v-if="dataInfo.usFace">
                        <div class="usauthor">US头像</div>
                        <el-image style="width: 100px; height: 100px" :src="dataInfo.usFace"
                          :preview-src-list="[dataInfo.usFace]" fit="contain" />
                      </div>
                      <div class="cell" v-if="dataInfo.face">
                        <div class="usauthor">IN头像</div>
                        <el-image style="width: 100px; height: 100px" :src="dataInfo.face"
                          :preview-src-list="[dataInfo.face]" fit="contain" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">自拍照片</div>
                  </td>
                  <td>
                    <div class="cell" v-if="dataInfo.realShot">
                      <el-image style="width: 100px; height: 100px" :src="dataInfo.realShot"
                        :preview-src-list="[dataInfo.realShot]" fit="contain">
                        <div slot="error" class="image-slot" style="line-height: 100px">
                          <!-- <i class="el-icon-picture-outline" style="line-height: 50px;"></i> -->
                          --
                        </div>
                      </el-image>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">相册</div>
                  </td>
                  <td>
                    <div class="pohotoInfo">
                      <div id="xiangce">
                        <div class="cells" v-for="(item, i) in dataInfo.albums" :key="i.alumId">
                          <el-image style="width: 130px; height: 100px" :src="item.url" :preview-src-list="albumArray"
                            fit="contain" />
                          <el-button class="delBtn" type="danger" size="mini" @click="delAlbum(item.alumId)"
                            icon="el-icon-delete" circle />
                          <el-popconfirm class="private" title="是否将当前相片设置为私密相册" @confirm="deltedalbus(item, 1)"
                            v-show="item.type != 3">
                            <el-button v-show="userType != 1 && item.providerDelStatus != 1" size="mini"
                              slot="reference">设置私密</el-button>
                          </el-popconfirm>
                          <el-popconfirm class="private" title="是否将当前相片取消设置私密相册" @confirm="deltedalbus(item, 0)"
                            v-show="item.type == 3">
                            <el-button v-show="userType != 1 && item.providerDelStatus != 1" size="mini"
                              slot="reference">取消私密</el-button>
                          </el-popconfirm>
                          <!-- item.type == 3 -->
                          <div class="isshowhead" v-show="item.isCurrentAvatar != null || item.isCurrentUsAvatar != null">
                            <span v-show="item.isCurrentAvatar != null">IN</span>
                            <span v-show="item.isCurrentAvatar && item.isCurrentUsAvatar"> / </span>
                            <span v-show="item.isCurrentUsAvatar != null">US</span>
                            头像
                          </div>
                          <el-popconfirm class="head_in" title="是否将当前相片设置为IN头像" v-show="item.isCurrentAvatar == null"
                            @confirm="setHead(item, 1)">
                            <el-button v-show="userType != 1 && item.providerDelStatus != 1" size="mini"
                              slot="reference">设置IN头像</el-button>
                          </el-popconfirm>
                          <el-popconfirm class="head_us" title="是否将当前相片设置为US头像" v-show="item.isCurrentUsAvatar == null"
                            @confirm="setHead(item, 2)">
                            <el-button v-show="userType != 1 && item.providerDelStatus != 1" size="mini"
                              slot="reference">设置US头像</el-button>
                          </el-popconfirm>
                          <!-- <el-button
                          class="dowload"
                          type="primary"
                          @click="dowimg(item.url,item)"
                          size="mini"
                          >下载</el-button
                        > -->
                          <p class="deletedAlbums" v-show="item.providerDelStatus == 1">
                            主播已删除
                          </p>
                        </div>
                        <div class="processingphoto">
                          <div v-for="(item, index) in dataInfo.processingAlbums" :key="index" class="itemphoto">
                            <div v-if="item.status == 4" class="photoTilte">资源生成中</div>
                            <el-image style="width: 130px; height: 100px" :src="item.url" :preview-src-list="[item.url]"
                              fit="contain" />
                          </div>
                          <div class="imguploadphoto">
                            <el-upload class="uploadphoto" :on-progress="imgprogressphoto"
                              v-loading="imguploadphotoloading" :action="uploadFileUrl" list-type="picture-card"
                              accept=".jpg,.jpeg,.png" :on-success="imguploadphotosuccess" :show-file-list="false">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-show="userType != 1">
                  <td>
                    <div class="cell">形象视频</div>
                  </td>
                  <td>
                    <!-- <div class="cell">
                      <video :src="dataInfo.faceVideo" controls="controls" width="200" height="300" />
                    </div> -->
                    <div id="xiangceimage">
                        <div class="cellsd">
                            <div v-for="(item, i) in dataInfo.videos" :key="i" class="vedioImage">
                              <div  class="imageVideo">
                                    <video :src="item.url" controls="controls" width="200" height="300" />
                                    <el-button class="delBtn" type="danger" size="mini" @click="delAlbum(item.alumId, 2)"
                                      icon="el-icon-delete" circle />
                                    <el-popconfirm title="是否将当前视频设置为私密视频" @confirm="deltedviseo(item, 1)">
                                      <el-button size="mini" slot="reference"
                                        v-show="item.type != 4 && item.providerDelStatus != 1">设置私密</el-button>
                                    </el-popconfirm>
                                    <el-popconfirm title="是否将当前视频取消设置私密视频" @confirm="deltedviseo(item, 0)">
                                      <el-button size="mini" slot="reference"
                                        v-show="item.type == 4 && item.providerDelStatus != 1">取消私密</el-button>
                                    </el-popconfirm>
                                    <div>
                                      <el-input :disabled="item.disabled" size="mini" class="inp" v-model="item.sort"
                                        placeholder="请输入排序" />
                                      <el-button v-if="item.disabled" size="mini" type="primary"
                                        @click="videoSort(item)">设置优先级</el-button>
                                      <el-button v-else size="mini" type="danger" @click="videoSortsubmit(item)">确定</el-button>
                                    </div>
                                    <!-- <el-popconfirm
                                      class="warehousing"
                                      title="是否将当前形象视频入库"
                                      @confirm="setwarehousing(item)"
                                    >
                                      <el-button size="mini" slot="reference"
                                        >入库</el-button
                                      >
                                    </el-popconfirm> -->
                                    <p class="deletedVideo" v-show="item.providerDelStatus == 1">
                                      主播已删除1
                                    </p>
                                </div>
                              
                             </div>
                             <div class="processingphoto" v-if="authorisregister">
                                    <div class="imguploadphoto" style="margin-top: 10px;">
                                        <div class="uoloadText">
                                            <div>1.上传格式：MP4</div>
                                            <div>2.视频长短：视频大于5秒，最长不超过15秒</div>
                                        </div>
                                        <div>
                                          <el-upload class="uploadphoto"  ref="videoUpload" :on-progress="vedioprogressphoto"
                                            v-loading="vediouploadphotoloading" action="#" list-type="picture-card"
                                            accept=".mp4" :http-request="vediouploadphotosuccess" :show-file-list="false">
                                          <i class="el-icon-plus"></i>
                                        </el-upload>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-show="userType != 1">
                  <td class="cell">私密相册2</td>
                  <td style="width: 100%;">
                    <div class="imgbanner">
                      <div v-for="(x, i) in privateimgList" :key="i" style="position: relative">
                        <div class="imgitem">
                          <el-image style="width: 150px; height: 150px" class="img-avatar" :src="x.url"
                            :preview-src-list="privateList" fit="contain" />

                          <div class="deleicon">
                            <i class="el-icon-delete deleicon-icon" @click="delAlbum(x.alumId)"
                              v-show="privateimgList.length > 0" />
                          </div>
                        </div>
                      </div>
                      <div class="imgupload">
                        <el-upload :on-progress="imgprogress" v-loading="uploadimgloading"
                          :class="!skipStatus == true ? '' : 'isshowUpload'" :action="uploadFileUrl"
                          list-type="picture-card" accept=".jpg,.jpeg,.png" :on-success="uploadImgsuccess"
                          :show-file-list="false">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-show="userType != 1">
                  <td class="disparity">
                    <div class="cell">A类营销视频</div>
                  </td>
                  <td class="videotd">
                    <div class="celltgd">
                      <div class="videobanner">
                        <div v-for="(x, i) in privateVideoList" :key="i" style="position: relative">
                          <div>
                            <div class="videoitem">
                              <div class="deleicon" @click="delAlbum(x.alumId)">
                                <i class="el-icon-delete deleicon-icon" v-show="privateVideoList.length > 0" />
                              </div>
                              <video :src="x.url" controls="controls" width="200" height="300" class="video-avatar" />
                            </div>
                          </div>
                          <!-- <el-popconfirm class="priVideo" title="是否将当前视频设置为营销视频" @confirm="deltedviseo(x, 1)">
                              <el-button slot="reference" v-show="x.type != 4">设置营销</el-button>
                            </el-popconfirm>
                            <el-popconfirm class="priVideo" title="是否将当前视频取消设置营销视频" @confirm="deltedviseo(x, 0)"
                              confirm-button-text="取消">
                              <el-button slot="reference" v-show="x.type == 4">取消营销</el-button>
                            </el-popconfirm> -->
                        </div>
                        <div class="marketingvideo">
                          <el-upload :class="!skipStatus == true ? '' : 'isshowUpload'" accept="video/mp4"
                            :action="uploadFileUrl" list-type="picture-card" :on-progress="uploadVideoProcessA"
                            :on-success="videoSuccessPrA" :show-file-list="false" v-loading="posterloadingA">
                            <i class="el-icon-plus avatar-uploader-icon"></i>

                            <!-- <video v-if="mp4ImageUrl" autoplay :src="mp4ImageUrl" class="avatar  "
                            controls="controls">
                          </video> -->
                            <!-- <el-progress v-if="videoUploads" type="circle" v-bind:percentage="videoUploadPercent"
                            style="margin-top: 7px"></el-progress> -->
                          </el-upload>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-show="userType != 1 && videoB == true">
                  <td class="disparity">
                    <div class="cell">B类营销视频</div>
                  </td>
                  <td class="videotd">
                    <div class="celltgd">
                      <div class="videobanner">
                        <div v-for="(x, i) in marketTypeBVideos" :key="i" style="position: relative">
                          <div>
                            <div class="videoitem">
                              <div class="deleicon" @click="delAlbum(x.alumId)">
                                <i class="el-icon-delete deleicon-icon" v-show="marketTypeBVideos.length > 0" />
                              </div>
                              <video :src="x.url" controls="controls" width="200" height="300" class="video-avatar" />
                            </div>
                          </div>
                          <!-- <el-popconfirm class="priVideo" title="是否将当前视频设置为营销视频" @confirm="deltedviseo(x, 1)">
                              <el-button slot="reference" v-show="x.type != 4">设置营销</el-button>
                            </el-popconfirm>
                            <el-popconfirm class="priVideo" title="是否将当前视频取消设置营销视频" @confirm="deltedviseo(x, 0)"
                              confirm-button-text="取消">
                              <el-button slot="reference" v-show="x.type == 4">取消营销</el-button>
                            </el-popconfirm> -->
                        </div>
                        <div class="marketingvideo">
                          <el-upload :class="!skipStatus == true ? '' : 'isshowUpload'" accept="video/mp4"
                            :action="uploadFileUrl" list-type="picture-card" :on-progress="uploadVideoProcessB"
                            :on-success="videoSuccessPrB" :show-file-list="false" v-loading="posterloadingB">
                            <i class="el-icon-plus avatar-uploader-icon"></i>

                            <!-- <video v-if="mp4ImageUrl" autoplay :src="mp4ImageUrl" class="avatar  "
                            controls="controls">
                          </video> -->
                            <!-- <el-progress v-if="videoUploads" type="circle" v-bind:percentage="videoUploadPercent"
                            style="margin-top: 7px"></el-progress> -->
                          </el-upload>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-show="userType != 1 && videoB == true">
                  <td class="disparity">
                    <div class="cell">私密视频</div>
                  </td>
                  <td class="videotd">
                    <div class="celltgd">
                      <div class="videobanner">
                        <div v-for="(x, i) in posterloadingList" :key="i" style="position: relative">
                          <div>
                            <div class="videoitem">
                              <div class="deleicon" @click="delAlbum(x.alumId)">
                                <i class="el-icon-delete deleicon-icon" v-show="posterloadingList.length > 0" />
                              </div>
                              <video :src="x.url" controls="controls" width="200" height="300" class="video-avatar" />
                            </div>
                          </div>
                          <!-- <el-popconfirm class="priVideo" title="是否将当前视频设置为营销视频" @confirm="deltedviseo(x, 1)">
                              <el-button slot="reference" v-show="x.type != 4">设置营销</el-button>
                            </el-popconfirm>
                            <el-popconfirm class="priVideo" title="是否将当前视频取消设置营销视频" @confirm="deltedviseo(x, 0)"
                              confirm-button-text="取消">
                              <el-button slot="reference" v-show="x.type == 4">取消营销</el-button>
                            </el-popconfirm> -->
                        </div>
                        <div class="marketingvideo">
                          <el-upload :class="!skipStatus == true ? '' : 'isshowUpload'" accept="video/mp4"
                            :action="uploadFileUrl" list-type="picture-card" :on-progress="uploadVideoProcessP"
                            :on-success="videoSuccessPrPrivacy" :show-file-list="false" v-loading="posterloadingP">
                            <i class="el-icon-plus avatar-uploader-icon"></i>

                            <!-- <video v-if="mp4ImageUrl" autoplay :src="mp4ImageUrl" class="avatar  "
                            controls="controls">
                          </video> -->
                            <!-- <el-progress v-if="videoUploads" type="circle" v-bind:percentage="videoUploadPercent"
                            style="margin-top: 7px"></el-progress> -->
                          </el-upload>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-if="skipStatus">
                  <td>
                    <div class="cell">海报</div>
                  </td>
                  <td>
                    <div class="celltf" v-if="dataInfo.poster">
                      <el-image style="width: 100px; height: 100px" :src="dataInfo.poster" :preview-src-list="posterArray"
                        fit="contain">
                        <div slot="error" class="image-slot" style="line-height: 100px">
                          --
                        </div>
                      </el-image>
                    </div>
                  </td>
                  <!-- <td v-show="baseInfo.userType == 2">
                    <div class="cell">自拍</div>
                  </td>
                  <td v-show="baseInfo.userType == 2">
                    <div class="cell" v-if="dataInfo.signature">
                      {{ dataInfo.signature }}
                    </div>
                  </td> -->
                </tr>
                <tr>
                  <td>
                    <div class="cell">性别</div>
                  </td>
                  <td>
                    <div class="celltf">
                      {{ dataInfo.gender === 0 ? "女" : "男" }}
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-if="skipStatus">
                  <td>
                    <div class="cell">语言</div>
                  </td>
                  <td>
                    <div class="celltf" v-if="dataInfo.language">
                      {{ dataInfo.language }}
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-if="skipStatus">
                  <td>
                    <div class="cell">第二语言</div>
                  </td>
                  <td>
                    <div class="celltf" v-if="dataInfo.secondLanguage">
                      {{ dataInfo.secondLanguage }}
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-if="skipStatus">
                  <td>
                    <div class="cell">所在地</div>
                  </td>
                  <td>
                    <div class="celltf" v-if="dataInfo.addresses">
                      {{ dataInfo.addresses }}
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-if="skipStatus">
                  <td>
                    <div class="cell">whatapps</div>
                  </td>
                  <td>
                    <div class="celltf" v-if="dataInfo.whatapps">
                      {{ dataInfo.whatapps }}
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-if="skipStatus">
                  <td>
                    <div class="cell">生日</div>
                  </td>
                  <td>
                    <div class="celltf birthdayTime" v-if="dataInfo.birthday">
                      {{ dataInfo.birthday }}
                    </div>
                  </td>
                </tr>
                <tr v-show="baseInfo.userType == 2 && skipStatus" class="disparity">
                  <td>
                    <div class="cell">主播等级</div>
                  </td>
                  <td>
                    <div class="celltf">
                      {{ dataInfo.totalScoreLevelCode }}
                        <span v-if="dataInfo.levelSource">({{ dataInfo.levelSource }})</span>
                    </div>
                    <!-- <el-button size="mini" type="text" icon="el-icon-edit"
                      @click="handletotal(dataInfo.totalScoreLevelCode)">修改
                    </el-button> -->
                  </td>
                </tr>
                <tr v-show="baseInfo.userType == 2 && skipStatus" class="disparity">
                  <td>
                    <div class="cell">高度</div>
                  </td>
                  <td>
                    <div class="celltf" v-if="dataInfo.height">
                      {{ dataInfo.height ? dataInfo.height : 0 }}CM
                    </div>
                  </td>
                </tr>
                <tr v-show="baseInfo.userType == 2 && skipStatus" class="disparity">
                  <td>
                    <div class="cell">重量</div>
                  </td>
                  <td>
                    <div class="celltf" v-if="dataInfo.weight">
                      {{ dataInfo.weight ? dataInfo.weight : 0 }}KG
                    </div>
                  </td>
                </tr>
                <tr class="disparity" v-if="skipStatus">
                  <td>
                    <div class="cell">个性签名</div>
                  </td>
                  <td>
                    <div class="celltf signaturetextB">
                      <div class="signaturetext" v-if="dataInfo.signature"> {{ dataInfo.signature }}</div>
                      <el-button type="text"
                        @click="editsignature" icon="el-icon-edit">修改</el-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box" v-show="baseInfo.userType == 2 && skipStatus">
        <el-card>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%" id="table-min">
              <tbody>
                <tr>
                  <td>
                    <div class="cell">初始分</div>
                  </td>
                  <td>
                    <div class="cell">
                      {{ dataInfo.initialScore }}
                      <el-button size="mini" type="text" icon="el-icon-edit" @click="
                        scoreEdit(baseInfo.userId, dataInfo.initialScore)
                        ">修改
                      </el-button>
                    </div>
                  </td>
                  <td>
                    <div class="cell">运营分</div>
                  </td>
                  <td>
                    <div class="cell">
                      {{ dataInfo.operationScore }}
                      <el-button size="mini" type="text" icon="el-icon-edit" @click="
                        operationEdit(
                          baseInfo.userId,
                          dataInfo.operationScore
                        )
                        ">修改
                      </el-button>
                    </div>
                  </td>
                  <td>
                    <div class="cell">有效时间</div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-date-picker v-model="dataInfo.operationScoreExpireTime" type="datetime" placeholder="选择日期时间"
                        @change="
                          changTime(
                            baseInfo.userId,
                            dataInfo.operationScoreExpireTime
                          )
                          " value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
      <!-- 视频区域 -->
      <el-col class="footerinfo" :span="24" v-show="!skipStatus">
        <el-card>
          <div class="video_info">
            <div class="video_info_top" v-show="videoB != true">
              <div class="topitem">
                <el-select size="mini" clearable v-model="greetingsOption" placeholder="是否主动打招呼">
                  <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="topitem">
                <el-select size="mini" clearable v-model="showFaceOption" placeholder="是否露脸">
                  <el-option v-for="item in outstandingList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="topitem">
                <el-select size="mini" clearable v-model="makeupOption" placeholder="主播形象">
                  <el-option v-for="item in uncoveredList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="topitem">
                <el-select size="mini" clearable v-model="environmentOption" placeholder="请选择场所环境">
                  <el-option v-for="item in environmentList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <el-button size="mini" type="primary" @click="searchvideoList">搜索</el-button>
            </div>
            <div v-if="videoInfoList.length > 0" class="video_info_footer" v-loading="videoinfoloading">
              <div v-for="item in videoInfoList" :key="item.id" class="videoitem">
                <div class="videocast">
                  <video controls="controls" :src="item.videoFileUrl"></video>
                </div>
                <div class="videotag">
                  <div>订单ID</div>
                  <div class="tag">{{ item.orderId }}</div>
                </div>
                <div class="videotag" v-show="videoB != true">
                  <div>是否打招呼</div>
                  <div class="tag"
                    :class="item.greetingsOption == 'tag_audit_objective4_1_v2' ? 'enthusiasm' : (item.greetingsOption == 'tag_audit_objective4_2_v2' ? 'common' : 'deny')">
                    {{ item.greetingsOption | videoInfoManner }}</div>
                </div>
                <div class="videotag" v-show="videoB != true">
                  <div>是否露脸</div>
                  <!-- <div class="tag enthusiasm" v-if="item.showFaceOption == 1">总是</div>
                  <div class="tag common" v-if="item.showFaceOption == 0">偶尔</div>
                  <div class="tag deny" v-else>从不</div> -->
                  <div class="tag"
                    :class="item.showFaceOption == 'tag_audit_objective6_1_v2' ? 'enthusiasm' : (item.showFaceOption == 'tag_audit_objective6_2_v2' ? 'common' : 'deny')">
                    {{ item.showFaceOption | outstandingList }}</div>
                </div>
                <div class="videotag" v-show="videoB != true">
                  <div>场所环境：</div>
                  <div class="tag"
                    :class="item.environmentOption == 'tag_audit_objective7_1_v2' ? 'enthusiasm' : (item.environmentOption == 'tag_audit_objective7_2_v2' ? 'common' : 'deny')">
                    {{ item.environmentOption | videoInfoEnvironment }}</div>
                </div>
                <div class="videotag" v-show="videoB != true">
                  <div>主播形象</div>
                  <div class="time">{{ item.makeupOption | videoInfoUncovered }}</div>
                </div>
                <div class="videotag">
                  <div v-if="videoB == true">视频时长：</div>
                  <div v-else>视频总时长：</div>
                  <div class="time">{{ item.duration }}s</div>
                </div>
              </div>
            </div>
            <el-empty v-else description="暂无数据..."></el-empty>
            <!-- 分页 -->
            <el-pagination v-if="videoInfoList.length > 0" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" :current-page="pageForm.pageNum" :page-sizes="[10, 20, 30, 50]"
              :page-size="pageForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="videoTotal">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 冻结封禁 -->
    <el-dialog title="修改状态" :visible.sync="open" width="80%" append-to-body>
      <el-radio-group v-model="radio" @change="xuanze">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">封禁</el-radio>
        <el-radio :label="4">冻结</el-radio>
        <el-radio :label="5" disabled>未通过能力检测</el-radio>
        <!--        <el-radio :label="3">注销</el-radio>-->
      </el-radio-group>
      <hr />
      <!-- 正常 -->
      <!-- <el-radio-group v-model="resetGrade" v-show="radio == 1">
        <el-radio label="1">
          重置</el-radio>
      </el-radio-group> -->
      <el-checkbox v-model="resetGrade" v-show="radio == 1" true-label="1" :false-label="null">重置等级</el-checkbox>
      <!-- 封禁 -->
      <el-radio-group v-model="fengjinstatus" v-show="radio == 2">
        <el-radio :label="x.dictValue" v-for="(x, i) in banData" :key="i">
          {{ x.dictLabel }}</el-radio>
      </el-radio-group>
      <!-- 冻结 -->
      <p v-show="radio == 4">冻结时间</p>
      <el-radio-group v-model="banReasonTime" v-show="radio == 4">
        <el-radio :label="x.dictLabel" v-for="(x, i) in frozenTimeData" :key="i" @change="banRadio(x)">
          {{ x.dictLabel }}</el-radio>
      </el-radio-group>
      <hr v-show="radio == 4" />
      <p v-show="radio == 4">冻结原因</p>
      <el-radio-group v-model="banReason" v-show="radio == 4">
        <el-radio :label="x.dictValue" v-for="(x, i) in frozenData" :key="i">
          {{ x.dictLabel }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改禁止匹配状态 -->
    <el-dialog title="禁止匹配状态" :visible.sync="openMatching" width="80%" append-to-body>
      <el-radio-group v-model="goliveStatus">
        <el-radio :label="0">禁用</el-radio>
        <el-radio :label="1">启用</el-radio>
        <el-radio :label="2">白名单</el-radio>
        <el-radio :label="3">黑名单</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMatching">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 主播等级状态 -->
    <el-dialog title="主播等级状态" :visible.sync="openGrade" width="80%" append-to-body>
      <el-select v-model="GradeInput" placeholder="请选择">
        <el-option v-for="(item, i) in optionsGrade" :key="i" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitGrade">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 初始分 -->
    <el-dialog title="提示" :visible.sync="scoreDisabled" width="80%" center>
      <el-select v-model="scoreInput" placeholder="请选择">
        <el-option v-for="(item, i) in options" :key="i" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="scoreDisabled = false">取 消</el-button>
        <el-button type="primary" @click="scoreUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 运营分 -->
    <el-dialog title="提示" :visible.sync="operationDisabled" width="80%" center>
      <el-input v-model="operationInput" type="number" min="-100" max="100" placeholder="请输入内容"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="operationDisabled = false">取 消</el-button>
        <el-button type="primary" @click="operationUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改代理人 -->
    <el-dialog title="提示" :visible.sync="agentsDisabled" width="50%" center>
      <el-input v-model="agentsInput" type="text" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agentsDisabled = false">取 消</el-button>
        <el-button type="primary" @click="agentsUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重置 -->
    <el-dialog title="提示" :visible.sync="resetDisabled" width="20%" center>
      <p style="text-align: center">确定要把此主播重置为T等级吗</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDisabled = false">取 消</el-button>
        <el-button type="primary" @click="resetUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改昵称 -->
    <el-dialog class="nicknamedialog" :visible.sync="nickNamedialogVisible" width="30%">
      <span>主播昵称：</span>
      <el-input class="inp" v-model="nickName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="nickNamedialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="nickNamesubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改个性签名 -->
    <el-dialog class="signaturedialog" :visible.sync="signaturedialogVisible" width="30%">
      <span>主播个性签名：</span>
      <el-input class="inp" v-model="signature"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="signaturedialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="signaturesubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改第一语言 -->
    <el-dialog class="languagedialog" :visible.sync="languagedialogVisible" width="50%">
      <el-radio-group v-model="languageradio">
        <el-radio v-for="(item, index) in languageList" :key="index" :label="item.dictKey">{{ item.dictLabel }}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="canclelanguagedialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="languagesubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改语言熟练度 -->
    <el-dialog class="languagedialog" :visible.sync="proficiencydialogVisible" width="50%">
      <el-radio-group v-model="proficiencyradio">
        <el-radio v-for="(item, index) in proficiencyList" :key="index" :label="item.dictKey">{{ item.dictLabel
        }}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancleproficiencydialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="proficiencysubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBaseInfo,
  modifyMarketStatusApi,
  updateUserStatus,
  modifyMarketAnchorInformation,
  setPrivate,
  setUpdateLifeSortApi,
  settingAvatarApi,
  modifyMarketAnchorLevel,
  resetLevel,
  uploadPrivacyAlbumApi,
  uploadaddAlbumForOperateApi,
  uploadMarketVideoApi,
  getAuditedOrderVideoApi,
  modifyNickNameApi,
  modifySelfIntroductionApi,
  modifyLanguageApi,
  getqueryDictListForLanguageApi,
  getAuditedOrderVideoTypeB,
  setFLevelApi,

} from "@/api/operate/jump/info/info";
import {
  uploadImg,
  increaseMarketAnchorResource,
  uploadImageVideoApi
} from "../../../../api/operate/marketingAnchor/anchorList/index";
import { upbaseUrl } from "@/config/index";
import { delResource } from "@/api/operate/examine/audit/audit";
import { selectMoreDictDataByDictType } from "@/api/operate/anchorReview/reviewList/index";
import { getQueryString } from "../../../../utils/index"

export default {
  filters: {
    videoInfoManner(val) {
      if (val == "tag_audit_objective4_1_v2") return '主动say Hi'
      if (val == "tag_audit_objective4_2_v2") return '挥手未出声'
      if (val == "tag_audit_objective4_3_v2") return '从不'
    },
    videoInfoUncovered(val) {
      if (val == "tag_audit_objective3_1_v2") return '全妆'
      if (val == "tag_audit_objective3_2_v2") return '淡妆'
      if (val == "tag_audit_objective3_3_v2") return '素颜'
      if (val == "tag_audit_objective3_4_v2") return '观感差'
    },
    videoInfoEnvironment(val) {
      if (val == "tag_audit_objective7_1_v2") return '好'
      if (val == "tag_audit_objective7_2_v2") return '中'
      if (val == "tag_audit_objective7_3_v2") return '差'
    },
    outstandingList(val) {

      if (val == "tag_audit_objective6_1_v2") return '总是'
      if (val == "tag_audit_objective6_2_v2") return '偶尔'
      if (val == "tag_audit_objective6_3_v2") return '从不'
    }
  },
  name: "Server",
  data() {
    return {
      authorisregister: false, // 主播是否在审核中
      languagedialogVisible: false,
      nickNamedialogVisible: false,
      signaturedialogVisible: false,
      proficiencydialogVisible: false,
      languageList: [
        { dictLabel: 'en', dictValue: 'en' },
        { dictLabel: 'en', dictValue: 'en' },
      ],
      languageradio: '', // 第一语言
      proficiencyradio: '', // 第一语言熟练度
      proficiencyList: [
        { label: 'en', value: 'en' },
        { label: 'en', value: 'en' },
      ], //熟练度
      nickName: "", //主播昵称
      signature: "", //主播个性签名
      // 视频列表
      videoInfoList: [],
      // 分页
      pageForm: {
        pageSize: 10,
        pageNum: 1,
      },
      videoTotal: 0,
      videoinfoloading: false,
      greetingsOption: null,
      showFaceOption: null /**视频晒选类型 */,
      makeupOption: null,
      environmentOption: null,
      environmentList: [
        {
          label: "好",
          value: "tag_audit_objective7_1_v2",
        },
        {
          label: "中",
          value: "tag_audit_objective7_2_v2",
        },
        {
          label: "差",
          value: "tag_audit_objective7_3_v2",
        },
      ],
      uncoveredList: [
        {
          label: "全妆",
          value: 'tag_audit_objective3_1_v2',
        },
        {
          label: "淡妆",
          value: 'tag_audit_objective3_2_v2',
        },
        {
          label: "素颜",
          value: 'tag_audit_objective3_3_v2',
        },
        {
          label: "观感差",
          value: 'tag_audit_objective3_4_v2',
        },
      ],
      statusList: [
        {
          label: "主动say Hi",
          value: 'tag_audit_objective4_1_v2',
        },
        {
          label: "挥手未出声",
          value: "tag_audit_objective4_2_v2",
        },
        {
          label: "从不",
          value: 'tag_audit_objective4_3_v2',
        },
      ],
      outstandingList: [
        {
          label: "总是",
          value: 'tag_audit_objective6_1_v2',
        },
        {
          label: "偶尔",
          value: 'tag_audit_objective6_2_v2',
        },
        {
          label: "从不",
          value: 'tag_audit_objective6_3_v2',
        },
      ],
      // 区分跳转
      skipStatus: true,
      // 是否是从B类过来
      videoB: false,
      dialogVisible: false, // 私密相册
      dialogImageUrl: "",
      posterloadingA: false,
      posterloadingB: false,
      posterloadingP: false,
      uploadimgloading: false,
      imguploadphotoloading: false,
      vediouploadphotoloading: false,
      uploadFileUrl: upbaseUrl + "/third/resource/uploadAndGetFileInformation", // 上传的图片服务器地址
      // 遮罩层
      loading: true,
      // 用户Id
      userId: null,
      // 用户类型
      userType: null,
      // 基本信息
      baseInfo: {},
      // 设备信息
      deviceInfo: {},
      // 资料信息
      dataInfo: {},
      // 头像array
      headerArray: [],
      // 海报
      posterArray: [],
      // 相册array
      albumArray: [],
      // 私密相册
      privateList: [],
      // 状态弹框
      open: false,
      // 用户状态
      radio: null,
      /**golive状态 */
      goliveStatus: 1,
      /**初始分 */
      scoreInput: 60,
      /**初始分禁用 */
      scoreDisabled: false,
      /**主播等级 */
      GradeInput: "",
      /**运营分 */
      operationInput: "",
      /**运营分禁用 */
      operationDisabled: false,
      /**匹配状态弹框 */
      openMatching: false,
      /**修改代理人 */
      agentsDisabled: false,
      /**代理人内容 */
      agentsInput: "",
      /**等级弹框 */
      openGrade: false,
      /**user */
      userId: "",
      options: [
        {
          value: 100,
          label: "A",
        },
        {
          value: 80,
          label: "B",
        },
        {
          value: 60,
          label: "C",
        },
        {
          value: 40,
          label: "D",
        },
        {
          value: 20,
          label: "E",
        },
      ],
      optionsGrade: [

        {
          value: "A",
          label: "A",
        },
        {
          value: "B",
          label: "B",
        },
        {
          value: "C",
          label: "C",
        },
        {
          value: "D",
          label: "D",
        },
        {
          value: "E",
          label: "E",
        },
      ],
      /**封禁选择 */
      fengjinstatus: null,
      banData: [],
      /**冻结 */
      banReasonTime: null,
      banReason: null,
      frozenData: [],
      frozenTimeData: [],
      banTime: "",
      privateAlbumState: 1,
      // 重置
      resetDisabled: false,
      // 重置等级
      resetGrade: null,
      stateus: null,
      disabledType: false,
      // 营销视频
      loadingVideod: false,
      // 营销视频
      privateVideoList: [],
      // 私密相册
      privateimgList: [],
      // B类营销
      marketTypeBVideos: [],
      // 私密视频
      posterloadingList: [],
      videoFirstimgsrc: '',
      videInfo: {},
      //视频时长
      duration: null,
      // 视频宽高
      videoWidth: null,
      videoHeight: null,
      //   形象视频时长
      durationimage: null,
      videoWidthimage: null,
      videoHeightimage: null,
      pathUrl: '',
      videInfoimage: {},
      videoFirstimgsrcImage: '',
      vedioimageurl:''
    };
  },
  mounted() {
    if (this.$route.query.skipStatus) {
      this.skipStatus = JSON.parse(this.$route.query.skipStatus);
      this.videoB = JSON.parse(this.$route.query.videoB);
    }
    // 获取地址上的参数
    let str = window.location.href;
    let urls = str.split("?");
    let params = urls[1].split("&");
    this.userId = params[0].split("=")[1];
    this.userType = params[1].split("=")[1];
    this.getBaseInfo();
    this.searchvideoInfo()

    /**
     * 封禁
     * 冻结
     */
    selectMoreDictDataByDictType({
      dictTypes: ["ban_reason", "freeze_time", "freeze_reason"],
    }).then((res) => {
      if (res.code == 200) {
        this.banData = res.data.ban_reason;
        this.frozenData = res.data.freeze_reason;
        this.frozenTimeData = res.data.freeze_time;
      }
    });
    this.getproficiencyList()
  },
  methods: {

    // 修改熟练度
    editProficiency() {
      this.proficiencydialogVisible = true
    },
    cancleproficiencydialog() {
      this.proficiencydialogVisible = false
      this.proficiencyradio = ''
    },
    proficiencysubmit() {
      if (!this.proficiencyradio) return this.$message.error('请选择英语熟练度！')
      let obj = {
        userId: this.baseInfo.userId,
        type: 1,
        language: this.proficiencyradio
      }
      modifyLanguageApi(obj).then(res => {
        if (res.code == 200) {
          this.$message.success('修改成功!')
          this.getBaseInfo()
          this.proficiencydialogVisible = false
        }
      })
    },
    // 修改语言
    editlanguage() {
      this.languagedialogVisible = true
    },
    // 获取语言熟练度列表 获取语言列表
    getproficiencyList() {
      getqueryDictListForLanguageApi().then(res => {
        if (res.code == 200) {
          this.proficiencyList = res.data.englishLevel
          this.languageList = res.data.firstLanguage
        }
      })
    },
    canclelanguagedialog() {
      this.languagedialogVisible = false
      this.languageradio = ''
    },
    languagesubmit() {
      if (!this.languageradio) return this.$message.error('请选择第一语言！')
      let obj = {
        userId: this.baseInfo.userId,
        type: 0,
        language: this.languageradio
      }
      modifyLanguageApi(obj).then(res => {
        if (res.code == 200) {
          this.$message.success('修改成功!')
          this.getBaseInfo()
          this.languagedialogVisible = false
        }
      })
    },
    // 修改主播个性签名
    editsignature(){
        this.signaturedialogVisible = true
        console.log(this.baseInfo.signature);
        if(!this.dataInfo.signature) return
        this.signature = JSON.parse(JSON.stringify(this.dataInfo.signature))
     
    },
    signaturesubmit() {
      if (!this.signature) return this.$message.error('请输入主播个性签名')
      modifySelfIntroductionApi({ userId: this.baseInfo.userId, selfIntroduction: this.signature }).then(res => {
        if (res.code == 200) {
          this.$message.success('修改成功!')
          this.signaturedialogVisible = false
          this.getBaseInfo()
        }
      })
    },
    // 修改主播昵称
    nickNamesubmit() {
      if (!this.nickName) return this.$message.error('请输入主播昵称')
      modifyNickNameApi({ userId: this.baseInfo.userId, nickName: this.nickName }).then(res => {
        if (res.code == 200) {
          this.$message.success('修改成功!')
          this.nickNamedialogVisible = false
          this.getBaseInfo()
        }
      })
    },
    editNikeName() {
      this.nickName = JSON.parse(JSON.stringify(this.baseInfo.nickName))
      this.nickNamedialogVisible = true
    },
    /** 查询审核用户信息 */
    getBaseInfo() {
      this.loading = true;
      let data = {
        userId: this.userId,
        userType: this.userType,
      };
      getBaseInfo(data).then((response) => {
        this.baseInfo = response.data.baseInfo;
        this.deviceInfo = response.data.deviceInfo;
        this.dataInfo = response.data.dataInfo;
        this.radio = this.baseInfo.userStatus
        this.stateus = this.baseInfo.userStatus
        this.authorisregister = this.baseInfo.auditStatus == 3 ? true : false
        this.loading = false;
        this.privateimgList = this.dataInfo.selfPhoto2s;
        this.privateVideoList = this.dataInfo.marketVideos;
        this.posterloadingList = this.dataInfo.selfVideos;
        this.marketTypeBVideos = this.dataInfo.marketTypeBVideos;
        this.baseInfo.marketStatus = this.dataInfo.marketStatus == 1 ? true : false
        this.baseInfo.marketgrade = this.dataInfo.totalScoreLevelCode.toUpperCase() == 'F' ? true : false
        let header = this.dataInfo.face;
        let poster = this.dataInfo.poster;
        let albums = this.dataInfo.albums;
        this.headerArray[0] = header;
        this.posterArray[0] = poster;
        this.dataInfo.videos.forEach(item => {
          item.disabled = true
          item.sort = item.sort ? item.sort : 0
        })
        this.dataInfo.selfPhoto2s.forEach(item => {
          this.privateList.push(item.url)
        })
        albums.forEach((album) => {
          let asd = album.url;
          if (asd.indexOf("mp4") == -1) {
            this.albumArray.push(album.url);
          }
        });
      });
    },
    // 修改状态
    handleUpdate(n) {
      this.open = true;
      this.radio = n;
      if (this.stateus == 5) {
        this.radio = 1;
        this.resetGrade = "1";
        this.disabledType = true;
      } else {
        this.disabledType = false;
      }
    },
    // 修改营销主播状态
    editAnchorStatus(value) {
      let newval = value;
      this.baseInfo.marketStatus = !value;
      this.$confirm("是否更改当前主播状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          modifyMarketStatusApi({
            userId: this.userId,
            marketStatus: value ? 1 : 0,
          })
            .then((res) => {
              if (res.code == 200) {
                this.baseInfo.marketStatus = newval;
                this.getBaseInfo();
                this.$message({
                  type: "success",
                  message: "修改成功",
                });
              }
            })
            .catch((req) => {
              this.$message.error(req.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editAnchorgrade(value){
        let newval = value;
        this.baseInfo.marketgrade = !value;
        let text= '取消'
        let text1= '的F'
        if (value) {
          text = '设置'
          text1 = '为F'
        }
        this.$confirm(`是否${text}当前主播${text1}等级?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
            .then(() => {
                setFLevelApi({
                providerId: this.userId,
                status: value ? 1 : 0,
              })
                .then((res) => {
                  if (res.code == 200) {
                    this.baseInfo.marketgrade = newval;
                    this.getBaseInfo();
                    this.$message({
                      type: "success",
                      message: "修改成功",
                    });
                  }
                })
                .catch((req) => {
                  this.$message.error(req.msg);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消更改",
              });
            });
    },
    // 修改状态
    handle(n) {
      this.openMatching = true;
      this.goliveStatus = n;
      console.log(n);
    },
    // 修改状态
    handletotal(n) {
      this.openGrade = true;
      this.GradeInput = n;
      console.log(n);
    },
    // 确认初始分
    scoreUpdate() {
      console.log(this.scoreInput);
      modifyMarketAnchorInformation({
        userId: this.userId,
        initialScore: this.scoreInput,
        initialScoreLevelCode: this.getstatus(this.scoreInput),
      }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.scoreDisabled = false;

          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    getstatus(val) {
      switch (val) {
        case 100:
          return "A";
        case 80:
          return "B";
        case 60:
          return "C";
        case 40:
          return "D";
        case 20:
          return "E";
        default:
          return "--";
      }
    },
    totalScore(val) {
      switch (val) {
        case "A":
          return "A";
        case "B":
          return "B";
        case "C":
          return "C";
        case "D":
          return "D";
        case "E":
          return "E";
        default:
          return "--";
      }
    },
    // 赋值初始分
    scoreEdit(val, row) {
      this.scoreDisabled = true;
      this.userId = val;
      this.scoreInput = row;
      console.log(this.scoreInput, row);
    },
    // 确认运营分
    operationUpdate() {
      console.log(this.scoreInput);
      if (this.operationInput > 100) {
        this.$message({
          type: "warning",
          message: "最大100",
        });
      } else if (this.operationInput < -100) {
        this.$message({
          type: "warning",
          message: "最小-100",
        });
      } else {
        modifyMarketAnchorInformation({
          userId: this.userId,
          operationScore: this.operationInput,
        }).then((res) => {
          if (res.code == 200) {
            this.operationDisabled = false;
            this.getBaseInfo();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      }
    },
    // 赋值运营分
    operationEdit(val, row) {
      this.userId = val;
      this.operationInput = row;
      this.operationDisabled = true;
      console.log(val, row, this.operationInput);
    },

    // 封禁确定
    submitForm() {
      console.log(this.resetGrade);
      if (this.radio == 4) {
        if ((this.banReasonTime == -1) & (this.banReason == -1)) {
          this.$message.error("冻结原因,冻结时间必填");
        } else {
          updateUserStatus({
            userType: this.userType,
            userId: this.userId,
            userStatus: this.radio,
            "banReason": this.banReason,
            "banTimeVal": this.banTime,
            "banPeriod": this.banReasonTime
          }).then((res) => {
            if (res.code === 200) {
              this.getBaseInfo();
              this.open = false;
              this.$message({
                type: "success",
                message: `${res.msg}`,
              });
            }
          });
        }
      } else if (this.radio == 2) {
        if (this.fengjinstatus == -1) {
          this.$message.error("封禁原因必填");
        } else {
          updateUserStatus({
            userType: this.userType,
            userId: this.userId,
            userStatus: this.radio,
            "banReason": this.banReason,
          }).then((res) => {
            if (res.code === 200) {
              this.getBaseInfo();
              this.open = false;
              this.$message({
                type: "success",
                message: "成功",
              });
            }
          });
        }
      } else {
        updateUserStatus({
          userType: this.userType,
          userId: this.userId,
          userStatus: this.radio,
          "banReason": this.banReason,
          resetLevel: this.resetGrade
        }).then((res) => {
          if (res.code === 200) {
            this.getBaseInfo();
            this.resetGrade = null
            this.open = false;
            this.$message({
              type: "success",
              message: "成功",
            });
          }
        });
      }
    },
    // 匹配状态确定
    submitMatching() {
      console.log();
      this.open = false;
      updateUserStatus({
        userType: this.userType,
        userId: this.userId,
        goliveStatus: this.goliveStatus,
      }).then((res) => {
        if (res.code === 200) {
          this.getBaseInfo();
          this.openMatching = false;
        }
      });
    },
    // 主播等级确定
    submitGrade() {
      console.log();
      this.open = false;
      modifyMarketAnchorLevel({
        providerId: this.userId,
        levelCode: this.totalScore(this.GradeInput),
      }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.openGrade = false;

          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    // 状态取消
    cancel() {
      this.open = false;
      this.openMatching = false;
      this.openGrade = false;
      if (this.stateus == 5) {
        this.radio = 5
      }

    },
    // 状态转文字
    asd(val) {
      switch (val) {
        case 1:
          return "正常";
        case 2:
          return "封禁";
        case 3:
          return "注销";
        case 4:
          return "冻结";
        case 5:
          return "未通过能力检测";
        default:
          return "--";
      }
    },
    // 状态转文字
    asdgol(val) {
      switch (val) {
        case 0:
          return "禁用";
        case 1:
          return "启用";
        case 2:
          return "白名单";
        case 3:
          return "黑名单";
        default:
          return "--";
      }
    },
    /** 删除相册 */
    delAlbum(albumId, val) {
      let type = '照片'
      if ([2].includes(val)) {
        type = '视频'
      }
      this.$confirm(`删除当前${type}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            resourceId: albumId,
          };
          delResource(data).then(() => {
            this.getBaseInfo();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /**失效时间 */
    changTime(val, row) {
      console.log(val);
      modifyMarketAnchorInformation({
        userId: val,
        operationScoreExpireTime: row,
      }).then((res) => {
        if (res.code == 200) {
          this.operationDisabled = false;
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    /**封禁,冻结状态 */
    xuanze() {
      console.log(this.radio);
      if (this.radio == 5) {
        this.radio = 1;
        this.resetGrade = "1";
      }
    },
    /**冻结时间 */
    banRadio(x) {
      console.log(x);
      this.banTime = x.dictValue;
    },
    // 代理人
    celledit(val) {
      console.log(val);
      this.agentsDisabled = true;
      this.agentsInput = val;
    },
    agentsUpdate() {
      modifyMarketAnchorInformation({
        userId: this.userId,
        agents: this.agentsInput,
      }).then((res) => {
        if (res.code == 200) {
          this.agentsDisabled = false;
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "成功",
          });
        }
      });
    },
    // 设置头像
    setHead(val, i) {
      settingAvatarApi({
        resourceId: val.alumId,
        userId: this.userId,
        faceType: i
      }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "成功",
          });
        }
      });
    },
    deltedalbus(val, type) {
      setPrivate({
        resourceId: val.alumId,
        status: type,
      }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "成功",
          });
        }
      });
    },
    setwarehousing() {
      setwarehousing({
        resourceId: val.alumId,
        status: 1,
      }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "成功",
          });
        }
      });
    },
    videoSort(item) {
      item.disabled = false
      this.$set(this.dataInfo.videos, 'item', item)
    },
    // 形象视频设排序
    videoSortsubmit(item) {
      if (!item.sort) return this.$message.warning('请输入形象视频排序！')
      if (item.sort > this.dataInfo.videos.length) {
        item.sort = this.dataInfo.videos.length
      }
      setUpdateLifeSortApi({
        resourceId: item.alumId,
        sort: Number(item.sort)
      }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "设置成功",
          });
        }
      });
    },
    deltedviseo(val, type) {
      setPrivate({
        resourceId: val.alumId,
        status: type,
      }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "成功",
          });
        }
      });
    },
    // 重置
    resetUpdate() {
      this.resetDisabled = true;
      resetLevel({ providerId: this.userId }).then((res) => {
        if (res.code == 200) {
          this.getBaseInfo();
          this.$message({
            type: "success",
            message: "成功",
          });
          this.resetDisabled = false;
        }
      });
    },
    // 私密相册
    uploadimgchange(file) {
      // console.log(file);
    },
    // 删除私密相册
    beforeremoveimg(file, fileList) {
      console.log(file, fileList);
      uploadPrivacyAlbumApi({
        url: file.url,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("上传成功！");
          }
        })
        .catch((req) => {
          this.$message.error(req.msg);
        });
    },
    // 相册上传
    imgprogressphoto() {
      this.imguploadphotoloading = true 
    },
    imguploadphotosuccess(response, file, fileList) {
      uploadaddAlbumForOperateApi({
        url: response.data.url,
        userId: this.userId,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("上传成功！");
            this.imguploadphotoloading = false
            this.getBaseInfo();
          }
        })
        .catch((req) => {
          this.$message.error(req.msg);
        });
    },
    // 形象视频
    vedioprogressphoto() {
      this.vediouploadphotoloading = true
    },
    vediouploadphotosuccess(file,) {
        // console.log( response.data.url,' response.data.url');
    let that = this
    this.vediouploadphotoloading = true;
    // this.videInfoimage = response
    const fd = new FormData();
    fd.append("file", file.file);
    // console.log(fd, 'aaaaaaaaaaaaaaaa')
    uploadImg(fd, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(res => {
    console.log(res,'res1');
      if(res.data.data.duration > 15 || res.data.data.duration < 5) {
            this.vediouploadphotoloading = false;
            this.$message.warning('视频需要大于5秒且最长不超过15秒')
            return
      }
      this.durationimage = res.data.data.duration
      this.videoHeightimage = res.data.data.height
      this.videoWidthimage = res.data.data.width
      this.vedioimageurl = res.data.data.url
      console.log(file, 'videoSuccessPrPrivacy')
      this.findvideocoverimage(file.url, file.file, 10, null, this.durationimage, this.videoHeightimage, this.videoWidthimage);
    //   that.getVideoMsg(file.raw)
    })
    },
    //截取视频第一帧作为播放前默认图片
    findvideocoverimage(url, file, type, res, durationimage, videoHeightimage, videoWidthimage) {
      let that = this
      // const  video = document.getElementById("myvideo"); // 获取视频对象
      const video = document.createElement("video"); // 也可以自己创建video
      video.src = this.vedioimageurl; // url地址 url跟 视频流是一样的

      // var canvas = document.getElementById('mycanvas') // 获取 canvas 对象
      var canvas = document.createElement("canvas"); // 获取 canvas 对象
      const ctx = canvas.getContext("2d"); // 绘制2d
      video.crossOrigin = "anonymous"; // 解决跨域问题，也就是提示污染资源无法转换视频
      video.currentTime = 1; // 第一帧
        
      video.oncanplay = (e) => {
        console.log(e, '视频示例')
        // console.log(video.clientWidth, video.clientHeight, video.width, '图篇宽高');
        canvas.width = video.clientWidth ? video.clientWidth : that.videoWidthimage; // 获取视频宽度
        canvas.height = video.clientHeight ? video.clientHeight : that.videoHeightimage; //获取视频身高
        // 利用canvas对象方法绘图
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 转换成base64形式
        this.videoFirstimgsrcImage = canvas.toDataURL("image/png"); // 截取后的视频封面
        // console.log(this.videoFirstimgsrcImage, '******************')
        file.url = this.videoFirstimgsrcImage;
        // base64转成bolb文件
        const fileBolb = this.base64toFile(
          this.videoFirstimgsrcImage,
          this.getFileNameimage(file)
        );
        // console.log(fileBolb, file.url, this.videoFirstimgsrcImage);
        // 把首图上传生成云上地址
        this.getFirstPngUrlImage(fileBolb, type, res, durationimage, videoHeightimage, videoWidthimage);
        video.remove();
        canvas.remove();
      };
    },
    getFileNameimage(file) {
      const type = file.type.split("/")[1];
      let name = "";
      if (type) {
        name = file.name.substring(0, file.name.indexOf(`.${type}`));
      }
      return `${name}.png`;
    },
    async getFirstPngUrlImage(file, type, resd, durationimage, videoHeightimage, videoWidthimage) {
      console.log(file, type, resd, durationimage, videoHeightimage, videoWidthimage, '获得参数');
      if (file.type != 'image/png') return
      const fd = new FormData();
      fd.append("file", file);
      console.log(fd, "fd", file);
      await uploadImg(fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(res => {
        uploadImageVideoApi({
            userId: getQueryString("userId"),
            url: this.vedioimageurl,
            cover: res.data.data.url
        }).then(res=>{
            this.getBaseInfo();
            this.vediouploadphotoloading = false;
        })
        // increaseMarketAnchorResource({
        //   userId: getQueryString("userId"),
        //   url: this.videInfoimage.data.url,
        //   videoCoverPicture: res.data.data.url,
        //   type: type,
        //   ext: res.data.data.ext,
        //   height: videoHeightimage,
        //   size: res.data.data.size,
        //   width: videoWidthimage,
        //   duration: durationimage,
        // }).then((res) => {
        //   if (res.code == 200) {
        //     this.getBaseInfo();
        //     this.$message({
        //       type: "success",
        //       message: "修改成功",
        //     });
        //   } else {
        //     this.$message.error("修改失败");
        //   }
        // });
      })
    },
    

    // 私密相册上传回调
    imgprogress() {
      this.uploadimgloading = true
    },
    // 私密相册上传成功
    uploadImgsuccess(response, file, fileList) {
      uploadPrivacyAlbumApi({
        url: response.data.url,
        userId: this.userId,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("上传成功！");
            this.uploadimgloading = false
            this.getBaseInfo();
          }
        })
        .catch((req) => {
          this.$message.error(req.msg);
        });
    },
    //文件上传的回调
    uploadVideoProcessA(event, file, fileList) {
      console.log(file); //注意在data中添加对应的变量名
      this.posterloadingA = true;
    },
    //文件上传的回调
    uploadVideoProcessB(event, file, fileList) {
      console.log(file); //注意在data中添加对应的变量名
      this.posterloadingB = true;
    },
    //文件上传的回调
    uploadVideoProcessP(event, file, fileList) {
      console.log(file); //注意在data中添加对应的变量名
      this.posterloadingP = true;
    },
    // A类视频上传成功之后调用的方法
    videoSuccessPrA(res, file, fileList) {
      // console.log(res, file, fileList)
      this.posterloadingA = false;
      uploadMarketVideoApi({
        url: res.data.url,
        userId: this.userId,
        type: 8
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("上传成功！");
            this.getBaseInfo();
          }
        })
        .catch((req) => {
          this.$message.error(req.msg);
        });
    },
    // B类视频上传成功
    videoSuccessPrB(res, file, fileList) {
      // console.log(res, file, fileList)
      this.posterloadingB = false;
      uploadMarketVideoApi({
        url: res.data.url,
        userId: this.userId,
        type: 9
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("上传成功！");
            this.getBaseInfo();
          }
        })
        .catch((req) => {
          this.$message.error(req.msg);
        });
    },
    // 私密视频上传成功
    videoSuccessPrPrivacy(res, file, fileList) {
      // console.log(res, file, fileList)
      let that = this

      this.posterloadingP = false;
      this.videInfo = res
      const fd = new FormData();
      fd.append("file", file.raw);
      // console.log(fd, 'aaaaaaaaaaaaaaaa')
      uploadImg(fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(res => {
        this.duration = res.data.data.duration
        this.videoHeight = res.data.data.height
        this.videoWidth = res.data.data.width
        // console.log(res, this.duration, 'videoSuccessPrPrivacy')
        that.findvideocover(file.url, file, 10, null, this.duration, this.videoHeight, this.videoWidth);
        that.getVideoMsg(file.raw)
      })
    },

    getVideoMsg(file) {
      return new Promise((resolve) => {
        let videoElement = document.createElement("video")
        videoElement.src = URL.createObjectURL(file)
        videoElement.addEventListener("loadedmetadata", function () {
          resolve({
            duration: videoElement.duration,
            height: videoElement.videoHeight,
            width: videoElement.videoWidth,
          })
        })
      })
    },



    //截取视频第一帧作为播放前默认图片
    findvideocover(url, file, type, res, duration, videoHeight, videoWidth) {
      let that = this
      // const  video = document.getElementById("myvideo"); // 获取视频对象
      const video = document.createElement("video"); // 也可以自己创建video
      video.src = url; // url地址 url跟 视频流是一样的

      // var canvas = document.getElementById('mycanvas') // 获取 canvas 对象
      var canvas = document.createElement("canvas"); // 获取 canvas 对象
      const ctx = canvas.getContext("2d"); // 绘制2d
      video.crossOrigin = "anonymous"; // 解决跨域问题，也就是提示污染资源无法转换视频
      video.currentTime = 1; // 第一帧

      video.oncanplay = (e) => {
        // console.log(e, '视频示例')
        // console.log(video.clientWidth, video.clientHeight, video.width, '图篇宽高');
        canvas.width = video.clientWidth ? video.clientWidth : videoWidth; // 获取视频宽度
        canvas.height = video.clientHeight ? video.clientHeight : videoHeight; //获取视频身高
        // 利用canvas对象方法绘图
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 转换成base64形式
        this.videoFirstimgsrc = canvas.toDataURL("image/png"); // 截取后的视频封面
        // console.log(this.videoFirstimgsrc, '******************')
        file.url = this.videoFirstimgsrc;
        // base64转成bolb文件
        const fileBolb = this.base64toFile(
          this.videoFirstimgsrc,
          this.getFileName(file)
        );
        // console.log(fileBolb, file.url, this.videoFirstimgsrc);
        // 把首图上传生成云上地址
        this.getFirstPngUrl(fileBolb, type, res, duration, videoHeight, videoWidth);
        video.remove();
        canvas.remove();
      };
    },

    base64toFile(baseUrl, filename = "file") {
      let arr = baseUrl.split(",");
      let type = arr[0].match(/:(.*?);/)[1]; // 解锁图片类型
      let bytes = atob(arr[1]); // 解码base64
      let n = bytes.length;
      let bufferArray = new Uint8Array(n);
      while (n--) {
        bufferArray[n] = bytes.charCodeAt(n);
      }
      return new File([bufferArray], filename, { type });
    },

    async getFirstPngUrl(file, type, resd, duration, videoHeight, videoWidth) {
      console.log(file, type, resd, duration, videoHeight, videoWidth, '获得参数');
      if (file.type != 'image/png') return
      const fd = new FormData();
      fd.append("file", file);
      console.log(fd, "fd", file);
      await uploadImg(fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(res => {
        console.log(res, '111111111111111')
        increaseMarketAnchorResource({
          userId: getQueryString("userId"),
          url: this.videInfo.data.url,
          videoCoverPicture: res.data.data.url,
          type: type,
          ext: res.data.data.ext,
          height: videoHeight,
          size: res.data.data.size,
          width: videoWidth,
          duration: duration,
        }).then((res) => {
          if (res.code == 200) {
            this.getBaseInfo();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            this.$message.error("修改失败");
          }
        });
      })
    },

    getFileName(file) {
      const type = file.raw.type.split("/")[1];
      let name = "";
      if (type) {
        name = file.raw.name.substring(0, file.raw.name.indexOf(`.${type}`));
      }
      return `${name}.png`;
    },



    // 搜索
    searchvideoList() {
      this.pageForm.pageNum = 1
      this.searchvideoInfo()
    },
    // 获取视频列表
    searchvideoInfo() {
      this.videoinfoloading = true;
      let obj = {
        ...this.pageForm,
        parmas: {
          providerId: this.userId,
          showFaceOption: this.showFaceOption,
          greetingsOption: this.greetingsOption,
          makeupOption: this.makeupOption,
          environmentOption: this.environmentOption,
        }
      };
      console.log(getQueryString('videoB') == 'true')
      if (getQueryString('videoB') == 'true') {
        console.log(getQueryString('videoB'), '2222222222222222222222')
        getAuditedOrderVideoTypeB(obj).then((res) => {
          if (res.code == 200) {
            this.videoInfoList = res.data.list;
            this.videoTotal = res.data.total;
          }
        })
          .finally(() => {
            this.videoinfoloading = false;
          });
      } else {
        getAuditedOrderVideoApi(obj)
          .then((res) => {
            if (res.code == 200) {
              this.videoInfoList = res.data.list;
              this.videoTotal = res.data.total;
            }
          })
          .finally(() => {
            this.videoinfoloading = false;
          });
      }


    },
    handleSizeChange(value) {
      this.pageForm.pageSize = value;
      this.pageForm.pageNum = 1;
      this.searchvideoInfo();
    },
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.searchvideoInfo();
    },
    // 下载
    dowimg(imgurl, item) {
      var image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png') //得到图片的base64编码数据
        var a = document.createElement('a') // 生成一个a元素
        var event = new MouseEvent('click') // 创建一个单击事件
        a.download = item.alumId // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgurl
    }
  },
};
</script>


<style lang="scss" scoped>
.languagedialog {
  ::v-deep label.el-radio {
    height: 35px;
  }
}

.nicknamedialog {
  ::v-deep .el-dialog__body {
    display: flex;
    align-items: center;

    span {
      width: 70px;
      height: 36px;
      line-height: 36px;
    }

    .inp {
      flex: 1;
    }
  }
}
.signaturedialog {
  ::v-deep .el-dialog__body {
    display: flex;
    align-items: center;

    span {
      width: 100px;
      height: 36px;
      line-height: 36px;
    }

    .inp {
      flex: 1;
    }
  }
}
#xiangceimage{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-x: hidden;
  height: 300px;
  padding-top: 13px;
}
#xiangce {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-x: hidden;
  height: 260px;
  padding-top: 13px;

  .imguploadphoto {
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .processingphoto {
    display: flex;
    justify-items: center;

    .itemphoto {
      display: flex;
      justify-items: center;
      align-items: center;
      position: relative;
      height: 220px;
      text-align: center;
      background-color: #fafafa;
      margin: 15px;

      .photoTilte {
        width: 100%;
        position: absolute;
        top: 0;
      }
    }
  }

  .cells {
    display: flex;
    width: 130px;
    height: 220px;
    background: rgb(158, 158, 158, 0.05);
    margin: 15px !important;
    position: relative;
    padding: 5px 0;

    .delBtn {
      height: 25px;
      width: 25px;
      position: absolute;
      top: 5px;
      right: 5px;
      text-align: center;
    }

    .isshowhead {
      position: absolute;
      transform: rotate(-45deg);
      left: -20px;
      top: 1px;
      padding: 3px;
      font-size: 12px;
      background-color: #b53d4d;
      color: #fff;


    }

    .head_in {
      position: absolute;
      top: 152px;
      left: 50%;
      transform: translateX(-50%);
    }

    .head_us {
      position: absolute;
      top: 184px;
      left: 50%;
      transform: translateX(-50%);
    }

    .private {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      line-height: 0px;
      overflow: hidden;
    }

    .dowload {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .deletedAlbums {
      width: 80%;
      height: 20px;
      background: rgba(236, 128, 141, 0.8);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      bottom: 46%;
    }
  }
}

.cellsd {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: hidden;
.vedioImage{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .imageVideo {
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;

    .delBtn {
      height: 25px;
      width: 25px;
      position: absolute;
      top: 5px;
      right: 5px;
      text-align: center;
    }

    .inp {
      width: 60px;
      margin-right: 5px;
      margin-top: 5px;
    }
  }
}
  

  div {
    // height: 370px;
    position: relative;

    video {
      margin: 5px;
    }

    .warehousing {
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
    }

    .priVideo {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
    }

    .deletedVideo {
      width: 80%;
      height: 20px;
      background: rgba(236, 128, 141, 0.8);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      bottom: 28%;
    }
  }
}

.videotd {
  width: 80%;
}

.scoryHeight {
  max-height: 380px;
  overflow: auto;
}

.authorphoto {
  display: flex;

  .usauthor {
    text-align: center;
  }
}

.celltgd {
  width: 100%;
  display: flex;

  .imgupload {
    margin: 10px 10px;
  }

  .video-avatar {
    height: 170px;
    width: 220px;
    padding: 10px 10px;
  }

  .marketingvideo {
    display: flex;
    margin: auto 0;
  }

  .videobanner {
    display: flex;
    flex-wrap: wrap;

    .deleicon {
      position: absolute;
      width: 30px;
      height: 30px;
      background: #ff4949;
      right: 0px;
      border-radius: 50%;
      top: 0px;
      z-index: 99;

      .deleicon-icon {
        position: absolute;
        top: 6px;
        font-size: 20px;
        left: 4px;
        color: #fff;
        z-index: 999;
      }
    }
  }
}

.celltf {
  // width: 240px;
  margin: 0;
}
.signaturetextB{
    display: flex;
    justify-items: center;
    align-items: center;
    .signaturetext{
        margin-right: 10px ;
    }
}

.birthdayTime {
  width: 140px;
}

.disparity td {
  width: 100px;
}

.disparity {
  .cell {
    width: 100px;
  }
}

.imgbanner {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  .imgitem {
    margin: 10px 10px;

    .deleicon {
      position: absolute;
      width: 30px;
      height: 30px;
      background: #ff4949;
      right: 0px;
      border-radius: 50%;
      top: -8px;
      z-index: 99;

      .deleicon-icon {
        position: absolute;
        top: 6px;
        font-size: 20px;
        left: 4px;
        color: #fff;
        z-index: 999;
      }
    }
  }
}

.isshowUpload {
  ::v-deep .el-upload {
    display: none;
  }
}

// ::v-deep .el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label {
//   cursor: pointer !important;;
// }
.app-container {
  .video_info {
    .video_info_top {
      display: flex;

      .topitem {
        margin-right: 20px;
      }
    }

    .video_info_footer {
      margin: 10px 0px;
      display: flex;
      flex-wrap: wrap;

      .videoitem {
        background-color: #d7d7d7;
        margin: 20px;
        padding: 10px;

        .videocast {
          background-color: #fff;
          width: 260px;
          height: 200px;

          video {
            width: 100%;
            height: 100%;
          }
        }

        .videotag {
          display: flex;
          align-items: center;
          margin-top: 20px;

          .tag {
            margin-left: 20px;
            display: inline-block;
            min-width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 10px;
            font-size: 14px;
            padding: 0 5px;
          }

          .enthusiasm {
            background-color: #70b603;
          }

          .common {
            background-color: #ffff00;
          }

          .cold {
            background-color: #d9001b;
          }

          .deny {
            background-color: #aaaaaa;
          }

          .time {
            margin-left: 20px;
          }
        }
      }
    }
  }

  .footerinfo {
    padding: 0px 15px;
  }
}
</style>