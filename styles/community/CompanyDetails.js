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
  lineHeight24:{
    lineHeight:24,
  },
});
