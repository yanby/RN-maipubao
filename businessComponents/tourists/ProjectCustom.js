import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  Modal,
  ListView
} from 'react-native';
import {fonts} from '../../styles/commonStyle/Font';
import {styles} from '../../styles/tourists/ReportManagement';
import BusinessProjectCustomItem from './BusinessProjectCustomItem';
import { Actions,ActionConst } from 'react-native-router-flux';
import { DropDownMenu } from '../../commonComponents/menu/DropDownMenu';
export default class ProjectCustom extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [];
    let user ={item:{name:'sasa'}};
    data.push(user);
    data.push(user);
    this.state={
      dataSource: ds.cloneWithRows(data),
      resultVisible:false,
    };
  }

  render() {
    var data = [["客户等级", "全部", "A","B","C"], ["时间筛选", "全部","近一周","近一个月","近三个月","近半年","近一年"],
    ["需求类型", "全部", "求租", "求购"],["交易进展", "全部","报备","到访","认购","（带看，意向）","签约","结佣",'完结']];
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <View style={styles.signTitleView}>
            <TouchableHighlight style={styles.backView} underlayColor="transparent" onPress={()=>Actions.pop({})}>
                  <Image  source={require('../../images/back.png')}/>
            </TouchableHighlight>
            <Text style={fonts.t2_Black}>我的客户</Text>
            <TouchableHighlight style={styles.searchView} underlayColor="transparent" onPress={()=>{this.setState({resultVisible:true})}}>
                  <Image  source={require('../../images/search.png')}/>
            </TouchableHighlight>
      </View>
      <View style={styles.dropdownView}>
            <DropDownMenu  style={styles.downView}
                          arrowImg={require('../../images/select.png')}      //set the arrow icon, default is a triangle
                          checkImage={require('../../images/tab.png')}    //set the icon of the selected item, default is a check mark
                          bgColor={"#fff"}                            //the background color of the head, default is grey
                          tintColor={"#333"}                        //the text color of the head, default is white
                          selectItemColor={"#3a8ff3"}                    //the text color of the selected item, default is red
                          data={data}
                          maxHeight={410}                            // the max height of the menu
                          handler={(selection, row) => alert(data[selection][row])} >
                          <ListView contentContainerStyle={styles.list}
                                    dataSource={this.state.dataSource}
                                    enableEmptySections={true}
                                    renderRow={(data) => <BusinessProjectCustomItem {...data} />}
                                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}  />}/>
        </DropDownMenu>
      </View>


      </View>
    );
  }
}
