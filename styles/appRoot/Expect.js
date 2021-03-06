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
    height:44,
    justifyContent:"center",
    alignItems:'center',
    position:'absolute',
    left:0,
    top:20,
  },
  img:{
    width:Dimensions.get('window').width,
  },
  txt:{
    fontSize:35,
    fontWeight:'bold',
    color:'#fff',
    backgroundColor:'transparent',
    marginTop:200,
    textAlign:'center',
  },
});
