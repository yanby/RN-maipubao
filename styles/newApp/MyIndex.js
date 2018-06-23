import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f8fa",
  },
  ImgView:{
    paddingLeft:20,
    paddingTop:40,
    flexDirection:"row"
  },
  imgLogo:{
    width:72,
    height:72,
    borderRadius:36,
    marginRight:20,
  },
  ImgRight:{
    backgroundColor:"transparent",
    paddingTop:10,
  },
  rightTop:{
    paddingBottom:20,
    borderBottomWidth:1,
    borderColor:"#fff",
    marginBottom:20,
  },
  tipsView:{
    alignItems:"center",
    justifyContent:"center",
    height:45,
    borderBottomWidth:1,
    borderColor:"#eaeaea"
  },
  tipsColor:{
    color:"#e97781",
    fontSize:16,
  },
  listView:{
    borderBottomWidth:1,
    borderColor:"#eaeaea",
    height:50,
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  },
  listText:{
    flex:1,
    paddingLeft:15,
  },
  mt10:{
    marginTop:10,
  },
  listText1:{
    flex:1,
  },
  btn:{
    height:40,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#eaeaea",
    marginTop:30,
    marginLeft:50,
    marginRight:50,
    width:Dimensions.get('window').width-100,
  },










});
