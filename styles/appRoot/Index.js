import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f8fa",
  },
  featured:{
    backgroundColor:"#f7f8fa",
  },
  swiper:{
    height:250,
  },
  slideImg:{
    width:Dimensions.get('window').width,
    height:240,
  },
  topView:{
    height:64,
    flexDirection:"row",
    width:Dimensions.get('window').width,
    backgroundColor:'#fff',
    paddingTop:20,
  },
  SearchBtn:{
    flex:4,
    marginRight:10,
    height:30,
    alignItems:"flex-start",
    justifyContent:"center",
    marginTop:5,
    marginBottom:5,
    backgroundColor:"#f7f8fa",
    borderRadius:20,
  },
  SearchIcon:{
    marginLeft:10,
    marginRight:10,
  },
  chooseCity:{
    flexDirection:"row",
    borderRadius:20,
    width:75,
    height:30,
    marginTop:5,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:15,
  },
  chooseText:{
    marginRight:5,
  },
  BottomView:{
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: .2,
    shadowRadius: 5,
    height:176,
    borderRadius:6,
    backgroundColor:"#fff",
    flexDirection:"row",
    flexWrap:"wrap",
    position:"absolute",
    left:15,
    top:224,
    zIndex:0,
    width:Dimensions.get('window').width-30
  },
  touchBtn:{
    width:(Dimensions.get('window').width-30)/4,
    alignItems:"center",
    justifyContent:"center",
    height:88,
  },
  touchView:{
    alignItems:"center",
    justifyContent:"center",
  },
  textTop:{
    marginTop:8,
  },
  middleView:{
    flexDirection:"row",
    marginLeft:15,
    marginRight:15,
    marginTop:35,
    alignItems:"center",
    justifyContent:"center"
  },
  middleTouch:{
    marginRight:5,
    backgroundColor:"#fff",
    marginTop:5,
    paddingRight:15,
  },
  ChartView:{
    flexDirection:"row",
    marginLeft:15,
    marginRight:15,
    marginTop:165,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
    borderRadius:6,
    paddingTop:22,
    paddingBottom:22,
    paddingLeft:13,
  },
  chartLeft:{
    flexDirection:"row",
    alignItems:"center",
    flex:3,
  },
  chartRight:{
    flexDirection:"row",
    flex:2,
    alignItems:"center",
  },
  leftView:{
    marginLeft:7,
    justifyContent:"flex-end",
  },
  rightView:{
    flexDirection:"row",
  },
  mb10:{
    marginBottom:5
  },
  flagBg:{
    color:"#3a8ff3",
    fontSize:10,
    textAlignVertical:'center',
    marginRight:3,
  },
  flagBg1:{
    color:"#a1d0ff",
    fontSize:10,
    textAlignVertical:'center',
    marginRight:3,
  },
  projectTitle:{
    flexDirection:"row",
    justifyContent:"flex-start",
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:15,
  },
  borderMiddle:{
    color:"#898989"
  },



  titleView:{
    paddingLeft:15,
    paddingRight:15,
    height:44,
    backgroundColor:'#fff',
  },
  titleViewText:{
    lineHeight:44,
  },

  imgViewText:{
    lineHeight:20,
    marginTop:10,
    marginBottom:20,
  },
  authorTime:{
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:10,
    paddingTop:10,
    backgroundColor:'#fff',
  },
  viewFlex:{
    flex:1,
  },
  listView:{
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:100,
    paddingTop:10,
    backgroundColor:'#fff',
  },
  listText:{
    flexDirection:"row",
  },
  input:{
    flexDirection:"row",
    width:Dimensions.get('window').width-30,
    marginLeft:15,
    marginRight:15,
    marginTop:5,
    backgroundColor:'#fff',
    height:30,
    borderRadius:10,
  },
  inputImg:{
    marginTop:5,
    marginLeft:5,
    marginRight:10,
  },
  applyBtn:{
    width:60,
    height:60,
    position:'absolute',
    bottom:70,
    right:15,
    borderRadius:30,
    justifyContent:"center",
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'rgba(58,143,243,0.7)',
  },
  applyBtnText:{
    textAlign:'center',
    lineHeight:20,
  },
  lineHeight30:{
    lineHeight:30,
  },
  marginLeft5:{
    marginLeft:5,
  },
  marginLeft10:{
    marginLeft:10,
  },

  containTouch:{
    padding: 12,
    flex:1,
  },
  text: {
    marginLeft: 12,

  },
  cityNav:{
    backgroundColor:"#f9f9f9",
    height:60,
    flexDirection:"row",
    paddingLeft:12,
    paddingTop:20,
    alignItems:"center",
    borderColor:"#eaeaea",
    borderBottomWidth:1
  },
  cityNavText:{
    textAlign:"center",
    flex:1,
  },
  hotCityTitle:{
    paddingLeft:12,
    paddingBottom:15,
    paddingTop:15,
  },
  hotCityList:{
    flexDirection:"row",
    flexWrap:"wrap",
  },
  hotCityTouch:{
    backgroundColor:"#fff",
    paddingTop:10,
    paddingBottom:10,
    alignItems:"center",
    borderRadius:3,
    marginLeft:10,
    marginRight:8,
    marginBottom:8,
    justifyContent:"center",
    width:(Dimensions.get('window').width-75)/4,
    borderColor:"#eaeaea",
    borderWidth:1
  },
  hotCityTouchRest:{
    backgroundColor:"#3a8ff3",
    paddingTop:10,
    paddingBottom:10,
    alignItems:"center",
    borderRadius:3,
    marginLeft:12,
    marginRight:13,
    marginBottom:10,
    justifyContent:"center",
    width:(Dimensions.get('window').width-75)/4,
    borderColor:"#3a8ff3",
    borderWidth:1
  },
  hotCityText:{
    textAlign:"center",
  },
  Fullscreen:{
    flex:1,
    backgroundColor:"#fff"
  },
  tabView:{
    position:"absolute",
    backgroundColor:"#fff",
    bottom:0,
    left:0,
    width:Dimensions.get('window').width,
    flexDirection:"row",
    paddingTop:10,
    borderTopWidth:1,
    borderColor:"#ececec"
  },
  sonView:{
    alignItems:"center",
    justifyContent:"center",
    width:(Dimensions.get('window').width)/5
  },
  marginTop10:{
    marginTop:5,
    marginBottom:5,
  },
  modalMask:{
    backgroundColor:'#f7f8fa',
    flex:1,
    justifyContent:"flex-start",
    alignItems:'center',
  },
  centerView:{
    width:Dimensions.get('window').width,
    flex:1,
  },
  searchTop:{
    height:60,
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:10,
    backgroundColor:"#fff",
    paddingTop:23,
  },
  searchInput:{
    height:30,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#f7f8fa",
    borderRadius:10,
    flex:1,
    flexDirection:"row",
    paddingLeft:5,
  },
  searchIputRest:{
    flex:1,
    padding:0,
    margin:0,
    marginLeft:10,
  },
  cancelBtn:{
    alignItems:"center",
    justifyContent:"center",
    paddingBottom:8,
    paddingLeft:15,
  },
  recommendView:{
   paddingLeft:15,
   paddingRight:15,
   paddingTop:15,
   marginTop:10,
   backgroundColor:"#fff",
 },
 Recommend:{
   marginTop:15,
   flexDirection:"row",
   flexWrap:"wrap"
 },
 recommendTouch:{
   borderWidth:1,
   borderColor:"#ececec",
   borderRadius:3,
   marginRight:10,
   marginBottom:10,
   paddingLeft:10,
   paddingRight:10,
   paddingTop:5,
   paddingBottom:5,
 },
 historyView:{
   paddingTop:15,
   backgroundColor:"#fff",
 },
 historyViewSon:{
   flexDirection:"row",
   paddingLeft:15,
   paddingRight:15,
   borderBottomWidth:1,
   borderColor:"#ececec",
   paddingTop:10,
   paddingBottom:10,
 },
 historyText:{
   flex:3,
 },
 delectTouch:{
   flex:6,
   alignItems:"flex-start",
 },
 delectTouchRest:{
   flex:1,
   alignItems:"flex-end",
 },
 recommendMain:{
   flexDirection:"row",
   marginLeft:15,
 },
 recommendView1:{
   elevation: 5,
   shadowColor: "#000000",
   shadowOffset: { height: 1, width: 1 },
   shadowOpacity: .2,
   shadowRadius: 5,
   position:"relative",
   marginRight:6,
   marginLeft:6,
   marginBottom:10,
   marginTop:5,
   paddingBottom:14,
   paddingLeft:11,
   paddingRight:11,
   backgroundColor:"#fff",
   borderColor:"#e8e9eb",
   borderWidth:1,
   height:226,
 },
 titleWeight:{
   fontWeight:"600"
 },
 listTitle:{
   marginBottom:8,
   width:175,
   height:18,
   marginTop:10,
 },
 recommendImg:{
   width:175,
   height:115,
 },
 marginTop8:{
   marginTop:3,
 },
 marginTop10:{
   marginTop:10,
 },
 txtRed:{
   color:"#f23c3c"
 },
 gzView:{
   marginTop:8,
   flexDirection:"row",
   alignItems:"center",
   marginBottom:8
 },
 changeCityMask:{
   flex:1,
   backgroundColor:'rgba(0,0,0,0.7)',
   justifyContent:"center",
   alignItems:'center',
 },
 changeCityMaskMain:{
   backgroundColor:'#fff',
   width:Dimensions.get('window').width-30,
   borderRadius:6,
   overflow:"hidden",
 },
 changeCityMaskMainTxt:{
   width:Dimensions.get('window').width-30,
   height:150,
   paddingLeft:25,
   paddingRight:25,
   justifyContent:"center",
   alignItems:'center',
 },
 changeCityMaskBtnMain:{
   flexDirection:"row",
 },
 changeCityMaskBtnL:{
   flex:1,
   justifyContent:"center",
   alignItems:'center',
   paddingTop:15,
   paddingBottom:15,
   backgroundColor:"#f4f4f4",
 },
 changeCityMaskBtnR:{
   flex:1,
   justifyContent:"center",
   alignItems:'center',
   paddingTop:15,
   paddingBottom:15,
   backgroundColor:"#3a8ff3",
 },
 searchSelect:{
   flexDirection:"row",
   justifyContent:"center",
   alignItems:'center',
 },
 searchSelectIcon:{
   marginLeft:5,
 },
 searchCityMask:{
   position:'absolute',
   left:10,
   top:45,
   width:89,
   height:126,
   paddingTop:10,
   zIndex:0,
 },
 searchCityMaskL:{
   height:38,
   width:89,
   justifyContent:"center",
   alignItems:'center',
 }
});
