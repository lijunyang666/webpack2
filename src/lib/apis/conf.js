var PathList = {};


PathList.TemprootPath = '';

PathList.rootPath = '/Controller';
//PathList.rootPath = 'http://192.168.126.40:8080';
//PathList.rootPath = 'http://192.168.126.39:8080';
//PathList.rootPath = 'http://121.196.194.211:8080/Controller';
//PathList.rootPath = "http://127.0.0.1:7788"

// 登陆的3个请求
PathList.VerifyLoginServlet = PathList.rootPath + '/login.shtml';
PathList.StartCaptchaServlet = PathList.rootPath + '/StartCaptchaServlet';
PathList.login = PathList.rootPath + '/VerifyLoginServlet.shtml';
// 注册的2个请求
PathList.registerTelephoneCode = PathList.rootPath + '/registerTelephoneCode.shtml';
PathList.register = PathList.rootPath + '/register.shtml';
// 找回密码或修改密码
PathList.updatePasswordTelephoneCode = PathList.rootPath + '/updatePasswordTelephoneCode.shtml';
PathList.updatePassword = PathList.rootPath + '/updatePassword.shtml';


// 查看用户创建作品列表 不需要传数据
PathList.findBookByUser = PathList.rootPath + '/book/findBookByUser.shtml';
// 查看作者创建作品目录页 需要传入作品id
PathList.queryBook = PathList.rootPath + '/book/queryBook.shtml'
// 作者作品新增卷
PathList.saveOrUpdateVolume = PathList.rootPath + '/volume/saveOrUpdateVolume.shtml';
// 作者新建作品上传封面页
PathList.bookUpload = PathList.rootPath + '/book/upload.shtml';
// 作者新建与修改作品的接口
PathList.saveOrUpdateBook = PathList.rootPath + '/book/saveOrUpdateBook.shtml';
// 作者阅读章节接口
PathList.ContentfindContent = PathList.rootPath + '/content/findContent.shtml';
// 作者新建章节接口
PathList.saveOrUpdateContent = PathList.rootPath + '/content/saveOrUpdateContent.shtml';
// 获取作品分类的接口
PathList.queryBookType = PathList.rootPath + '/bookType/queryBookType.shtml';
// 读者访问目录页
PathList.queryBookDirectory = PathList.rootPath + '/catalog/queryBookDirectory.shtml';
//作者其他作品的
PathList.findUserOtherBook = PathList.rootPath + '/catalog/findUserOtherBook.shtml';
//阅读页
PathList.findContent = PathList.rootPath + '/catalog/findContent.shtml';

