new Vue({
    el:'#app',
    data:{
        timer:null, //定时器
        active_index:0, //当前轮播下标
        active_image:'/images/137/1.jpg', //当前轮播背景图
        active_color:'#53839a', //当前轮播背景色
        size:9, //轮播图数量
        // banner数据（json格式）
        list:[{
            title:'正在直播NBA',
            sub_title:'快船vs森林狼',
            image:'/images/137/1.jpg',
            bg_color:'#53839a'
        },
        {
            title:'特战荣耀·热播',
            sub_title:'杨洋展特种军魂',
            image:'/images/137/2.jpg',
            bg_color:'#bbbbaf'
        },
        {
            title:'王牌对王牌7',
            sub_title:'沈腾贾玲cos喜羊羊',
            image:'/images/137/3.jpg',
            bg_color:'#120f16'
        },
        {
            title:'军火大劫案',
            sub_title:'国版“史密斯夫妇”燃炸',
            image:'/images/137/4.jpg',
            bg_color:'#600004'
        },
        {
            title:'毛雪汪',
            sub_title:'李雪琴花式夸毛不易新歌',
            image:'/images/137/5.jpg',
            bg_color:'#eeec88'
        },
        {
            title:'狙击手的战争',
            sub_title:'乌克兰战争狙击手传奇',
            image:'/images/137/6.jpg',
            bg_color:'#89a1a3'
        },
        {
            title:'致命谋杀',
            sub_title:'揭秘连环杀手作案动机',
            image:'/images/137/7.jpg',
            bg_color:'#1d221c'
        },
        {
            title:'现在就告白',
            sub_title:'健身教练告白女客户',
            image:'/images/137/8.jpg',
            bg_color:'#bd60d5'
        },
        {
            title:'【海量福利】',
            sub_title:'诺亚之心上线领豪礼',
            image:'/images/137/9.jpg',
            bg_color:'#0d283d'
        }]
    },
    methods:{
        // banner停止播放
        stopAutoPlay(){
            if(this.timer){
                clearInterval(this.timer);
            }
        },
        // banner开始播放
        startAutoPlay(){
            let _t=this;
            this.timer=setInterval(() => {
                _t.active_index++;
                if(_t.active_index>_t.size-1){
                    _t.active_index=0;
                }
                _t.changeBanner(_t.active_index);
            }, 3000);
        },
        // 切换轮播
        changeBanner(index){
            this.stopAutoPlay();
            this.active_index=index;
            this.active_image=this.list[index].image;
            this.active_color=this.list[index].bg_color;
            this.startAutoPlay();
        }
    },
    mounted(){
        // 初始化，自动播放轮播
        this.startAutoPlay();
    }
})