import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:'#f7f8fa',
  },
  imgView:{
    width:Dimensions.get('window').width,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#fff',
  },
  img:{
    width:Dimensions.get('window').width-30,
    height:210,
    resizeMode:'cover',
    marginTop:15,
    marginBottom:15,
  },
  textView:{
    marginTop:10,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#fff',
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
  packUp:{
    textAlign:'right',
    height:24,
  },
  lineHeight24:{
    lineHeight:24,
  },
  row:{
    flexDirection:"row",
  },
  flex:{
    flex:1
  },
});