PathList.queryBookTitle = PathList.rootPath + '/bookType/queryBook.shtml';
// 分类页面
PathList.queryBookClass = PathList.rootPath + '/bookType/filter.shtml';
//主页
PathList.getIndexData = PathList.rootPath + '/index/getIndexData.shtml';
//小编推荐
PathList.nextBatch = PathList.rootPath + '/index/nextBatch.shtml';
//排行榜
PathList.getRankingList = PathList.rootPath + '/rank/getRankingList.shtml';
//我的书架 -我的收藏
PathList.findBookCollectByUser = PathList.rootPath + '/bookCollect/findBookCollectByUser.shtml';
//我的书架-我的浏览记录
PathList.findBookHitByUser = PathList.rootPath + '/bookHit/findBookHitByUser.shtml';
// 判断是否登入
PathList.getStatus = PathList.rootPath + '/getStatus.shtml';
// 添加或取消收藏
PathList.saveOrDeleteBookCollect =  PathList.rootPath + '/bookCollect/saveOrDeleteBookCollect.shtml';
// 获取评论
PathList.findCommentAndReplyByReplyUserId = PathList.rootPath + '/reply/findCommentAndReplyByReplyUserId.shtml';
// 获取个人信息
PathList.queryUser = PathList.rootPath + '/user/queryUser.shtml';
// 修改个人信息
PathList.updateUser = PathList.rootPath + '/user/updateUser.shtml';
// 头像上传
PathList.userUpload = PathList.rootPath + '/user/upload.shtml';
// 获取关注我的 和 我的关注  0表示我关注的人，status 1表示关注我的人  pageNo 当前页码数 pageSize 每页显示的数据量
PathList.myCareOrCareMe = PathList.rootPath + '/relation/myCareOrCareMe.shtml';
// 确定关注 或 取消关注
PathList.saveOrCancelAttention = PathList.rootPath + '/relation/saveOrCancelAttention.shtml';
// 卷交换位置 volumeUpId volumeDownId
PathList.volumeChange = PathList.rootPath + '/catalog/volumeChange.shtml';
// 章节交换位置 contentUpId contentDownId
PathList.contentChange = PathList.rootPath + '/catalog/contentChange.shtml';
// 删除卷
PathList.removeVolume = PathList.rootPath + '/volume/removeVolume.shtml'
// 删除章节
PathList.removeContent = PathList.rootPath + '/content/removeContent.shtml'
// 获取评论
PathList.findCommentAndReply = PathList.rootPath + '/comment/findCommentAndReply.shtml';
// 添加评论
PathList.saveComment = PathList.rootPath + '/comment/saveComment.shtml';
// 获取回复 
PathList.moreReply = PathList.rootPath + '/comment/moreReply.shtml';
// 添加回复    
PathList.saveReply = PathList.rootPath + '/reply/saveReply.shtml';
// 查看回复
PathList.queryMsg = PathList.rootPath + '/info/queryMsg.shtml ';
// 评论置顶
PathList.top = PathList.rootPath + '/comment/top.shtml';
// 新增系统消息
PathList.saveInfo = PathList.rootPath + '/info/saveInfo.shtml';
// 查看消息
PathList.queryMsg = PathList.rootPath + '/info/queryMsg.shtml';
// 获取回复
PathList.findCommentAndReplyByReplyUserId = PathList.rootPath + '/reply/findCommentAndReplyByReplyUserId.shtml';
// 审核
PathList.userUpdateBookStatus = PathList.rootPath + '/book/userUpdateBookStatus.shtml';
// 举报
PathList.report = PathList.rootPath + '/report/report.shtml';
// 钱包余额
PathList.amount = PathList.rootPath + '/pay/amount.shtml';
// 申请签约
PathList.userUpdateBookSign = PathList.rootPath + '/book/userUpdateBookSign.shtml';
// 充值钱包
PathList.recharge = PathList.rootPath + '/pay/recharge.shtml';
// 获取好人卡
PathList.cardamount = PathList.rootPath + '/card/amount.shtml';
// 好人卡记录
PathList.cardlist = PathList.rootPath + '/card/list.shtml';
// 钱包记录
PathList.paylist = PathList.rootPath + '/pay/list.shtml';
// 购买好人卡
PathList.buyCard = PathList.rootPath + '/pay/buyCard.shtml';
// 提现
PathList.withdrawals = PathList.rootPath + '/pay/withdrawals.shtml';
// 保存提现信息登记
PathList.saveAlipay = PathList.rootPath + '/updateAlipay.shtml';
// 打赏好人卡  
PathList.cardgive = PathList.rootPath + '/card/give.shtml';
// 签到获取好人卡   
PathList.cardsign = PathList.rootPath + '/card/sign.shtml';
// 钱包日志详情
PathList.detail_21 = PathList.rootPath + '/log/detailForCash.shtml';
// 退出登录
PathList.logout = PathList.rootPath + '/logout.shtml';
// 回复签约 
PathList.userRegainBookSign = PathList.rootPath + '/book//userRegainBookSign.shtml';
// 历史收入
PathList.totalIncome = PathList.rootPath + '/pay/totalIncome.shtml';
// 记住账号
PathList.remeber = PathList.rootPath + '/remeber.shtml';
// 总收入合计
PathList.orderSum = PathList.rootPath + '/pay/orderSum.shtml';

export default PathList;