<template>
    <div class="content">
        <img src="../static/congritulation.png" alt="">
        <div class="txt">恭喜你</div>
        <div class="txt1">已成功参与9元早起打卡活动</div>
        <p class="litMsg">
            每日6:00-8:00来打卡，别忘了哦
        </p>
        <!--<div class="detail">-->
            <!--<p><span>订单金额</span><span>¥ 9.00</span></p>-->
            <!--<p><span>打卡体验金</span><span style="color: #ffaa2d;">- ¥ 9.00</span></p>-->
        <!--</div>-->
        <button @click="getFreeChance">知道了</button>
        <div class="note">
            <p class="title">特殊说明:</p>
            <p>1.完成21天打卡任务后，参与限免体验的打卡活动金9元，不可提现至个人账号；</p>
            <p>2.若中断打卡，9元打卡活动金将由平台承担，并入奖金池用于瓜分。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FreeJoin',
        methods: {
            getFreeChance() {
                this.$router.push({name: 'home'});
            },
        },
    };
</script>

<style scoped lang="less">
    .content {
        width: 100%;
        padding-top: 10%;
        box-sizing: border-box;
        height: 100vh;
        color: #333333;
    }

    .txt {
        font-size: 27px;
        color: #333;
    }
    .txt1{
        margin-top: 14px;
        font-size: 20px;
        color: #333;
    }

    h2 {
        font-size: 40px;
        color: #333;
        padding-bottom: 10%;
    }

    .detail {
        border: 1px solid #eee;
        p {
            font-size: 14px;
            padding: 0 12px;
            line-height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    img{
        width: 30%;
        margin-bottom: 15px;
    }
    .note {
        font-size: 12px;
        text-align: left;
        padding: 0 12px;
        line-height: 26px;
        color: #999;
        .title {
            font-size: 14px;
            line-height: 30px;
            color: #333;
        }
    }
    .litMsg{
        margin: 29px 0 12px;
        font-size: 16px;
        color: #999;
    }
    button {
        margin-bottom: 30px;
        background-color: #ffaa2d;
        border-radius: 8px;
        width: 95%;
        color: #fff;
        height: 44px;
        font-size: 18px;
    }
</style>
