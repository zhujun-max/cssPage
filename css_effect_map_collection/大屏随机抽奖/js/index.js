var nums = JSON.parse(window.localStorage.getItem("nums") || "[]");

var app = new Vue({
  el: "#app",
  data: {
    // 号码范围
    minNum: 0,
    maxNum: 260,

    num: "000",
    isStart: false,
    interval: null,
    visible: false,
    nums: nums,
    selectNums: [],
    checkAll: false,
    isIndeterminate: false,
    btnVisible: true,
    resultVisible: false
  },
  mounted() {
    this.onKeyDown();
  },
  methods: {
    onKeyDown() {
      document.onkeydown = e => {
        e.preventDefault();
        if (this.nums.length >= this.maxNum - this.minNum + 1) {
          window.alert("号码已经全部抽取，无法再次抽取");
          return;
        }
        var keyNum = window.event ? e.keyCode : e.which;
        if (keyNum === 32) {
          if (this.isStart) {
            this.stop();
            this.isStart = false;
          } else {
            this.start();
            this.isStart = true;
          }
        }
      };
    },
    start() {
      this.interval = window.setInterval(() => {
        this.setNum();
      }, 16.7);
    },
    stop() {
      if (this.interval) {
        window.clearInterval(this.interval);
        // 处理数字是否已经抽取到了
        this.noRepeat();
      }
    },
    setNum() {
      this.num = parseInt(
        Math.random() * (this.maxNum - this.minNum + 1) + this.minNum
      );
    },
    // 去重，重新设置localStorage
    noRepeat() {
      const isIn = this.nums.find(item => {
        return item.num === this.num;
      });
      if (isIn) {
        this.setNum();
        this.noRepeat();
      } else {
        this.nums.push({ num: this.num, time: this.formatDateTime() });
        window.localStorage.setItem("nums", JSON.stringify(this.nums));
      }
    },
    // 获取当前时间 hh:mm:ss
    formatDateTime() {
      const theDate = new Date();
      const hour = ("0" + theDate.getHours()).slice(-2);
      const minute = ("0" + theDate.getMinutes()).slice(-2);
      const second = ("0" + theDate.getSeconds()).slice(-2);
      return hour + ":" + minute + ":" + second;
    },
    // 针对选择
    handleCheckAllChange(val) {
      this.selectNums = val ? this.nums.map(item => item.num) : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.nums.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.nums.length;
    },
    // 从localStorage真实删除数字
    deleteItems() {
      this.btnVisible = false;
      this.selectNums.forEach(item => {
        var i = this.nums.findIndex(result => {
          return result.num == item;
        });
        if (i >= 0) {
          this.nums.splice(i, 1);
        }
      });
      window.localStorage.setItem("nums", JSON.stringify(this.nums));
      this.visible = false;
    },
    clearData() {
      this.checkAll = false;
      this.handleCheckAllChange();
    }
  }
});
