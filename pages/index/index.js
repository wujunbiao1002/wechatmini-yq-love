// index.js
// 获取应用实例
const app = getApp()
var _animation; // 动画实体
var _animationIndex = 0; // 动画执行次数index（当前执行了多少次）
var _animationIntervalId = -1; // 动画定时任务id，通过setInterval来达到无限旋转，记录id，用于结束定时任务
const _ANIMATION_TIME = 500; // 动画播放一次的时长ms

Page({
    data: {
        audioUrl: ['http://tomhjy.com:14777/yqlove/1.mp3',
            'http://tomhjy.com:14777/yqlove/2.mp3',
            'http://tomhjy.com:14777/yqlove/3.mp3',
            'http://tomhjy.com:14777/yqlove/4.mp3',
            'http://tomhjy.com:14777/yqlove/5.mp3',
            'http://tomhjy.com:14777/yqlove/6.mp3',
            'http://tomhjy.com:14777/yqlove/7.mp3'    
        ],
        dateTime: '',
        animation: '',
        showBlessing: false
    },
    onLoad() {
        // 初始化音乐
        var audio = wx.createInnerAudioContext()
        audio.src = this.data.audioUrl[Math.floor(Math.random() * 7)]; // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
        audio.play();
        audio.loop = true;

        // 初始化日期显示
        this.showDateTime();
        // 初始化动画
        _animationIndex = 0;
        _animationIntervalId = -1;
        this.data.animation = '';
        this.createAnimation();
        this.startAnimationInterval();
        // 定时切换
        this.showBlessing();
    },
    showBlessing() {
        setTimeout(this.showBlessing, 5000);
        this.setData({
            showBlessing: !this.data.showBlessing
        })
    },

    showDateTime() {
        setTimeout(this.showDateTime, 1000);
        var BirthDay = new Date("06/29/1997 00:00:00"); //这个日期是可以修改的
        var today = new Date();
        var timeold = (today.getTime() - BirthDay.getTime());
        var sectimeold = timeold / 1000
        var secondsold = Math.floor(sectimeold);
        var msPerDay = 24 * 60 * 60 * 1000
        var e_daysold = timeold / msPerDay
        var daysold = Math.floor(e_daysold);
        var e_hrsold = (e_daysold - daysold) * 24;
        var hrsold = Math.floor(e_hrsold);
        var e_minsold = (e_hrsold - hrsold) * 60;
        var minsold = Math.floor((e_hrsold - hrsold) * 60);
        var seconds = Math.floor((e_minsold - minsold) * 60);
        var dateTime = daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";
        this.setData({
            dateTime
        });
    },

    createAnimation() {
        _animation = wx.createAnimation({
            duration: _ANIMATION_TIME,
            timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
            delay: 0,
            transformOrigin: '50% 50% 0'
        })
    },

    /**
     * 实现image旋转动画，每次旋转 120*n度
     */
    rotateAni(n) {
        _animation.rotate(10 * (n)).step()
        this.setData({
            animation: _animation.export()
        })
    },

    /**
     * 开始旋转
     */
    startAnimationInterval() {
        var that = this;
        that.rotateAni(++_animationIndex); // 进行一次旋转
        _animationIntervalId = setInterval(function () {
            that.rotateAni(++_animationIndex);
        }, _ANIMATION_TIME); // 每间隔_ANIMATION_TIME进行一次旋转
    },

    /**
     * 停止旋转
     */
    stopAnimationInterval() {
        if (_animationIntervalId > 0) {
            clearInterval(_animationIntervalId);
            _animationIntervalId = 0;
        }
    },
})