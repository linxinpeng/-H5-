<template>
    <div class="home bscroll" ref="foodsWrapper">
        <ul class="bscroll-container">
            <template v-for="item in arr">
                <li>
                    <div class="first">
                        <p class="txt">{{item.des}}</p>
                        <p class="time">{{item.create_time|timeF}}</p>
                    </div>
                    <p :class="item.detail_type==2?'':'pray'">
                        {{item.detail_type==1?'+':'-'}}{{item.total_amount}}元
                    </p>
                </li>
            </template>
            <li class="more" v-if="bol" @click="getMore">点击或上拉加载更多</li>
            <li class="more" v-else>已无更多</li>
        </ul>

    </div>
</template>

<script>
	import axios from 'axios';
	import BScroll from 'better-scroll';
	import moment from 'moment';
	export default {
		name: 'prayDetail',
		data() {
			return {
				arr: [],
				options: {
					pullDownRefresh: {
						threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
						stop: 0, // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
					},
					pullUpLoad: {
						threshold: -5, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
					},
					//pullDownRefresh: false, //关闭下拉
					//pullUpLoad: false, // 关闭上拉
					click: true,
					probeType: 3,
					startY: 0,
					scrollbar: false,
				},
				bol: true,
				foodsScroll: null,
				page: 1,
			};
		},
		created() {
			this.$nextTick(() => {
				this.initScroll();
			});
			// console.log(moment)
		},
		filters: {
			fixto2: function (val) {
				return val.toFixed(2);
			},
			timeF: function(val){
				val = val * 1000;
				return moment(val).format('YYYY-MM-DD H:mm:ss')
			}
		},
		mounted() {
			axios.get('/api/shebao/daka/getDetail', {
				params: {
					userid: this.$store.state.userId,
					page: this.page,
				},
			}).then((res) => {
				if (res.data.data.length > 0) {
					this.arr.push(...res.data.data);
				} else {
					this.bol = false;
				}
			});
			
		},
		methods: {
			initScroll() {
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, this.options);
				this.foodsScroll.on('pullingUp', () => {
					if (this.bol) {
						this.getMore();
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
			getMore: function () {
				axios.get('/api/shebao/daka/getDetail', {
					params: {
						userid: this.$store.state.userId,
						page: ++this.page,
					},
				}).then((res) => {
					if (res.data.data.length > 0) {
						this.arr.push(...res.data.data);
					} else {
						this.bol = false;
					}
				});
			},
		},
	};
</script>
<style scoped lang="less">
    ul {
        list-style: none;
        width: 100%;
        li {
            width: 96%;
            padding: 0 2%;
            height: 70px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            align-items: center;
        }
    }

    .bscroll {
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
    }

    .bscroll-container {
        background: #fff;
    }

    .first {
        text-align: left;
        .txt {
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
        }
        .time {
            font-size: 12px;
            color: #999;
        }
    }

    .pray {
        color: #ec4a41;
    }

    .more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: #999;
        padding: 5px 0;
    }
</style>
