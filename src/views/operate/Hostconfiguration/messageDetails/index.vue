

<template>
  <div class="app-container">
    <div class="details-top">
      <p>
        主播长ID：{{hostId}}
      </p>
      <p class="freeze" @click="openMatching = true">
        封禁
      </p>
      <p class="freeze" @click="banReasonShow = true">
        冻结
      </p>
      <p>
        领金币权限：{{permission.rewardPermission == 1 ? "正常 ": permission.rewardPermission == 2 ?
        "无权限(永久)":`无权限(恢复时间: ${permission.expiredTime})`}}
      </p>
      <div class="anniu">
        <!-- <button @click="translateClick">翻译</button> -->
        <button @click="refresh">刷新</button>
      </div>
    </div>
    <div id="details-top">
      <div class="details-top-left">
        <div>
          <p>信息回复率: {{hostRateData.replyRate}}%</p>
          <p>金币领取率 : {{hostRateData.balanceReceiveRate}}%</p>
          <p>金币平均时长 : {{hostRateData.balanceAvgDuration}}min</p>
          <p>被罚率 : {{hostRateData.penaltyRate}}% {{hostRateData.penaltyBalance}}/{{hostRateData.receiveBalance}}</p>
        </div>
      </div>
      <div class="details-top-right">
        <p class="punish">处罚记录</p>
        <div class="infinite-list" ref="punishref" @scroll="punishScroll">
          <div v-for="(x, i) in punishQueryList" :key="i">
            <span>{{ x.penaltyTime }}</span>
            <span style="width:250px">内容:{{ x.penaltyContent }}</span>
            <span>操作人:{{ x.operator }}</span>
            <span>处罚描述:{{ x.penaltyReceiveAwardDesc }}</span>
          </div>
          <p v-show="noMorePunish" class="no-more-punish">没有数据了</p>
          <p v-show="loadingPunish" class="loading-punish"><i class="el-icon-loading"></i></p>
        </div>

      </div>
    </div>

    <div class="tablesd">
      <div class="tablesd-left" v-loading="leftLoading">
        <p :class="i == index ? 'tablesd-left-checked' : 'tablesd-left-unselected'" @click="userClick(x, i)"
          v-for="(x, i) in conversationList" :key="i">{{x.userNickName}} ({{x.messageNumber}}) {{x.agoTime}}</p>
        <el-pagination background layout="prev, pager, next" :total="usertioncount" :page-size="usertionData.pageSize"
          :pager-count="5" :small="true" @current-change="changePage">
        </el-pagination>
      </div>
      <div class="tablesd-right" @scroll="divScroll" ref="messagrScoll" v-loading="tablesdLoading">
        <div class="single">
          <div v-for="(x, i) in formData" :key="i">
            <div class="message-left" v-show="x.senderType == 2">
              <p class="message-left-name"><span>{{ x.nickName }}</span> <i v-show="fangjianLogo(x) == 'video'" class="el-icon-s-home"></i></p>
              <p class="message-left-time"><span>{{ x.sendTime }}</span> <span v-show="carryGold(x) != null"><img
                    src="../../../../assets/images/quantity.png" alt="">+{{carryGold(x)}}</span>
              </p>

              <div class="message-left-test" v-show="x.messageType == 'TEXT'">
                {{messageProcessing(x)}}
              </div>
              <p v-show="x.messageType == 'CUSTOM'" class="message-left-test">{{messageProcessing(x)}}</p>
              <el-image :src="messageProcessing(x)" :preview-src-list="[messageProcessing(x)]" fit="contain"
                class="imgas" style=" width: 50px; height: 50px" v-show="x.messageType == 'PICTURE'" />
              <!-- <video v-show="x.messageType == 'VIDEO'" :src="messageProcessing(x)"></video> -->
              <hr v-show="x.textd != null">
              <div class="message-left-test" v-show="x.textd != null">
                {{x.textd}}
              </div>
              <div class="host-operate">
                <button @click=" deduction(x)" v-show="carryGold(x) != null">减扣</button>
                <button @click="doubleDiscount(x)" v-show="carryGold(x) != null">双倍减扣</button>
                <button @click="punishClick(x)">处罚</button>
              </div>
            </div>
            <div class="message-right" v-show="x.senderType == 1">
              <p class="message-right-name"><i v-show="fangjianLogo(x) == 'video'" class="el-icon-s-home"></i><span>{{ x.nickName }}</span></p>
              <p class="message-right-time"> 
                <span>{{ x.sendTime }}</span>
              </p>
              <div class="message-right-test" v-show="x.messageType == 'TEXT'">
                {{messageProcessing(x)}}
              </div>
              <div v-show="x.messageType == 'CUSTOM'" class="message-right-test">
                <p>{{messageProcessing(x)}}</p>
                <!-- <el-image v-else :src="liwuProcessing(x)" :preview-src-list="[liwuProcessing(x)]" fit="contain"
                class="imgas" style=" width: 50px; height: 50px" /> -->
              </div>
              <el-image :src="messageProcessing(x)" :preview-src-list="[messageProcessing(x)]" fit="contain"
                class="imgas" style=" width: 50px; height: 50px" v-show="x.messageType == 'PICTURE'" />
              <!-- <video v-show="x.messageType == 'VIDEO'" :src="messageProcessing(x)"></video> -->
              <hr v-show="x.textd != null">
              <div class="message-right-test" v-show="x.textd != null">
                {{x.textd}}
              </div>
            </div>
          </div>

        </div>
        <p v-show="noMore" class="no-more">没有数据了</p>
        <p v-show="loading" class="loading"><i class="el-icon-loading"></i></p>
      </div>
    </div>
    <!--减扣 -->
    <el-dialog title="是否确定减扣" :visible.sync="deductionShow" width="30%" center top="30vh">
      <p class="deductions">当前收入会从主播余额中扣除</p>
      <p class="deductions">减扣金币：{{deductionNum}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deductionShow = false">取 消</el-button>
        <el-button type="primary" @click="deductionOk(1)">确 定</el-button>
      </span>
    </el-dialog>
    <!--双倍减扣 -->
    <el-dialog title="是否确定双倍减扣" :visible.sync="doubleDiscountShow" width="30%" center top="30vh">
      <p class="deductions">当前收入*2会从主播余额中扣除</p>
      <p class="deductions">减扣金币：{{doubleDiscountNum}}*2={{doubleDiscountNum * 2}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="doubleDiscountShow = false">取 消</el-button>
        <el-button type="primary" @click="deductionsOK(2)">确 定</el-button>
      </span>
    </el-dialog>
    <!--处罚 -->
    <el-dialog title="处罚" :visible.sync="punishShow" width="30%" center>
      <div class="punishchoose">
        <p>罚款</p>
        <el-select v-model="punishInputa" placeholder="请选择">
          <el-option v-for="(item, i) in punishoptions" :key="i" :label="item.dictLabel" :value="item.dictValue">
          </el-option>
        </el-select>
      </div>
      <div class="punishchoose">
        <p>停止领取金币资格</p>
        <el-select v-model="punishInputb" placeholder="请选择">
          <el-option v-for="(item, i) in stopOptions" :key="i" :label="item.dictLabel" :value="item.dictValue">
          </el-option>
        </el-select>
      </div>
      <div class="punishch">
        <p>处罚原因</p>
        <el-select v-model="punishInputc" placeholder="请选择">
          <el-option v-for="(item, i) in options" :key="i" :label="item.dictLabel" :value="item.dictValue">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="punishShow = false">取 消</el-button>
        <el-button type="primary" @click="punishOK(3)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 封禁 -->
    <el-dialog title="Forever removed operation" :visible.sync="openMatching" width="20%" append-to-body>
      <el-radio-group v-model="goliveStatus">
        <el-radio style="width:100%;margin-top:20px" :label="x.dictValue" v-for="(x, i) in banData" :key="i">
          {{ x.dictLabel }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMatching">Confirm</el-button>
        <el-button @click="openMatching = false">Cancel</el-button>
      </div>
    </el-dialog>
    <!-- 冻结 -->
    <el-dialog title="Restricted operation" :visible.sync="banReasonShow" width="20%" append-to-body>
      <el-radio-group v-model="banReasonTime">
        <p>Frozen period</p>
        <el-radio style="width:100%;margin-top:20px" :label="x.dictLabel" v-for="(x, i) in frozenTimeData" :key="i"
          @change="banRadio(x)">
          {{ x.dictLabel }}</el-radio>
      </el-radio-group>
      <hr />
      <p>Restricted Reason</p>
      <el-radio-group v-model="banReason">
        <el-radio style="width:100%;margin-top:20px" :label="x.dictValue" v-for="(x, i) in frozenData" :key="i">
          {{ x.dictLabel }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reasonMatching">Confirm</el-button>
        <el-button @click="banReasonShow = false">Cancel</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
import index from "./index.js";

export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>