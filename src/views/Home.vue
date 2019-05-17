<template>
    <div class="box">
        <div class="top">
            <div class="detail" @click="recordDetail">
                <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/myRecord.png" alt="">
            </div>
        </div>
        <div class="middleBox">
            <div class="middle m1" >
                <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/title.png" alt="" class="title">
                <p class="p1">可瓜分奖励金(元)</p>
                <h1>{{headerData.money}}</h1>
                <p class="content">当前共有<span>{{headerData.all_num}}</span>人挑战早起打卡</p>
                <p class="content">昨日共有{{headerData.yesterday_num}}人参与打卡</p>
                <button class="btn" @click="daka(userType)">
                    {{btnTxt[showIndex]}}{{showIndex==1?daojishi:''}}
                </button>
                <!-- rulesDetail -->
                <p style="font-size: 14px;cursor: pointer;" @click="rulesDetail">活动规则>></p>
            </div>
            <!---->
            <!--  -->
            <p class="payMore" v-show="userType&&tpfm" @click="toMore">
                追加9元瓜分更多奖励金
                <img src="../static/arrow.png" alt="">
            </p>
            <div class="record">
                <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/bd.png" alt="" class="bd">
                <ul class="tab">
                    <li :class="tabIndex==0?'selected':''" @click="swiperChange(0)">挑战榜<span></span></li>
                    <li :class="tabIndex==1?'selected':''" @click="swiperChange(1)">毅力榜<span></span></li>
                    <li :class="tabIndex==2?'selected':''" @click="swiperChange(2)">早鸟榜<span></span></li>
                </ul>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <!--挑战榜-->
                        <div class="swiper-slide">
                            <div class="topTitle">
                                <p>排名</p>
                                <p>用户名</p>
                                <p>累计奖励金</p>
                            </div>
                            <ul v-for="(item,index) in challenge" :key="index">
                                <template>
                                    <li v-if="index<3">
                                        <p><img :src="imgSrc[index]" alt=""></p>
                                        <p>{{item.mobile}}</p>
                                        <p class="money">{{item.moneys}}元</p>
                                    </li>
                                    <li v-else>
                                        <p>#{{index+1}}</p>
                                        <p>{{item.mobile}}</p>
                                        <p class="money">{{item.moneys}}元</p>
                                    </li>
                                </template>
                                <!--<li>-->
                                <!--<p>#1</p>-->
                                <!--<p>15324578641</p>-->
                                <!--<p class="money">2000.55元</p>-->
                                <!--</li>-->
                            </ul>
                        </div>
                        <!--毅力榜-->
                        <div class="swiper-slide">
                            <div class="topTitle">
                                <p>排名</p>
                                <p>用户名</p>
                                <p>打卡天数</p>
                            </div>
                            <ul v-for="(item,index) in insist_top" :key="index">
                                <template>
                                    <li v-if="index<3">
                                        <p><img :src="imgSrc[index]" alt=""></p>
                                        <p>{{item.mobile}}</p>
                                        <p>连续<span class="days">{{item.activity_clock_day}}</span>天</p>
                                    </li>
                                    <li v-else>
                                        <p>#{{index+1}}</p>
                                        <p>{{item.mobile}}</p>
                                        <p>连续<span class="days">{{item.activity_clock_day}}</span>天</p>
                                    </li>
                                </template>
                            </ul>
                        </div>
                        <!--早鸟榜-->
                        <div class="swiper-slide">
                            <div class="topTitle">
                                <p>排名</p>
                                <p>用户名</p>
                                <p>打卡时间</p>
                            </div>
                            <ul v-for="(item,index) in early_top" :key="index">
                                <template>
                                    <li v-if="index<3">
                                        <p><img :src="imgSrc[index]" alt=""></p>
                                        <p>{{item.mobile}}</p>
                                        <p>{{item.show_time}}打卡</p>
                                    </li>
                                    <li v-else>
                                        <p>#{{index+1}}</p>
                                        <p>{{item.mobile}}</p>
                                        <p>{{item.show_time}}打卡</p>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pBox"></div>
        </div>
        <div class="bottom" v-show="isNew" @click="createImg"><!--isNew-->
            邀请好友一起来瓜分奖励金
        </div>
        <div class="mask" v-show="maskShow" @click="closeMask">
            <div class="litBox">
                <div class="header">
                    <button @click="maskShow=false"></button>
                </div>
                <div class="content">
                    <img v-if="type==3||type==5" src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/face2.png"
                         alt="">
                    <img v-else src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/face1.png" alt="">
                    <!--打卡成功-->
                    <div v-if="type==1">
                        <h4 class="title">小主,早安</h4>
                        <p class="success">打卡成功</p>
                        <p class="note">12点后，记得进【我的战绩】</p>
                        <p class="note">查看今日瓜分的奖励金额哦</p>
                    </div>
                    <!--来早-->
                    <div v-else-if="type==2">
                        <h4 class="title">小主,来早啦~</h4>
                        <p class="note" style="margin-bottom: 15px;">打卡时间为06：00-08：00</p>
                    </div>
                    <!--错过打卡-->
                    <div v-else-if="type==3">
                        <h4 class="title">小主,错过打卡时间喽</h4>
                        <p class="note" style="margin-bottom: 15px;">不要灰心，再挑战一次</p>
                    </div>
                    <!--21天-->
                    <div v-else-if="type==4">
                        <h4 class="title" style="margin-bottom: 5px;">恭喜小主</h4>
                        <h4 class="title">完成21天早起挑战</h4>
                    </div>
                    <!--免费体验名额-->
                    <div v-else-if="type==5">
                        <h4 class="title" style="margin-bottom: 5px;">今日免费体验名额已满</h4>
                        <p class="note" style="margin-bottom: 15px;">明日记得赶早哦~</p>
                    </div>
                    <!---->
                    <button v-if="type!=4" @click="maskShow = false">知道了</button>
                    <button v-else @click="tixian">我要提现</button>
                </div>
            </div>
        </div>
        <img class="originImg" v-show="false" ref="createdImg" @click="isCreated=false" />
        <!-- v-longpress="shareImgBtn"-->
        <div class="canvas" ref="canvas" v-show="false">
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import axios from '../static/js/axios';

    var mySwiper, canvas, context;
    export default {
        name: 'Home',
        data() {
            return {
                tpfm: true,//追加按钮出现的判断
                headerData: {money: 0, yesterday_num: 0, all_num: 0},
                btnIndex: 0,
                showIndex: 0,
                isCreated: false,
                btnTxt: ['参与挑战', '打卡倒计时', '今日打卡', '免费体验'],
                maskShow: false,
                type: '',
                isInTime: true,
                userType: false,
                tabIndex: 0,
                daojishi: '',
                isCanPay: '',
                early_top: [],
                insist_top: [],
                challenge: [],
                first: 0,
                isNew: false,
                isLogin: false,
                shareImg:'',
                imgSrc: [require('../static/l1.png'), require('../static/l2.png'), require('../static/l3.png')],
                msg:'',
            };
        },
        mounted() {
            //根据appid获取分享图片
            const appId = this.$store.state.appId;

            if(appId == 1){
                this.shareImg=require('../static/riqian1.jpg') ;
                this.msg='社保一点通' + this.$store.state.deviceType ;
            }else if(appId == 3){
                this.shareImg=require('../static/riqian3.jpg');
                this.msg='记加班' + this.$store.state.deviceType ;
            }else{
                this.shareImg=require('../static/riqian4.jpg');
                this.msg='人人社保' + this.$store.state.deviceType ;
            }

            
            //倒计时打卡
            let that = this;
            mySwiper = new Swiper('.swiper-container', {
                on: {
                    slideChange: function () {
                        that.tabIndex = mySwiper.activeIndex;
                    },
                },
            });
            //canvas
            canvas = document.createElement('canvas');
            canvas.width = 750;
            canvas.height = 1334;
            //创建画布
            context = canvas.getContext('2d');
            this.$refs.canvas.appendChild(canvas);
            let img = new Image();
            img.src = this.shareImg;
            img.onload = function () {
                context.drawImage(img, 0, 0, 750, 1334);
            };
        },
        filters: {
            fixto2: function (val) {
                return parseFloat(val).toFixed(2);
            },
        },
        created() {
            let v;
            if (window.navigator.userAgent.includes('Android')) {
                try {
                    v = window.mylistner.getappversion();
                    if (this.$store.state.appId == 1 && v >= '1.4.1') {
                        this.isNew = true;
                    } else  {
                        this.isNew = true;
                    }
                } catch (e) {
                    this.isNew = false;
                }
            } else {
                try {
                    v = JSON.parse(get_hearddata())['App_Version'];
                    if (this.$store.state.appId == 1 && v >= '1.5.0') {
                        this.isNew = true;
                    } else  {//待定
                        this.isNew = true;
                    }
                } catch (e) {
                    this.isNew = false;
                }
            }
             this.init();
            //挑战榜
            axios.get('/api/shebao/daka/tiaozhan', {
                params: {
                    userid: this.$store.state.userId,
                    token: this.$store.state.token,
                },
            }).then((res) => {
                this.challenge.push(...res.data.data);
            });
        },
        methods: {
            toMore() {
                this.$alert('打卡活动升级改版中，暂停充值和追加打卡金功能，敬请期待~','通知');
                return;
                //去追加打卡金

                if (!this.isCanPay) {
                    this.$alert('您的追加金额已经超过限额！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {

                        },
                    });
                } else {
                    
                    // _czc.push(['_trackEvent', '打卡', '追加打卡金', this.msg, '', '']);

                    let v;
                    if (window.navigator.userAgent.includes('Android')) {
 
                        try {
                            v = window.mylistner.getappversion();
                            if (this.$store.state.appId == 1) {
                                if (v >= '1.5.0') {
                                    window.mylistner.toCashier('9', '追加打卡金');
                                } else {
                                    
                                    this.$router.push({
                                        name: 'pray',
                                        params: {
                                            type: '追加打卡金',
                                        },
                                    });
                                }
                            } else{
                                this.$router.push({
                                    name: 'pray',
                                    params: {
                                        type: '追加打卡金',
                                    },
                                });
                                //人人社保还没有原生
                                // if (v >= '1.1.4') {
                                //
                                // } else {
                                //
                                // }
                            }
                        } catch (e) {
                            this.$router.push({
                                name: 'pray',
                                params: {
                                    type: '追加打卡金',
                                },
                            });
                        }
                    } else {
                        try {
                            if (JSON.parse(get_hearddata())['App_Version']) {
                                v = JSON.parse(get_hearddata())['App_Version'];
                            } else {
                                v = JSON.parse(get_hearddata())['App-Version'];
                            }
                            if (this.$store.state.appId == 1) {
                                if (v >= '1.5.0') {
                                    toCashier('9', '追加打卡金');
                                } else {
                                    console.log('<1.5.0');
                                    this.$router.push({
                                        name: 'pray',
                                        params: {
                                            type: '追加打卡金',
                                        },
                                    });
                                }
                            } else   {//待定
                                this.$router.push({
                                    name: 'pray',
                                    params: {
                                        type: '追加打卡金',
                                    },
                                });
                                //人人社保还没有原生
                                // if (v >= '1.1.4') {
                                //
                                // } else {
                                //
                                // }
                            }
                        } catch (e) {
                            this.$router.push({
                                name: 'pray',
                                params: {
                                    type: '追加打卡金',
                                },
                            });
                        }
                    }
                }
            },
            init() {
                let _ordertimer = null;
                let time = new Date(), that = this;

                function leftTimer(enddate) {
                    var leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数
                    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
                    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
                    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                    days = checkTime(days);
                    hours = checkTime(hours);
                    minutes = checkTime(minutes);
                    seconds = checkTime(seconds);
                    if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) that.daojishi = hours + ':' + minutes + ':' + seconds;
                    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
                        window.clearInterval(_ordertimer);
                        _ordertimer = null;
                    }
                }

                function checkTime(i) { //将0-9的数字前面加上0，例1变为01
                    if (i < 10) {
                        i = '0' + i;
                    }
                    return i;
                }

                function go(v, h) {
                    var date1 = new Date(), date2 = new Date(v + ' ' + h + ':00:00');
                    if (date2 < date1) return;//设置的时间小于现在时间退出
                    _ordertimer = setInterval(function () {
                        leftTimer(date2);
                    }, 1000);
                }

                //早鸟榜
                axios.get('/api/shebao/daka/early_top', {
                    params: {
                        userid: this.$store.state.userId,
                        token: this.$store.state.token,
                    },
                }).then((res) => {
                    this.early_top = [];
                    this.early_top.push(...res.data.data);
                });
                //毅力榜
                axios.get('/api/shebao/daka/lianxu_top', {
                    params: {
                        userid: this.$store.state.userId,
                        token: this.$store.state.token,
                    },
                }).then((res) => {
                    this.insist_top = [];
                    this.insist_top.push(...res.data.data);
                });

                //头部数据获取并判断获取用户是否参与活动
                axios.get('/api/shebao/daka/get_data', {
                    params: {
                        userid: this.$store.state.userId,
                        token: this.$store.state.token,
                    },
                }).then((res) => {
                    this.isCanPay = res.data.data.recharge == 1 ? true : false;
                    this.headerData = res.data.data;
                    this.isLogin = res.data.data.is_clock == 0 ? false : true;
                    let info = res.data.data.info;
                    //是否开启免费参与活动
                    // res.data.data.status_experience = 1;
                    //免费的名额
                    //res.data.data.experience_last = 1;
                    //是否参加过免费
                    // res.data.data.get_experience = 1;
                    // res.data.data.is_clock = 1;
                    // res.data.data.next_clock = 1;
                    // info.money_activity_wait = 0;
                    let startTime = parseInt(res.data.data.begin_time);
                    let endTime = parseInt(res.data.data.end_time);
                    //倒计时
                    if (time.getHours() < endTime && time.getHours() > (startTime - 1)) {
                        console.log('内');
                        //打卡时间内
                        this.isInTime = false;
                        if (res.data.data.next_clock > 0) {
                            this.userType = true;
                            if (res.data.data.is_clock > 0) {
                                this.showIndex = 1;
                                let h = window.navigator.userAgent.includes('Android') ? '-' : '/';
                                let m, d;
                                let time1 = time.getTime() + 23 * 3600 * 1000;
                                m = new Date(time1).getMonth() + 1;
                                d = new Date(time1).getDate();
                                this.tpfm = true;
                                go(time.getFullYear() + h + m + h + d, startTime);
                            } else {
                                if (info.money_activity_wait > 0 && info.money_activity_ing == 0) {
                                    this.showIndex = 1;
                                    let h = window.navigator.userAgent.includes('Android') ? '-' : '/';
                                    let m, d;
                                    let time1 = time.getTime() + 23 * 3600 * 1000;
                                    m = new Date(time1).getMonth() + 1;
                                    d = new Date(time1).getDate();
                                    go(time.getFullYear() + h + m + h + d, startTime);
                                    this.tpfm = true;
                                } else {
                                    this.showIndex = 2;
                                    this.tpfm = false;
                                }
                            }
                        } else {
                            this.showIndex = 0;
                            if (res.data.data.status_experience == 1) {
                                if (res.data.data.get_experience == 1) {
                                    if (res.data.data.experience_last > 0) {
                                        this.showIndex = 3;
                                    } else {
                                        if (res.data.data.is_remind) {
                                            this.maskShow = true;
                                            this.type = 5;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        //断点
                        console.log('外');
                        this.showIndex = 0;
                        //未在打卡时间
                        if (res.data.data.next_clock > 0) {
                            this.showIndex = 1;
                            this.userType = true;
                            let h = window.navigator.userAgent.includes('Android') ? '-' : '/';
                            let m, d;
                            if (time.getHours() >= endTime) {
                                let time1 = time.getTime() + 23 * 3600 * 1000;
                                m = new Date(time1).getMonth() + 1;
                                d = new Date(time1).getDate();
                                if (res.data.data.becuted > 0) {
                                    this.maskShow = true;
                                    this.type = 3;
                                    this.showIndex = 0;
                                    this.isInTime = false;
                                }
                            } else {
                                m = time.getMonth() + 1;
                                d = time.getDate();
                            }
                            go(time.getFullYear() + h + m + h + d, startTime);
                        } else {
                            if (res.data.data.status_experience == 1 && res.data.data.get_experience == 1) {
                                if (res.data.data.experience_last > 0) {
                                    this.showIndex = 3;
                                } else {
                                    if (res.data.data.is_remind) {
                                        this.maskShow = true;
                                        this.type = 5;
                                    }
                                }
                            } else {
                                if (res.data.data.becuted > 0 && time.getHours() >= endTime) {
                                    this.maskShow = true;
                                    this.type = 3;
                                    this.showIndex = 0;
                                    this.isInTime = false;
                                }
                            }
                        }
                    }
                });
            },
            tixian() {

                // _czc.push(['_trackEvent', '打卡', '21天提现', this.msg, '', '']);
                this.$router.push({name: 'forward'});
            },
            createImg() {
                //获取日期
                let time = new Date();
                let y = time.getFullYear(), m = time.getMonth() + 1, d = time.getDate();
                context.font = 'normal 28px MicrosoftYaHei';
                context.fillStyle = '#FDA380';
                context.textBaseline = 'middle';
                context.fillText(y + '/' + m, 580, 60);
                context.font = 'bold 100px MicrosoftYaHei';
                context.textBaseline = 'middle';
                context.fillText(d, d < 10 ? 598 : 575, 140);
                //this.$refs.createdImg.src = canvas.toDataURL('image/jpeg', 1);
                //this.isCreated = true;
                let src = canvas.toDataURL('image/jpeg');
                axios({
                    method: 'post',
                    url: '/api/shebao/daka/base',
                    params: {
                        userid: this.$store.state.userId,
                        token: this.$store.state.token,
                    },
                    data: {
                        base: src, type: 1,
                    },
                }).then((res) => {
                    //document.querySelector('#shareImg').content = res.data.data;
                    try {
                        if (window.navigator.userAgent.includes('Android')) {
                            window.mylistner.show_android_share(res.data.data);
                        } else {
                            show_ios_share(res.data.data);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });

                // _czc.push(['_trackEvent', '打卡', '活动界面分享', this.msg, '', '']);
             },
            closeMask(ev) {
                if (ev.target.className == 'mask') {
                    this.maskShow = false;
                }
            },
            swiperChange(index) {
                this.tabIndex = index;
                mySwiper.slideTo(index);
            },
            rulesDetail() {
                // _czc.push(['_trackEvent', '打卡', '活动规则',this.msg, '', '']);
                this.$router.push({'name': 'rule'});
            },
            recordDetail() {
                // _czc.push(['_trackEvent', '打卡', '我的战绩',this.msg, '', '']);
                this.$router.push({'name': 'detail'});
            },
            daka(bol) {
                if (bol) {
                    //打卡
                    if (this.showIndex == 2) {
                        axios.get('/api/shebao/daka/daka_log', {
                            params: {
                                userid: this.$store.state.userId,
                                token: this.$store.state.token,
                                devicetype: window.navigator.userAgent.includes('Android') ? 'android' : 'ios',
                            },
                        }).then((res) => {
                            if (res.data.code == 1) {
                                this.type = res.data.data.activity_clock_day == 21 ? 4 : 1;
                                this.maskShow = true;
                                this.init();
                            } else {
                                this.$alert(res.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {

                                    },
                                });
                            }
                        });
                    }
                } else {
                    this.$alert('打卡活动升级改版中，暂停充值和追加打卡金功能，敬请期待~','通知');
                    return

                    if (this.showIndex == 3) {
                        //免费体验,toFreePay
                        // _czc.push(['_trackEvent', '打卡', '免费体验',this.msg, '', '']);
                        try {
                            if (this.$store.state.deviceType == 'Android') {
                                window.mylistner.toFreePay(this.$store.state.token, this.$store.state.userId);
                            } else {
                                toFreePay(this.$store.state.token, this.$store.state.userId);
                            }
                        } catch (e) {
                            console.log(e);
                            axios({
                                url: '/api/shebao/daka/get_experience',
                                methods: 'post',
                                params: {
                                    token: this.$store.state.token,
                                    userid: this.$store.state.userId,
                                    order_type: this.$store.state.deviceType,
                                    device_type: this.$store.state.deviceType == 'Android' ? 'android' : 'iphone',
                                },
                            }).then((res) => {
                                if (res.data.code == 1) {
                                    this.$router.push({name: 'freeJoin'});
                                } else {
                                    this.maskShow = true;
                                    this.type = 5;
                                    this.init();
                                }
                            }).catch((err) => {
                                console.log(err);
                            });
                        }

                    } else {
                        //去支付打卡金参与活动
                        // _czc.push(['_trackEvent', '打卡', '支付9元',this.msg, '', '']);
                        if (window.navigator.userAgent.includes('Android')) {
                            try {
                                if (this.$store.staste.appId == 1) {
                                    window.mylistner.toCashier('9', '早起打卡金');
                                } else   {
                                    this.$router.push({
                                        'name': 'pray',
                                        'params': {
                                            type: '早起打卡金',
                                        },
                                    });
                                    //人人社保还没有原生
                                    // if (v >= '1.1.4') {
                                    //
                                    // } else {
                                    //
                                    // }
                                }
                            } catch (e) {
                                this.$router.push({
                                    'name': 'pray',
                                    'params': {
                                        type: '早起打卡金',
                                    },
                                });
                            }
                        } else {
                            try {
                                if (this.$store.state.appId == 1) {
                                    toCashier('9', '早起打卡金');
                                } else   {//待定
                                    this.$router.push({
                                        'name': 'pray',
                                        'params': {
                                            type: '早起打卡金',
                                        },
                                    });
                                    //人人社保还没有原生
                                    // if (v >= '1.1.4') {
                                    //
                                    // } else {
                                    //
                                    // }
                                }
                            } catch (e) {
                                console.log(e);
                                this.$router.push({
                                    'name': 'pray',
                                    'params': {
                                        type: '早起打卡金',
                                    },
                                });
                            }
                        }
                    }
                }
            },
        },
    };
</script>

<style scoped lang="less">
    .box {
        width: 100vw;
        position: relative;
    }

    .top {
        width: 100%;
        height: 86vw;
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/top.png');
        background-size: cover;
        position: relative;
        .detail {
            position: absolute;
            cursor: pointer;
            right: 0;
            top: 10px;
            height: 16vw;
            width: 16vw;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5%;
            background-color: rgba(0, 0, 0, .6);
            img {
                width: 12vw;
                height: 12vw;
            }
        }
    }

    .middleBox {
        // z-index: 1;
        top: 43vw;
        position: absolute;
    }

    .middle {
        width: 96%;
        margin: 0 auto;
        background-size: cover;
        color: #fff;
        .title {
            width: 50%;
            margin-top: 5%;
        }
        .p1 {
            margin: 1% 0;
            font-size: 14px;
        }
        h1 {
            font-size: 60px;
            font-weight: normal;
            margin-bottom: 2%;
        }
        .content {
            line-height: 21px;
            font-size: 14px;
        }
        span {
            color: #ffe800;
        }
        .btn {
            width: 80%;
            height: 14vw;
            line-height: 14vw;
            background: linear-gradient(top, #FFC500, #FFEF00);
            /*! autoprefixer: off */
            background: -webkit-linear-gradient(top, #FFC500, #FFEF00);
            /* autoprefixer: on */
            background: -moz-linear-gradient(top, #FFC500, #FFEF00);
            background: -o-linear-gradient(top, #FFC500, #FFEF00);
            border-radius: 7.5vw;
            border: none;
            background-size: cover;
            color: #67150A;
            font-size: 20px;
            margin: 10px auto 20px;
        }
    }

    .m1 {
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/bc1.png');
        height: 93vw;
    }

    .m2 {
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/bc2.png');
        height: 110vw;
    }

    .pBox {
        height: 50px;
        width: 100%;
    }

    .bottom {
        height: 50px;
        width: 100%;
        color: #67150A;
        font-size: 18px;
        line-height: 50px;
        background-color: #ffaa2d;
        z-index: 2;
        position: fixed;
        bottom: 0;
    }

    .record {
        width: 100%;
        .bd {
            width: 50%;
            margin: 20px 0;
        }
        .tab {
            width: 70%;
            display: flex;
            margin: 0 auto;
            justify-content: space-between;
            li {
                width: 33%;
                color: #999;
                position: relative;
                padding-bottom: 5px;
                span {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    width: 60%;
                    height: 2px;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
            .selected {
                color: #333;
                font-size: 16px;
                span {
                    background-color: #ffaa2d;

                }
            }
        }
    }

    .swiper-container {
        width: 100vw;
        margin-top: 20px;
    }

    .swiper-slide {
        ul {
            width: 100%;
        }
        .topTitle, li {
            height: 44px;
            color: #333;
            font-size: 13px;
            width: 100%;
            line-height: 44px;
            border-bottom: 1px solid #eee;
            p {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                img {
                    width: 17px;
                    height: 24px;
                }
                float: left;
                width: 20%;
                &:nth-child(2) {
                    width: 40%;
                }
                &:nth-child(3) {
                    width: 40%;
                }
            }
            .money, .days {
                color: #ec4a41;
            }
        }
    }

    .mask {
        width: 100%;
        height: 100vh;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
        top: 0;
        z-index: 3;
        .litBox {
            width: 80%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            .header {
                width: 100%;
                background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/header.png');
                background-size: 100%;
                height: 32vw;
                position: relative;
                button {
                    background-color: transparent;
                    background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/close.png');
                    background-size: 100%;
                    width: 28px;
                    height: 28px;
                    border: none;
                    right: 5px;
                    top: 5px;
                    position: absolute;
                }
            }
            .content {
                width: 100%;
                img {
                    width: 15%;
                    margin: 2% 0;
                }
                .title {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 14px;
                    font-weight: normal;
                }
                .success {
                    font-size: 23px;
                    color: #ffaa2d;
                    margin-bottom: 14px;
                }
                .note {
                    font-size: 14px;
                    color: #999;
                }
                button {
                    outline: none;
                    width: 70%;
                    color: #fff;
                    font-size: 16px;
                    border: none;
                    margin: 10px 0;
                    background-color: #FEAA2D;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 20px;
                }
            }
        }
    }

    .originImg {
        width: 100vw;
        position: fixed;
        z-index: 99;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .shareP {
        position: absolute;
        z-index: 999;
        height: 30px;
        line-height: 30px;
        background-color: #000;
        color: #fff;
        font-size: 20px;
        text-align: center;
        left: 0;
        bottom: 0;
        width: 100%;
        margin: auto;
    }

    .payMore {
        box-shadow: 0px 5px 30px #f5513b;
        width: 91%;
        border-radius: 5px;
        background-color: #f5513b;
        margin: 0 auto 10px;
        height: 13.4vw;
        background-size: cover;
        color: #ffed00;
        display: flex;
        align-items: center;
        z-index: 9999;
        justify-content: center;
        font-size: 20px;
        img {
            height: 35%;
            margin-left: 10px;
        }
    }
</style>
