/* eslint-disable no-undef */
export default {
  // 获取到账状态
  getstatus(val) {
    switch (val) {
      case 1:
        return "审核中";
      case 2:
        return "审核失败";
      case 3:
        return "提现中";
      case 4:
        return "提现失败";
      case 5:
        return "提现成功";
      default:
        return "--";
    }
  },
  // 消费类型
  getTradeType(val) {
    switch (val) {
      case 1:
        return "任务奖励";
      case 2:
        return "充值";
      case 3:
        return "购买礼物";
      case 4:
        return "语音类型";
      case 5:
        return "视频聊天";
      case 6:
        return "IM聊天";
      case 7:
        return "邀请奖励";
      case 8:
        return "签到";
      default:
        return "--";
    }
  },

  // 身份验证状态
  getIdentity(val) {
    switch (val) {
      case 0:
        return "未完成 ";
      case 1:
        return "审核中";
      case 2:
        return "审核成功";
      case 3:
        return "审核失败";
      default:
        return "--";
    }
  },

  // 任务/奖励 领取状态
  receiveState(val) {
    switch (val) {
      case 0:
        return "未完成 ";
      case 1:
        return "领取";
      case 2:
        return "已领取";
      default:
        return "--";
    }
  },
  //招呼语审核
  hellse(val) {
    switch (val) {
      case 1:
        return "审核中";
      case 2:
        return "审核失败";
      case 3:
        return "审核完成";
      default:
        return "--";
    }
  },

  // 超过2位截取
  ellipsis: function (value) {
    if (!value) return "";
    if (value.length > 7) {
      return value.slice(0, 7) + "...";
    }
    return value;
  },
  getTime(sd) {
    const date = new Date(sd);
    const nowTime =
      date.getFullYear() +
      "." +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "." +
      date.getDate().toString().padStart(2, "0");
    return nowTime;
  },
  getTimems(sd) {
    if (sd === "") {
      return "未设置";
    } else {
      const date = new Date(sd);
      const nowTime =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "月" +
        date.getDate().toString().padStart(2, "0") +
        "日";
      return nowTime;
    }
  },
  noRepeat(quarr) {
    var newArr = [];
    for (var i = 0; i < quarr.length; i++) {
      if (newArr.indexOf(quarr[i]) === -1) {
        newArr.push(quarr[i]);
      }
    }
    return newArr;
  },
};
