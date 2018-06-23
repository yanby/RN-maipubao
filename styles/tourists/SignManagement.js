import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f8fa"
  },
  mainView:{
    flex:1,
    backgroundColor:"#fff",
    marginBottom:10,
  },
  signTitleView:{
    flexDirection:"row",
    backgroundColor:"#f9f9f9",
    height:64,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#eaeaea",
    borderBottomWidth:1,
    paddingTop:20,
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
  signTop:{
    flexDirection:"row",
    borderBottomColor:"#eaeaea",
    borderBottomWidth:1,
    borderTopColor:"#eaeaea",
    borderTopWidth:1,
    paddingBottom:20,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
  },
  signTopRight:{
    flex:1,
    marginLeft:12,
  },
  signBottom:{
    paddingTop:12,
    paddingBottom:12,
    paddingRight:12,
  },
  dropdownView:{
    flex:1,
  },
  imgText:{
    backgroundColor:"transparent"
  },
  topRight:{
    textAlign:"right"
  },
  flex:{
    flex:1,
  },
  leftView:{
    alignItems:"flex-start",
    justifyContent:"flex-start"
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
    alignItems:"center",
    justifyContent:"center",
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
  projectImg:{
    width:150,
    height:100,
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
    borderBottomWidth:1,
    borderBottomColor:"#eaeaea"
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
  listText:{
    alignItems:"center",
    justifyContent:"center",
    borderColor:'#eaeaea',
    borderRadius:4,
    borderWidth:1,
    marginRight:15,
    marginBottom:15,
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
 moreBtn:{
   height:40,
   width:80,
   alignItems: "center",
   justifyContent: "center",
   position:'absolute',
   right:0,
   top:0,
 },
 moreView:{
   flexDirection:'row',
   position:'relative',
   height:40,
   justifyContent:"center",
   alignItems:'center',
 },
 moreText:{
   flex: 1,
   textAlign:'center',
   fontSize:15,
   color:'#333',
 },
 moreIcon:{
   flexDirection: 'row',
   position:'absolute',
   right:10,
   top:17,
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



});
