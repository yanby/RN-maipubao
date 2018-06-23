import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'#f7f8fa',
  },
  viewInput:{
    height:50,
  },
  textInput:{
    justifyContent:"flex-end",
    flex:1,
    paddingBottom:0,
  },
  textInput1:{
    justifyContent:"flex-end",
    flex:1,
    paddingBottom:0,
    marginBottom:0,
    marginTop:-15,
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
  view:{
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#fff',
  },
  row:{
    flexDirection:"row",
  },
  flex:{
    flex:1,
  },
  paddingTop15:{
    paddingTop:15,
  },
  paddingTop30:{
    paddingTop:30,
  },
  paddingBottom15:{
    paddingBottom:15,
  },
  marginTop10:{
    marginTop:10,
  },
  marginRight10:{
    marginRight:10,
  },
  marginRight25:{
    marginRight:25,
  },
  borderTop:{
    borderTopWidth:1,
    borderTopColor:'#eaeaea',
  },
  borderBottom:{
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
  },
  lineHeight49:{
    lineHeight:49,
  },
  lineHeight22:{
    lineHeight:22,
  },
  lineHeight20:{
    lineHeight:20,
  },
});