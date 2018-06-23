// //测试服务器
// export const sites={
//   bj:'https://bj.api.ucaiworld.com',
//   sh:'https://sh.api.ucaiworld.com',
//   tj:'https://tj.api.ucaiworld.com',
//   hn:'https://hn.api.ucaiworld.com',
//   cs:'https://cs.api.ucaiworld.com',
//   sy:'https://sy.api.ucaiworld.com'
// }
//
// export const h5Sites={
//   bj: 'https://bj.h5.ucaiworld.com',
//   sh: 'https://sh.h5.ucaiworld.com',
//   tj: 'https://tj.h5.ucaiworld.com',
//   hn: 'https://hn.h5.ucaiworld.com',
//   cs: 'https://cs.h5.ucaiworld.com',
//   sy: 'https://sy.h5.ucaiworld.com'
// }

// 正式服务器
export const sites={
  bj:'https://bj.api.youpuchina.com',
  sh:'https://sh.api.youpuchina.com',
  tj:'https://tj.api.youpuchina.com',
  hn:'https://hn.api.youpuchina.com',
  cs:'https://cs.api.youpuchina.com',
  sy:'https://sy.api.youpuchina.com',
  sq:'https://sq.api.youpuchina.com',
  xz:'https://xz.api.youpuchina.com'
}

export const h5Sites={
  bj: 'https://bj.h5.youpuchina.com',
  sh: 'https://sh.h5.youpuchina.com',
  tj: 'https://tj.h5.youpuchina.com',
  hn: 'https://hn.h5.youpuchina.com',
  cs: 'https://cs.h5.youpuchina.com',
  sy: 'https://sy.h5.youpuchina.com',
  sq: 'https://sq.h5.youpuchina.com',
  xz: 'https://xz.h5.youpuchina.com'
}

export const uploadFileAction='https://static.youpuchina.com/ueditor/jsp/controller.jsp?action=uploadimage'

export const staticSite='https://static.youpuchina.com'

//当前APP版本
export const currentVersion='20171219';
export const currentVersionName='2.3.6';

