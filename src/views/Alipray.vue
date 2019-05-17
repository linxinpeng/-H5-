<template>
    <div class="box">
        <div class="bd"></div>
        <div class="money">
            <div class="top">
                <span>提现金额:<span class="moneys"> ¥{{money|fixto2}}</span></span>
            </div>
        </div>
        <div class="bd"></div>
        <div class="select">
            <div class="item">
                <div class="litBox">
                    <p>支付宝账号</p>
                </div>
                <div class="check">
                    <span v-if="isHave">{{account1}}</span>
                    <input v-else type="text" placeholder="请输入支付宝账号" v-model="account1">
                </div>
            </div>
            <div class="item">
                <div class="litBox">
                    <p>确认账号</p>
                </div>
                <div class="check">
                    <span v-if="isHave">{{account2}}</span>
                    <input v-else type="text" placeholder="请输入支付宝账号" v-model="account2">
                </div>
            </div>
        </div>
        <div class="bd"></div>
        <div class="select">
            <div class="item">
                <div class="litBox">
                    <p>支付宝姓名</p>
                </div>
                <div class="check">
                    <span v-if="isHave">{{realName}}</span>
                    <input v-else type="text" placeholder="请输入支付宝实名认证姓名" v-model="realName">
                </div>
            </div>
        </div>

        <div class="note">
            <p class="title">注意事项:</p>
            <ul>
                <li>
                    1.提现申请将在2个工作日内审批到账；
                </li>
                <li>
                    2.提现时<span>请务必正确填写支付宝信息(手机号或邮箱账号)；</span>
                </li>
                <li>
                    3.如因个人原因，支付宝账号填写错误，损失将由个人承担；
                </li>
                <li>
                    4.如有疑问，请联系客服；<a :href="href">在线咨询</a>（在线时间工作日9:00-18:00）。
                </li>
            </ul>
        </div>
        <button class="btn" :disabled="disabled" @click="tixian">立即提现</button>
    </div>
</template>

<script>

    import axios from '../static/js/axios';
    import qs from 'qs'

	export default {
		name: 'Alipray',
		data() {
			return {
				money: sessionStorage.money,
				type: sessionStorage.selected,
				account1: '',
				account2: '',
                realName: '',
                href:'',
                disabled: false,
                isHave: false
			};
        },
        created(){
            this.getHref();
            this.getUserInfo();
        },
		filters: {
			fixto2: function (val) {
				return parseFloat(val).toFixed(2);
			},
        },
		methods: {
            //绑定用户提现信息
           async getUserInfo(){
                const params = qs.stringify({
                    user_id:this.$store.state.userId,
                    appid:this.$store.state.appId
                })
                const resp = await axios.post(`/api/shebao/daka/get_user_account`,params);
                if(resp.data.code == 1){
                   if(resp.data.data.alipay && resp.data.data.real_name){
                       this.account1 = resp.data.data.alipay;
                       this.account2 = resp.data.data.alipay;
                       this.realName = resp.data.data.real_name;
                       this.isHave = true;
                   }else{
                       console.log('用户信息为空')
                   }
                }else{
                    console.log(resp.data.msg)
                }
                
            },

            async getHref(){
                const resp = await axios.post('/api/shebao/daka/gettalk_url',{user_id:this.$store.state.userId});
                if(resp.data.code == 1){
                    this.href = resp.data.data;
                }else{
                    console.log(resp.data.msg)
                }
 
            },

			tixian: function () {
                let isClick = sessionStorage.getItem('isClick');
                if(isClick){
                    this.$alert('一天只可提现一次','提示')
                    return
                }
				if (this.account1 == '' || this.account2 == '') {
					this.$alert('请输入完整信息', '提示', {
						confirmButtonText: '确定',
						callback: action => {

						},
					});
				} else {
				    if(this.realName ==''){
                        this.$alert('请输入支付宝实名认证姓名', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {

                            },
                        });
                        return false;
                    }
					if (this.account1 != this.account2) {
						this.$alert('两次输入的账号不一致', '提示', {
							confirmButtonText: '确定',
							callback: action => {

							},
						});
					} else {
                        this.disabled = true;
						let url = `/api/shebao/daka/extract`;
						axios.post(url, {
							userid: this.$store.state.userId,
							token: this.$store.state.token,
							total_amount: this.money,
							type: this.type,
							account: this.account1,
                            realName: this.realName,
						}).then(res => {
							if (res.data.code == 1) {
                                sessionStorage.setItem('isClick',true)
								this.$router.push({
									name: 'aliprayResult', params: {
										money: this.money,
										account: this.account1,
										time: res.data.data.into_time,
									},
								});
							} else {
								this.$alert(res.data.msg, '提示', {
									confirmButtonText: '确定',
									callback: action => {

									},
								});
							}
						});
					}
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
            .moneys {
                font-size: 20px;
                margin-left: 10px;
                border: none;
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
        width: 30%;
        img {
            width: 30px;
            height: 30px;
            margin-right: 12px;
        }
    }

    .check {
        width: 70%;
        height: 50px;
        input {
            outline: none;
            width: 100%;
            height: 100%;
            border: none;
            line-height: 30px;
            font-size: 14px;
        }
        span{
            display: block;
            width: 100%;
            height: 100%;
            line-height: 50px;
            text-align: left;
            font-size: 14px;
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
            line-height: 1.8;
            span {
                color: #f24848;
            }
            a{
                color: blue;
                padding-bottom: 2px;
                text-decoration: none;
                border-bottom: 1px solid;
                &:visited{
                    color: blue;
                }
            }
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
</style>
