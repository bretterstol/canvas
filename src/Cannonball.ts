
export default function cannonBall(ctx:CanvasRenderingContext2D, startX: number, startY: number,x:number, y: number){
    const radius = 4;
    return () => {
        let dx = -(x/startX)/100;
        let dy = -(y/startY)/100;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        if((x + radius) > innerWidth || (x - radius) < 0) dx = -dx;
        if((y + radius) > innerHeight || (y - radius) < 0) dy = -dy;
        x += dx;
        y += dy;
    }
}