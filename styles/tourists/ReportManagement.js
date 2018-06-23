import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f8fa",
  },
  mainView:{
    flex:1,
    backgroundColor:"#fff",
    borderColor:"#eaeaea",
    borderTopWidth:1,
    borderBottomWidth:1,
    marginTop:10,
  },
  signTitleView:{
    flexDirection:"row",
    backgroundColor:"#f9f9f9",
    height:65,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#eaeaea",
    borderBottomWidth:1,
    paddingTop:15,
  },
  backView:{
    width:60,
    height:44,
    alignItems:"flex-start",
    justifyContent:"center",
    position:"absolute",
    left:0,
    top:20,
    zIndex:10,
    paddingLeft:15,
  },
  searchView:{
    width:60,
    height:44,
    alignItems:"flex-end",
    justifyContent:"center",
    position:"absolute",
    right:0,
    top:20,
    zIndex:10,
    paddingRight:15,
  },
  dropdownView:{
    flex:1,
  },
  tabViewRest:{
    alignItems:"center",
    backgroundColor:"#f9f9f9",
    width:Dimensions.get('window').width,
    borderColor:"#eaeaea",
    borderBottomWidth:1,
    position:"relative"
  },
  tabsContainerStyle:{
    backgroundColor:"#f9f9f9",
    height:63,
    width:200,
    paddingTop:20,
  },
  tabStyle:{
    borderWidth:0,
    borderRadius:0,
    backgroundColor:"#f9f9f9",
  },
  activeTabStyle:{
    backgroundColor:"#f9f9f9",
    borderBottomWidth:2,
    borderColor:"#3a8ff3",
    borderRadius:0,
  },
  activeTabTextStyle:{
    color:"#3a8ff3"
  },
  tabView:{
    backgroundColor:"#fff",
    position:"absolute",
    top:0,
    left:0,
    borderWidth:0,
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
    height:40,
  },
  tabBar:{
    height:40,
    alignItems:"center",
    justifyContent:"center",
  },
  main:{
    paddingTop:40,
    height:Dimensions.get('window').height-60,
    width:Dimensions.get('window').width,
  },
  reportTop:{
    flexDirection:"row",
    borderBottomColor:"#eaeaea",
    borderBottomWidth:1,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
    paddingBottom:10,
  },
  reportTopRest:{
    borderBottomWidth:0,
    paddingTop:16,
    paddingBottom:0,
  },
  reportTop1:{
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
    paddingBottom:10,
  },
  reportMiddle:{
    paddingLeft:15,
    paddingRight:15,
    paddingTop:14,
  },
  middleBottom:{
    paddingBottom:15,
  },
  reportBottom:{
    alignItems:"flex-end",
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:15,
  },
  flex:{
    flex:1,
  },
  speailColor:{
    color:"#89b15b"
  },
  flagRed:{
    color:"#ed6c5f"
  },
  topBtn:{
    borderColor:"#ed6c5f",
    borderWidth:1,
    borderRadius:10,
    width:55,
    height:18,
    alignItems:"center",
    justifyContent:"center"
  },
  topRight:{
    textAlign:"right",
  },
  reportTopText:{
    borderWidth:1,
    borderColor:"#eaeaea",
    borderRadius:3,
    marginRight:15,
    marginBottom:5,
    alignItems:"center",
    paddingRight:5,
    paddingLeft:5,
    justifyContent:"center",
  },
  reportTopText1:{
    width:20,
  },
  reportTopText2:{
    width:70,
  },
  reportTopText3:{
    width:120,
  },
  topView:{
    flexDirection:"row",
  },
  checkView:{
    alignItems:"center",
    justifyContent:"center"
  },
  reportState:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:10,
    paddingBottom:10,
  },
  reportView:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingBottom:5,
  },
  flexView:{
    flex:1,
    textAlign:"center"
  },
  flexRowView:{
    flexDirection:"row",
    paddingLeft:15,
  },
  btnView:{
    flexDirection:"row",
    backgroundColor:"#fff"
  },
  touchBtn:{
    marginLeft:15,
    marginRight:15,
    flex:1,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#3a8ff3",
    borderRadius:3,
    marginBottom:20,
    marginTop:20,
  },
  touchBtnRest:{
    marginLeft:15,
    marginRight:15,
    flex:1,
    borderRadius: 6,
    height:40,
    borderWidth:1,
    borderColor:'#898989',
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
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
  mask:{
    backgroundColor:'#fff',
    flex:1,
    justifyContent:"flex-start",
    alignItems:'center',
  },
  moreNav:{
    height:64,
    paddingTop:20,
    backgroundColor:'#f9f9f9',
  },
  moreNavTitle:{
    height:44,
    justifyContent:"center",
    alignItems:'center',
    backgroundColor:'transparent',
  },
  moreNavIcon:{
    width:60,
    height:44,
    justifyContent:"center",
    paddingLeft:15,
    position:'absolute',
    left:0,
    top:20,
    zIndex:10,
  },
  moreMain:{
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingRight:15,
  },
  moreMainTitle:{
    paddingTop:15,
    paddingBottom:15,
  },
  moreMainList:{
    flexWrap:'wrap',
    flexDirection:"row",
  },
  viewBtn:{
    flexDirection:"row",
    marginTop:20,
    marginBottom:20,
  },
  listBtn2:{
    flex:1,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    height:40,
    backgroundColor:'#3a8ff3',
    marginLeft:15,
  },
  listNoBtn2:{
    flex:1,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    height:40,
    borderWidth:1,
    borderColor:'#898989',
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
    alignItems:"center",
    justifyContent:"center",
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
  NoList:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:60,
    paddingBottom:60,
  },
  webView:{
    flex:1,
    borderWidth:0,
    borderColor:'transparent',
    backgroundColor:'#fff',
    height:600,
  },
  listText:{
    alignItems:"center",
    justifyContent:"center",
    borderColor:'#eaeaea',
    borderRadius:4,
    borderWidth:1,
    marginRight:10,
    marginBottom:10,
    height:26,
    paddingRight:5,
    paddingLeft:5,
  },
  listTextSelect:{
    alignItems:"center",
    justifyContent:"center",
    borderColor:'#3a8ff3',
    borderRadius:4,
    borderWidth:1,
    marginRight:10,
    marginBottom:10,
    height:26,
    paddingRight:5,
    paddingLeft:5,
  },
  recommendView:{
   paddingLeft:15,
   paddingRight:15,
   paddingTop:15,
   marginTop:10,
   backgroundColor:"#fff"
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
 recommendTouchRest:{
   borderWidth:1,
   borderColor:"#3a8ff3",
   borderRadius:3,
   marginRight:10,
   marginBottom:10,
   paddingLeft:10,
   paddingRight:10,
   paddingTop:5,
   paddingBottom:5,
 },
 addCustom:{
   width:70,
   height:70,
   borderRadius:35,
   backgroundColor:"rgba(58, 143, 243,0.5)",
   position:"absolute",
   right:15,
   bottom:100,
   alignItems:"center",
   justifyContent:"center",
   zIndex:0
 },
 addText:{
   backgroundColor:"transparent",
   paddingLeft:10,
   paddingRight:10,
   textAlign:"center"
 },
 noCustomView:{
   marginTop:55,
   paddingLeft:80,
   paddingRight:80,
   alignItems:"center",
 },
 noCustom:{
   marginBottom:15,
 },
 touchTop:{
   marginTop:25,
   marginLeft:15,
   marginRight:15,
   height:40,
   alignItems:"center",
   justifyContent:"center",
   backgroundColor:"#71acf0",
   borderRadius:3,
   paddingLeft:30,
   paddingRight:30,
 },







});
