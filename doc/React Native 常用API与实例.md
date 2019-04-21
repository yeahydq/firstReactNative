#0、手把手教React Native实战之开山篇

##作者简介

  东方耀    Android开发
  RN技术   facebook
  github  
  android ios  原生开发
  react reactjs nodejs 前端  进入 移动互联网 
  js nodejs    大波
  app 
  个人角度   学习的必要性    全栈工程师的捷径

  公司角度    组件化  成本降低  热更新 

<font color=red size=5>加作者微信公众号（dongfangyao888）或扫描下面二维码</font>

<font color=red size=6>推送高清视频教程+语音解说+课堂笔记和源码</font>

![微信号：dongfangyao888二维码](http://image17-c.poco.cn/mypoco/myphoto/20160309/23/17351665220160309234005020.jpg?430x430_120) 


##技术背景
   
   app store 
   facebook   html5   native app 
   Hybrid app   native +  web   混合模式 
   

##视频课程简介

1.基础语法

2.API和组件

3.App更新 热更新上架

4.实战项目  3个  RN技术开发 

##0、配套视频(下载地址)：https://yunpan.cn/cY4JWzTtmVyNY  访问密码 7b60 或 http://vdisk.weibo.com/s/aLDC43gEH4wZV


#36、手把手教React Native实战之API学习AppRegistry

只有配合使用React Native的常用组件和常用API，才能更好的开发应用程序

AppRegistry是JS运行所有React Native应用的入口。应用的根组件应当通过AppRegistry.registerComponent方法注册自己，当注册完后，原生系统才可以加载应用的bundle包并且触发AppRegistry.runApplication来真正运行应用。


##36、配套视频(下载地址)：https://yunpan.cn/cRQVAkkrfVKDx  访问密码 40dc


#37、手把手教React Native实战之API学习AsyncStorage

AsyncStorage是一个简单的、具有异步特性的键值对的存储系统，全局的！替代LocalStorage

AsyncStorage里面都有一个回调函数，而回调的第一个参数都是错误对象，如果发生错误，该对象就会展示错误信息，否则为null；每个方法都会返回一个Promise对象。

案例：购物车（数据共享）

列表页 结算页

1.数据模型构建

2.列表项Item组件（es6中默认属性与属性类型的定义）

3.列表组件List

guid代码 生成

4.购物车组件

去取AsyncStorage中存储的数据，一定是在DidMount生命周期里，不能在WillMount里

5.将组件串联起来

推荐由React Native中文网封装维护的react-native-storage模块，提供了较多便利功能。


##37、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=39&extra=page%3D1

#38、手把手教React Native实战之物理back键详解

在上一节课代码的基础上：

componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

 onBackAndroid = () => {
        const { navigator } = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：'+routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为

    };

说明：BackAndroid在iOS平台下是一个空实现，所以理论上不做这个Platform.OS === 'android'判断也是安全的。
如果所有事件监听函数中，没有任何一个返回真值，就会默认调用默认行为

navigator是同一个，这个事件在最外层注册就行（不是initialRoute的组件，是AppRegistry的组件），
否则会调用多次pop的，这个代码接管的是整个应用的后退键

放到initialRoute里会有问题，你两三个页面测不出来，页面层次多了组件会unmount，然后事件就丢了

addEventListener()第三个参数useCapture (Boolean)详细解析：
•true 的触发顺序总是在 false 之前；

•如果多个均为 true，则外层的触发先于内层；

•如果多个均为 false，则内层的触发先于外层。


需要注意的是，不论是bind还是箭头函数，
每次被执行都返回的是一个新的函数引用，
因此如果你还需要函数的引用去做一些别的事情（譬如卸载监听器），那么你必须自己保存这个引用


// 错误的做法
class PauseMenu extends React.Component{
    componentWillMount(){
        AppStateIOS.addEventListener('change', this.onAppPaused.bind(this));
    }
    componentDidUnmount(){
        AppStateIOS.removeEventListener('change', this.onAppPaused.bind(this));
    }
    onAppPaused(event){
    }
}
// 正确的做法1
class PauseMenu extends React.Component{
    constructor(props){
        super(props);
        this._onAppPaused = this.onAppPaused.bind(this);
    }
    componentWillMount(){
        AppStateIOS.addEventListener('change', this._onAppPaused);
    }
    componentDidUnmount(){
        AppStateIOS.removeEventListener('change', this._onAppPaused);
    }
    onAppPaused(event){
    }
}


// 正确的做法2
class PauseMenu extends React.Component{
    componentWillMount(){
        AppStateIOS.addEventListener('change', this.onAppPaused);
    }
    componentDidUnmount(){
        AppStateIOS.removeEventListener('change', this.onAppPaused);
    }
    onAppPaused = (event) => {
        //把方法直接作为一个arrow function的属性来定义，初始化的时候就绑定好了this指针
    }
}


例子：“再按一次退出应用”
//到了主页了
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
      return true;
      
      
我们在监听函数中不能决定是否要调用默认行为，要等待一个异步操作之后才调用默认行为，此时可以通过第二种办法：

使用BackAndroid.exitApp()来退出应用。

例子：在退出应用之前保存数据

写法1：
 onBackAndroid = () =>{
    saveData().then(()=>{
      BackAndroid.exitApp();
    });
    return true;
  }
  
  在监听函数中，我们开始异步事件，并直接return true。此时默认行为不会被调用。当保存完毕后，我们调用exitApp()，触发默认行为，退出应用。
  
  写法2：
   onBackAndroid = async () =>{
    await saveData();
    BackAndroid.exitApp();
  }
  
  这里我们用了async函数，async 函数总是返回一个Promise，Promise作为一个对象，也被认为是一个“真值”，所以这种情况下默认行为总是不会被调用。当保存完毕后，我们调用exitApp()，触发默认行为，退出应用。
  
  根据当前界面决定作何动作
  有时候我们有这样的需求：当用户处于某些界面下时，back键要做特殊的动作，如：提示用户是否要保存数据，或者解锁界面禁止back键返回等等。此时，最佳实践是在route或route中对应的Component上保存关于如何处理back键的信息：
  onBackAndroid = () => {
    const nav = this.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      const top = routers[routers.length - 1];
      if (top.ignoreBack || top.component.ignoreBack){
        // 路由或组件上决定这个界面忽略back键
        return true;
      }
      const handleBack = top.handleBack || top.component.handleBack;
      if (handleBack) {
        // 路由或组件上决定这个界面自行处理back键
        return handleBack();
      }
      // 默认行为： 退出当前界面。
      nav.pop();
      return true;
    }
    return false;
  };


