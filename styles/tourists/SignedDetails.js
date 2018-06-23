import {StyleSheet,Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:"#f7f8fa",
  },
  view:{
    marginBottom:10,
    backgroundColor:'#fff',
  },
  titleView:{
    height:44,
    paddingLeft:15,
    paddingRight:15,
    borderBottomWidth:1,
    borderBottomColor:'#eaeaea',
  },
  titleViewText:{
    lineHeight:43,
  },
  bodyView:{
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:15,
  },
  bodyViewText:{
    marginTop:15,
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
    position:'absolute',
    bottom:10,
  },
























  viewList:{
    backgroundColor:"#fff",
    marginBottom:10,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
    paddingBottom:10,
  },
  viewListDate:{
    textAlign:'right',
    marginTop:10,
  },
  btn:{
    width:Dimensions.get('window').width-30,
    marginLeft:15,
    marginRight:15,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    height:40,
    backgroundColor:'#3a8ff3',
    position:'absolute',
    bottom:10,
  },
});