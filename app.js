import React, { Component } from 'react';
import { AsyncStorage,Alert,Platform,AppState,StyleSheet,Dimensions} from 'react-native';
import { connect} from 'react-redux';

import ReactNativeRouter, {Scene,Reducer,Router,Switch,Modal,Actions,ActionConst} from 'react-native-router-flux';



import { TabBarIcon } from './commonComponents/tabBar/TabBarIcon';

import { ModalIndex } from './commonComponents/modal/ModalIndex';


//系统模块
import AppUserStatus from './systemComponents/routerCenter/AppUserStatus';

//登录注册模块
import Login from './businessComponents/loginAndRegirste/Login';
import ShortcutLogin from './businessComponents/loginAndRegirste/ShortcutLogin';
import ResetPassword from './businessComponents/loginAndRegirste/ResetPassword';
import Register from './businessComponents/loginAndRegirste/Register';
//首页模块
import Index from './businessComponents/appRoot/Index';
import Cooperation from './businessComponents/appRoot/Cooperation';
import NewsList from './businessComponents/appRoot/NewsList';
import Details from './businessComponents/appRoot/Details';
import MapShop from './businessComponents/appRoot/MapShop';
import CreatNewAccount from './businessComponents/appRoot/CreatNewAccount';
import ScanCode from './businessComponents/appRoot/ScanCode';
import Introduction from './businessComponents/appRoot/Introduction';
import Guide from './businessComponents/appRoot/Guide';






//项目模块
import ProjectIndex from './businessComponents/project/ProjectIndex';
import ProjectDetails from './businessComponents/project/ProjectDetails';


//客源模块
import TouristIndex from './businessComponents/tourists/TouristIndex';
import NeedRemarksList from './businessComponents/tourists/NeedRemarksList';
import WriteMoreForm from './businessComponents/tourists/WriteMoreForm';
import SignedDetails from './businessComponents/tourists/SignedDetails';
import ReportDetails from './businessComponents/tourists/ReportDetails';
import CustomerEnter from './businessComponents/tourists/CustomerEnter';
import CustomerFastEnter from './businessComponents/tourists/CustomerFastEnter';
import ReportManagement from './businessComponents/tourists/ReportManagement';
import SignManagement from './businessComponents/tourists/SignManagement';
import MyProject from './businessComponents/tourists/MyProject';
import MyCustom from './businessComponents/tourists/MyCustom';
import CustomerDetails from './businessComponents/tourists/CustomerDetails';
import BusinessRentDetails from './businessComponents/tourists/BusinessRentDetails';
import BusinessSellDetails from './businessComponents/tourists/BusinessSellDetails';
import ProjectCustomerDetails from './businessComponents/tourists/ProjectCustomerDetails';
import ProjectCustomerDetailsNo from './businessComponents/tourists/ProjectCustomerDetailsNo';
import BasicInfoMoreForm from './businessComponents/tourists/BasicInfoMoreForm';
import SignedForm from './businessComponents/tourists/SignedForm';
import RecordVisit from './businessComponents/tourists/RecordVisit';
import RecordProgress from './businessComponents/tourists/RecordProgress';
import RecordSubscription from './businessComponents/tourists/RecordSubscription';
import ReportAudit from './businessComponents/tourists/ReportAudit';

import ReportProject from './businessComponents/tourists/ReportProject';
import ReportCustom from './businessComponents/tourists/ReportCustom';
import ReportInfo from './businessComponents/tourists/ReportInfo';
import EditCustomerDetails from './businessComponents/tourists/EditCustomerDetails';




//我的模块
import PersonalIndex from './businessComponents/personalCenter/PersonalIndex';
import GoldPartner from './businessComponents/personalCenter/GoldPartner';
import Brander from './businessComponents/personalCenter/Brander';
import Franchiser from './businessComponents/personalCenter/Franchiser';
import AddImgID from './businessComponents/personalCenter/AddImgID';
import CredentialsCompany from './businessComponents/personalCenter/CredentialsCompany';
import Referral from './businessComponents/personalCenter/Referral';
import BindingTeam from './businessComponents/personalCenter/BindingTeam';
import BindingCompany from './businessComponents/personalCenter/BindingCompany';

import BindRouterCenter from './businessComponents/personalCenter/BindRouterCenter';