##38、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=67&extra=page%3D1


#39、手把手教React Native实战之复杂的组件通讯三种方案
接着上节课的代码，从一个bug入手，透过问题去学习，大大提升学习效率
解决bug：组件pop之后，之前的组件没有更新？
例子：在购物车里清空了，但是pop之后，商品详情页并没有更新？
3.更新阶段
主要发生在用户操作之后或父组件有更新的时候，此时会根据用户的操作行为进行相应的页面结构的调整
componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate
pop之后，数据已经改变了，但是之前的组件没什么变化，组件的数据不同步了，解决方案：
方案1：监听didfocus事件，focus到当前路由的时候重新加载数据
            navigationContext.addListener('didfocus', callback)来替代
            componentWillMount() {
        console.log('List---componentWillMount');
        let navigator = this.props.navigator;


        let callback = (event) => {
            console.log(
                'List : 事件类型',
                {
                    route: JSON.stringify(event.data.route),
                    target: event.target,
                    type: event.type,
                }
            );
        };

        // Observe focus change events from this component.
        this._listeners = [
            navigator.navigationContext.addListener('willfocus', callback),
            navigator.navigationContext.addListener('didfocus', callback),
        ];
    }


    componentWillUnmount(){
        console.log('List---componentWillUnmount');
        this._listeners && this._listeners.forEach(listener => listener.remove());
    }
    更新去取数据不用放到componentDidMount，直接放到didfocus的回调即可 不太稳定 
    
方案2：参考第15讲视频Navigator参数传递：往下一个路由push的时候传递参数（一个回调），在组件pop之前先调用此回调刷新数据
navigator.push({
                name: 'GouWu',
                component: GouWu,
                params: {

                    fetchData: function () {

                        console.log('启动fetchData里的方法了');

                        AsyncStorage.clear(function (err) {
                            if (!err) {
                                _that.setState({
                                    count: 0,
                                });

                                alert('购物车已经清空');
                            }
                        });

                    }
                }
            })
            
            这是在点击清空购物车之后，马上pop，同时去触发回调
            clearStorage() {
        let _that = this;

        //触发一下回调 让数据同步
        console.log('点击了清空购物车');
        if (this.props.fetchData) {
            console.log('点击了清空购物车----回调去影响List页面');
            this.props.fetchData();

        }

        const { navigator } = this.props;
        if (navigator) {

            navigator.pop();
        }


    }

还有一种情况：在点击清空购物车之后，不马上pop，而是通过点击物理back键去触发回调
这个就要复杂很多，
错误做法：
const top = routers[routers.length - 1];
      console.log('栈顶的路由---'+top.component);
      if (top.component.props.fetchData) {
        console.log('回调fetchData了');
        top.component.props.fetchData();
      }
  注意：  route.component是一个class 而不是一个object instance ，在里面找props是不可能找得到的，
  如果一定需要从route上找到instance，需要在renderScene里给render的东西指定ref
