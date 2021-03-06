import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:'#f7f8fa',
  },
  nav:{
    flexDirection:"row",
    backgroundColor:"#f9f9f9",
    height:65,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#eaeaea",
    borderBottomWidth:1,
    paddingTop:15,
  },
  navLeft:{
    width:60,
    height:60,
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    left:0,
    top:0,
    zIndex:10,
    paddingTop:15,
  },
  navRight:{
    width:60,
    height:60,
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    right:0,
    top:0,
    zIndex:10,
    paddingTop:15,
  },
  viewList:{
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:15,
    flexDirection:"row",
    backgroundColor:'#fff',
    marginBottom:10,
    borderTopWidth:1,
    borderTopColor:"#eaeaea",
    borderBottomWidth:1,
    borderBottomColor:"#eaeaea",
  },
  listTxt:{
    flex:1,
    position:"relative",
  },
  img:{
    width:150,
    height:100,
    marginRight:10,
  },
  txtIcon:{
    paddingTop:3,
    paddingBottom:3,
    borderColor:'#3a8ff3',
    borderWidth:1,
    borderRadius:3,
    marginTop:15,
    width:70,
    alignItems:"center"
  },
  modalMask:{
    backgroundColor:'#f7f8fa',
    flex:1,
    justifyContent:"flex-start",
    alignItems:'center',
  },
  centerView:{
    width:Dimensions.get('window').width,
  },
  mask:{
    backgroundColor:'#fff',
    flex:1,
    justifyContent:"flex-start",
    alignItems:'center',
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
  dropdownView:{
    flex:1,
  },
  listText:{
    marginTop:10,
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
