import {DIRECTION, ICoordinate} from "../../types";
import {getRandomInt, getRandomItem} from "../../utils/helpers";

export class AbstractShip {
  name: string;
  length: number;
  position?: ICoordinate;
  direction?: DIRECTION;

  constructor(name: string, length: number) {
    this.name = name;
    this.length = length;
  }

  takeRandomPosition(mapSize: number): void {
    this.direction = getRandomItem(Object.values(DIRECTION));
    if (this.direction === DIRECTION.HORIZONTAL) {
      this.position = {
        x: getRandomInt(mapSize - this.length),
        y: getRandomInt(mapSize),
      };
    } else {
      this.position = {
        x: getRandomInt(mapSize),
        y: getRandomInt(mapSize - this.length),
      };
    }
  }
}