类似 <Component ref={r=>route.ref = r} />，然后通过route.ref来访问，但注意不应该假设route.ref总是有值
一定要判断下 if(route.ref)


 

方案3：采用redux/event等方式完成跨组件通讯

社区主流还是redux，但是建议大家抛弃redux了，因为太繁琐了，我们马上有更方便的架构，来自nodejs社区的，不是前端的方案
RN官方并不提供这个方案，redux也不是官方的
涉及到十几个插件 核心是decorator   都是npm上的插件
主要是一种 前端后端 结构和风格一致 的思想


注意：方案1不推荐，推荐方案2或3


##39、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=76&extra=page%3D1



#40、手把手教React Native实战之安装Nuclide与API学习AlertIOS

安装mac下React Native的开发工具Nuclide

FaceBook官方：nuclide 只支持Mac 基于Atom（github的）（Atom最大的特色就是可以安装很多的插件来完成我们的需求）炫酷插件

https://atom.io/ 下载atom 

https://nuclide.io/ 

https://github.com/facebook/nuclide

打开atom，如果nuclide安装成功，则可以看到nuclide的欢迎界面

brew update && brew upgrade

flow 一个静态的对js类型检查器

brew install flow

保存：mac (command+s)  windows(win+s)

AlertIOS他的静态方法有两个：

alert(title,message,[] buttons) 普通对话框

prompt(title,message,[] buttons) 提供输入的对话框

如果buttons为空数组，默认也会有一个ok按钮，如果数据的长度过长，按钮就会垂直排列！


##40、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=99&extra=page%3D1


#41、手把手教React Native实战之API学习DatePickerAndroid与TimePickerAndroid

日期、时间选择器  Android中是以api的形式，IOS是以组件的形式

DatePickerAndroid：

static open(options: Object) 

打开一个标准的Android日期选择器的对话框

可选的options对象的key值如下：

date (Date对象或毫秒时间戳) - 默认显示的日期
minDate (Date对象或毫秒时间戳) - 可选的最小日期
maxDate (Date对象或毫秒时间戳) - 可选的最大日期
在用户选好日期后返回一个Promise，回调参数为一个对象，其中包含有action, year, month (0-11), day。如果用户取消了对话框，Promise仍然会执行，返回的action为DatePickerAndroid.dismissedAction，其他几项参数则为undefined。所以请在使用其他值之前务必先检查action的值。

注意：当Android手机操作系统低于5.0时，设置最小和最大日期会导致api异常，最好不要设置，而是在用户选择完成后再进行检查；api中的Open函数打开的界面是系统的界面，不能设置其任何显示样式，如何手机显示不同是因为系统被厂商深度定制了

TimePickerAndroid：

static open(options: Object)

打开一个标准的Android时间选择器的对话框。

可选的options对象的key值如下：

hour (0-23) - 要显示的小时，默认为当前时间。
minute (0-59) - 要显示的分钟，默认为当前时间。
is24Hour (boolean) - 如果设为true，则选择器会使用24小时制。如果设为false，则会额外显示AM/PM的选项。如果不设定，则采取当前地区的默认设置。
在用户选好时间后返回一个Promise，回调参数为一个对象，其中包含有action, hour (0-23), minute (0-59)。如果用户取消了对话框，Promise仍然会执行，返回的action为TimePickerAndroid.dismissedAction，其他几项参数则为undefined。所以请在使用其他值之前务必先检查action的值。一般用TimePickerAndroid.timeSetAction的取反来判断

注意：is24Hour在某些手机上不会产生作用，用户没有选择时间是因为按下了返回键或取消键；同样的api中的Open打开的是系统的界面


##41、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=107&extra=page%3D1



#42、手把手教React Native实战之IOS日期时间组件DatePickerIOS
 
nuclide代码自动补全提示的插件：
atom-react-native-css atom-react-native-autocomplete

nuclide自动保存代码的插件：
autosave 需要setting enable


日期时间选择器 在IOS中是以组件的形式 DatePickerIOS支持View组件的所有属性，可以设置他的宽度、高度、位置等

这是一个受约束的(Controlled)组件，所以你必须监听onDateChange回调函数并且及时更新date属性来使得组件更新，否则用户的修改会立刻被撤销来确保当前显示值和props.date一致。

除了View组件的属性，DatePickerIOS组件还支持如下属性：

date 当前被选中的日期和时间 Date类型

maximumDate minimumDate

minuteInterval (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30)
用来设置可选的最小分钟单位

mode ('date', 'time', 'datetime') 选择器模式

onDateChange 当用户修改日期或时间时调用此回调函数。
唯一的参数是一个Date对象，表示新的日期和时间（也就是用户选择的）

