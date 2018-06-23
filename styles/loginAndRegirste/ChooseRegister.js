import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  registerView:{
    flex: 1,
    backgroundColor:'#fff',
  },
  registerViewBtn:{
    width:Dimensions.get('window').width-160,
    height:40,
    marginLeft:80,
    marginRight:80,
    justifyContent:"center",
    alignItems:'center',
    borderWidth:2,
    borderColor:'#398ff2',
    borderRadius:6,
  },
  registerText:{
    color:'#398ff2',
  },
  marginTop170:{
    marginTop:170,
  },
  marginTop50:{
    marginTop:50,
  },
  registerViewText:{
    width:Dimensions.get('window').width-66,
    marginLeft:33,
    marginRight:33,
    position:'absolute',
    bottom:50,
  },
  registerTipsText2:{
    color:'#888',
    lineHeight:18,
  },
});
