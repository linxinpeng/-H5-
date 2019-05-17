<template>
    <div class="content">
        <div class="header">
            <p class="first">今日赚取奖励金（元）<span @click="prayDetail">收支明细</span></p>
            <p class="num">{{headerData.guafen|fixto2}}</p>
            <p class="tol">累计已瓜分奖金{{headerData.all_guafen|fixto2}}元</p>
            <div class="total">
                <div class="item">
                    <p class="num1">{{headerData.daka_money|fixto2}}</p>
                    <p>打卡金(元)</p>
                </div>
                <div class="item">
                    <p class="num1">{{headerData.yuer|fixto2}}</p>
                    <p>余额(元)</p>
                </div>
                <div class="item">
                    <p class="num1">{{headerData.daka_day}}</p>
                    <p>打卡天数(天)</p>
                </div>
            </div>
            <button class="tixian" @click="forward">
                提现
            </button>
        </div>
        <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/dakajilu.png" alt="" class="record">
        <div class="bscroll">
            <div class="recordList bscroll-container">
                <template v-for="item1 in lunciArr">
                    <div class="title">
                        【第{{item1}}期打卡记录】
                    </div>
                    <ul>
                        <template v-for="(item,index) in arrList[item1]">
                            <li>
                                <p class="time item1" :class="item.status==2?'gray':''">{{item.day_time}}</p>
                                <div class="item2">
                                    <img v-show="item.status=='打卡成功'"
                                         src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/point1.png" alt="">
                                    <!--<img v-show="item.status=='未打卡'" src="../static/point2.png" alt="">-->
                                    <img v-show="item.status=='打卡失败'"
                                         src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/point3.png" alt="">
                                    <p v-show="item.status=='打卡成功'" class="status">打卡成功</p>
                                    <!--<p v-show="item.status=='未打卡'" class="status">待打卡</p>-->
                                    <p v-show="item.status=='打卡失败'" class="status">打卡失败</p>
                                </div>
                                <p class="item3 money" v-show="item.status!=2">{{item.guafen}}</p>
                            </li>
                        </template>
                    </ul>
                </template>
                <div style="justify-content: center;" v-if="hasMore" @click="getMoreLog">点击加载更多</div>
                <div style="justify-content: center;" v-else>已无更多</div>
            </div>
        </div>
        <div class="pBox">
        </div>
        <div class="shareRecord" v-show="isNew" @click="createImg">
            晒战绩
        </div>
        <img class="originImg" v-show="false" ref="createdImg" @click="isCreated=false" />
        <div class="canvas" ref="canvas" v-show="false">
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import axios from '../static/js/axios';
    import router from '../router';

    var canvas, context;
    export default {
        name: 'Detail',
        data() {
            return {
                headerData: {
                    guafen: '',
                    all_guafen: '',
                    daka_money: '',
                    yuer: 0,
                    daka_day: '',
                    withdrawal: '',
                },
                hasMore: false,
                options: {
                    pullDownRefresh: {
                        threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                        stop: 0, // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
                    },
                    pullUpLoad: {
                        threshold: -20, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                    },
                    //pullDownRefresh: false, //关闭下拉
                    //pullUpLoad: false, // 关闭上拉
                    click: true,
                    probeType: 3,
                    startY: 0,
                    scrollbar: false,
                },
                foodsScroll: null,
                lunciArr: [],
                arrList: {},
                bol: true,
                moreOption: {
                    back: '',
                    daka_use: '',
                    back_time: '',
                },
                shareImg: '',
                isCreated: false,
                isNew: false,
                msg:''
            };
        },
        filters: {
            fixto2: function (val) {
                return parseFloat(val).toFixed(2);
            },
        },
        beforeCreate() {

            //获取头部数据
            axios.get('/api/shebao/daka/my_record', {
                params: {
                    userid: this.$store.state.userId,
                    token: this.$store.state.token,
                },
            }).then((res) => {
                this.headerData = res.data.data;
                if (res.data.data.yuer == null || res.data.data.yuer == undefined) {
                    this.headerData.yuer = 0;
                }
            });
            //获取打卡记录
            axios.get('/api/shebao/daka/user_daka_log', {
                params: {
                    userid: this.$store.state.userId,
                    token: this.$store.state.token,
                },
            }).then((res) => {
                for (let key in res.data.data) {
                    if (res.data.data[key].constructor == Array) {
                        this.lunciArr.push(key);
                        this.arrList[key] = res.data.data[key];
                        this.hasMore = true;
                    }
                }
                this.lunciArr = this.lunciArr.reverse();
                this.moreOption.back = res.data.data.back;
                this.moreOption.back_time = res.data.data.back_time;
                this.moreOption.daka_use = res.data.data.daka_use;
            });
        },
        created() {
            // this.$nextTick(() => {
            // 	this.initScroll();
            // });
            //监听物理返回按钮事件，改变路由指向
            // window.addEventListener("popstate",function(e){
            //     router.push('/')
            // })

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
                    } else   {//待定
                        this.isNew = true;
                    }
                } catch (e) {
                    this.isNew = false;
                }
            }
    
        },
        mounted() {
            //canvas
            canvas = document.createElement('canvas');
            canvas.width = 750;
            canvas.height = 1334;
            //创建画布
            context = canvas.getContext('2d');
            this.$refs.canvas.appendChild(canvas);
            let img = new Image();
            const appId = this.$store.state.appId;

            if(appId == 1){
                this.msg='社保一点通' + this.$store.state.deviceType;
                this.shareImg=require('../static/zj1.jpg');
            }else if(appId == 3){
                this.msg='记加班' + this.$store.state.deviceType;
                this.shareImg=require('../static/zj3.jpg');
            }else{
                this.msg='人人社保' + this.$store.state.deviceType;
                this.shareImg=require('../static/zj4.jpg');
            }
            // this.$store.state.appId == '3'
            // switch (this.$store.state.appId) {
            //     case 1:
            //         this.msg='社保一点通' + this.$store.state.deviceType;
            //         this.shareImg=require('../static/zj1.jpg');
            //         break;
            //     case '3':
            //         this.msg='记加班' + this.$store.state.deviceType;
            //         this.shareImg=require('../static/zj3.jpg');
            //         break;
            //     case 4:
            //         this.msg='人人社保' + this.$store.state.deviceType;
            //         this.shareImg=require('../static/zj4.jpg');
            //         break;
            //     // default:
            //     //     console.log(111);
            //     //     break;
            // }
            // console.log(this.shareImg)
            img.src = this.shareImg;
            img.onload = function () {
                context.drawImage(img, 0, 0, 750, 1334);
            };
        },
        methods: {
            createImg() {
                //获取日期
                axios.get('/api/shebao/daka/zhanji_fenxiang', {
                    params: {
                        token: this.$store.state.token,
                        userid: this.$store.state.userId,
                    },
                }).then((res) => {
                    let time = new Date();
                    let y = time.getFullYear(), m = time.getMonth() + 1, d = time.getDate();
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.fillStyle = '#FDA380';
                    context.textBaseline = 'middle';
                    context.fillText(y + '/' + m, 580, 60);
                    context.font = 'bold 100px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    context.fillText(d, d < 10 ? 598 : 575, 140);
                    //字体
                    //第一段
                    context.fillStyle = '#ffffff';
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    context.fillText('我已连续早起打卡', 50, 400);
                    context.font = 'normal 60px MicrosoftYaHei';
                    context.fillStyle = '#ffe800';
                    context.textBaseline = 'middle';
                    context.fillText(res.data.data.now_day, 280, 395);
                    context.fillStyle = 'white';
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    let x1 = res.data.data.now_day.toString().length * 40 + 280;
                    context.fillText('天', x1, 400);
                    //第二段
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    context.fillText('累计参与打卡', 50, 500);
                    context.font = 'normal 60px MicrosoftYaHei';
                    context.fillStyle = '#ffe800';
                    context.textBaseline = 'middle';
                    context.fillText(res.data.data.allday, 220, 495);
                    context.fillStyle = 'white';
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    let x2 = res.data.data.allday.toString().length * 40 + 220;
                    context.fillText('天', x2, 500);
                    //第三段
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    context.fillText('累计获得早起奖励', 50, 600);
                    context.font = 'normal 60px MicrosoftYaHei';
                    context.fillStyle = '#ffe800';
                    context.textBaseline = 'middle';
                    context.fillText(res.data.data.money, 280, 595);
                    context.fillStyle = 'white';
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    let x3 = res.data.data.money.toString().length * 40 + 280;
                    context.fillText('元', x3, 600);
                    //第四段
                    context.font = 'normal 28px MicrosoftYaHei';
                    context.textBaseline = 'middle';
                    context.fillText('一起养成早起习惯，还可瓜分奖金', 50, 700);
                    //this.$refs.createdImg.src = canvas.toDataURL('image/jpeg', 0.7);
                    let src = canvas.toDataURL('image/jpeg');
                    console.log(src)
                    // console.log(src)
                    //this.isCreated = true;
                    window.location.href = window.location.href + `?userid=${this.$store.state.userId}&token=${this.$store.state.token}&appid=${this.$store.state.appId}`;
                    axios({
                        method: 'post',
                        url: `/api/shebao/daka/base`,
                        params: {
                            userid: this.$store.state.userId,
                            token: this.$store.state.token,
                            type: 2,
                        },
                        data: {
                            base: src,
                        },
                    }).then((res1) => {
                        if (window.navigator.userAgent.includes('Android')) {
                            window.mylistner.show_android_share(res1.data.data);
                        } else {
                            show_ios_share(res1.data.data);
                        }
                    });
                }).catch(err => console.log(err));
                // _czc.push(['_trackEvent', '打卡', '我的战绩分享', this.msg, '', '']);
            },
            prayDetail() {
                // _czc.push(['_trackEvent', '打卡', '收支明细', this.msg, '', '']);
                try {
                    if (window.navigator.userAgent.includes('Android')) {
                        window.mylistner.toMyWallet(this.headerData.yuer);
                    } else {
                        toMyWallet(this.headerData.yuer);
                    }
                } catch (e) {
                    console.log(e);
                    this.$router.push({name: 'prayDetail'});
                }
            },
            forward() {
                // _czc.push(['_trackEvent', '打卡', '提现', this.msg, '', '']);
                if (this.headerData.yuer < 1) {
                    this.$alert('满一元即可提现（只可提现奖励金）', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {

                        },
                    });
                } else {
                    if (this.headerData.withdrawal != 1) {
                        let v;
                        if (window.navigator.userAgent.includes('Android')) {
                            try {
                                v = window.mylistner.getappversion();
                                if (this.$store.state.appId == 1) {
                                    if (v >= '1.5.0') {
                                        window.mylistner.toCashWithdrawa(this.headerData.yuer);
                                    } else {
                                        this.$router.push({'name': 'forward'});
                                    }
                                } else  {
                                    this.$router.push({'name': 'forward'});
                                    //人人社保还没有原生
                                    // if (v >= '1.1.4') {
                                    //
                                    // } else {
                                    //
                                    // }
                                }
                            } catch (e) {
                                this.$router.push({'name': 'forward'});
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
                                        toCashWithdrawa(this.headerData.yuer);
                                    } else {
                                        this.$router.push({'name': 'forward'});
                                    }
                                } else {//待定
                                    this.$router.push({'name': 'forward'});
                                    //人人社保还没有原生
                                    // if (v >= '1.1.4') {
                                    //
                                    // } else {
                                    //
                                    // }
                                }
                            } catch (e) {
                                this.$router.push({'name': 'forward'});
                                console.log(e);
                            }
                        }

                    } else {
                        this.$alert('一天只可提现一次', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {

                            },
                        });
                    }

                }
            },
            initScroll() {
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, this.options);
                this.foodsScroll.on('pullingUp', () => {
                    if (this.bol) {
                        this.getMoreLog();
                        this.pullingDownUp();
                    } else {
                        console.log('close');
                        this.pullingDownUp();
                    }
                });
            },
            pullingDownUp() {
                this.foodsScroll.finishPullDown();
                this.foodsScroll.finishPullUp();
                this.foodsScroll.refresh(); //重新计算元素高度
            },
            getMoreLog() {
                axios.get('/api/shebao/daka/user_daka_morelog', {
                    params: {
                        userid: this.$store.state.userId,
                        token: this.$store.state.token,
                        back: this.moreOption.back,
                        back_time: this.moreOption.back_time,
                        daka_use: this.moreOption.daka_use,
                    },
                }).then((res) => {
                    this.moreOption.back = res.data.data.back;
                    this.moreOption.back_time = res.data.data.back_time;
                    this.moreOption.daka_use = res.data.data.daka_use;
                    //this.bol = false;
                    let bol = false;
                    for (let key in res.data.data) {
                        if (res.data.data[key].constructor == Array) {
                            bol = true;
                            this.bol = true;
                            if (!this.arrList[key]) {
                                this.lunciArr.push(key);
                                this.$set(this.arrList, [key], res.data.data[key]);
                            } else {
                                this.arrList[key].push(...res.data.data[key]);
                                var arr = this.arrList[key];
                                this.$set(this.arrList, key, arr);
                            }
                        }
                    }
                    this.hasMore = bol;
                    this.lunciArr = this.lunciArr.sort().reverse();
                });
            },
        },
    };
