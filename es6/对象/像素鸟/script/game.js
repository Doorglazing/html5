
class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Brid();
        //柱子生成器
        this.pipeProducer = new PipePareProducer(-100);
        console.log(this.PipeProducer);
        this.timer = null;
        this.tick = 16;
    }

    start() {
        //防止重复开始
        if (this.timer) {
            return;
        }
        this.pipeProducer.startProduce(); //开始生成柱子
        this.bird.startStatus(); //挥动翅膀
        this.timer = setInterval(() => {
            const dur = this.tick / 1000;
            this.sky.move(dur);
            this.land.move(dur);
            this.bird.move(dur);
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(dur);
            } )
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
                const odiv = document.querySelector(".over");
                odiv.style.display = "block";
               
            }
        }, this.tick)

    }

    //判断两个矩形是否碰撞
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        var disY = Math.abs(centerY1 - centerY2);//中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }

    
    isGameOver() {
        if (this.bird.top === this.bird.maxY) {
            //鸟碰到了大地
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.endStatus();
        this.pipeProducer.stopProduce();
    }



    /**
     * 关键键盘事件
     */
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                }
                else {
                    this.start();
                }
            }
            else if (e.key === " ") {
                this.bird.jump();
            }
        }
    }
}
//得分
let span = document.querySelector(".num");
setInterval(() => {
    if(num - 5 >= 0){
        span.innerHTML = num - 5;
    }else{
        span.innerHTML = 0;
    }
},100)


var g = new Game();
g.regEvent();