
import { fetchPost,fetchGet,fetchPatch,fetchDelete } from '../Remote/RemoteHelp'
import { apis } from '../Remote/ApiStorage'
import { UMengAnalytics } from '../../commonComponents/umeng/UMAnalytics';

export const sync={
  getOneUser1(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getOneUser(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getSearchProject(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  sendRegistryCode(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
    UMengAnalytics.onEvent('register_get_code_ask');
  },
  login(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  findUserByAccount(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  accountVer(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  captchaVer(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
    UMengAnalytics.onEvent('quick_login_get_code_ask');
  },
  shortcutLoginForTelphone(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  test2(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  register(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  migration(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  resetPasswordCode(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
    UMengAnalytics.onEvent('forgot_password_get_code_ask');
  },
  resetPassword(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  projectList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  TouristIndex(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getProjectBusinessTypes(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getPriceConditions(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  attentionProjectList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  customerEnter(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  getDevelopCommission(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getRecommendCommission(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },


  //刘铁霖开始
  getBalance(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  passwordChange(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  pwdChangeSendMessage(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getBalanceDetail(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getBalanceTotal(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getBankList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  bankSendMessage(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  bindBank(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  unBindBank(params){
    let { syncParams: { url } } = params;
    fetchDelete(url,params);
  },
  countUserBank(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getOneUserBank(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  cashApply(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  bankSetDefault(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  delAttentionProject(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  userNotificationList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  userNotificationUpdate(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  userNotificationDel(params){
    let { syncParams: { url } } = params;
    fetchDelete(url,params);
  },
  getDevelopCommissionList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  userFeedback(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  demand(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  authCompany(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  changeRoleType(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  getTeamBusinessList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getMyTeam(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getMemberInfo(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  removeMember(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  userTeams(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  createTeam(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  customerDel(params){
    let { syncParams: { url } } = params;
    fetchDelete(url,params);
  },
  unbindTeam(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  cooperationUserList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  demandUserList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getShopDetails(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getShops(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  followShop(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  delAttentionShop(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  attentionShop(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  shopList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  shopListConditions(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  shopTags(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  shopSupportings(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getShopTypes(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getRedFlag(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  pushLogInsert(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },















  //刘铁霖结束



  //南翔开始
  reportManagementList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  reportDetail(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  addBusinessFlow(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  patchBusiness(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  patchBusinessFlow(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  patchCustomer(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  createNewBusiness(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
    UMengAnalytics.onEvent('customers_report_customer_information_submit');
  },
  getBusinessDetail(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getCustomerBusinessDetail(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  saveCustomerMark(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  findByProjectIdCondition(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  checkVersion(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getUserBrandList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getUserBrandDetail(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getUserBrandAreas(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },



  //南翔结束




  //宋骁开始
  customerList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  customerListConditions(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  customerListByProjectId(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  usersPatch(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  attentionProject(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  signListConditions(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  signList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  signDetail(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  applyCheck(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
    UMengAnalytics.onEvent('customers_contract_details_apply_for_commission_ask');
  },
  getProjects(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  findBusinessByProjectId(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getAusleseProjects(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  indexCount(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  articleFindByModuleType(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  projectListConditions(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  projectTags(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  saveCustomerWithMark(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
    UMengAnalytics.onEvent('customers_customer_input_submit');
  },
  hotSearchList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getProjectManagerTel(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  getProjectDetails(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  recordDeviceInfo(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  notifications(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  businessNotify(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },

























  //宋骁结束




  //亮亮开始
  cooperation(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  newsListTabs(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  commentList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  commentInfo(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  isEnroll(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  forumListTabs(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  forumList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  demandListTabs(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  demandList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  patchArticlesInfo(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  addForumInfo(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  forumTitle(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  enrollSuccess(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
    UMengAnalytics.onEvent('activity_signup_click');
  },
































  //亮亮结束




  //小米开始
  newsList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  newsDetails(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  OfflineActivitK(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  RankinglistK(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  brandsK(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  companiesK(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  patchOneUser(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
    UMengAnalytics.onEvent('personal_information_submit');
  },
  unbindTeamK(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  bindSendMessageK(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
















  //小米结束

  //天磊开始
  //社区-轮播图模块
  CommunityCarousel(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //社区-底部模块
  CommunityFooter(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //社区-各个模块下的内容
  moduleList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //查询用户详情
  userDetails(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //查询用户团队详情
  userTeamDetails(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //更新用户团队
  userTeamPatch(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  //更新用户
  userPatch(params){
    let { syncParams: { url } } = params;
    fetchPatch(url,params);
  },
  //判断用户有没有关注此项目
  followProject(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //根据经纬度获取地址
  getAddress(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //关注商铺列表
  attentionShopList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //精选商铺
  getAusleseShops(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  userLoginLogInfo(params){
    let { syncParams: { url } } = params;
    fetchPost(url,params);
  },
  //获取用户推荐信息
  getRecommendNum(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //获取用户推荐列表
  getRecommendList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //获取用户团队信息
  getDevelop(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //获取用户团队列表
  getDevelopList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //用户详情
  getUserDetail(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //签约明细
  getUserSignList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //记录登陆日志
  saveLoginLog(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //品牌库筛选条件
  brandListConditions(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //品牌库列表
  brandList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //项目经理我的项目查询
  projectListV2(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //项目经理我的项目-交易数据分析查询
  findByBusinessNum(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //项目经理-交易管理查询
  findByBusinessList(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },
  //项目经理-交易列表各个状态下的数据
  findFlowTypeNum(params){
    let { syncParams: { url } } = params;
    fetchGet(url,params);
  },





















  //天磊结束
}
