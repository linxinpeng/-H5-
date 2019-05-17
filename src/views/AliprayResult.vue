<template>
    <div class="box">
        <div class="top">
            <div class="litBox">
                <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/mark.png" alt="">
                <p>提现申请已提交</p>
            </div>
            <div class="litBox">
                <div class="br"></div>
            </div>
            <div class="litBox">
                <div>
                    <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/morepoint2.png" alt="">
                    <div class="br1 be3"></div>
                    <div class="br1 be3"></div>
                </div>
                <p>预计到账时间<br /><span class="time">{{time}}到账</span></p>
            </div>
            <div class="litBox" style="display: block;margin-top:-2px;">
                <div class="br1"></div>
                <div class="br1"></div>
            </div>
            <div class="litBox">
                <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/morepoint.png" alt="">
                <p>提现申请已提交</p>
            </div>
        </div>
        <div class="bd"></div>
        <div class="order">
            <div class="item">
                <span class="name">提现金额</span>
                <span>¥{{money|fixto2}}</span>
            </div>
            <div class="item">
                <span class="name">提现方式</span>
                <span>支付宝</span>
            </div>
            <div class="item">
                <span class="name">提现账号</span>
                <span>{{account}}</span>
            </div>
        </div>
        <div class="note">
            <p class="title">到账查询</p>
            <ul>
                <li>
                    1.支付宝：我的账单
                </li>
                <li>
                    2.我-钱包-零钱-零钱详情
                </li>
            </ul>
        </div>
        <button class="btn" @click="backDetail">知道了</button>
    </div>
</template>


<script>
	export default {
		name: 'AliprayResult',
		data() {
			return {
				money: this.$route.params.money,
				account: this.$route.params.account,
				time: this.$route.params.time,
			};
		},
		filters: {
			fixto2: function (val) {
				return parseFloat(val).toFixed(2);
			},
		},
		methods: {
            backDetail(){
	            this.$router.push({name:'detail'})
            }
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

    .br {
        width: 2px;
        height: 20px;
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/br1.png');
        background-size: 100%;
        margin-left: 10px;
    }



    .br1 {
        width: 2px;
        height: 10px;
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/br2.png');
        background-size: 100%;
        margin-left: 10px;
    }

    .be3 {
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/br1.png');
    }
    .top {
        height: 190px;
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        img {
            width: 20px;
            height: 20px;
            display: block;
            margin-right: 14px;
        }
        .litBox {
            width: 90%;
            padding-left: 10%;
            font-size: 16px;
            display: flex;
            justify-content: flex-start;
            color: #333;
            .time {
                color: #999;
            }
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
            span {
                color: #f24848;
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

    .order {
        width: 95%;
        margin: 0 auto;
        padding-top: 2.5%;
        border-bottom: 1px solid #eee;
        .item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #333;
            margin-bottom: 12px;
            .name {
                color: #999;
            }
        }

    }
</style>