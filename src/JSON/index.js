import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { eventBus } from '../../../config/common';

// import SVGAPlayer from 'react-native-svga';

export default class Imdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtext: '',
      detailsData: this.props.route.params,
      dataIm: [],
      userData: {},
      toData: {},
      isLoading: false,
      visible: false,
    };
  }

  sendClick = () => {
    if (this.state.inputtext == '') {
      return alert('请输入内容');
    }
    let that = this;

    nim.sendText({
      scene: 'p2p',
      to: this.state.detailsData.to,
      text: this.state.inputtext,
      done: function (err, msg) {
        if (err) {
          console.log('发送失败', err);
        } else {
          console.log('发送成功', msg);
          //   let arr =  this.state.dataIm.push(msg)
          that.setState({
            inputtext: '',
            // dataIm: arr
          });
          console.log(this.state.dataIm);

          // setTimeout(() => {
          //     that.messageDetail()
          // }, 2000);
        }
      },
    });

    // api.sendIM({
    //     scene: 'message',
    //     toUserImId: this.state.detailsData.to,
    //     body: {
    //         "msg": this.state.inputtext
    //     },
    //     "messageType": 1
    // })
  };

  locaSessino = () => [
    nim.insertLocalSession({
      scene: 'p2p',
      to: this.state.detailsData.to,
      done: (err, data) => {
        console.log(data, '成功');
      },
    }),
  ];

  renderDate = ({item, index}) => {
    let that = this;
    return item.from != that.state.detailsData.to ? (
      <View style={styles.styleRight}>
        <Image
          defaultSource={require('../../../assets/face.png')} //默认图片
          style={styles.itemImgsRight}
          source={{uri: that.state.userData.avatar}}
        />
        {item.type == 'text' ? (
          <Text style={styles.styleleftText}>{item.text}</Text>
        ) : (
          ''
        )}
        {item.type == 'image' ? (
          <Image
            defaultSource={require('../../../assets/face.png')} //默认图片
            style={styles.stylerightImges}
            source={{uri: item.file.url}}
          />
        ) : (
          ''
        )}
      </View>
    ) : (
      <View style={styles.styleLeft}>
        <Image
          defaultSource={require('../../../assets/face.png')} //默认图片
          style={styles.itemImgsLeft}
          source={{uri: that.state.toData.avatar}}
        />
        {item.type == 'text' ? (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../../assets/IM/translateIcon.png')}
              style={{width: 28, height: 28}}
            />
            <Text style={styles.stylerightText}>{item.text}</Text>
          </View>
        ) : (
          ''
        )}
        {item.type == 'image' ? (
          <Image
            defaultSource={require('../../../assets/face.png')} //默认图片
            style={styles.styleleftImges}
            source={{uri: item.file.url}}
          />
        ) : (
          ''
        )}
        {item.type == 'custom' ? this.handleCommand(item.content) : ''}
      </View>
    );
  };

  // 消息详情
  messageDetail = () => {
    let that = this;
    let idServer = '';
    let item = new Date().getTime();
    if (this.state.dataIm.length != 0) {
      idServer = this.state.dataIm[0].idServer;
      item = this.state.dataIm[0].item;
      console.log(
        this.state.dataIm[this.state.dataIm.length - 1].idServer,
        'cassero啊啊le',
      );
    }
    nim.getHistoryMsgs({
      asc: true,
      beginTime: 0,
      endTime: 0,
      limit: 10,
      reverse: false,
      scene: 'p2p',
      to: that.state.detailsData.to,
      lastMsgId: idServer,
      done: function (err, data) {
        console.log(
          data.msgs,
          '----------------------',
          'asc:',
          true,
          'beginTime: ',
          0,
          'endTime:',
          new Date().getTime(),
          'limit: ',
          10,
          'reverse:',
          false,
          'scene:',
          'p2p',
          'to:',
          that.state.detailsData.to,
          ' lastMsgId: ',
          idServer,
        );
        // that.setState({
        //     isLoading: false
        // })
        // let datsd = [...data.msgs, ...that.state.dataIm]
        that.setState({
          dataIm: data.msgs,
          isLoading: false,
        });
        // console.log(that.state.dataIm, '调用成功',)
      },
    });
  };

  // 图片发送
  imgesClick = () => {
    nim.getServerSessions({
      limit: 100,
      maxTimestamp: new Date().getTime(),
      minTimestamp: 0,
      done: function (err, data, hasMore, sessionList) {
        console.log(data.done, sessionList, '云端会话列表');
      },
    });
  };

  handleCommand(val) {
    let data = JSON.parse(val);
    // console.log(data.payload, '自定义消息')
    if (data.eventType == 'RTC_CONVERSATION_NOTICE') {
      // 视频
      return (
        <View style={styles.videoCustom}>
          <ImageBackground
            source={{uri: data.payload.backgroundUrl}}
            style={styles.ImageBacks}
            imageStyle={styles.imageStyle}
            resizeMode="cover">
            <Text>视频</Text>
          </ImageBackground>
          {/* <SVGAPlayer
                        source={data.payload.callIconUrlSvga}
                        style={{ flex: 1 }}
                    /> */}
        </View>
      );
    } else if (data.eventType == 'UMS_FOCUS_NOTICE') {
      // 关注消息
      return (
        <View>
          <Text>关注消息</Text>
        </View>
      );
    } else if (data.eventType == 'UP_GIVE_ITEM') {
      // 礼物
      return (
        <View>
          <Text>礼物</Text>
        </View>
      );
    } else if (data.eventType == 'IM_CONVERSATION_TIP') {
      // 自定义提示
      return (
        <View>
          <Text>自定义提示</Text>
        </View>
      );
    } else if (data.eventType == 'COUNTDOWN_CALL') {
      // 倒计时呼叫
      return (
        <View>
          <Text>倒计时呼叫</Text>
        </View>
      );
    } else if (data.eventType == 'CUSTOM_IMAGE') {
      // 自定义图片
      return (
        <View>
          <Text>自定义图片</Text>
        </View>
      );
    } else if (data.eventType == 'CUSTOM_PRIVATE_IMAGE') {
      // 自定义私密图片
      return (
        <View>
          <Text>自定义私密图片</Text>
        </View>
      );
    }
  }

  loadMoreData = () => {
    console.log('置顶了');
    if (!this.state.isLoading) {
      this.setState({isLoading: true}, () => {
        this.messageDetail();
      });
    }
    console.log(this.state.isLoading, 'isLoading');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#0E061E'}}>
          <FlatList
            data={this.state.dataIm}
            keyExtractor={item => item.id}
            renderItem={this.renderDate}
            ref={ref => {
              this.myFlatListRef = ref;
            }}
            onContentSizeChange={() => {
              this.myFlatListRef.scrollToEnd({animated: true});
            }}
            onLayout={() => {
              this.myFlatListRef.scrollToEnd({animated: true});
            }}
            // ListFooterComponent={this.state.isLoading && <ActivityIndicator />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.loadMoreData}
              />
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            height: 50,
          }}>
          <Image
            style={styles.itemImgs}
            source={require('../../../../src/assets/IM/gift.png')}
          />
          <TouchableWithoutFeedback onPress={this.imgesClick}>
            <Image
              style={styles.itemImgs}
              source={require('../../../../src/assets/IM/picture.png')}
            />
          </TouchableWithoutFeedback>
          <TextInput
            style={{
              height: 40,
              width: 220,
              borderColor: 'gray',
              borderWidth: 1,
              marginTop: 5,
            }}
            onChangeText={val => {
              this.setState({
                inputtext: val,
              });
            }}
            value={this.state.inputtext}
          />
          <Image
            style={styles.itemImgs}
            source={require('../../../../src/assets/IM/translate.png')}
          />
          <TouchableWithoutFeedback
            onPress={this.sendClick}
            style={styles.sendbutton}>
            <Image
              style={styles.itemImgs}
              source={require('../../../../src/assets/IM/send.png')}
              onPress={this.sendClick}
            />
          </TouchableWithoutFeedback>
        </View>

        <Modal
          visible={this.state.visible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>这是底部弹框</Text>
              <TouchableWithoutFeedback style={styles.closeButton}>
                <Text style={styles.closeButtonText}>关闭</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  componentDidMount() {
    let that = this;
    that.messageDetail();
    nim.getUsers({
      accounts: [
        that.state.detailsData.to,
        that.state.detailsData.lastMsg.from,
      ],
      sync: true,
      done: (err, data) => {
        data.map(x => {
          if (that.state.detailsData.to == x.account) {
            that.setState({
              toData: x,
            });
          } else {
            that.setState({
              userData: x,
            });
          }
        });
      },
    });

    // DeviceEventEmitter.addListener('msgImStorage', (res) => {
    //     console.log(res, '读取参数')
    //     if (res.msgImStorageSuccess) {
    //         AsyncStorage.getItem('msgIm').then(result => {
    //             this.setState({
    //                 dataIm: result != null ? dataIm.push(JSON.parse(result)) : []
    //             })
    //         })
    //     }
    // })

    const handleEvent = res => {
      // 处理事件，更新 UI
      console.log('imdetail Received event:eeee', res);
      if (res.msgImStorageSuccess) {
        AsyncStorage.getItem('msgIm')
          .then(result => {
            console.log('red::', result);
            this.setState(prevState => ({
              dataIm:
                result != null ? [...prevState.dataIm, JSON.parse(result)] : [],
            }));
          })
          .catch(result => {
            console.log('imdetail msgIm get error', result);
          });
      }
    };
    eventBus.addListener('myEvent', handleEvent);
  }

  componentWillUnmount() {
    eventBus.removeListeners('myEvent');
    console.log('clear removeListeners: myEvent');
  }
}

