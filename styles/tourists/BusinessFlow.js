import {StyleSheet,Dimensions,Platform} from 'react-native';
export const flow = StyleSheet.create({
  horizontalFlow:{
    paddingLeft:15,
    paddingRight:15,
    position:'relative',
    paddingTop:10,
    paddingBottom:10,
    height:60,
  },
  horizontalLine:{
    alignSelf:'center',
  },
  flowList:{
    flexDirection:"row",
    position:'absolute',
    top:-13,
    paddingLeft:20,
    paddingRight:20,
  },
   flowListView:{
     flex:1,
     justifyContent:"center",
     alignItems:'center',
   },

   flowListText:{
     textAlign:'center',
     ...Platform.select({
        ios: {
          marginTop:10,
        },
        android: {
          marginTop:8,
        },
      }),
     fontSize:13,
     backgroundColor:'transparent',
   },
   colorRed:{
     color:'#ed6c5f',
   },
   colorGreen:{
     color:'#89b15b',
   },
   colorYellow:{
     color:'#e5aa40',
   },
   colorGray:{
     color:'#898989',
   },
   colorBlack:{
     color:'#333',
   },


   verticalFlow:{
     flexDirection:"row",
     paddingLeft:30,
     paddingRight:30,
     flex:1,
     position:'relative',
   },
   verticalLine:{

   },
   verticalList:{
     flex:1,
     marginLeft:-12,
   },
   verticalListView:{
     flex:1,
     flexDirection:"row",
     justifyContent:"center",
     alignItems:'center',
   },
   verticalDate:{
     flex:1,
     marginLeft:15,
   },
   verticalListText:{
     backgroundColor:'transparent',
     textAlign:'center',
     marginLeft:10,
     marginTop:3,
   },
});
