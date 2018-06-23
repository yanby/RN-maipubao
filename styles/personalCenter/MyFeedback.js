import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  mainList:{
    flex:1,
    backgroundColor:'#f7f8fa',
    paddingBottom:45,
  },
  tabView:{
    alignItems:"center",
    backgroundColor:"#fff",
    width:Dimensions.get('window').width,
    borderColor:"#eaeaea",
    borderBottomWidth:1,
    position:"relative"
  },
  tabsContainerStyle:{
    backgroundColor:"#fff",
    height:60,
    width:200,
    paddingTop:20
  },
  tabStyle:{
    borderWidth:0,
    borderRadius:0,
  },
  tabTextStyle:{

  },
  activeTabStyle:{
    backgroundColor:"#fff",
    borderBottomWidth:2,
    borderColor:"#3a8ff3",
    borderRadius:0,
  },
  activeTabTextStyle:{
    color:"#3a8ff3"
  },
  tabListView:{
    marginTop:10,
    height:Dimensions.get('window').height-90,
  },
  listViewText:{
    height:210,
    backgroundColor:"#fff"
  },
  loginTextInput:{
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:15,
    paddingTop:10,
    height:210,
    textAlignVertical:'top',
  },
  subTouch:{
    width:Dimensions.get('window').width-30,
    marginLeft:15,
    marginRight:15,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    height:40,
    backgroundColor:'#3a8ff3',
    position:"absolute",
    bottom:40,
    left:0,
  },
  backView:{
    width:60,
    height:64,
    paddingTop:20,
    paddingLeft:15,
    alignItems:"flex-start",
    justifyContent:"center",
    position:"absolute",
    left:0,
    top:0,
    zIndex:10,
  },
  scanText:{
    color:"white",
    position:"absolute",
    left:0,
    bottom:120,
    width:Dimensions.get('window').width,
    textAlign:"center",
    backgroundColor:"transparent"
  }





});
