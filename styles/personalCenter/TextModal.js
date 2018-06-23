import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  mainView:{
    flex:1,
  },
  listBtn:{
    width:Dimensions.get('window').width-30,
    marginLeft:15,
    marginRight:15,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    height:40,
    backgroundColor:'#3a8ff3',
  },
  positionTop20:{
    position:'absolute',
    top:20,
  },
  modalMask:{
    backgroundColor:'rgba(0,0,0,0.7)',
    flex:1,
    justifyContent:"flex-end",
    alignItems:'center',
  },
  centerView:{
    backgroundColor:"#fff",
    height:200,
    width:Dimensions.get('window').width-30,
    marginLeft:15,
    marginRight:15,
  }
});
