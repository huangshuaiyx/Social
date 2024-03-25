import { Toast } from "vant";
function merchandise(val) {
  console.log(val);
  let resd = {
    code: 200,
    msg: "OK",
    data: {
      items: [
        {
          id: "639a86ee9b5c21ba330b50b1",
          productId: "vchat_007",
          price: "MYR 13.99",
          name: "10000",
          discountPrice: "MYR 13.99",
          lable: null,
          recommend: 0,
          tagUrl: null,
          validDate: null,
          subscribeType: 1,
          currency: "MYR",
          specsMap: {},
        },
        {
          id: "637de8aa3c18260e9f93c0e1",
          productId: "vchat5",
          price: "MYR 24.99",
          name: "12000",
          discountPrice: "MYR 24.99",
          lable: null,
          recommend: 0,
          tagUrl: null,
          validDate: null,
          subscribeType: 1,
          currency: "MYR",
          specsMap: {},
        },
        {
          id: "637de8aa3c18260e9f93c107",
          productId: "vchat6",
          price: "MYR 94.99",
          name: "48000",
          discountPrice: "MYR 94.99",
          lable: null,
          recommend: 0,
          tagUrl: null,
          validDate: null,
          subscribeType: 1,
          currency: "MYR",
          specsMap: {},
        },
      ],
      jumpType: 1,
      defaultChannelConfig: {
        payChannelConfigId: "636a2e34d5fb245c6fb5b944",
        payTypeId: "61ee64abc57e569eb3f60e4b",
        payTypeLogo: null,
        payTypeFullName: null,
        payChannelId: "61e7c615d6be38b57a9aadf2",
        payChannelCode: "GOOGLE_PAY",
        informationEnable: 0,
        informationUrl: null,
        payChannelRewardId: null,
        rewardDesc: null,
        jumpType: 0,
      },
      subscribe: {
        nextSubscriptionTime: "2023-02-18 15:28:49",
        nextSubscriptionTimeMs: 1676714329000,
      },
    },
    timestamp: "1656579596184",
  };
  if (resd.code == 200) {
    return resd.data
  } else {
    Toast(resd.msg);
  }
}

export default {
  merchandise,
};
