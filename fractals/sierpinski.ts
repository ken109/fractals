import p5 = require('p5');
import {Vector} from "./index";

const DEPTH: number = 8

export const sierpinski = (p: p5) => {
    const TOP_LENGTH: number = p.windowHeight * 0.7

    let sierpinski = (depth: number, x: number = 0, y: number = 0) => {
        const NOW_DEPTH = DEPTH - depth
        const LENGTH = TOP_LENGTH / (2 ** NOW_DEPTH)

        const p1: Vector = {
            x: x,
            y: y
        }
        const p2: Vector = {
            x: x - (LENGTH * (1 / 2)),
            y: y - (LENGTH * (Math.sqrt(3) / 2) * (NOW_DEPTH === 0 ? -1 : 1))
        }
        const p3: Vector = {
            x: x + (LENGTH * (1 / 2)),
            y: y - (LENGTH * (Math.sqrt(3) / 2) * (NOW_DEPTH === 0 ? -1 : 1))
        }

        p.stroke(255);
        setTimeout(() => {
            p.line(p1.x, p1.y, p2.x, p2.y)
            p.line(p2.x, p2.y, p3.x, p3.y)
            p.line(p3.x, p3.y, p1.x, p1.y)
        }, NOW_DEPTH * 1000)

        if (--depth > 0) {
            sierpinski(depth, (p3.x + p2.x) / 2, p2.y)
            if (NOW_DEPTH > 0) {
                sierpinski(depth, p2.x, p1.y)
                sierpinski(depth, p3.x, p1.y)
            }
        }
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        sierpinski(DEPTH, p.windowWidth / 2, p.windowHeight / 2 - TOP_LENGTH * (Math.sqrt(3) / 2) / 2)
    }
}
