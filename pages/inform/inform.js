// pages/inform/inform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    columns: [ "男", "女"],
    gender: 0 || wx.getStorageSync("gender") * 1,
    
  },
/**
 * 
 性别按钮
 */
pickSex: function(e) {
  this.setData({
      gender: e.detail.value
  });
  // console.log("当前选择性别-sex", e.detail.value);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  userNameInput:function(e){
    this.setData({
      userN:e.detail.value
    })
  },
  ageInput:function(e){
    this.setData({
      age:e.detail.value
    })
  },
  IDinput:function(e){
    this.setData({
      ID:e.detail.value
    })
  },
  NativeplaceInput:function(e){
this.setData({
  NP:e.detail.value
})
  },

  addressInput:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick:function(){
    if(this.data.userN == null||this.data.ID == null||this.data.address == null||this.data.NP == null||this.data.age == null){
      // this.setData({
      //   infoMess:'不能有空值!',
        
      // }),
      wx.showModal({
        title: '不能有空值!',
      })
    }else{
      this.setData({
        infoMess:'',
        userName:'姓名'+this.data.userN
      }),
      wx.request({  //记得这个URL如果你没有域名的话  不改东西的话是会报错的
        url: 'http://192.168.20.234:8080/api/v1/user/user/save',  //请求的URL
        method: 'POST',                                        //提交方式
        header: { 'content-type': 'application/json' }, //设置请求的
        data: JSON.stringify({
          //'user_name': that.data.user_name,       
          
            "address": this.data.address,
            "age": this.data.age,
            "createTime": "",
            "id": this.data.ID,
            "np": this.data.NP,
            "sex": this.data.gender,
            "updateBy": "",
            "updateTime": "",
            "userName": this.data.userN
          
          
        }),  //请求参数
        success: function (res) {   //接受后台的回调函数
          var resData = res.data;
          console.log(":"+JSON.stringify(resData) );
         
          if (resData.success == true) {
            wx.showToast({    //这是微信小程序里面自带的成功弹窗
              title: '提交成功',  //弹窗里面的内容
              icon: 'success',  //图标
              duration: 15000,   //弹窗延迟的时间
              success: function () {
                wx.navigateTo({  //保留当前页面，跳转到应用内的某个页面
                  url: '../index/index',   //跳转的页面
                  msg:'提交成功'
                })
              }
            })
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000,
            })
          }
        }
      })
      
    }
  },
  //重置按钮点击事件
  resetBtnClick:function(e){
    this.setData({
      infoMess: '',
      userName: '',
      userN:'',
      passWd: '',
      passW:'',
    })
  },
})