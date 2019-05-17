<template>
    <div class="box">
        <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/praysuccess.png" alt="">
        <p class="result">您已支付成功</p>
        <p class="detail">每日6：00-8：00来打卡，别忘了哦~</p>
        <button @click="again">
            知道了
        </button>
    </div>
</template>

<script>
	export default {
		name: 'PrayResult',
		data() {
			return {

			};
		},
		created() {
		},
		methods: {
			again: function () {
              this.$router.push({name:'home'});

            // location.href = `http://shebao.dai58.cn/html/shebao-daka/jjbhome/index.html?userid=${this.$store.state.userId}&token=${this.$store.state.token}&appid=${this.$store.state.appId}&cc=66#/`
			},
		},
	};
</script>

<style scoped>
    .box {
        padding-top: 10%;
    }

    img {
        width: 30%;
        margin-bottom: 15px;
    }

    .result {
        font-size: 27px;
        color: #333;
    }

    .detail {
        font-size: 16px;
        color: #999;
        margin-top: 18px;
    }

    button {
        margin-top: 60px;
        width: 90%;
        height: 44px;
        line-height: 44px;
        font-size: 18px;
        color: #fff;
        background-color: #ffaa2d;
        border-radius: 8px;
    }

</style>
