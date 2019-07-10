import * as React from 'react';
import backGround from './Background';
import cannon from './Cannon';
import cannonBall from './Cannonball';
import Game from './Game';


export default class Canvas extends React.Component {

    canvas:HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;
    cannonBalls: (() => void)[] = [];
    background: (() => void) | null= null;
    cannon: (() => void) | null= null;
    game: Game | null = null

    constructor(props: {}){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this)
    }
    
    render(){
        return(
            <canvas id="test" ref={el => this.canvas = el} onMouseMove={this.onMouseMove} onClick={this.onClick}>
            </canvas>
        );
    }

    startCanvas() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            const ctx = this.canvas.getContext("2d");
            if (ctx) {
                this.ctx = ctx;
                this.game = new Game(ctx, innerWidth/2, 800);
                this.game.animate();
            }
        }
    }
    componentDidMount(){
        this.startCanvas();
    }
    animate(){

    }
    onMouseMove(event:React.MouseEvent<HTMLCanvasElement, MouseEvent>){

        const {pageX, pageY} = event;
        if(this.game) {
            this.game.setDirection(pageX, pageY);
        }
    }
    onClick(event:React.MouseEvent<HTMLCanvasElement, MouseEvent>){
        const {pageX, pageY} = event;
        if(this.game) this.game.addCannonBall(pageX, pageY);
    }
}


function animate(ctx:CanvasRenderingContext2D, x?:number, y?:number, cannonBalls?:(() => void)[]){
    const circles = lotsOfCicles(ctx);
    const back = backGround(ctx, "skyblue", "green");
    const thisCannon = cannon(ctx, innerWidth/2, 800)
    function animateFrame(){
        ctx.clearRect(0,0,innerWidth, innerHeight)
        back();
        thisCannon(x, y);
        if(cannonBalls)cannonBalls.forEach(ball => ball());
        requestAnimationFrame(animateFrame)
    }
    animateFrame();
}

function lotsOfCicles(ctx:CanvasRenderingContext2D){
    let result = [];
    for (let i = 0;  i < 100; i++){
        const radius = 30;
        const x = Math.random() * (innerWidth - (2 *radius)) + radius;
        const y = Math.random() * (innerHeight - (2 *radius)) + radius;
        const dx = Math.random() * 10;
        const dy = Math.random() * 10;
        result.push(createCircles(ctx, x, dx, y, dy, radius));
    }
    return result;
}


function createCircles(ctx:CanvasRenderingContext2D ,x:number, dx:number, y:number, dy:number, radius: number){
    return (color:string) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = color;
        ctx.stroke();
        if((x + radius) > innerWidth || (x - radius) < 0) dx = -dx;
        if((y + radius) > innerHeight || (y - radius) < 0) dy = -dy;
        x += dx;
        y += dy;
    }
}

