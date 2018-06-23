import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#292c36',
  },
  imageBg:{
    width:Dimensions.get('window').width-80,
    marginLeft:40,
    marginRight:40,
    height:150,
    borderRadius:6,
    paddingTop:55,
    paddingLeft:65,
  },
  view:{
    marginTop:10,
  },
  btn:{
    height:40,
    backgroundColor:'#343643',
    marginTop:20,
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
  },
  text:{
    flex:1,
    justifyContent:"center",
    alignItems:'flex-start',
  },
  icon1:{
    marginTop:10,
    marginRight:10,
  },
  icon2:{
    marginTop:15,
  },



});
