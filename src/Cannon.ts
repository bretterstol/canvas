import { logicalTrue } from "./utils";

function cannon(ctx:CanvasRenderingContext2D, startX:number, startY: number){

    return (x?:number, y?:number) => {
            ctx.translate(startX, startY);
            ctx.beginPath();
            if( ((x || x===0)  && (y || y === 0)) ){
                ctx.rotate(-Math.atan(( x - startX) / ( y - startY)))
            }
            ctx.arc(0, -30, 30, 0, Math.PI, false);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.stroke();
            cannonBarrol(ctx);
            ctx.restore();
    } 

}
function cannonBarrol(ctx:CanvasRenderingContext2D){
    ctx.fillStyle = "gray";
    ctx.fillRect(-10, -30, 20, -20);
    ctx.fillRect(-3,-30, 6,-50);
    ctx.stroke();
}

export default cannon;