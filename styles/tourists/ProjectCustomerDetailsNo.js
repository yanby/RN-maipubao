import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:"#f7f8fa"
  },
  nav:{
    height:64,
    paddingTop:20,
    backgroundColor:'transparent',
    marginLeft:15,
    marginRight:15,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:'center',
  },
  navCenter:{
    flex:1,
    justifyContent:"center",
    alignItems:'center',
  },
  navRight:{
    borderWidth:1,
    borderColor:'#ed6c5f',
    justifyContent:"center",
    alignItems:'center',
    width:56,
    height:26,
    borderRadius:3,
  },
  view:{
    marginBottom:10,
    backgroundColor:'#fff',
  },
  titleView:{
    height:44,
    paddingLeft:15,
    paddingRight:15,
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
  },
  titleViewText:{
    lineHeight:43,
  },
  bodyView:{
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:15,
  },
  bodyViewText:{
    marginTop:15,
  },
  row:{
    flexDirection:"row",
  },
  flex:{
    flex:1,
  },
  numBtn:{
    width:60,
    height:24,
    justifyContent:"center",
    alignItems:'center',
    borderRadius:3,
    borderWidth:1,
    borderColor:'#3a8ff3',
    marginTop:10,
  },
  viewMore:{
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
    flexDirection:"row",
    justifyContent:"center",
    alignItems:'center',
  },
  viewTextMore:{
    flex:1,
    textAlign:'right',
  },
  ListTextNum:{
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:15,
  },
  project:{
    flex:1,
    marginLeft:8,
  },
  projectText:{
    marginBottom:10,
  },
  marginBottom5:{
    marginBottom:5,
  },
  invalid:{
    position:'absolute',
    top:20,
    right:0,
  },
  listText:{
    paddingLeft:15,
    paddingRight:15,
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
    paddingTop:10,
    paddingBottom:10,
  },
});
