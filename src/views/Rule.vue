<template>
    <div class="contentBox">
        <ul>
            <li>
                <p class="title">1.早起打卡挑战</p>
                <p class="content">可帮助你养成早起健康生活习惯。用户支付9元即成功参与活动，每日上午6：00-8：00成功完成打卡，可平均瓜分现金池内所有奖金，坚持21天即可养成早起好习惯；</p>
            </li>
            <li>
                <p class="title">2.早起打卡如何参与</p>
                <p class="content">
                    1、用户支付9元打卡金，即可参加下次早起打卡。次日可追加9元打卡金，所有打卡金都汇聚到次日现金池内；（注：每人每期最高累计充值金额为180元哦~）
                </p>
                <p class="content">
                    2、每日上午6：00-8：00成功打卡用户，可获得按支付份额瓜分的奖金池奖金。如A支付9元(成功打卡)，B支付9元并追加9元(成功打卡)，C支付9元(打卡失败)即A得12元，B得24元，C得到0元；
                </p>
                <p class="content">
                    3、一旦参与早起挑战，需连续打卡21天，中途不可退出，如错过打卡时间即打卡失败，打卡金9元将被成功者瓜分;
                </p>
            </li>
            <li>
                <p class="title">3.瓜分奖金如何领取</p>
                <p class="content">
                    1、参与早起打卡活动所支付的打卡金作为挑战金，连续早起打卡21天，即可提现；<br/>
                    2、打卡当日12：00后可进入【我的战绩】查看自己挑战奖励；
                </p>
            </li>
            <li>
                <!--<p class="title">4.体验打卡说明</p>-->
                <!--<p class="content">-->
                    <!--1、每日限量开放免费打卡名额，领完即止；<br/>-->
                    <!--2、体验者可免支付9元打卡金，同样享打卡瓜分奖金以及追加打卡金；<br/>-->
                    <!--3、体验的9元打卡金不可提现，奖励金及追加打卡金可提现。-->
                <!--</p>-->
                <p class="content">
                    注：一经发现违规行为将取消一切活动参与资格及奖金
                </p>
            </li>
        </ul>
        <p class="final">本活动最终解释权归{{txt}}所有</p>
    </div>
</template>

<script>
	export default {
		name: 'Rule',
      data(){
			return {
				txt:''
            }
      },
      mounted(){
        //   switch (this.$store.state.appId) {
        //       case 1:
        //           this.txt='社保一点通';
        //           break;
        //       case 3:
        //           this.txt='记加班';
        //           break;
        //       case 4:
        //           this.txt='人人社保';
        //           break;
        //   }
          const appId = this.$store.state.appId;
          this.txt = appId == 1?'社保一点通':appId == 3?'记加班记账':'人人社保'

      }
	};
</script>

<style scoped lang="less">
    .contentBox{
        padding:0 2%;
        height: 100vh;
        position: relative;
    }
    li{
        margin-top: 20px;
    }
    p{
        text-align: left;
        color: #333;
    }
    .title{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .content{
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 10px;
    }
    .final{
        width: 100%;
        text-align: center;
    }
</style>
