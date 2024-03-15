import * as PIXI from 'pixi.js'
import { ref } from 'vue';
export interface ISymbolData {
    [key: number]: [string, number];
}

export const SymbolData : ISymbolData = {
    0 : ['basicsymbol' , 700],
    1 : ['pointsymbol' , 800],
    2 : ['collector' , 820],
    3 : ['payer' , 835],
    4 : ['sniper' , 845]
}

export const generateType= () =>{
    const rand = Math.floor(Math.random() * 846);
    let type = 0;
    for (const key in SymbolData) {
        if (rand <= SymbolData[key][1]) {
            type = parseInt(key , 10);
            break;
        }
    }
    return type;
}

export function generateWeightedNumber(): number {
    const rand = Math.random();
    let cumulativeProbability = 0;
    let probabilityStep = 0.5;

    for (let i = 1; i <= 20; i++) {
        cumulativeProbability += probabilityStep;
        if (rand < cumulativeProbability) {
            return i;
        }
        probabilityStep /= 2;
    }

    return 20;
}


export const data = {
    animation_generation: {
        normal: 25,
        quickplay: 10,
        skip: 4,
    },
    animation_speed :{
        roll : {
            normal :{
                razgon : 150,
                razgonreverse : 350,
                middle : 100,
            },
            quickplay : {
                razgon : 100,
                razgonreverse : 250,
                middle : 70,
            },
            skip : {
                razgon : 50,
                razgonreverse : 150,
                middle : 40,
            }
        },
        special : {
            collector:{
                normal : 1500,
                quickplay : 750,
                skip : 0,
            },
            payer : {
                normal : 1500,
                quickplay : 750,
                skip : 0,
            },
            sniper : {
                normal : 300,
                quickplay : 150,
                skip : 0,
            }
        }
    }
};
