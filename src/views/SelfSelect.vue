<template>
    <div class="contentBox">
    </div>
</template>

<script>
	import axios from '../static/js/axios';

	export default {
		name: 'Rule',
		data() {
			return {};
		},
		created() {
			// const url = this.getQueryString('appagent')
			// if(!this.isApp(url)){
			// 	location.href =`${url}://`;
			// }else{
				this.$confirm('请确认微信支付是否已完成', '提示', {
				confirmButtonText: '已完成',
				cancelButtonText: '未完成',
				type: 'warning',
				}).then(() => {
			
					axios({
						method: 'get',
						url: '/api/shebao/daka/getorderstatus',
						params: {
							order_id: this.$store.state.orderId,
						},
					}).then((res) => {
					
						if (res.data.data.status != 1) {
							this.$router.push({name: 'prayFailed'});
						} else {
							this.$router.push({name: 'prayResult'});
						}
						
					}).catch((err) => {

					});
				}).catch(() => {
					this.$router.push({name: 'pray'});
				});
			// }
		},
		methods: {
			// //IOS 判断当前环境是否在APP还是浏览器环境
			// isApp(req){
			// 	return navigator.userAgent.indexOf(req) > -1?true:false;
			// },
			// //获取URL参数
			// getQueryString(name){
			// 	let arr = location.href.split('&');
			// 	let arr2 = arr.find( v => v.indexOf(name) > -1);
			// 	let str = arr2.substring(arr2.indexOf(name) + 9,arr2.length)
			// 	return str
			// }
	
		},
	};
</script>

<style scoped lang="less">

</style>
