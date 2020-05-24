import {Coordinate} from './types';

export default class Figure {
    coords: Coordinate[];

    constructor(coords: Coordinate[]) {
        this.coords = coords;
    }

    get coordinates(): Coordinate[] {
        return this.coords;
    }

    get bottomBorderCoords(): Coordinate[] {
        const groupMap = new Map();

        this.coords.forEach(({row, col}) => {
            if (groupMap.has(col)) {
                groupMap.set(col, [...groupMap.get(col), row])
            } else {
                groupMap.set(col, [row])
            }
        });

        const borderCoords: Coordinate[] = [];

        groupMap.forEach((rows, col) => {
            const lowestRow = rows.sort((a: number, b: number) => a - b)[rows.length-1];
            borderCoords.push({
                row: lowestRow,
                col: col
            });
        });

        return borderCoords;
    }

    moveDown(): void {
        this.coords = this.coords.map(({row, col}) => ({row: row + 1, col}));
    }
}