import ChangePassword from './businessComponents/personalCenter/ChangePassword';
import BindingBankCard from './businessComponents/personalCenter/BindingBankCard';
import PersonalCompany from './businessComponents/personalCenter/PersonalCompany';
import Setting from './businessComponents/personalCenter/Setting';
import PersonalInformation from './businessComponents/personalCenter/PersonalInformation';
import GoldPartnerInformation from './businessComponents/personalCenter/GoldPartnerInformation';

import AboutUs from './businessComponents/personalCenter/AboutUs';
import Promotion from './businessComponents/personalCenter/Promotion';
import Recommend from './businessComponents/personalCenter/Recommend';
import MessageDetails from './businessComponents/personalCenter/MessageDetails';
import ChangeRole from './businessComponents/personalCenter/ChangeRole';
import TextModal from './businessComponents/personalCenter/TextModal';
import ApplyWithdraw from './businessComponents/personalCenter/ApplyWithdraw';
import TeamMemberDetails from './businessComponents/personalCenter/TeamMemberDetails';
import UnbindTeam from './businessComponents/personalCenter/UnbindTeam';
import UnbindCompany from './businessComponents/personalCenter/UnbindCompany';
import OrganizationCompany from './businessComponents/personalCenter/OrganizationCompany';
import OrganizationTeam from './businessComponents/personalCenter/OrganizationTeam';
import MemberCompany from './businessComponents/personalCenter/MemberCompany';
import MemberTeam from './businessComponents/personalCenter/MemberTeam';
import MyAttention from './businessComponents/personalCenter/MyAttention';
import EditAttention from './businessComponents/personalCenter/EditAttention';
import Balance from './businessComponents/personalCenter/Balance';
import ManageCardList from './businessComponents/personalCenter/ManageCardList';
import DevelopTeamTCP from './businessComponents/personalCenter/DevelopTeamTCP';
import IncomeWithdraw from './businessComponents/personalCenter/IncomeWithdraw';
import MyFeedback from './businessComponents/personalCenter/MyFeedback';
import DevelopAwardList from './businessComponents/personalCenter/DevelopAwardList';
import FundDetailsList from './businessComponents/personalCenter/FundDetailsList';
import AuthenticationInfo from './businessComponents/personalCenter/AuthenticationInfo';
import MessageList from './businessComponents/personalCenter/MessageList';
import MessageEditList from './businessComponents/personalCenter/MessageEditList';
import UnbindCardList from './businessComponents/personalCenter/UnbindCardList';
import DefaultCardList from './businessComponents/personalCenter/DefaultCardList';
import Protocol from './businessComponents/personalCenter/Protocol';




//社区模块
import DemandDetails from './businessComponents/community/DemandDetails';
import PostsDetailsList from './businessComponents/community/PostsDetailsList';
import ApplyDetails from './businessComponents/community/ApplyDetails';
import CompanyDetails from './businessComponents/community/CompanyDetails';
import BrandDetails from './businessComponents/community/BrandDetails';
import Rankinglist from './businessComponents/community/Rankinglist';
import OfflineActivit from './businessComponents/community/OfflineActivit';
import CooperativeAlliance from './businessComponents/community/CooperativeAlliance';
import ForumList from './businessComponents/community/ForumList';
import CommunityIndex from './businessComponents/community/CommunityIndex';
import DemandList from './businessComponents/community/DemandList';
import DemandInput from './businessComponents/community/DemandInput';
import AddForum from './businessComponents/community/AddForum';


import {keys} from './systemComponents/SyncStorage/StorageKeys';