const styles = StyleSheet.create({
  sendbutton: {
    width: 30,
    height: 30,
  },
  sendtext: {
    lineHeight: 30,
    textAlign: 'center',
  },
  itemImgs: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  itemImgsLeft: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 10,
    marginTop: 7,
  },
  styleleftText: {
    backgroundColor: '#fff',
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    borderRadius: 8,
    lineHeight: 22,
    height: 25,
    marginRight: 8,
    fontSize: 12,
    color: '#999DB9',
  },
  styleLeft: {
    flexDirection: 'row',
    height: 'auto',
    width: '100%',
  },
  styleRight: {
    flexDirection: 'row-reverse',
    height: 'auto',
    width: '100%',
  },
  itemImgsRight: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
    marginTop: 7,
  },
  stylerightText: {
    backgroundColor: '#fff',
    width: 'auto',
    maxWidth: 250,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    borderRadius: 8,
    lineHeight: 28,
    height: 'auto',
    marginRight: 8,
    fontSize: 12,
    color: '#999DB9',
  },
  stylerightImges: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 15,
  },
  styleleftImges: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginLeft: 8,
    marginTop: 15,
  },
  videoCustom: {
    width: 150,
    height: 150,
  },
  ImageBacks: {
    width: 200,
    height: 100,
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 200,
    height: 100,
  },
});
