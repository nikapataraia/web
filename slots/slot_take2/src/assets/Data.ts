import * as PIXI from 'pixi.js'
import { ref } from 'vue';
export interface ISymbolData {
    [key: number]: [string, number];
}

export const SymbolData: ISymbolData = {
    0: ['nothing', 800],
    1: ['silver', 950],
    2: ['gold', 976],
    3: ['payer', 981],
    4: ['collector', 985],
    5: ['collector and payer', 987],
    6: ['sniper', 990],
    7: ['reset', 992],
    8: ['necromancer', 994],
    9: ['persistent payer', 995],
    10: ['persistent collector', 996],
    11: ['persistent sniper', 997],
};

export const generateType= () =>{
    const rand = Math.floor(Math.random() * 998);
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
    // Generating a random number between 0 (inclusive) and 1 (exclusive)
    let rand = Math.random();
    let cumulativeProbability = 0;
    let probabilityStep = 0.5; // Starting probability for 1

    for (let i = 1; i <= 20; i++) {
        cumulativeProbability += probabilityStep;
        if (rand < cumulativeProbability) {
            return i;
        }
        probabilityStep /= 2; // Halve the probability for the next number
    }

    return 20; // Fallback, though practically unreachable due to the loop logic
}

