import {AbstractShip, Battleship, Destroyer} from "./ships";
import {SeaGrid} from "./SeaGrid";

export class GameEngine {
  ships: AbstractShip[];
  map: SeaGrid;
  finished: boolean;

  constructor() {
    this.ships = [
      new Battleship(),
      new Destroyer(),
      new Destroyer(),
    ];
    this.map = new SeaGrid();
    this.finished = false;
    this.reset();
  }

  reset(): void {
    this.finished = false;
    this.map.reset();

    for (const ship of this.ships) {
      do {
        ship.takeRandomPosition(this.map.size);
      } while (!this.map.canPlaceShip(ship));
      this.map.placeShip(ship);
    }
  }

  dropBomb(x: number, y: number) {
    const foundShip = this.map.dropBomb(x, y);
    if (this.map.remainShipCells === 0) {
      this.finished = true;
    }
    return foundShip;
  }
}