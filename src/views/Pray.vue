<template>
    <div class="box">
        <div class="top">
            <p class="note">您需要支付</p>
            <p class="num">￥ 9.00</p>
        </div>
        <div style="background-color: #eee;width: 100%;height: 10px;"></div>
        <div class="select">
            <div v-if="true" class="item" @click="selectPray(1)"><!--isTest-->
                <div class="litBox">
                    <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/weixinzhifu.png" alt="">
                    <p>微信</p>
                </div>
                <div class="check">
                    <img v-if="selected==1" src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/mark.png" alt="">
                    <img v-else src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/nomark.png" alt="">
                </div>
            </div>
            <div class="item" @click="selectPray(2)">
                <div class="litBox">
                    <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/zhifubao.png" alt="">
                    <p>支付宝</p>
                </div>
                <div class="check">
                    <img v-if="selected==2" src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/mark.png" alt="">
                    <img v-else src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/nomark.png" alt="">
                </div>
            </div>
            <button @click="lkzf">立即支付</button>
        </div>
        <div v-show="maskShow" class="mask" @click="closeMask">
        </div>
        <div class="content" :class="maskShow?'top':'bottom'">
            <div class="title">
                <span>付款金额</span>
                <span style="font-size: 22px;font-weight: bold;">￥9.00</span>
            </div>
            <div class="cont">
                <div class="item">
                    <span class="name">商品</span>
                    <span v-if="subject == '追加打卡金'">追加打卡金</span>
                    <span v-else>早起打卡金</span>
                </div>
                <div class="item">
                    <span class="name">支付方式</span>
                    <span>余额支付</span>
                </div>
                <form method="post" name="prayForm" >
                    <input v-show="false" type="text" name="body" v-model="body">
                    <input v-show="false" type="text" name="subject" v-model="subject">
                    <input v-show="false" type="text" name="user-device-type" v-model="user_device_type">
                    <input v-show="false" type="text" name="total_amount" v-model="total_amount">
                    <button style="margin-bottom: 20px;" :disabled="isClick" @click="prayBtn" type="button">确定支付</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '../static/js/axios';

    export default {
        name: 'pray',
        data() {
            var time = new Date();
            return {
                isTest: window.location.href.includes('test') ? true : false,
                isClick: false,
                selected: '2',
                maskShow: false,
                userId: this.$store.state.userId,
                token: this.$store.state.token,
                pay_way: 'alipay',
                subject: this.$route.params.type,
                total_amount: 9,
                body: '早起打卡',
                user_device_type: window.navigator.userAgent.includes('Android') ? 'android' : 'ios',
            };
        },
        methods: {
            lkzf: function () {
                if (this.selected == '') {
                    this.$alert('请选择支付方式', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {

                        },
                    });
                } else {
                    this.maskShow = true;
                }
            },
            selectPray: function (index) {
                this.selected = index;
                this.pay_way = this.selected == 2 ? 'alipay' : 'wxpay';
            },
            closeMask: function (ev) {
                if (ev.target.className == 'mask') {
                    this.maskShow = false;
                }
            },
            prayBtn() {
                this.isClick = true;
                if (this.selected == 2) {
                    this.pay_way = 'alipay';
                    document.prayForm.action=`http://${window.location.href.includes('test')?'test.':''}shebao.dai58.cn/api/shebao/pay/pay?pay_way=${this.pay_way}&userid=${this.userId}&token=${this.token}`;
                    document.prayForm.submit();
                } else {
                    axios({
                        url: '/api/shebao/pay/pay',
                        method: 'post',
                        params: {
                            pay_way: 'wxpay',
                            userid: this.$store.state.userId,
                            token: this.$store.state.token,
                        },
                        data: {
                            'user-device-type': window.navigator.userAgent.includes('Android') ? 'android' : 'ios',
                            subject: this.subject,
                            total_amount: 9,
                            body: '早起打卡',
                        },
                    }).then((res) => {
                        window.location.href = res.data.data.mweb_url;
                    });
                }
            },
        },
    };
</script>

<style scoped lang="less">
    .box {
        width: 100%;
        height: 100vh;
        position: relative;
    }

    .top {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #fff;
        height: 150px;
        align-items: center;
        .note {
            font-size: 14px;
            color: #333;
        }
        .num {
            font-size: 40px;
            color: #333;
        }
    }

    .select {
        background-color: #fff;
        width: 100%;
        .item {
            width: calc(100% - 24px);
            padding: 0 12px;
            margin: 0 auto;
            height: 50px;
            display: flex;
            border-bottom: 1px solid #eee;
            justify-content: space-between;
            align-items: center;
        }
    }

    .litBox {
        display: flex;
        align-items: center;
        img {
            width: 30px;
            height: 30px;
            margin-right: 12px;
        }
    }

    .check {
        img {
            width: 25px;
            height: 25px;
        }
    }

    button {
        margin-top: 30px;
        background-color: #ffaa2d;
        border-radius: 8px;
        width: 95%;
        color: #fff;
        height: 44px;
        font-size: 18px;
    }

    .mask {
        height: 100vh;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .3);
        z-index: 10;
    }

    .content {
        transition: all 300ms;
        z-index: 11;
        position: fixed;
        height: auto;
        width: 96%;
        padding: 0 2%;
        background-color: #fff;
        .item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin: 12px 0;
            font-size: 13px;
            .name {
                color: #999;
            }
        }
        .title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #eee;
            color: #333;
            font-size: 16px;
        }
    }

    .cont {
        width: 100%;
    }

    .top {
        bottom: 0;
    }

    .bottom {
        bottom: -50%;
    }
</style>
