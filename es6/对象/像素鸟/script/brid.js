const bridDom = document.querySelector(".brid"); //获取brid元素
const bridStyles = getComputedStyle(bridDom); // 获取brid元素样式 
const bridWidth = parseFloat(bridStyles.width); // 获取brid宽高
const bridHeight = parseFloat(bridStyles.height);
const bridLeft = parseFloat(bridStyles.left); //获取brid初始定位
const bridtop = parseFloat(bridStyles.top);
const gameDom = document.querySelector(".game"); // 获取game元素
const gamesHeight = gameDom.clientHeight; //获取game元素高度
const gamesLH = gamesHeight - landHeight //获取天空与地面最大距离
//创建Brid类 继承 rectangle
//主要实现Brid移动 重力加速度 挥动翅膀 jump 以及 停止情况
class Brid extends Rectangle {
    constructor() {
        super(bridWidth, bridHeight, bridLeft, bridtop, 0, 0, bridDom);
        this.g = 1500;
        this.maxY = gamesLH - this.height;
        this.status = 1;
        this.timer = null;
        this.render();
    }

    startStatus() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.status = (this.status + 1) % 3 + 1;
            this.render();
        }, 300)
    }

    endStatus() {
        clearInterval(this.timer);
        this.timer = null;
    }


    render() {
        super.render();
        this.dom.className = `brid swing${this.status}`;
    }

    move(dur) {
        super.move(dur);
        this.ySpeed += this.g * dur;
    }
    onMove() {
        // console.log(this.top)
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }
    jump() {
        this.ySpeed = -350;
    }
}