timeZoneOffsetInMinutes 以分钟为单位的时区时间差 默认情况下，选择器会选择设备的默认时区。通过此参数，可以指定一个时区。举个例子，要使用北京时间（东八区），可以传递8 * 60。

注意：必须要把一个日期类型的状态机变量赋值给DatePickerIOS组件的date属性，并且在用户操作DatePickerIOS组件修改后，用onDateChange回调的新的date去更新对应的状态机变量，否则会出现用户使用DatePickerIOS组件修改改了时间，几秒钟后，DatePickerIOS组件又回到了原来的时间的情况。

warning：Invalid prop 'date' of type 'Number'

warning：Required prop 'onDateChange' was not specified

警告的解决方案：

这是一个bug，升级到0.28即可，如果不想升级，可以照这个修改：

node_modules/react-native/Libraries/Components/DatePicker

https://github.com/facebook/react-native/commit/cec913e7ce05d26181ab4d46e2e41d72acdfb87d

http://stackoverflow.com/questions/35764088/prop-issues-with-datepickerios-in-react-native


##42、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=113&extra=page%3D1



#43、手把手教React Native实战之API学习ActionSheetIOS

需求：分享和弹出多项选择操作！在IOS开发中，ActionSheet提供了这样的功能，而React Native同样封装了该功能，那就是ActionSheetIOS

提供了两个静态方法：

static showActionSheetWithOptions(options,callback):

在iOS设备上显示一个ActionSheet弹出框，其中options参数为一个对象，其属性必须包含以下一项或多项：

options（字符串数组） - 一组按钮的标题（必选）

cancelButtonIndex（整型） - 选项中取消按钮所在的位置（索引）

destructiveButtonIndex（整型） - 红色高亮显示的位置（索引）

title（字符串） - 弹出框顶部的标题

message（字符串） - 弹出框顶部标题下方的信息

static showShareActionSheetWithOptions(options,failureCallback,successCallback)：

在iOS设备上显示一个分享弹出框，其中options参数为一个对象，其属性必须包含以下一项或多项：

message（字符串） - 要分享的信息

url（字符串） - 要分享的URL地址

注：如果url指向本地文件，或者是一个base64编码的url，则会直接读取并分享相应的文件。你可以用这样的方式来分享图片、视频以及PDF文件等。


##43、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=117&extra=page%3D1


#44、手把手教React Native实战之API学习-网络状态与数据交互

##先来看看Android原生的：
（安装最新版的AS）
地址（翻墙）：https://sites.google.com/a/android.com/tools/download/studio/canary/latest

Latest Android Studio Canary Build: 2.2 Preview 4

Windows（用迅雷下载）: https://dl.google.com/dl/android/studio/ide-zips/2.2.0.3/android-studio-ide-145.3001415-windows.zip (436.8 MB)
Mac: https://dl.google.com/dl/android/studio/ide-zips/2.2.0.3/android-studio-ide-145.3001415-mac.zip  (436.9 MB)
Linux:  https://dl.google.com/dl/android/studio/ide-zips/2.2.0.3/android-studio-ide-145.3001415-linux.zip  (436.4 MB) 

Android_SDK也得更新一下

这里有一个坑：用最新版的as去打开之前的项目，报错：Error:Could not find com.android.tools.build:gradle-core:2.2.0-alpha2

解决办法：复制旧版本的as中的2.2.0-alpha2到新版本as（有10几处地方），打开后会提示升级，升级到最新版本的alpha4

启用gradle_daemon加速器：https://docs.gradle.org/2.9/userguide/gradle_daemon.html

##网络连接状态NetInfo：

获取网络状态是异步的，使用了js的Promise机制

Android平台的网络连接类型状态如下:

1.NONE   设备没有网络连接

2.BLUETOOTH  蓝牙数据连接

3.DUMMY   虚拟数据连接

4.ETHERNET  以太网数据连接

5.MOBILE  手机移动网络数据连接

6.MOBILE_DUN  拨号移动网络数据连接

7.MOBILE_HIPRI  高权限的移动网络数据连接

8.MOBILE_MMS   彩信移动网络数据连接

9.MOBILE_SUPL   SUP网络数据连接

10.VPN   虚拟网络连接 ，最低支持Android API 21版本

11.WIFI   无线网络连接

12.WIMAX   wimax网络连接

13.UNKNOWN  未知网络数据连接

根据文档说明:除此之外的其他一些网络连接状态已经被Android API隐藏了，但是我们可以在有需要的时候进行使用。

IOS平台的网络连接类型状态如下:

1.none   设备没有联网

2.wifi     设备联网并且是连接的wifi网络，或者当前是iOS模拟器

3.cell      设备联网是通过连接Edge,3G,WiMax或者LET网络

