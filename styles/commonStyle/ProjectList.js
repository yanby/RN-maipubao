import {
  StyleSheet,Dimensions
} from 'react-native';
export const comlist = StyleSheet.create({
  container: {
    flex: 1,
  },
  projectView:{
    flexDirection:"row",
    padding:15,
    backgroundColor:"#fff",
    borderBottomWidth:1,
    borderBottomColor:"#eaeaea",
    borderTopWidth:1,
    borderTopColor:"#eaeaea",
    marginBottom:10,
  },
  rightView:{
    marginLeft:10,
    flex:1,
  },
  rightTop:{
    flexDirection:"row",
    marginBottom:10
  },
  rightText:{
    flex:1,
  },
  rightTitle:{
    flex:1,
  },
  rightRed:{
    color:"#f23c3c"
  },
  rightMiddle:{
    flexDirection:"row",
    marginBottom:5,
  },
  middleText:{
    flex:3,
  },
  middleTitle:{
    flex:2,
  },
  thirdText:{
    marginBottom:5,
  },
  bottomTextView:{
    backgroundColor:"#fff",
    padding:0,
    margin:0,
    borderWidth:1,
    borderColor:"#fbd3d3",
    height:18,
    marginRight:5,
    marginBottom:5,
    paddingLeft:2,
    paddingRight:2,
    alignItems:"center",
    justifyContent:"center"
  },
  bottomText:{
    color:"#f23c3c",
    fontSize:12,
  },
  bottomTitleView:{
    backgroundColor:"#fff",
    padding:0,
    margin:0,
    borderWidth:1,
    borderColor:"#c5fffd",
    height:18,
    marginRight:5,
    marginBottom:5,
    paddingLeft:2,
    paddingRight:2,
    alignItems:"center",
    justifyContent:"center"
  },
  bottomTitle:{
    color:"#30d4cd",
    fontSize:12,
  },
  bottomTxtView:{
    backgroundColor:"#fff",
    padding:0,
    margin:0,
    borderWidth:1,
    borderColor:"#fff9e1",
    height:18,
    marginRight:5,
    marginBottom:5,
    paddingLeft:2,
    paddingRight:2,
    alignItems:"center",
    justifyContent:"center"
  },
  bottomTxt:{
    color:"#ffd181",
    fontSize:12,
  },



  memberView:{
    backgroundColor:"#fff",
    borderBottomWidth:1,
    borderColor:"#f7f8fa",
  },
  memberTop:{
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:17,
  },
  memberLeft:{
    alignItems:"center",
    justifyContent:"center",
    marginRight:5,
    width:25,
  },
  memberRight:{
    marginLeft:23,
    flex:1,
  },
  memberTitle:{
    marginBottom:12,
  },
  memberText:{
    flex:1,
    marginBottom:10,
  },
  rightBottom:{
    flexDirection:"row",
    flexWrap:"wrap",
    flex:1,
  },
  signText:{
    textAlign:"right",
    marginBottom:10,
    paddingRight:15,
  },
  checkView:{
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    width:20,
  },
  imgView:{
    width:110,
    height:85
  },
  projectImgView:{
    position:'relative',
    width:150,
    height:100,
  },
  projectImg:{
    width:150,
    height:100,
  },
  imgTxt:{
    position:'absolute',
    bottom:0,
    left:0,
    width:150,
    height:20,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  middelText:{
    flex:1,
  },
})
