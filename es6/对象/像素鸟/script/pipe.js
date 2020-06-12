const gamesWidth = gameDom.clientWidth;
class Pipe extends Rectangle  {
    constructor(height, top, speed, dom) {
        super(52, height, gamesWidth, top, speed, 0, dom);
    }
    onMove() {
        if(this.left < -this.width) {
            this.dom.remove();
        }
    }
}
function getRandom (min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

class PipePare {
    constructor(speed) {
        this.spaceH = 150;
        this.minHeight = 80;
        this.maxHeight = landB - this.minHeight - this.spaceH;
        const upHeight = getRandom(this.minHeight, this.maxHeight)
        const upDom = document.createElement("div");
        upDom.className = "pipe down";
        
        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管

        const downDom = document.createElement("div");
        downDom.className = "pipe up";
        const downHeight = landB - upHeight - this.spaceH;
        const downTop = landB - downHeight;
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom); //下水管

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }
    get useless (){
        return this.upPipe.left < -this.upPipe.width;
    }
    move(dur) {
        this.upPipe.move(dur);
        this.downPipe.move(dur);
    }
}

let num = 0;
class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
    }
    startProduce() {
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            //移除用不到的柱子
            num ++;
            for (let i = 0; i < this.pairs.length; i++) {
               var pair = this.pairs[i];
               if(pair.useless){
                   this.pairs.splice(i, 1);
                   i--;
               }
                
            }
        },1500)
    }
    stopProduce() {
        clearInterval(this.timer);
        this.timer= null;
    }
}