4.unknown  该检测发生异常错误或者网络状态无从知道

NetInfo有两个监听：

1.网络状态改变的监听 回调当前网络的状态

2.网络是否连接的监听 回调true或false

Android独有的特色：

1.NetInfo.isConnectionExpensive判断当前网络是否计费

2.AndroidManifest.xml文件中添加如下权限字段：(需视频演示)

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

##数据交互（网络请求与响应）

抓包工具：httpwatch  下载地址：https://yunpan.cn/cRpfdwiYvu2jR  访问密码 f018

IE中打开httpwatch的方法： shift+F2  Record Stop clear

通过http或https协议与网络服务器交互，react native集成了node-fetch包以支持开发者的这种需求

网络协议：http https

网络请求方法：get post 等 默认是get

1.GET使用URL或Cookie传参。而POST将数据放在BODY中。

2.GET的URL会有长度上的限制，则POST的数据则可以非常大。

3.POST比GET安全，因为数据在地址栏上不可见。

百度一下：不再以讹传讹，GET和POST的真正区别

建议：
1.get方式的安全性较Post方式要差些，包含机密信息的话，建议用Post数据提交方式；

2.在做数据查询时，建议用Get方式；而在做数据添加、修改或删除时，建议用Post方式；

准备需要传输的消息头：（标准消息头 自定义消息头）

React Native使用http协议框架支持Accept-Encoding: gzip, deflate格式编码，开发者不需要对此进行设置

自定义消息头可以在一些约定好的http消息头中填入身份认证信息

RN中的网络访问api：Fetch(推荐) XMLHttpRequest

fetch是一个更好的网络API，它由标准委员会提出，并已经在Chrome中实现。它在React Native中也默认可以使用。fetch的返回值是一个Promise对象，你可以用两种办法来使用它：1、使用then和catch指定回调函数 2、使用ES7的async/await语法来发起一个异步调用

  //如果你的服务器无法识别上面POST的数据格式，那么可以尝试传统的form格式
 map.body = 'username=13667377378&password=dfy889&act=signin';

    map.follow = 10;//设置请求允许的最大重定向次数，0为不允许重定向

    map.timeout = 8000;//设置超时时间，0为没有超时时间，这个值在重定向时会被重置

    map.size = 0;//设置请求回应中的消息体最大允许长度，0为没有限制

XMLHttpRequest的实现几乎跟Web一样，唯一的区别就是(安全机制)rn中的XMLHttpRequest不存在跨域的限制，而是作为全局api实现的，你可以访问任何网站。但是，XMLHttpRequest基于iOS网络的

let request=new XMLHttpRequest();
    request.onreadystatechange= (e)=>{
      if(request.readyState!==4){
        return ;
      }
      if(request.status===200){
        alert(request.resonsesText);
      }else{
        alert('出错啦');
      }

    };
    request.open('GET','http://www.reactnative.vip/');
    request.send();



##44、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=123&extra=page%3D1


#45、手把手教React Native实战之API学习CameraRoll

CameraRoll模块提供了对手机中保存的图片、视频文件进行遍历访问与操作。
提供两个静态方法

##static getPhotos(params: object) 

可以得到手机中所有的图片和视频（不仅仅是使用摄像头拍摄的照片、视频，还有各个应用自己下载到手机的图片与视频）

params：对象 一些筛选的规则 有4个成员变量

1.first 数值 希望获取多少张图片的信息

2.groupTypes 字符串 默认为SavedPhotos [Album All Event Faces Library PhotoStream] 仅支持IOS平台 用来指定获取图片或视频的类型

3.assetType 字符串 默认为Photos 表示只获取图片 [All Videos]

4.after 字符串 用来记录上一次获取图片的结束标志 方便可以接着上次的位置继续获取 它的值不能由开发者随意赋予，而是应当在上一次获取图片后保存其值。通常，在Android平台，一开始就给这个值为null，但是在IOS平台，设置为null会抛一个无法捕捉的异常，导致红屏。

返回一个带有图片标识符JSON对象的Promise

Android平台的如下：

