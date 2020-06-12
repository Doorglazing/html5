const bridDom = document.querySelector(".brid");
const bridStyles = getComputedStyle(bridDom);
const bridWidth = parseFloat(bridStyles.width);
const bridHeight = parseFloat(bridStyles.height);
const bridLeft = parseFloat(bridStyles.left);
const bridtop = parseFloat(bridStyles.top);
const gameDom = document.querySelector(".game");
const gamesHeight = gameDom.clientHeight;
const gamesLH = gamesHeight - landHeight 
class Brid extends Rectangle{
    constructor () {
        super(bridWidth, bridHeight, bridLeft, bridtop, 0, 0, bridDom);
        this.g = 1500;
        this.maxY = gamesLH - this.height;
        this.status = 1;
        this.timer = null;
        this.render();
    }

    startStatus() {
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.status = (this.status + 1) % 3 + 1;
            this.render();
        },300)
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
        if(this.top < 0){
            this.top = 0;
        }else if(this.top > this.maxY){
            this.top = this.maxY;
        }
    }
    jump() {
        this.ySpeed = -350;
    }
}



