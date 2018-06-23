import {StyleSheet,Dimensions,Platform} from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f7f8fa',
    position:"relative",
  },
  nav:{
    height:64,
    width:Dimensions.get('window').width,
    paddingTop:20,
    backgroundColor:"transparent",
    position:'absolute',
    left:0,
    top:0,
  },
  nav1:{
    width:Dimensions.get('window').width,
    position:'absolute',
    left:0,
    top:0,
    flexDirection:"row",
    backgroundColor:"#f6f9fc",
    height:64,
    alignItems:"center",
    justifyContent:"center",
    paddingTop:15,
  },
  touchBack:{
    width:60,
    height:44,
    backgroundColor:"transparent",
    alignItems:"center",
    justifyContent:"center",
  },
  navLeft:{
    width:60,
    height:60,
    justifyContent:"center",
    position:"absolute",
    left:0,
    top:0,
    zIndex:0,
    paddingTop:15,
    paddingLeft:15,
  },
  navName:{
    width:Dimensions.get('window').width-120,
    textAlign:'center',
  },
  scrollView:{
    marginBottom:50,
  },
  swiper:{
    height:200,
  },
  slide:{
    position:"relative",
  },
  slideImg:{
    width:Dimensions.get('window').width,
    height:200,
  },
  bannerBg:{
    width:Dimensions.get('window').width,
    position:'absolute',
    left:0,
    bottom:0,
  },
  slideTxt:{
    width:Dimensions.get('window').width-50,
    height:32,
    backgroundColor:'transparent',
    paddingLeft:15,
    paddingRight:15,
    position:'absolute',
    left:0,
    bottom:0,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  paginationStyle:{
    position:'absolute',
    right:15,
    bottom:0,
    backgroundColor:'transparent',
    alignItems:"flex-end",
    justifyContent:"center",
    height:32,
  },
  main:{
    flex:1,
  },
  label:{
    flexWrap:'wrap',
    flexDirection:"row",
    paddingRight:15,
    paddingLeft:15,
    backgroundColor:"#fff",
    paddingTop:10,
  },
  flag:{
    borderWidth:1,
    marginRight:10,
    paddingLeft:5,
    paddingRight:5,
    height:22,
    marginBottom:10,
    alignItems:"center",
    justifyContent:"center",
  },
  flagTxt:{
    fontSize:14,
  },
  flagColor1:{
    borderColor:"#f38181",
  },
  txtColor1:{
    color:"#f38181",
  },
  flagColor2:{
    borderColor:"#a9eee6",
  },
  txtColor2:{
    color:"#a9eee6",
  },
  flagColor3:{
    borderColor:"#ffd181",
  },
  txtColor3:{
    color:"#ffd181",
  },
  price:{
    paddingRight:15,
    paddingLeft:15,
    backgroundColor:'#fff',
    flexDirection:"row",
    borderColor:'#eaeaea',
    borderTopWidth:1,
    borderBottomWidth:1,
    paddingTop:10,
    paddingBottom:10,
  },
  priceView:{
    flex:1,
  },
  priceView1:{
    flex:1,
    flexDirection:"row"
  },
  priceViewCenter:{
    borderColor:'#eaeaea',
    borderLeftWidth:1,
    borderRightWidth:1,
  },
  priceViewRight:{
    borderColor:'#eaeaea',
    borderRightWidth:1,
  },
  priceTxt:{
    paddingTop:2,
    paddingBottom:2,
    textAlign:'center',
  },
  areaAddress:{
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5,
  },
  areaAddressView:{
    flexDirection:"row",
    marginTop:5,
    marginBottom:5,
  },
  areaAddressTxt:{
    flex:1,
  },
  tab:{
    ...Platform.select({
        ios: {
          backgroundColor:"#fff",
          borderTopWidth:0,
          borderBottomWidth:1,
          borderBottomColor:'#eaeaea',
          marginTop:10,
          height:44,
          alignItems:"center",
          justifyContent:"center",
          paddingLeft:15,
          paddingRight:15,
        },
        android: {
          backgroundColor:"#fff",
          borderTopWidth:0,
          borderBottomWidth:1,
          borderBottomColor:'#eaeaea',
          marginTop:10,
          alignItems:"center",
          justifyContent:"center",
          paddingLeft:15,
          paddingRight:15,
          paddingBottom:0,
        },
      }),
  },
  tabStyle:{
    ...Platform.select({
        ios: {
          borderWidth:0,
          borderRadius:0,
          backgroundColor:"#fff",
        },
        android: {
          borderWidth:0,
          borderRadius:0,
          backgroundColor:"#fff",
          alignItems:"center",
          justifyContent:"center",
          paddingBottom:0,
        },
      }),
  },
  activeTabStyle:{
    ...Platform.select({
        ios: {
          backgroundColor:"#fff",
          borderRadius:0,
          borderBottomWidth:1,
          borderBottomColor:'#3a8ff3',
          height:44,
        },
        android: {
          backgroundColor:"#fff",
          borderRadius:0,
        },
      }),
  },
  activeTabTextStyle:{
    ...Platform.select({
        ios: {
          color:"#3a8ff3",
        },
        android: {
          color:"#3a8ff3",
          borderBottomWidth:1,
          borderBottomColor:'#3a8ff3',
          paddingTop:10,
          paddingBottom:10,
          alignItems:"center",
          justifyContent:"center",
        },
      }),

  },
  title:{
    height:40,
    alignItems:"flex-start",
    justifyContent:"center",
    paddingLeft:15,
    paddingRight:15,
  },
  property:{
    backgroundColor:'#fff',
  },
  propertyList:{
    width:Dimensions.get('window').width,
    flexWrap:'wrap',
    flexDirection:"row",
  },
  propertyTxt:{
    width:Dimensions.get('window').width/2,
    marginBottom:10,
    paddingLeft:15,
  },
  manage:{
    backgroundColor:'#fff',
    marginTop:10,
  },
  manageList:{
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    marginBottom:10,
  },
  manageTxt:{
    flex:1,
  },
  facility:{
    backgroundColor:'#fff',
    marginTop:10,
    paddingBottom:15,
  },
  facilityMain:{
    width:Dimensions.get('window').width,
    flexWrap:'wrap',
    flexDirection:"row",
    backgroundColor:'#fff',
    alignItems:"center",
    justifyContent:"center",
  },
  facilityIcon:{
    width:Dimensions.get('window').width/5,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,
  },
  facilityImg:{
    width:18,
    height:18,
    marginBottom:7,
  },
  marginTop20:{
    marginTop:20,
  },
  neighbor:{
    backgroundColor:'#fff',
    paddingBottom:60,
    marginTop:10,
  },
  neighborList:{
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
    paddingBottom:10,
    borderColor:'#eaeaea',
    borderTopWidth:1,
  },
  neighborImg:{
    marginRight:10,
  },
  neighborTxt:{
    flex:1,
  },
  borderBottom:{
    borderColor:'#eaeaea',
    borderBottomWidth:1,
  },
  marginBottom8:{
    marginBottom:8,
  },
  commission:{
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:60,
  },
  rule:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    height:40,
  },
  ruleFlex:{
    flex:1,
    textAlign:'right',
  },
  commissionTitle:{
    alignItems:"flex-start",
    justifyContent:"center",
    borderColor:"#3a8ff3",
    borderLeftWidth:3,
    marginTop:10,
    marginBottom:10,
    paddingLeft:6,
  },
  commissionMain:{
    backgroundColor:'#fff',
    flexDirection:"row",
    borderColor:'#eaeaea',
    borderTopWidth:1,
    borderBottomWidth:1,
    paddingTop:10,
    paddingBottom:10,
  },
  commissionView:{
    flex:1,
    paddingLeft:10,
    paddingRight:10,
  },
  commissionViewCenter:{
    borderColor:'#eaeaea',
    borderLeftWidth:1,
    borderRightWidth:1,
  },
  commissionTxt:{
    paddingTop:2,
    paddingBottom:2,
    textAlign:'center',
  },
  strengths:{
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:15,
  },
  bottomTouch:{
    flexDirection:"row",
    width:Dimensions.get('window').width,
    height:50,
    backgroundColor:"#fff",
    borderColor:"#eaeaea",
    borderTopWidth:1,
    position:'absolute',
    left:0,
    bottom:0,
  },
  attention:{
    width:70,
    alignItems:"center",
    borderColor:"#eaeaea",
    borderRightWidth:1,
    marginTop:8,
  },
  reportBtn:{
    height:50,
    width:Dimensions.get('window').width-140,
    alignItems:"center",
    justifyContent:"center",
  },
  reportImg:{
    height:50,
    width:Dimensions.get('window').width-140,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
  },
  reportImgIcon:{
    marginRight:10,
  },
  mt10:{
    marginTop:2,
  },
  mask:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.7)',
    justifyContent:"flex-end"
  },
  closeBtn:{
    height:40,
    backgroundColor:'#fff',
    width:Dimensions.get('window').width,
    marginTop:10,
    justifyContent:"center",
    alignItems:'center',
  },
  share:{
    flexDirection:"row",
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#fff',
  },
  shareView:{
    flex:1,
    justifyContent:"center",
    alignItems:'center',
  },
  shareText:{
    marginTop:15,
  },
  webView:{
    borderWidth:0,
    borderColor:'transparent',
    backgroundColor:'#fff',
    ...Platform.select({
        ios: {
          height:600,
        },
        android: {
         height:600,
        },
      }),
  },
  swiperMask:{
    flex:1,
    backgroundColor:'#010101',
    justifyContent:"center",
    alignItems:'center',
  },
  swiperMaskNav:{
    width:Dimensions.get('window').width,
    height:64,
    backgroundColor:'#141414',
    flexDirection:"row",
    paddingTop:20,
  },
  swiperMasknavLeft:{
    width:60,
    height:44,
    backgroundColor:'transparent',
    justifyContent:"center",
    alignItems:'flex-start',
    paddingLeft:15,
  },
  swiperMasknavCenter:{
    width:Dimensions.get('window').width-120,
    height:44,
    backgroundColor:'transparent',
    justifyContent:"center",
    alignItems:'center',
  },
  swiperMaskMain:{
    flex:1,
    backgroundColor:'#010101',
    justifyContent:"center",
    alignItems:'center',
  },
  swiper1:{
    height:300,
    width:Dimensions.get('window').width,
  },
  slideImg1:{
    width:Dimensions.get('window').width,
    height:250,
  },
  paginationStyle1:{
    height:20,
    marginTop:30,
    justifyContent:"center",
    alignItems:'center',
  },
});