<template>
    <div id="app" v-if="hidden">
        <router-view></router-view>
    </div>
</template>
<script>
import axios from './static/js/axios';
export default {
    data(){
        return{
            hidden: false
        }
    },
    created(){
        this.getApp()
    },
    methods:{
        //判断当前环境是否为app环境
        async getApp(){
            const resp = await axios.get(`/api/shebao/daka/get_data?userid=${this.$store.state.userId}&token=${this.$store.state.token}`)
            if(resp.data.code == 1){
                if(resp.data.data.appagent[1] == 1 && !navigator.userAgent.includes(resp.data.data.appagent[0])){
                    location.href = resp.data.data.appagent[0] + '://';
                    this.hidden = false
                }
                else{
                    this.hidden = true
                }
            }else{
                this.hidden = true
            }
        }
    }
}
</script>

<style lang="less">
    @import "static/css/swiper.min.css";
    html, body {
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    * {
        padding: 0;
        margin: 0
    }

    .el-message-box {
        width: 66% !important;
    }

    ul {
        list-style: none
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    button {
        outline: none;
        border: none;
        background-color: transparent;
    }

</style>
