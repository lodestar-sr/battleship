import {AbstractShip} from "./ships";
import {DIRECTION} from "../types";

export interface SeaGridCell {
  empty: boolean;
  shot: boolean;
}

export class SeaGrid {
  size: number;
  map: SeaGridCell[][];
  remainShipCells: number;

  constructor(size = 10) {
    this.size = size;
    this.map = new Array(this.size);
    for (let i = 0; i < this.size; i ++) {
      this.map[i] = new Array(this.size);
      for (let j = 0; j < this.size; j ++) {
        this.map[i][j] = { empty: true, shot: false };
      }
    }
    this.remainShipCells = 0;
  }

  reset(): void {
    this.map.forEach((row) => {
      row.forEach((cell) => {
        cell.empty = true;
        cell.shot = false;
      });
    });
    this.remainShipCells = 0;
  }

  canPlaceShip(ship: AbstractShip): boolean {
    let x = ship.position!.x;
    let y = ship.position!.y;
    for (let i = 0; i < ship.length; i ++) {
      if (x >= this.size || y >= this.size || !this.map[y][x].empty) {
        return false;
      }
      if (ship.direction === DIRECTION.HORIZONTAL) {
        x ++;
      } else {
        y ++;
      }
    }
    return true;
  }

  placeShip(ship: AbstractShip): void {
    let x = ship.position!.x;
    let y = ship.position!.y;
    for (let i = 0; i < ship.length; i ++) {
      this.map[y][x].empty = false;
      if (ship.direction === DIRECTION.HORIZONTAL) {
        x ++;
      } else {
        y ++;
      }
    }
    this.remainShipCells += ship.length;
  }

  dropBomb(x: number, y: number): boolean {
    const cell = this.map[y][x];
    cell.shot = true;
    if (!cell.empty) {
      this.remainShipCells --;
      return true;
    }
    return false;
  }
}