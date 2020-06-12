// 矩形父类
// 宽 高 横坐标 纵坐标 横向速度 纵向速度  width height left top xSpeed ySpeed 对应的dom对象
// 像素/s
// 正数向右 负数向左
// 正数向下 负数向上

class Rectangle{
    constructor(width, height, left, top, xSpeed, ySpeed, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }
    //渲染
    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    onMove(){}
    
    //移动矩形
    move(dur) {
        const xDis = dur * this.xSpeed;
        const yDis = dur * this.ySpeed;
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        //让子类去完成
        this.onMove();



        this.render();
    }

}