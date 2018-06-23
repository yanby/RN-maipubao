import {
  StyleSheet,Dimensions
} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f7f8fa",
  },
  viewTop:{
    height:30,
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
  },
  viewTopText:{
    lineHeight:30,
    marginRight:15,
  },
  memberView:{
    backgroundColor:"#fff",
    borderBottomWidth:1,
    borderColor:"#eaeaea",
  },
  textView:{
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:15,
  },
  textLeft:{
    flex:3,
  },
  textLeftText:{
    lineHeight:22,
    textAlign:'left'
  },
  textRight:{
    flex:2,
  },
  textRightText:{
    lineHeight:44,
    textAlign:'right'
  },
  noCustomView:{
    marginTop:55,
    paddingLeft:80,
    paddingRight:80,
    alignItems:"center",
  },
  noCustom:{
    marginBottom:15,
  },







})
