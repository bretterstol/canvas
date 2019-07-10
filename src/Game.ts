
export default class Game{
    ctx: CanvasRenderingContext2D;
    startX: number;
    startY: number;
    x: number = 0;
    y: number = 0;
    cannonBalls: ((()=> void)[]) = []

    constructor(ctx:CanvasRenderingContext2D, startX:number, startY:number){
        this.ctx = ctx;
        this.startX = startX;
        this.startY = startY;
    }

    createBackGround(sky: string, ground: string){
        this.ctx.fillStyle = ground;
        this.ctx.fillRect(0, 800, innerWidth, innerHeight);
        this.ctx.fillStyle = sky;
        this.ctx.fillRect(0, 0, innerWidth, 800);
        this.ctx.save();
    }

    setDirection(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    getRotation(){
        return (this.x - this.startX) / (this.y - this.startY);
    }

    createCannon() {
            this.ctx.translate(this.startX, this.startY);
            this.ctx.beginPath();
            this.ctx.rotate(-Math.atan(this.getRotation()))
            this.ctx.arc(0, -30, 30, 0, Math.PI, false);
            this.ctx.fillStyle = "black";
            this.ctx.fill();
            this.ctx.stroke();
            this.cannonBarrol();
            this.ctx.restore();
    }
    cannonBarrol(){
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(-10, -30, 20, -20);
        this.ctx.fillRect(-3,-30, 6,-50);
        this.ctx.stroke();
    }

    animate(){
       const animateFrame = () => {
            this.ctx.clearRect(0,0,innerWidth, innerHeight)
            this.createBackGround("skyblue", "green");
            this.createCannon();
            this.cannonBalls.forEach(cannonBall => cannonBall())
            requestAnimationFrame(animateFrame)
        }
        animateFrame();
    }

    addCannonBall(x:number, y:number){
        this.cannonBalls.push(this.cannonBall(x,y))
    }

    cannonBall(x:number, y:number){
        let dx = ((x-this.startX) / this.startX);
        let dy = ((y-this.startY) / this.startY);
        let rotation = (x - this.startX) / (y - this.startY)
        let posX = x;
        let posY = (y);
        return () => {
            const radius = 4;
            this.ctx.beginPath();
            this.ctx.arc(posX, posY, radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = "red";
            this.ctx.fill();
            if ((posX + radius) > window.innerWidth || (posX - radius) < 0) dx = -dx;
            if ((posY + radius) > window.innerHeight || (posY - radius) < 0) dy = -dy;
            posX += dx;
            posY += dy;
        }
    }
}