import {
  StyleSheet,Dimensions,PixelRatio
} from 'react-native';

switch (PixelRatio.get()) {
  case 1:
  BIG_TEXT=36;
  T1_TEXT= 19;
  T2_TEXT= 17;
  T3_TEXT= 15;
  BODY_TEXT= 14;
  HINT_TEXT=12;
  BUTTON_TEXT= 14;
  TINY_TEXT=11;
  STRONG_1=24;
  STRONG_2=31;
  STRONG_3=83;
  STRONG_4=83
  break;
  case 2:
  BIG_TEXT=37;
  T1_TEXT= 20;
  T2_TEXT= 18;
  T3_TEXT= 16;
  BODY_TEXT= 15;
  HINT_TEXT=13;
  BUTTON_TEXT= 15;
  TINY_TEXT=12;
  STRONG_1=25;
  STRONG_2=33;
  STRONG_3=85;
  STRONG_4=85;
  break;
  case 3:
  BIG_TEXT=38;
  T1_TEXT= 21;
  T2_TEXT= 19;
  T3_TEXT= 17;
  BODY_TEXT= 16;
  HINT_TEXT=14;
  BUTTON_TEXT= 16;
  TINY_TEXT=13;
  STRONG_1=26;
  STRONG_2=35;
  STRONG_3=90;
  STRONG_4=90;
  break;
  default:
  BIG_TEXT=38;
  T1_TEXT= 20;
  T2_TEXT= 18;
  T3_TEXT= 16;
  TINY_TEXT=10;
  BODY_TEXT= 15;
  HINT_TEXT=13;
  BUTTON_TEXT= 15;
  STRONG_1=26;
  STRONG_2=35;
  STRONG_3=90;
  STRONG_4=90;
}

export const fonts = StyleSheet.create({
  bigText_white:{
    fontSize:BIG_TEXT,
        color:"#fff",
  },
  t1_white:{
    fontSize:T1_TEXT,
        color:"#fff",
  },
  t1_Black:{
    fontSize:T1_TEXT,
        color:"#333",
  },

  t2_white:{
    fontSize:T2_TEXT,
        color:"#fff",
  },
  t2_Black:{
    fontSize:T2_TEXT,
        color:"#333",
  },
  t2_Gray:{
    fontSize:T2_TEXT,
        color:"#898989",
  },
  t2_Blue:{
    fontSize:T2_TEXT,
        color:"#3a8ff3",
  },

  t3_white:{
    fontSize:T3_TEXT,
        color:"#fff",
  },
  t3_Black:{
    fontSize:T3_TEXT,
        color:"#333",
  },
  t3_Gray:{
    fontSize:T3_TEXT,
        color:"#898989",
  },
  t3_Red:{
    fontSize:T3_TEXT,
        color:"#ec0101",
  },
  t3_Blue:{
    fontSize:T3_TEXT,
        color:"#3a8ff3",
  },


  //正文字体
  bodyText_white:{
    fontSize:BODY_TEXT,
        color:"#fff",
  },
  bodyText_Black:{
    fontSize:BODY_TEXT,
        color:"#333",
  },
  bodyText_Blue:{
    fontSize:BODY_TEXT,
        color:"#3a8ff3",
  },
  bodyText_Red:{
    fontSize:BODY_TEXT,
        color:"#ec0101",
  },
  bodyText_Gray:{
    fontSize:BODY_TEXT,
        color:"#898989",
  },
  bodyText_Gray1:{
    fontSize:BODY_TEXT,
        color:"#666",
  },
  bodyText_Gray2:{
    fontSize:BODY_TEXT,
        color:"#ccc",
  },
  hintText_white:{
    fontSize:HINT_TEXT,
        color:"#fff",
  },
  hintText_Black:{
    fontSize:HINT_TEXT,
        color:"#333",
  },
  hintText_Gray:{
    fontSize:HINT_TEXT,
        color:"#898989",
  },
  hintText_Gray1:{
    fontSize:HINT_TEXT,
        color:"#666",
  },
  hintText_Gray2:{
    fontSize:HINT_TEXT,
        color:"#ccc",
  },
  hintText_Blue:{
    fontSize:HINT_TEXT,
        color:"#3a8ff3",
  },
  hintText_Orange:{
    fontSize:HINT_TEXT,
        color:"#ed6c5f",
  },

  tinyText_white:{
    fontSize:TINY_TEXT,
        color:"#fff",
  },
  tinyText_Black:{
    fontSize:TINY_TEXT,
        color:"#333",
  },
  tinyText_Gray:{
    fontSize:TINY_TEXT,
        color:"#898989",
  },
  tinyText_Red:{
    fontSize:TINY_TEXT,
        color:"#ec0101",
  },
  tinyText_Blue:{
    fontSize:TINY_TEXT,
        color:"#3a8ff3",
  },

  //按钮字体
  btnText_white:{
    fontSize:BUTTON_TEXT,
        color:"#fff",
  },
  btnText_Black:{
    fontSize:BUTTON_TEXT,
        color:"#333",
  },
  btnText_Gray:{
    fontSize:BUTTON_TEXT,
        color:"#898989",
  },
  btnText_Blue:{
    fontSize:BUTTON_TEXT,
        color:"#3a8ff3",
  },
  //StrongText
  strText1_white:{
    fontSize:STRONG_1,
        color:"#fff",
  },
  strText1_Black:{
    fontSize:STRONG_1,
        color:"#333",
  },

  strText2_white:{
    fontSize:STRONG_2,
        color:"#fff",
  },
  strText2_Black:{
    fontSize:STRONG_2,
        color:"#333",
  },

  strText3_white:{
    fontSize:STRONG_3,
        color:"#fff",
  },
  strText3_Black:{
    fontSize:STRONG_3,
        color:"#333",
  },
});
