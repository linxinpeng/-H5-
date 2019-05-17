<template>
    <div class="box">
        <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/prayfail.png" alt="">
        <p class="result">支付失败</p>
        <button @click="again">
            重新支付
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
				this.$router.push({'name': 'pray'});
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