![微信号：dongfangyao888二维码](http://image18-c.poco.cn/mypoco/myphoto/20160630/11/1735166522016063011073201.png?512x638_130)

IOS平台的如下：

![微信号：dongfangyao888二维码](http://image18-c.poco.cn/mypoco/myphoto/20160630/12/17351665220160630122358078.png?777x699_130)

注意：不管是android平台还是ios平台，得到的image对象，可以作为一个整体，传递给Image组件，用来显示图片 

可以分批次读取手机中的所有图片：监听ScrollView滑动到底部时，继续getPhotos，这时需要用after成员变量，递归调用getPhotos，当page_info.has_next_page为false时返回

CameralRoll在IOS平台中需要添加链接库才能运行，否则报错找不到api：

1.\node_modules\react-native\Libraries\CameraRoll下的Xcode项目文件RCTCameraRoll.xcodeproj拖动到当前Xcode项目的Libraries目录

2.选中当前项目，在右边选择Build Phases，点击打开子项目Link Binary With Libraris

3.打开第一步插入的RCTCameraRoll.xcodeproj，再打开它的子目录Products，将子目录下的libRCTCameraRoll.a文件拖到Link Binary With Libraris列表中

4.使用Xcode重新运行项目


##static saveImageWithTag(tag) 保存一个图片到相册

 tag 在安卓上，本参数是一个本地URI（是把本地的图片保存到相册中），例如"file:///sdcard/img.png".

在iOS设备上可能是以下之一：

1、本地URI  2、资源库的标签  3、非以上两种类型，表示图片数据将会存储在内存中（并且在本进程持续的时候一直会占用内存）。

返回一个Promise，操作成功时返回新的URI。



##45、配套视频(下载地址)：http://www.reactnative.vip/forum.php?mod=viewthread&tid=156&extra=page%3D1


#46、手把手教React Native实战之开源组件react-native-camera

推荐一个跨平台的rn-camera-roll：https://www.npmjs.com/package/rn-camera-roll

A Camera component for React Native. Also supports barcode scanning!二维码扫描

原生Android Zxing google

npm install rnpm -g

rnpm link不是安装，而是添加原生依赖，对应的组件已经安装好了才能rnpm link

通过这个例子来理解下react native的架构：js环境 jsBridge native环境

业务逻辑是reactJs处理  ui用react写 但实际桥接成native

ref的两种属性：String属性 回调属性（组件render渲染完成后的回调）

官网：https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute

this callback will be executed immediately after the component is mounted（组件render之后DidMount之前）


##46、配套视频(下载地址)：http://www.reactnative.vip/thread-168-1-1.html


#47、手把手教React Native实战之API学习定时器与手机定位Geolocation

定时器API：setTimeout、setInterval、setImmediate、requestAnimationFrame 跟浏览器中的一致

setTimeout：设置定时任务，隔多久去执行

setInterval：设置循环执行的任务，每隔多久循环执行一次

setImmediate：设置立即执行的任务

requestAnimationFrame：用递归来设置动画；相对setTimeout(fn, 0)来说，有优势：能够在动画流刷新后执行，即上一个动画流会完整执行。

requestAnimationFrame(fn)和setTimeout(fn, 0)不同，前者会在每帧刷新之后执行一次，而后者则会尽可能快的执行（在iPhone5S上有可能每秒1000次以上）。

用js来实现动画，我们一般是借助setTimeout或setInterval这两个函数，css3动画出来后，我们又可以使用css3来实现动画了，而且性能和流畅度也得到了很大的提升。但是css3动画还是有不少局限性，比如不是所有属性都能参与动画、动画缓动效果太少、无法完全控制动画过程等等。所以有的时候我们还是不得不使用setTimeout或setInterval的方式来实现动画，可是setTimeout和setInterval有着严重的性能问题，虽然某些现代浏览器对这两函个数进行了一些优化，但还是无法跟css3的动画性能相提并论。这个时候，就该requestAnimationFrame出马了。requestAnimationFrame 是专门为实现高性能的帧动画而设计的一个API。

setImmediate则会在当前JavaScript执行块结束的时候执行，就在将要发送批量响应数据到原生之前。注意如果你在setImmediate的回调函数中又执行了setImmediate，它会紧接着立刻执行，而不会在调用之前等待原生代码。Promise的实现就使用了setImmediate来执行异步调用。

安装react-timer-mixin：npm i react-timer-mixin --save

注意：Mixin属于ES5语法（js的混合封装方法），对于ES6代码来说，无法直接使用Mixin。如果你的项目是用ES6代码编写，同时又使用了计时器，那么你只需铭记在unmount组件时清除所有用到的定时器，那么也可以实现和TimerMixin同样的效果。我们发现很多React Native应用发生致命错误（闪退）是与计时器有关。具体来说，是在某个组件被卸载（unmount）之后，计时器却仍然被激活。


使用moment.js轻松管理日期和时间：官网：http://momentjs.com/

安装monent（时间格式化）：npm i moment --save

moment().format('YYYY-MM-DD HH:mm:ss')：取当前时间并格式化

手机定位的api：Geolocation

提供四个静态方法：getCurrentPosition watchPosition clearWacth stopObserving

Android需要在清单文件(AndroidManifest.xml)中加权限：

<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>

IOS需要在Info.plist中增加NSLocationWhenInUseUsageDescription字段来启用定位功能。如果你使用react-native init创建项目，定位会被默认启用。

综合案例：TimerDemo


##47、配套视频(下载地址)：http://www.reactnative.vip/thread-182-1-1.html


#48、手把手教React Native实战之API学习PanResponder手势识别

这节课是PanResponder手势识别初探，高级部分放到vip专属课程里

PanResponder平底锅的响应者

PanResponder类可以将多点触摸操作协调成一个手势。它使得一个单点触摸可以接受更多的触摸操作，也可以用于识别简单的多点触摸手势。

RN框架底层的手势响应系统提供了响应处理器，PanResponder将这些手势响应处理器再次进行封装，以便开发者更容易对手势进行处理，更容易预测用户的手势，对每一个手势响应处理器，PanResponder除了为其提供代表触摸行为的原生事件外，还提供了一个新的手势状态对象用来详细描述手势的状态

PanResponder的基本思想是：监视屏幕上指定大小、位置的矩形区域，当用手指按压这个区域中的某点后，开发者会收到这个事件，当按压后拖动手指时，会收到手势引发的各类事件，当手指离开这个矩形区域时，开发者也会收到相应的事件

注意：开发者可以任意指定监视矩形区域的大小，但在这个区域里，只有第一个按下的事件会上报和继续监视处理，如果第一个手指按下还没有离开，接着第二个手指又来按下了，那么对第二个手指的各种触摸事件无法捕获

注意：开发者可以在屏幕上指定多个监视矩形区域，但是不能同时监视多个矩形区域的不同触摸事件

注意：监视区域会阻止被监视区域覆盖的组件接收触摸事件，比如监视区域覆盖了一个按钮，那么就无法通过按这个按钮来触发其对应的事件，只能在PanResponder监视器的事件处理中对触摸行为进行处理

利用PanResponder实现监视器有以下几个步骤：

1、指定监视区域

如果监视区域有多个，一定不能重叠，否则都失效

2、定义监视器相关变量

指向监视器的变量（必须有）、指向监视器监视区域的变量（可以有）、记录监视区域左上角顶点坐标的两个数值变量（可以有）、上一次触摸点的横纵坐标变量（可以有）

3、准备监视器的事件处理函数（有13个---高级课程会详叙）

4、建立监视器（PanResponder.create）

5、将监视器与监视区域关联 {...this.watcher.panHandlers}

实例：点击、拖动选择百分百参数  比如说播放器的音量大小

一个gestureState对象有如下的字段：

stateID - 触摸状态的ID。在屏幕上有至少一个触摸点的情况下，这个ID会一直有效。

moveX - 最近一次移动时的屏幕横坐标

moveY - 最近一次移动时的屏幕纵坐标

x0 - 当响应器产生时的屏幕坐标

y0 - 当响应器产生时的屏幕坐标

dx - 从触摸操作开始时的累计横向路程

dy - 从触摸操作开始时的累计纵向路程

vx - 当前的横向移动速度

vy - 当前的纵向移动速度

numberActiveTouches - 当前在屏幕上的有效触摸点的数量


##48、配套视频(下载地址)：http://www.reactnative.vip/thread-191-1-1.html

#49、手把手教React Native实战之运行官方项目UIExplorer(Android&IOS)

马上就要进入vip专属课程了，我们用一个项目将之前讲的知识点串起来，适配Android与IOS！

地址：https://github.com/facebook/react-native/tree/master/Examples/UIExplorer

Android环境跑UIExplorer：

1.下载ReactNative项目 80M左右

git clone https://github.com/facebook/react-native.git

2.进入react-native目录 编译android项目

方式一：gradlew :Examples:UIExplorer:android:app:installDebug

会去下载gradle可能报错：java.net.SocketTimeoutException: Read timed out javax.net.ssl.SSLHandshakeException: Remote host clos
ed connection during handshake 这是网络问题引起 不用理 再一次运行gradlew命令 下载gradle比较慢 耐心等待即可

![gradlew](http://image18-c.poco.cn/mypoco/myphoto/20160710/15/17351665220160710151710035.png?670x168_130)

方式二：gradle :Examples:UIExplorer:android:app:installDebug

区别：Gradlew是包装器，自动下载包装里定义好的gradle 版本，保证编译环境统一，gradle 是用本地的gradle 如果是看过我的视频教程的就知道已经安装了gradle 在第11讲打包时

报错：ndk找不到 ndk-build binary cannot be found, check if you've set $ANDROID_NDK environment variable correctly or if ndk.dir is setup in local.properties

3.使用Android Studio安装配置ndk

可以配置ANDROID_NDK环境变量或者在react-native目录下新建文件local.properties（里面设置了sdk与ndk路径）

说到NDK开发，其实是为了有些时候为了项目需求需要调用底层的一些 C/C++ 的一些东西；另外就是为了效率更加高些；代码保护(apk的java层代码很容易被反编译，而C/C++库反汇难度较大)

打开项目结构Project Structure：sdk jdk ndk(没有就会提示下载) ，as安装的话会安装到sdk目录下的ndk-bundle文件夹里

下载地址（迅雷下载）：https://dl.google.com/android/repository/android-ndk-r12b-windows-x86_64.zip

下载地址（迅雷下载）：https://dl.google.com/android/repository/android-ndk-r10e-windows-x86_64.zip


Download https://downloads.sourceforge.net/project/boost/boost/1.57.0/boost_1_57_0.zip 放到目录\react-native\ReactAndroid\build\downloads

boost_1_57_0下载地址：https://yunpan.cn/cBBT7LTwhg77i  访问密码 f1e7

报错：Execution failed for task ':ReactAndroid:buildReactNdkLib'.
> Process 'command 'F:\Android_SDK\ndk-bundle\android-ndk-r12b\ndk-build.cmd'' finished with non-zero exit value 2  解决方案：修改ndk的版本为r10e，不能使用最新版r12b

4.BUILD SUCCESSFUL后开启packager服务器

打开./packager/packager.sh 闪退的问题  解决方案：在react-native目录下npm install 在打开./packager/packager.sh 启动packager服务

IOS环境跑UIExplorer：

直接用Xcode打开UIExplorer.xcodeproj即可

报错：packager抛出异常Error: Cannot find module 'chalk'

解决：ls-l 在cd react-native目录下 npm install chalk

npm install lodash  直接npm install 直到successful

##49、配套视频(下载地址)：http://www.reactnative.vip/thread-203-1-1.html


#50、手把手教React Native实战之混合原生开发_RN调用原生方法的步骤

RN调用原生的方法，此讲适配Android原生与RN的混合开发，步骤如下：

1.用AS打开一个已存在的项目，在RN项目中选择android/build.gradle文件

2.在Android原生这边创建一个类继承ReactContextBaseJavaModule，这个类里面放我们需要被rn调用的方法，封装成了一个原生模块

3.在Android原生这边创建一个类实现接口ReactPackage包管理器，并把第二步创建的类加到原生模块(NativeModule)列表里

4.将第三步创建的包管理器添加到ReactPackage列表里（getPackages方法里）

5.在RN中去调用原生模块 添加NativeModules从react-native


报错： outDexFolder must be a folder 解决方法：不理它  或者 clean

报错：> Failed to create \android\app\buildintermediates\debug\merging 解决方法：不理它  或者 clean

报错：Could not delete path \android\app\build\generated\source\r\debug\com'.   解决方法：用AS build clean


##50、配套视频(下载地址)：http://www.reactnative.vip/thread-210-1-1.html

#63、手把手教React Native实战之API学习Linking跨app的通信方法_适配Android&IOS

Linking提供了一个通用的接口来与传入和传出的App链接进行交互。

方法：

1.addEventListener(url,func) 添加一个监听Linking变化的事件

2.removeEventListener(url,func) 删除一个事件监听

3.openURL(url) 尝试使用设备上已经安装的应用打开指定的url 

  http网址：http://www.reactnative.vip

  https网址：https://www.baidu.com

  发短信：smsto:13667377378

打电话：tel:13667377378

发邮件：mailto:309623978@qq.com

发位置：geo:37.484847,-122.148386 这个不一定看地图处理应用而定

打开其他应用监听的意图url

4.canOpenURL 判断设备上是否有已经安装的应用可以处理指定的URL 对于iOS 9以上版本，你还需要在Info.plist中添加LSApplicationQueriesSchemes字段

5.getInitialURL() 如果应用是被一个链接调起的，则会返回相应的链接地址。否则它会返回null。

注：如果要在Android上支持深度链接，请参阅http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents

意图过滤器需要单独列出：

 <intent-filter>
        	<action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs that begin with "http://www.example.com/gizmos” -->
        <data android:scheme="dfy"
              android:host="reactnative.vip"
              android:pathPrefix="/data" />
        	</intent-filter>

能否通过adb启动activity：adb shell am start -n com.linkingdemo/.MainActivity

测试是否能用url的形式打开app对应的activity：adb shell am start -W -a android.intent.action.VIEW -d "dfy://reactnative.vip/data" com.linkingdemo

IOS

首先我们需要在AppDelegate.m文件中引入RCTLinkingManager.h头文件，那么就需要我们引入相关配置了，关于库的引入默认项目都默认已经配置好的，但是我们需要配置一个库头文件搜索路径


##63、配套视频(下载地址)：http://www.reactnative.vip/thread-327-1-1.html

#未完待续。。。作者：东方耀 QQ：309623978

