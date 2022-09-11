import React, {useMemo, useState} from "react";
import classNames from "classnames";
import {GameEngine} from "../../core";
import "./style.scss";

const ShipBattle = () => {
  const gameEngine = useMemo(() => new GameEngine(), []);
  const [bombCount, setBombCount] = useState(0);

  const dropBomb = (x, y) => {
    gameEngine.dropBomb(x, y);
    setBombCount(bombCount + 1);

    if (gameEngine.finished) {
      setTimeout(() => {
        window.alert(`Well done! You completed the game in ${bombCount + 1} shots`);
      }, 200);
    }
  };

  const restartGame = () => {
    gameEngine.reset();
    setBombCount(0);
  };

  return (
    <div className="ship-battle-page">
      <h1 className="text-primary">Ship Battle</h1>
      <div className="mt-2">Your shots: {bombCount}</div>
      <table className="sea-grid mt-4">
        <tbody>
        {gameEngine.map.map.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <td
                key={x}
                className={classNames(
                  'grid-cell',
                  cell.shot && 'shot',
                  cell.empty && 'empty',
                )}
                onClick={() => dropBomb(x, y)}
              >
                {cell.shot && (cell.empty ? '-' : 'X')}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      {gameEngine.finished && (
        <div className="mt-4">
          <button className="btn btn-primary" onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default ShipBattle;
