import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"#f7f8fa"
  },
  view:{
    width:Dimensions.get('window').width,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:"#fff",
    flexDirection:"row",
    marginTop:50,
  },
  viewLeft:{
    width:100,
  },
  viewLeftList:{
    marginBottom:30,
  },
  viewRight:{
    flex:1,
    borderLeftWidth:1,
    borderLeftColor:"#eaeaea",
  },
  viewRightList:{
    paddingLeft:20,
    marginBottom:30,
  },
  viewRightIcon:{
    position:"absolute",
    left:-7,
    top:0,
    width:14,
    height:14,
  },
  red:{
    color:"#ec0101",
  },
  viewEnd:{
    marginBottom:0,
  },
  marginBottom5:{
    marginBottom:5,
  },
  marginBottom10:{
    marginBottom:10,
  },
  marginBottom15:{
    marginBottom:13,
  },
});