export const apis={
  //获取一个用户（测试）
  getOneUser:'/users/',
  //获取APP版本信息
  checkVersion:'/sites/appVersion.json',
  //登录
  login:'/users/search/findByAccountAndPassword',
  // 快捷登录
  accountVer:'/users/search/existsByAccount',
  captchaVer:'/user/loginSendMessage',
  shortcutLoginForTelphone:'/user/loginVerifyCaptcha',
  // 注册获取短信验证码
  sendRegistryCode: '/user/registerSendMessage',
  findUserByAccount:'/users/search/findByAccount',
  // 注册
  register: '/user/register',
  migration:'/user/migration',

  //重置密码
  resetPasswordCode:'/user/resetPasswordSendMessage',
  resetPassword:'/user/resetPassword',

  //项目列表
  projectList:'/project/findByCondition',
  //客源首页
  TouristIndex:'/user/getBusinessNums',
  // 获取业态列表
  getProjectBusinessTypes: '/projectBusinessTypes?sort=sort,desc',
  // 获取价格条件列表
  getPriceConditions: '/priceConditions/search/findByTypeOrderBySortDesc',
  //关注项目列表
  attentionProjectList:'/project/findAttentionByUserId',
  //客户录入
  customerEnter:'/customers',
  //发展佣金总数和团队总人数(我的奖励)
  getDevelopCommission:'/user/getDevelopCommission',
  //推荐奖励佣金总数和总人数
  getRecommendCommission:'/user/getRecommendCommission',

  //刘铁霖开始
  getBalance:'/user/getBalance',
  passwordChange:'/user/passwordChange',
  pwdChangeSendMessage:'/user/pwdChangeSendMessage',
  getBalanceDetail:'/userIncomeAndCost/findByUserId',
  getBalanceTotal:'/userIncomeAndCost/findTotalByUserId',
  getBankList:'/userBank/findByUserId',
  bankSendMessage:'/userBank/bankSendMessage',
  bindBank:'/userBank/bindBank',
  unBindBank:'/userBanks/',
  countUserBank:'/userBanks/search/countByUserId',
  getOneUserBank:'/userBank/findOneByUserId',
  cashApply:'/userBank/cashApply',
  bankSetDefault:'/userBank/setDefault',
  delAttentionProject:'/project/delAttentionProject',
  userNotificationList:'/userNotification/getLists',
  userNotificationUpdate:'/userNotification/update',
  userNotification:'/userNotificationRecords/',
  getDevelopCommissionList:'/user/getDevelopCommissionList',
  userFeedback:'/userFeedbacks',
  demand:'/demands',
  changeRoleType:'/user/changeRoleType',
  getTeamBusinessList:'/business/getTeamBusinessList',
  getMyTeam:'/userTeam/getMyTeam',
  getMemberInfo:'/userTeam/getMemberInfo',
  removeMember:'/userTeam/removeMember',
  userTeams:'/userTeams',
  createTeam:'/userTeam/createTeam',
  customerDel:'/customers',
  unbindTeam:'/userTeam/unbindTeam',
  cooperationUserList:'/cooperations/search/findByUserId',
  demandUserList:'/demands/search/findByUserId',
  getShopDetails: '/shop/details',
  getShops:'/shops',
  followShop : '/shop/findAttentionShop/',
  delAttentionShop:'/shop/delAttentionShop',
  attentionShop: '/user/attentionShop',
  shopListConditions: '/shop/getConditions',
  shopList:'/shop/findByCondition',
  shopTags: '/shopTags',
  shopSupportings: '/shopSupportings',
  getShopTypes: '/shop/getShopTypes',
  getRedFlag:'/userNotification/getRedFlag',
  pushLogInsert:'/pushMessageLog/insert',
  //刘铁霖结束



  //南翔开始
  reportManagementList:'/business/getProjectReportList',
  reportDetail:'/business/getReportDetail',
  addBusinessFlow:'/business/addBusinessFlow',
  patchBusiness:'/businesses',
  patchBusinessFlow:'/businessFlows',
  patchCustomer:'/customers',
  createNewBusiness:'/business/createNewBusiness',
  getBusinessDetail:'/business/getBusinessDetail',
  getCustomerBusinessDetail:'/business/getCustomerBusinessDetail',
  saveCustomerMark:'/customerMarks',
  findByProjectIdCondition: '/business/findByProjectIdCondition',
  getUserBrandList:'/userBrand/getUserBrandList',
  getUserBrandDetail:'/userBrand/getUserBrandDetail',
  getUserBrandAreas:'/user/getUserBrandAreas',
  //南翔结束


  //宋骁开始
  // 客户列表
  customerList: '/customer/findByCondition',
  // 客户列表条件
  customerListConditions: '/customer/getConditions',
  // 根据项目获取客户列表
  customerListByProjectId: '/customer/findByProjectId',
  users: '/users',
  // 关注项目
  attentionProject: '/user/attentionProject',
  // 签约列表条件
  signListConditions: '/business/getSignListConditions',
  // 签约列表
  signList: '/business/getSignList',
  // 签约详情
  signDetail: '/business/getSignDetail',
  // 申请结佣
  applyCheck: '/business/applyCheck',
  // 获取项目
  getProjects: '/projects',
  // 根据项目获取客户列表
  findBusinessByProjectId: '/business/findByProjectId',
  // 精选楼盘
  getAusleseProjects: '/project/getAusleseProjects',
  // 首页统计
  indexCount: '/article/countShow',
  // 根据模块类型和显示类型查询文章
  articleFindByModuleType: '/article/findByModuleType',
  // 项目列表条件
  projectListConditions: '/project/getConditions/v2',
  // 项目标签列表
  projectTags: '/projectTags',
  // 保存客户
  saveCustomerWithMark: '/customer/saveCustomerWithMark',
  // 热搜
  hotSearchList: '/hotSearches',
  // 获取项目的项目经理电话
  getProjectManagerTel: '/project/getProjectManagerTel',
  // 获取项目详情
  getProjectDetails: '/project/details',
  // 记录设备信息
  recordDeviceInfo: '/user/recordDeviceInfo',
  // 消息详情
  notifications: '/notifications',
  // 业务通知
  businessNotify: '/notification/businessNotify',






















  //宋骁结束




  //亮亮开始
  //发起合作
  cooperation:'/cooperations',
  //咨询列表TAB菜单
  newsListTabs:'/article/findArtCaterory/?type=新闻',
  //显示评论列表
  commentList:'/article/findComment',
  //发布评论
  commentInfo:'/comments',
  //是否报名过此条新闻
  isEnroll:'/article/findArticleApply',
  //优铺论坛列表TAB菜单
  forumListTabs:'/article/findArtCaterory/?type=论坛',
  //优铺论坛列表子列表
  forumList:'/article/findArticleList/',
  //优铺论坛需求列表TAB菜单
  demandListTabs:'/article/findArtCaterory/?type=需求',
  //优铺论坛需求列表子列表
  demandList:'/article/findArticleList/',
  //浏览量+1
  patchArticlesInfo:'/articles',
  //浏览量+1
  addForumInfo:'/articles',
  //优铺论坛一级标题
  forumTitle:'/article/findArtCaterory/?type=论坛&mold=true',
  //活动报名
  enrollSuccess:'/articleApplies',























  //亮亮结束




  //小米开始
  newsList:'/article/findArticleList/',
  newsDetails:'/articles',
  OfflineActivitK:'/article/findArtCaterory/',
  RankinglistK:'/billboards',
  brandsK:'/brands',
  companiesK:'/companies',
  patchOneUser:'/users',
  unbindTeamK:'/userTeam/relieveApply',
  bindSendMessageK:'/userTeam/bindSendMessage',

















  //小米结束

  //天磊开始
  //社区-轮播图模块
  CommunityCarousel:'/article/findModule/?showType=轮播&pageType=社区',
  //社区-底部模块
  CommunityFooter:'/article/findModule/?showType=自定义&pageType=社区',
  //社区-各个模块的内容
  moduleList: '/article/findModuleArticle/',
  //判断用户有没有关注此项目
  followProject : '/project/findAttentionProject/',
  //根据经纬度获取地址
  getAddress : '/article/getAddress/',
  //关注商铺列表
  attentionShopList:'/shop/findAttentionByUserId',
  // 精选商铺
  getAusleseShops: '/shop/getAusleseShops',
  //添加登陆日志
  userLoginLogInfo:'/userLoginLogs',
  //获取用户推荐信息
  getRecommendNum:'/user/getRecommendNum',
  //获取用户推荐列表
  getRecommendList:'/user/getRecommendList',
  //获取用户团队信息
  getDevelop:'/user/getDevelop',
  //获取用户团队列表
  getDevelopList:'/user/getDevelopList',
  //用户详情
  getUserDetail:'/user/getUserDetail',
  //查询签约明细
  getUserSignList:'/user/getUserSignList',
  //记录登陆日志
  saveLoginLog:'/user/saveLoginLog',
  //品牌库筛选条件
  brandListConditions:'/userBrand/getConditions',
  //品牌库列表
  brandList:'/userBrand/findByCondition',
  // 项目经理我的项目查询
  projectListV2:'/businessV2/projectList',
  // 项目经理我的项目-交易数据分析查询
  findByBusinessNum:'/businessV2/findByBusinessNum',
  // 项目经理-交易管理查询
  findByBusinessList:'/businessV2/findByBusinessList',
  // 项目经理-交易列表各个状态下的数据
  findFlowTypeNum:'/businessV2/findFlowTypeNum',
























  //天磊结束




}