const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        return defaultReducer(state, action);
    }
};
export default class App extends Component {
  constructor(props){
   super(props);
   this.state={
     UserRole:1,
     currentUser:null
   }
 }
 componentWillMount(){
   //this.initCurrentUser();
 }
 noLoginAction(sourceFlag){
   storage.load({
     key:keys.currentUser
   }).then(user=>{
     if (!user) {
       Actions.replace('Login',{sourceFlag:sourceFlag})
       return 'failure';
     }else {
       return true;
     }
   }).catch(error=>{
     Actions.replace('Login',{sourceFlag:sourceFlag})
     return 'failure';
   })
 }
 initCurrentUser(){
   storage.load({
     key:keys.currentUser
   }).then(user=>{
     if (user) {
       this.setState({currentUser:user})
     }
   }).catch(error=>{
     Actions.replace('Login',{sourceFlag:sourceFlag})
     return 'failure';
   })
 }
  render() {
    return <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>

              <Scene key="root">

                <Scene key='AppUserStatus'  initial={true}   component={AppUserStatus} hideNavBar={true} />
                <Scene key="Guide" component={Guide} panHandlers={null} onBackAndroid={()=>{return false}} title="引导页"  hideNavBar={true} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}></Scene>
                <Scene key="Login" panHandlers={null} onBackAndroid={()=>{return false}} onLogin={()=>{this.initCurrentUser()}}  backAndroidHandler={()=>{return false}} component={Login} title="登录"  hideNavBar={true} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}></Scene>
                <Scene key="Register" panHandlers={null} component={Register} title="注册"  rightTitle="登录"  hideNavBar={false} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} leftButtonTextStyle={styles.leftButtonText} titleStyle={styles.title} rightButtonIconStyle={styles.rightButtonIcon} rightButtonTextStyle={styles.rightButtonText} onRight={()=>Actions.Login({})}></Scene>
                <Scene key="ShortcutLogin" panHandlers={null} component={ShortcutLogin} onLogin={()=>{this.initCurrentUser()}} title="登录" leftTitle="取消" rightTitle="注册" navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} leftButtonTextStyle={styles.leftButtonText} titleStyle={styles.title} rightButtonIconStyle={styles.rightButtonIcon} rightButtonTextStyle={styles.rightButtonText} onLeft={()=>Actions.Login({})} onRight={()=>Actions.Register({})}></Scene>
                <Scene key="ResetPassword" component={ResetPassword} title="忘记密码" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}></Scene>
                <Scene key="Details" component={Details} title="详情页面" hideNavBar={true} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="PostsDetailsList" component={PostsDetailsList} title="帖子详情" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="ApplyDetails" component={ApplyDetails} title="报名详情" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="CommunityIndex" component={CommunityIndex} onBackAndroid={()=>{Actions.popTo('Index',{})}} backAndroidHandler={()=>{Actions.popTo('Index',{})}} title="优铺社区首页" hideNavBar={true} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="DemandList" hideNavBar={true} component={DemandList} title="需求信息（列表）" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} />
                <Scene key="ForumList" component={ForumList} title="优铺论坛" hideNavBar={true} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="CooperativeAlliance" component={CooperativeAlliance} title="合作联盟" hideNavBar={true} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="BrandDetails" component={BrandDetails} title="品牌详情" hideNavBar={false} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="CompanyDetails" component={CompanyDetails} title="公司详情" hideNavBar={false} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="DemandInput" hideTabBar={true} hideNavBar={false}  component={DemandInput} title="需求录入" onBackAndroid={()=>{Actions.pop({})}}  backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="OfflineActivit" component={OfflineActivit} title="线下活动" onBack={()=>{Actions.popTo('CommunityIndex',{})}} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="Rankinglist" component={Rankinglist} hideNavBar={true} title="排行榜" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="MapShop" component={MapShop} onBackAndroid={()=>{Actions.popTo('Index',{})}} hideNavBar={true} title="地图找铺" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="CreatNewAccount" component={CreatNewAccount} title="创建账号" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key='ScanCode' type={'reset'} title ="ScanCode" hideTabBar={true} hideNavBar={true}  component={ScanCode}/>
                <Scene key="AddForum" component={AddForum} title="发帖子" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="CreatNewAccount" onBack={()=>{Actions.pop({})}} component={CreatNewAccount} title="创建账号" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key='ProjectDetails'  title ="项目详情" hideNavBar={true} hideTabBar={true} component={ProjectDetails}/>
                <Scene key="ReportProject"  onBackAndroid={()=>{Actions.pop({})}} hideNavBar={true} hideTabBar={true} component={ReportProject} title="报备客户第一步" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="ReportCustom"  onBackAndroid={()=>{Actions.pop({})}} hideNavBar={true} hideTabBar={true} component={ReportCustom} title="报备客户第二步" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key="ReportInfo"  onBackAndroid={()=>{Actions.pop({})}} hideNavBar={true} hideTabBar={true} component= {ReportInfo} title="报备客户第三步" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                <Scene key='upPortal' showLabel={true} tabBarPosition={'bottom'} showIcon={true}  hideTabBar={true} lazy={true} tabs={true} hideNavBar={true}  tabBarStyle={{backgroundColor:"#fff"}}>
                       <Scene key='indexKey'  lazy={true} icon={TabBarIcon} barIndex={0}>
                            <Scene key='Index' panHandlers={null}  title ="Index" hideNavBar={true} component={Index}/>
                            <Scene key="Cooperation" hideTabBar={true} hideNavBar={false} component={Cooperation} onBackAndroid={()=>{Actions.popTo('Index',{})}}  title="发起合作" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>


                            <Scene key="NewsList" hideTabBar={true} hideNavBar={false} component={NewsList} title="资讯频道"  backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                            <Scene key="Introduction" hideTabBar={true} hideNavBar={false} component={Introduction} onBackAndroid={()=>{Actions.popTo('Index',{})}} hideNavBar={true} title="优铺介绍" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                       </Scene>
                       <Scene key='project' lazy={true} title='项目'  hideNavBar={true} icon={TabBarIcon} barIndex={1} >
                               <Scene key='ProjectIndex' panHandlers={null} title ="项目列表" hideNavBar={true} component={ProjectIndex}/>
                       </Scene>
                       <Scene key='business' lazy={true} title='业务' icon={TabBarIcon} barIndex={2} >
                              <Scene key="MyProject" hideNavBar={true} panHandlers={null} component={MyProject} title="我的项目" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>

                              <Scene key="NeedRemarksList2" hideTabBar={true} hideNavBar={false} component={NeedRemarksList} title="需求备注" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key="ReportDetails" hideTabBar={true} hideNavBar={false} component={ReportDetails} title="报备详情" onBack={()=>{Actions.popTo('ReportManagement',{})}} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key="RecordVisit" hideTabBar={true} hideNavBar={false} component={RecordVisit} title="录到访" onBack={()=>{Actions.popTo('ProjectCustomerDetails',{})}} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key="RecordSubscription" hideTabBar={true} hideNavBar={false} component={RecordSubscription} title="录认购（意向）" onBack={()=>{Actions.popTo('ProjectCustomerDetails',{})}} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key="RecordProgress" hideTabBar={true} hideNavBar={false} component={RecordProgress} title="结束进展" onBack={()=>{Actions.popTo('ProjectCustomerDetails',{})}} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key="ReportAudit" hideTabBar={true} hideNavBar={false} component={ReportAudit} title="报备审核" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key="SignedForm" hideTabBar={true} panHandlers={null} hideNavBar={false} component={SignedForm} title="录签约" onBack={()=>{Actions.popTo('ProjectCustomerDetails',{})}} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>

                              <Scene key="ReportManagement" hideNavBar={true} hideTabBar={true} component={ReportManagement} title="报备管理" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key='ProjectCustomerDetails' hideNavBar={true} hideTabBar={true} panHandlers={null} component={ProjectCustomerDetails} title ="客户详情（项目）" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                              <Scene key='BusinessRentDetails' hideNavBar={true} hideTabBar={true} component={BusinessRentDetails} title ="交易详情" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('CustomerDetails',{})}}/>

                              <Scene key='ProjectCustomerDetailsNo' hideNavBar={true} hideTabBar={true} component={ProjectCustomerDetailsNo} title ="客户详情（项目无效）" onBack={()=>{Actions.popTo('ProjectCustomerDetails',{})}} backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>


                       </Scene>
                       <Scene key='custom' lazy={true} title='客源'   icon={TabBarIcon} barIndex={3} >
                                  <Scene key='TouristIndex' panHandlers={null}  panHandlers={null} hideNavBar={true} onBackAndroid={()=>{return false}}  component={TouristIndex}  title ="客源" rightButtonImage={require('./images/add.png')} rightButtonIconStyle={styles.rightButtonIcon} rightButtonTextStyle={styles.rightButtonText} onRight={()=>Actions.CustomerEnter({})}/>

                          <Scene key="NeedRemarksList1" hideTabBar={true} hideNavBar={false} component={NeedRemarksList} title="需求备注" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.CustomerDetails()}}/>
                          <Scene key="NeedRemarksList" hideTabBar={true} hideNavBar={false} component={NeedRemarksList} title="需求备注" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('CustomerDetails',{})}}/>
                          <Scene key="SignedDetails" hideTabBar={true} hideNavBar={false} component={SignedDetails} title="签约详情" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('SignManagement',{})}}/>
                          <Scene key="CustomerFastEnter" hideTabBar={true} hideNavBar={false} component={CustomerFastEnter} title="客户快速录入" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                          <Scene key='CustomerDetails' hideTabBar={true} hideNavBar={true} component={CustomerDetails} title ="客户详情" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onRight={()=>Actions.EditCustomerDetails({})} onBack={()=>{Actions.popTo('MyCustom',{})}} rightTitle="编辑"  rightButtonIconStyle={styles.rightButtonIcon} rightButtonTextStyle={styles.rightButtonText} />
                          <Scene key='BusinessSellDetails' hideTabBar={true} hideNavBar={false} component={BusinessSellDetails} title ="交易详情（销售）" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.ProjectCustomerDetails()}}/>
                          <Scene key="BasicInfoMoreForm" hideTabBar={true} hideNavBar={false} component={BasicInfoMoreForm} title="填写更多（基本信息）" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('CustomerEnter',{})}}/>
                          <Scene key="WriteMoreForm" hideTabBar={true} hideNavBar={false} component={WriteMoreForm} title="填写更多" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('CustomerEnter',{})}}/>
                          <Scene key="CustomerEnter" hideTabBar={true} hideNavBar={false} component={CustomerEnter} title="客户录入" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('TouristIndex',{})}}/>

                          <Scene key="SignManagement_flag" hideNavBar={true} hideTabBar={true} component={SignManagement} title="签约管理" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>

                          <Scene key="SignManagement" hideNavBar={true} hideTabBar={true} component={SignManagement} title="签约管理" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                          <Scene key="MyCustom" hideNavBar={true} hideTabBar={true} component={MyCustom} title="我的客户" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title}/>
                          <Scene key='BusinessRentDetails' hideNavBar={true} hideTabBar={true} component={BusinessRentDetails} title ="交易详情" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('CustomerDetails',{})}}/>
                          <Scene key='EditCustomerDetails' hideNavBar={true} hideTabBar={true} component={EditCustomerDetails} title ="客户详情" backButtonImage={require('./images/back.png')} navigationBarStyle={styles.navigationBar} leftButtonIconStyle={styles.leftButtonIcon} titleStyle={styles.title} onBack={()=>{Actions.popTo('CustomerDetails',{})}} />


                       </Scene>
                       <Scene key="myhome" lazy={true} title="我的"  icon={TabBarIcon} barIndex={4}  >
                          <Scene key='PersonalIndex' panHandlers={null}  panHandlers={null} hideNavBar={true} onBackAndroid={()=>{return false}} component={PersonalIndex}  title="" />


                          <Scene key="Brander" component={Brander} hideNavBar={false} hideTabBar={true} title="品牌人" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="Franchiser"  hideNavBar={false} hideTabBar={true}  component={Franchiser} title="招商人" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="GoldPartner"  hideNavBar={false} hideTabBar={true} component={GoldPartner} title="金伙伴" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="ChangePassword"  hideNavBar={false} hideTabBar={true}  component={ChangePassword} title="修改密码" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="Setting"  hideNavBar={false} hideTabBar={true} onLoginOut={()=>{this.setState({currentUser:null})}} component={Setting}  title="设置" onBack={()=>{Actions.popTo("PersonalIndex",{})}}  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="PersonalInformation"  hideNavBar={false} hideTabBar={true}  component={PersonalInformation} hideNavBar={true} title="个人信息" onBack={()=>{Actions.popTo('PersonalIndex',{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="GoldPartnerInformation" hideNavBar={false} hideTabBar={true}  component={GoldPartnerInformation} title="个人信息-金伙伴" onBack={()=>{Actions.popTo('PersonalIndex',{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="AddImgID"  hideNavBar={false} hideTabBar={true} component={AddImgID} title="上传身份证" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="PersonalCompany"  hideNavBar={false} hideTabBar={true}  component={PersonalCompany} title="我的经济公司" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="BindingTeam" hideNavBar={false} hideTabBar={true}  onBack={()=>{Actions.Index({type:'replace'})}} onBackAndroid={()=>{Actions.Index({type:'replace'})}}  component={BindingTeam} title="绑定团队" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="BindingCompany"  hideNavBar={false} hideTabBar={true} onBack={()=>{Actions.Index({type:'replace'})}} onBackAndroid={()=>{Actions.Index({type:'replace'})}}  component={BindingCompany} title="绑定公司" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="Referral"  hideNavBar={false} hideTabBar={true} onBack={()=>{Actions.popTo('Index',{})}} onBackAndroid={()=>{Actions.popTo('Index',{})}}  component={Referral} title="推荐" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="BindRouterCenter"   panHandlers={null} onBackAndroid={()=>{return false}}  hideNavBar={false} hideTabBar={true} onBack={()=>{Actions.popTo('ScanCode',{})}} onBackAndroid={()=>{Actions.popTo('ScanCode',{})}}  component={BindRouterCenter} title="" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>

                          <Scene key="TextModal" hideNavBar={false} hideTabBar={true}  component={TextModal} title="文本弹框" backButtonImage={require('./images/back.png')} ileftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="OrganizationCompany"  hideNavBar={false} hideTabBar={true} component={OrganizationCompany}  hideNavBar={true}  title="我的公司" onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title} onRight={()=>Actions.UnbindCompany({})} rightTitle="解绑"  rightButtonIconStyle={styles.rightButtonIcon}  rightButtonTextStyle={styles.rightButtonText}/>
                          <Scene key="OrganizationTeam" hideNavBar={false} hideTabBar={true}  component={OrganizationTeam} hideNavBar={true}  title="我的团队" onBack={()=>{Actions.popTo("PersonalIndex",{})}}  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title} onRight={()=>Actions.UnbindTeam({})} rightTitle="解绑"  rightButtonIconStyle={styles.rightButtonIcon}  rightButtonTextStyle={styles.rightButtonText}/>
                          <Scene key="UnbindTeam"  hideNavBar={false} hideTabBar={true} component={UnbindTeam} title="申请解绑"  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="UnbindCompany"  hideNavBar={false} hideTabBar={true} component={UnbindCompany} title="申请解绑" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="MemberCompany"  hideNavBar={false} hideTabBar={true} component={MemberCompany} title="我的公司" onBack={()=>{Actions.popTo("PersonalIndex",{})}}  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="MemberTeam"  hideNavBar={false} hideTabBar={true}  component={MemberTeam} title="我的团队"  onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="AboutUs" hideNavBar={false} hideTabBar={true}  component={AboutUs} title="关于我们" onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="ChangeRole" hideNavBar={false} hideTabBar={true}  component={ChangeRole} title="变更角色介绍" onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="MyAttention"  hideNavBar={false} hideTabBar={true} component={MyAttention} title="我的关注" onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title} onRight={()=>Actions.EditAttention({})} rightTitle="编辑"  rightButtonIconStyle={styles.rightButtonIcon}  rightButtonTextStyle={styles.rightButtonText}/>
                          <Scene key="EditAttention" hideNavBar={false} hideTabBar={true}  component={EditAttention} title="我的关注" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title} />
                          <Scene key="IncomeWithdraw"  hideNavBar={false} hideTabBar={true} component={IncomeWithdraw} title="收入结算及提现规则" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="DevelopTeamTCP"  hideNavBar={false} hideTabBar={true} component={DevelopTeamTCP} title="发展团队协议" onBackAndroid={()=>{Actions.popTo("PersonalIndex",{})}} onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="Balance"  hideNavBar={false} hideTabBar={true} component={Balance} title="账户余额"  hideNavBar={true}  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="BindingBankCard"  hideNavBar={false} hideTabBar={true}  component={BindingBankCard} title="绑定银行卡" onBack={()=>{Actions.popTo('ManageCardList',{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="ManageCardList" hideNavBar={false} hideTabBar={true}  component={ManageCardList} title="管理银行卡" onBack={()=>{Actions.Balance({})}} backButtonImage={require('./images/backWhite.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBarDark} titleStyle={styles.titleDark} onRight={()=>Actions.UnbindCardList({})} rightTitle="解绑"  rightButtonIconStyle={styles.rightButtonIcon}  rightButtonTextStyle={styles.rightButtonText}/>
                          <Scene key="DefaultCardList" hideNavBar={false} hideTabBar={true}  component={DefaultCardList} title="银行卡（默认）" backButtonImage={require('./images/backWhite.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBarDark} titleStyle={styles.titleDark}/>
                          <Scene key="UnbindCardList" hideNavBar={false} hideTabBar={true} onBack={()=>{Actions.replace('ManageCardList',{type:'refresh',flag:'new'})}} component={UnbindCardList} title="银行卡（解除绑定）" backButtonImage={require('./images/backWhite.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBarDark} titleStyle={styles.titleDark}/>
                          <Scene key="FundDetailsList" hideNavBar={false} hideTabBar={true}  component={FundDetailsList} title="资金明细" onBack={()=>{Actions.popTo('Balance',{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="ApplyWithdraw" hideNavBar={false} hideTabBar={true}  component={ApplyWithdraw} title="申请提现" onBack={()=>{Actions.Balance({})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="MyFeedback" hideNavBar={false} hideTabBar={true}  component={MyFeedback} title="用户反馈"  hideNavBar={true} onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="Recommend" hideNavBar={false} hideTabBar={true}  component={Recommend} title="我的奖励" onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="DevelopAwardList" hideNavBar={false} hideTabBar={true}  component={DevelopAwardList} title="发展奖励佣金" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="AuthenticationInfo" hideNavBar={false} hideTabBar={true}  component={AuthenticationInfo} title="公司类认证" onBack={()=>{Actions.popTo("PersonalIndex",{})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="CredentialsCompany"  hideNavBar={false} hideTabBar={true}  component={CredentialsCompany} title="公司类(认证成功展示)" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="MessageList"  hideNavBar={false} hideTabBar={true} component={MessageList} title="消息列表" onBack={()=>{Actions.PersonalIndex({})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title} onRight={()=>Actions.MessageEditList({})} rightTitle="编辑"  rightButtonIconStyle={styles.rightButtonIcon}  rightButtonTextStyle={styles.rightButtonText}/>
                          <Scene key="MessageEditList"  hideNavBar={false} hideTabBar={true} component={MessageEditList} title="消息列表（编辑）" onBack={()=>{Actions.MessageList({})}} backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title} onRight={()=>Actions.MessageList({})} rightTitle="完成"  rightButtonIconStyle={styles.rightButtonIcon}  rightButtonTextStyle={styles.rightButtonText}/>
                          <Scene key="MessageDetails" hideNavBar={false} hideTabBar={true}  component={MessageDetails} title="消息详情" backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="Protocol" hideNavBar={false} hideTabBar={true}  component={Protocol} title="协议" backButtonImage={require('./images/back.png')} onBack={()=>{Actions.pop()}} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>


                          <Scene key="SpreadQr" component={Promotion} hideTabBar={true} hideNavBar={true} title="我要推广" onBackAndroid={()=>{Actions.popTo("PersonalIndex",{})}} onBack={()=>{Actions.popTo("PersonalIndex",{})}}  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="DevelopTeamQr" component={Promotion} hideTabBar={true} hideNavBar={true} title="我要发展团队" onBackAndroid={()=>{Actions.popTo("PersonalIndex",{})}} onBack={()=>{Actions.popTo("PersonalIndex",{})}}  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="ShareQr" component={Promotion} hideTabBar={true} hideNavBar={true} title="分享" onBack={()=>{Actions.popTo("PersonalIndex",{})}}  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                          <Scene key="TeamMemberDetails" hideTabBar={true} hideNavBar={true} component={TeamMemberDetails} title="队员详情"  backButtonImage={require('./images/back.png')} leftButtonIconStyle={styles.leftButtonIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.title} />


                </Scene>
            </Scene>
        </Scene>

      </Router>;
  }
}
export const styles = StyleSheet.create({
  navigationBar:{
    backgroundColor:'#f9f9f9',
    borderBottomWidth:0,
  },
  navigationBarDark:{
    backgroundColor:'#1e222a',
    borderBottomWidth:0,
  },
  leftButtonIcon:{
    width:17,
    height:17,
  },
  leftButtonText:{
    width:60,
    alignItems:"center",
    justifyContent:"center",
    color:'rgb(67,67,67)',
    fontSize:16,
  },
  title:{
    color:'#333',
    fontSize:18,
    fontWeight:'400',
    alignItems:"center",
    width:Dimensions.get('window').width-120,
    textAlign:'center',
  },
  titleDark:{
    color:'#fff',
    fontSize:17,
  },
  rightButtonIcon:{
    width:17,
    height:17,
  },
  rightButtonText:{
    width:60,
    alignItems:"center",
    justifyContent:"center",
    color:'rgb(67,67,67)',
    fontSize:16,
  },
});