</script>

<style scoped lang="less">
    .content {
        width: 100%;
    }

    .header {
        color: #fff;
        width: 100%;
        height: 77.5vw;
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/detailH.png');
        background-size: cover;
        position: relative;
        padding-top: 19px;
        .first {
            margin: 0 0 12px;
            font-size: 12px;
            width: 100%;
            position: relative;
            span {
                display: inline-block;
                line-height: 30px;
                font-size: 14px;
                color: red;
                background-color: #fff;
                padding: 0 10px 0 20px;
                border-radius: 15px 0 0 15px;
                position: absolute;
                right: 0;
            }
        }
        .num {
            font-size: 3em;
            color: #ffe800;
            margin-bottom: 10px;
        }
        .tol {
            display: inline-block;
            padding: 0 6%;
            background-color: rgba(0, 0, 0, 0.2);
            font-size: 12px;
            line-height: 30px;
            height: 30px;
            border-radius: 15px;
            margin-bottom: 26px;
        }
        .total {
            display: flex;
            width: 90%;
            margin: 0 auto;
            .num1 {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 12px;
            }
            .item {
                flex: 1;
                font-size: 12px;
                box-sizing: border-box;
                &:nth-child(2) {
                    border-left: 1px solid rgba(255, 255, 255, .6);
                    border-right: 1px solid rgba(255, 255, 255, .6);
                }
            }
            p:not(.num1) {
                color: rgba(255, 255, 255, .6);
            }
        }
        .tixian {
            margin-top: 20px;
            width: 50%;
            line-height: 40px;
            border-radius: 20px;
            height: 40px;
            font-size: 18px;
            color: #67150a;
            background: linear-gradient(top, #FFC500, #FFEF00);
            /*! autoprefixer: off */
            background: -webkit-linear-gradient(top, #FFC500, #FFEF00);
            /* autoprefixer: on */
            background: -moz-linear-gradient(top, #FFC500, #FFEF00);
            background: -o-linear-gradient(top, #FFC500, #FFEF00);
        }
    }

    .record {
        width: 50%;
        margin: 20px 0;
    }

    ul {
        margin: 0 auto;
        width: calc(100% - 24px);
        li {
            width: 100%;
            height: 44px;
            line-height: 44px;
            display: flex;
            .item1 {
                width: 30%;
                text-align: left;
            }
            .item2 {
                width: 40%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                img {
                    width: 10px;
                    height: 10px;
                    margin-right: 5px;
                }
            }
            .item3 {
                width: 30%;
            }
            .gray {
                color: #999;
            }
        }
    }

    .pBox {
        height: 50px;
        width: 100%;
    }

    .shareRecord {
        position: fixed;
        bottom: 0;
        background-color: #ffaa2d;
        color: #67150A;
        line-height: 50px;
        width: 100%;
        height: 50px;
        font-size: 18px;
        text-align: center;
        z-index: 1;
    }

    .title {
        margin-bottom: 20px;
    }

    .bscroll {
        width: 100%;
        height: calc(100vh - 83vw - 50px - 59px);
        overflow-y: scroll;
    }

    .bscroll-container {
        background: #fff;
    }

    .originImg {
        width: 80vw;
        position: fixed;
        z-index: 99;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
