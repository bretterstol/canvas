

function backGround(ctx:CanvasRenderingContext2D, sky: string, ground: string){

    return () => {
        ctx.fillStyle = ground;
        ctx.fillRect(0, 800, innerWidth, innerHeight);
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, innerWidth, 800);
        ctx.save();
    }
    
}

export default backGround;