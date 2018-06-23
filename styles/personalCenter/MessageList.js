import {
  StyleSheet,Dimensions
} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
  },
  viewList:{
    backgroundColor:"#fff",
    paddingLeft:15,
    paddingRight:15,
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
  },
  viewTitle:{
    position:'relative',
    flexDirection:"row",
    paddingTop:10,
  },
  viewTitleText:{
    flex:1,
  },
  viewSubtitle:{
    flexDirection:"row",
  },
  viewSubtitleText:{
    flex:1,
    marginTop:2,
  },
  createTime:{
    flex:1,
    marginBottom:10,
  },
  createTimeTxt:{
    textAlign:'right',
  },
  viewText:{
    paddingTop:5,
    paddingBottom:5,
  },
  viewSubtitleIcon:{
    marginRight:10,
  },
  viewTextText:{
    lineHeight:22,
  },
  redIcon:{
    width:10,
    height:10,
    backgroundColor:'red',
    position:'absolute',
    right:0,
    top:10,
    borderRadius:5,
  }


})
