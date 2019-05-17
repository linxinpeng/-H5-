<template>
    <div class="box">
        <div class="money">
            <div class="top">
                <span class="jine"><span style="width: 30%;">金额: ¥</span><input
                        class="moneys" type="number" v-model="money" placeholder="请输入提现金额" autofocus="autofocus" ref="input" /></span>
                <span style="color: #ffaa2d;height: 60px;line-height: 60px;" @click="getAll">全部提现</span>
            </div>
            <div class="bottom">
                满1.00元即可提现，余额：{{headerData.yuer|fixto2}}元
            </div>
        </div>
        <div class="bd"></div>
        <div class="select">
            <div v-if="false" class="item" @click="selectPray(1)">
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
        </div>
        <div class="note">
            <p class="title">注意事项:</p>
            <ul>
                <li>
                    1.提现申请后2个工作日内到账。
                </li>
                <li>
                    2.提现无手续费。
                </li>
                <li>
                    3.充值提现遇到问题，可在【我的】-【在线咨询】中反馈你的问题。
                </li>
            </ul>
        </div>
        <button class="btn" @click="tixian">立即提现</button>

    </div>
</template>

<script>

	import axios from '../static/js/axios';

	export default {
		name: 'Forward',
		data() {
			return {
			    isTest:window.location.href.includes('test')?true:false,
				form: false,
				selected: 2,
				money:'',
				inputNum: '',
				headerData: {
					yuer: '',
				},
			};
		},
		created() {
			axios.get('/api/shebao/daka/my_record', {
				params: {
					userid: this.$store.state.userId,
					token: this.$store.state.token,
				},
			}).then((res) => {
				this.headerData.yuer = parseFloat(res.data.data.yuer);
				this.$refs.input.focus();
			});
		},
		filters: {
			fixto2: function (val) {
				return parseFloat(val).toFixed(2);
			},
		},
		methods: {
			getAll() {
				this.money = parseInt(this.headerData.yuer).toFixed(2);
			},
			selectPray: function (index) {
				this.selected = index;
			},
			tixian: function () {
				if (this.selected == 2) {
                    if(!/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(this.money)){
                        this.$alert('请输入正确的金额','提示',{
                            confirmButtonText:'确定',
                            callback: action =>{}
                        })
                        return
                    }
					//支付宝
                    if (this.money < 1) {//
						this.$alert('提现金额至少需要满一元', '提示', {
							confirmButtonText: '确定',
							callback: action => {

							},
						});
					} else {
						if (this.money > this.headerData.yuer) {
							this.$alert('余额不足', '提示', {
								confirmButtonText: '确定',
								callback: action => {

								},
							});
						} else {
                            this.$router.push({
                            'name': 'alipray',
                        });                      
						}
					}
					sessionStorage.money = this.money;
					sessionStorage.selected = this.selected == 2 ? 'ali' : 'wx';
				} else if (this.selected == 1) {
					//微信
				} else {
					this.$alert('请选择提现方式', '提示', {
						confirmButtonText: '确定',
						callback: action => {

						},
					});

				}
			},
		},
	};
</script>

<style scoped lang="less">
    .bd {
        height: 10px;
        width: 100%;
        background-color: #eee;
    }

    .box {
        width: 100%;
        height: 100vh;
        position: relative;
    }

    .money {
        width: 100%;
        background-color: #fff;
        .top {
            width: 96%;
            padding: 0 2%;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            font-size: 16px;
            .jine {
                height: 60px;
                line-height: 60px;
                width: 70%;
                text-align: left;
                display: flex;
            }

        }
        .bottom {
            width: 96%;
            padding: 0 2%;
            font-size: 12px;
            color: #f24848;
            height: 34px;
            line-height: 34px;
            text-align: left;
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

    .note {
        .title {
            font-size: 14px;
            line-height: 40px;
        }
        width: 95%;
        margin: 0 auto;
        text-align: left;
        li {
            font-size: 12px;
            line-height: 20px;
        }
    }

    .btn {
        background-color: #ffaa2d;
        border-radius: 8px;
        width: 95%;
        color: #fff;
        height: 44px;
        font-size: 18px;
        position: absolute;
        bottom: 2.5%;
        left: 2.5%;
    }

    .mask {
        background-color: rgba(0, 0, 0, .3);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .moneys {
        font-size: 14px;
        margin-left: 10px;
        border: none;
        width: 70%;
        outline: none;
    }

</style>
