export default {
    // 获取订单状态
    getOrderStatus(val) {
        switch (val) {
            case 1: return '已收货'
            case 2: return '已失效'
            case 3: return '已支付'
            default: return '--'
        }
    },
    //获取商品返利
    getdataSource(val) {
        switch (val) {
            case 0: return '支付宝'
            case 1: return '拼多多'
            case 2: return '淘宝'
            case 3: return '京东'
            case 4: return '考拉'
            case 5: return '苏宁'
            default: return '--'
        }
    },
    //获取到账状态
    getstatus(val) {
        switch (val) {
            case "0": return '全部'
            case "1": return '已到账'
            case "2": return '即将到帐'
            case "3": return '已提现'
            default: return '--'
        }
    },
    //图片展示数量
    getImg(val) {
        switch (val) {
            case "1": return 1
            case "2": return 2
            case "3": return 3
            case "4": return 3
            case "5": return 6
            case "6": return 9
            case "7": return 3
            case "8": return 6
            case "9": return 9
            default: return '--'
        }
    },
     //超过2位截取
     ellipsis: function (value) { 
        if (!value) return "";
        if (value.length > 7) {
          return value.slice(0, 7) + '...';
        }
        return value;
      },
    getTime(sd) {
        let date = new Date(sd)
        let nowTime = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0')
        return nowTime
    },
    getTimems(sd) {
        if (sd == '') {
            return '未设置'
        } else {
            let date = new Date(sd)
            let nowTime = date.getFullYear() + '年' + (date.getMonth() + 1).toString().padStart(2, '0') + '月' + date.getDate().toString().padStart(2, '0') + '日'
            return nowTime
        }

    },
    getTimes(sd) {
        let date = new Date(sd)
        let nowTime = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0')
        return nowTime
    },
    //评分
    getpin(val) {
        switch (val) {
            case "高": return '4.8'
            case "中": return '3.5'
            case "低": return '2.3'
            default: return '--'
        }
    },
    noRepeat(quarr) {
        var newArr = [];
        for (var i = 0; i < quarr.length; i++) {
            if (newArr.indexOf(quarr[i]) == -1) {
                newArr.push(quarr[i]);
            }
        }
        return newArr;
    },
    //过10000转1万..
    million: function (value) {//过万处理 
        let num; if (value > 9999) {//大于9999显示x.xx万    
            num = (Math.floor(value / 1000) / 10) + '万';
        } else if (value < 9999 && value > -9999) { num = value } else if (value < -9999) {//小于-9999显示-x.xx万
            num = -(Math.floor(Math.abs(value) / 1000) / 10) + '万'
        } return num;
    }
}


