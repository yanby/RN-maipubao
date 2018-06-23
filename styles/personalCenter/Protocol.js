import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'#fff',
  },
  webView:{
    width:Dimensions.get('window').width,
    marginTop:20,
  },

});
