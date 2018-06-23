import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f8fa"
  },
  mainView:{
    flex:1,
    backgroundColor:"#fff",
    marginTop:15,
    marginLeft:15,
    marginRight:15,
    borderRadius:6,
    borderColor:"#eaeaea",
    borderWidth:1,
    shadowColor: "#050001",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: .1,
    shadowRadius: 1,
    elevation: 1,
  },
  signTop:{
    flexDirection:"row",
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
  },
  signTopRight:{
    flex:1,
    marginLeft:15,
    justifyContent:"center"
  },
  projectImg:{
    width:150,
    height:100,
    justifyContent:"flex-end",
    borderRadius:3
  },
  leftView:{
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
  flex:{
    flex:1,
  },
  bgView:{
    height:21,
    backgroundColor:"rgba(0,0,0,0.5)",
    alignItems:"center",
    justifyContent:"center"
  },
  touchBtn:{
    flexDirection:"row",
    borderTopWidth:1,
    borderTopColor:"#eaeaea",
    height:44,
    alignItems:"center",
    justifyContent:"flex-end"
  },
  touch:{
    width:90,
    height:25,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1,
    borderRadius:3,
    marginRight:10
  },
  borderColor1:{
    borderColor:"#7abaff",
  },
  borderColor2:{
    borderColor:"#fcba46"
  },
  borderColor3:{
    borderColor:"#86ce7b"
  },
  color1:{
    color:"#7abaff",
  },
  color2:{
    color:"#fcba46"
  },
  color3:{
    color:"#86ce7b"
  },
  rightTop:{
    flexDirection:"row",
    alignItems:"center"
  },
  hitColor1:{
    color:"#7abaff"
  },
  hitColor2:{
    color:"#f7d27f"
  },
  mt10:{
    marginBottom:10,
  },
  img:{
    marginRight:8
  },
  dbView:{
    position:"absolute",
    top:0,
    right:0,
  },







});
