"use strict";
function knightMoves(start, end) {
    const startPos = new ChessCoord(...start);
    const endPos = new ChessCoord(...end);
    const shortestPath = bfs(startPos, endPos);
    console.log(`=> You made it in ${shortestPath.length} moves! Here's your path:`);
    for (const ele of shortestPath)
        console.log(ele.toString());
}
function bfs(start, end) {
    const q = new Queue();
    q.push([start]);
    while (!q.isEmpty()) {
        const ele = q.pop();
        if (ele) {
            const [cur, ...seen] = ele;
            if (cur.isEqual(end)) {
                seen.push(end);
                return seen;
            }
            else {
                if (seen.some((coord) => coord.isEqual(cur)))
                    // already visited this position
                    continue;
                else {
                    const nextCoords = cur.nextHorseMoves();
                    seen.push(cur);
                    for (const next of nextCoords) {
                        if (!seen.some((coord) => coord.isEqual(next)))
                            q.push([next, ...seen]);
                    }
                }
            }
        }
    }
    return [];
}
class ChessCoord {
    _x;
    _y;
    _dirs;
    constructor(x, y) {
        if (!this.isValid(x, y))
            throw Error(`Coordinate is invalid, must be integer between 0-7, your (x,y) = (${x}, ${y})`);
        this._x = x;
        this._y = y;
        this._dirs = [
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
        ];
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    nextHorseMoves() {
        const coords = [];
        for (const [dx, dy] of this._dirs) {
            const nx = this._x + dx, ny = this._y + dy;
            if (this.isValid(nx, ny))
                coords.push(new ChessCoord(nx, ny));
        }
        return coords;
    }
    isValid(x, y) {
        if (x < 0 ||
            y < 0 ||
            x > 7 ||
            y > 7 ||
            !Number.isInteger(x) ||
            !Number.isInteger(y))
            return false;
        return true;
    }
    isEqual(pos) {
        return this._x === pos.x && this._y === pos.y;
    }
    toString() {
        return `[${this._x}, ${this._y}]`;
    }
}
class Queue {
    elements = [];
    push(element) {
        this.elements.push(element);
    }
    pop() {
        return this.elements.shift() ?? null;
    }
    isEmpty() {
        return this.elements.length == 0;
    }
}
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
