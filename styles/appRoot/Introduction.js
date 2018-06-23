import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'#fff',
  },
  nav:{
    flexDirection:"row",
    height:64,
    paddingTop:20,
    backgroundColor:'transparent',
    position:'absolute',
    left:0,
    top:0,
    zIndex:99,
  },
  backIcon:{
    width:60,
    height:60,
    justifyContent:"center",
    alignItems:'center',
    backgroundColor:"transparent"
  },
  img:{
    width:Dimensions.get('window').width,
  },
});
