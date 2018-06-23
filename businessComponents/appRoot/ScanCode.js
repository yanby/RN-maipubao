import React, {
    Component,
} from 'react'
import {
    View,
    StyleSheet,
    Alert,
    DeviceEventEmitter,
    TouchableHighlight,
    Image,AppRegistry,Platform,Text
} from 'react-native'
import { Actions,ActionConst } from 'react-native-router-flux';
import Barcode from 'react-native-smart-barcode'
import TimerEnhance from 'react-native-smart-timer-enhance'
import {styles} from '../../styles/personalCenter/MyFeedback';
import { apis } from '../../systemComponents/Remote/ApiStorage';
import {keys} from '../../systemComponents/SyncStorage/StorageKeys';
import ListBasicComponent from '../basic/ListBasicComponent';


export default class ScanCode extends ListBasicComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            viewAppear: false,
            userDetail:[],
            hisDetail :[],
            viewAppearCallBack:()=>{console.log('1');},
            mySetTimeOut:()=>{console.log('2');}
        };
    }
    componentWillMount(){

    }
    clearPageTimeOut(){
      if (this.state.mySetTimeOut) {
        clearTimeout(this.state.mySetTimeOut);
      }
      if (this.state.viewAppearCallBack) {
          this.state.viewAppearCallBack=null;
      }
    }
    _onBack(){
      this.clearPageTimeOut();
      Actions.pop();
    }
    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'black',}}>


                  {this.state.viewAppear ?
                    <View style={{flex: 1}}>
                    <Barcode style={{flex: 1}} ref={ component => this._barCode = component }
                    onBarCodeRead={this._onBarCodeRead}/>
                    <Text style={styles.scanText}>请扫描优铺APP“推荐”或“发展团队”二维码</Text>
                    </View>
                    : null
                  }
                  <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>this._onBack()}>
                        <Image  source={require('../../images/back.png')}/>
                  </TouchableHighlight>
            </View>
        )
    }

    componentDidMount() {
      this.state.viewAppearCallBack  = (event) => {
      //  console.log('11111');
          this.state.mySetTimeOut = setTimeout( () => {
              this.setState({
                  viewAppear: true,
              })
              if (this.state.viewAppearCallBack) {
                this.state.viewAppearCallBack();
              }
          }, 1000)
      }
      this.state.viewAppearCallBack();
        // this.setInterval( () => {
        //   this.setState({
        //       viewAppear: true,
        //   })
        // },500)

        //this.subscription = DeviceEventEmitter.addListener('didfocus', viewAppearCallBack);
        // this._listeners = [
        //     this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack)
        // ]
    }

    componentWillUnmount(){
        //this._listeners && this._listeners.forEach(listener => listener.remove());
        this.clearPageTimeOut();
    }

    _onBarCodeRead = (e) => {
        if (e.nativeEvent.data.type&&(e.nativeEvent.data.type.indexOf('QRCode')>-1||e.nativeEvent.data.type.indexOf('QR_CODE')>-1)) {
          this._stopScan();
          let qrCodeUrl = e.nativeEvent.data.code;
          this.clearPageTimeOut();
          if (Platform.OS === 'ios') {
            this.setState({viewAppear:false})
          }

          Actions.replace('BindRouterCenter',{qrCodeUrl:qrCodeUrl});
          //this._startScan();
        }
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

}
AppRegistry.registerComponent('ScanCode', () => ScanCode);

//export default TimerEnhance(ScanCode)
