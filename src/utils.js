module.exports = {
  pieces: {
    playerLion: {
      name: "playerLion",
      alt: "enemyLion",
      owner: 1,
      position: [3, 1],
      activePiece: false,
      isCaptured: false,
      isUnderCheck: false,
      reachedOpp: false,
      source: null,
      moves: [
        { row: 1, col: 0 }, // South
        { row: -1, col: 0 }, // North
        { row: 0, col: -1 }, // East
        { row: 0, col: 1 }, // West
        { row: 1, col: -1 }, // Southwest
        { row: -1, col: -1 }, // Northwest
        { row: 1, col: 1 }, // Southeast
        { row: -1, col: 1 }, // Northeast
      ],
    },
    playerChick: {
      name: "playerChick",
      alt: "enemyChick",
      promote: "playerHen",
      owner: 1,
      position: [2, 1],
      isCaptured: false,
      reachedOpp: false,
      promoted: false,
      moves: [
        { row: -1, col: 0 }, // North
      ],
    },
    playerHen: {
      name: "playerHen",
      alt: "enemyChick",
      owner: 1,
      position: [],
      isCaptured: false,
      moves: [
        { row: 1, col: 0 }, // South
        { row: -1, col: 0 }, // North
        { row: 0, col: -1 }, // East
        { row: 0, col: 1 }, // West
        { row: -1, col: -1 }, // Northwest
        { row: -1, col: 1 }, // Northeast
      ],
    },
    playerGiraffe: {
      name: "playerGiraffe",
      alt: "enemyGiraffe",
      owner: 1,
      position: [3, 2],
      isCaptured: false,
      moves: [
        { row: -1, col: 0 }, // North
        { row: 1, col: 0 }, // South
        { row: 0, col: -1 }, // West
        { row: 0, col: 1 }, // East
      ],
    },

    playerElephant: {
      name: "playerElephant",
      alt: "enemyElephant",
      owner: 1,
      position: [3, 0],
      isCaptured: false,
      moves: [
        { row: -1, col: -1 }, // Northwest
        { row: 1, col: -1 }, // Southwest
        { row: 1, col: 1 }, // Southeast
        { row: -1, col: 1 }, // Northeast
      ],
    },

    enemyLion: {
      name: "enemyLion",
      owner: 0,
      position: [0, 1],
      isCaptured: false,
      isUnderCheck: false,
      reachedOpp: false,
      moves: [
        { row: 1, col: 0 }, // South
        { row: -1, col: 0 }, // North
        { row: 0, col: -1 }, // East
        { row: 0, col: 1 }, // West
        { row: 1, col: -1 }, // Southwest
        { row: -1, col: -1 }, // Northwest
        { row: 1, col: 1 }, // Southeast
        { row: -1, col: 1 }, // Northeast
      ],
    },
    enemyChick: {
      name: "enemyChick",
      alt: "playerChick",
      promote: "enemyHen",
      owner: 0,
      position: [1, 1],
      isCaptured: false,
      reachedOpp: false,
      moves: [
        { row: 1, col: 0 }, // South
      ],
    },
    enemyHen: {
      name: "enemyHen",
      alt: "playerChick",
      owner: 0,
      position: [],
      isCaptured: false,
      moves: [
        { row: 1, col: 0 }, // South
        { row: -1, col: 0 }, // North
        { row: 0, col: -1 }, // East
        { row: 0, col: 1 }, // West
        { row: 1, col: -1 }, // Southwest
        { row: 1, col: 1 }, // Southeast
      ],
    },
    enemyGiraffe: {
      name: "enemyGiraffe",
      alt: "playerGiraffe",
      owner: 0,
      isCaptured: false,
      position: [0, 0],
      moves: [
        { row: 1, col: 0 }, // South
        { row: -1, col: 0 }, // North
        { row: 0, col: -1 }, // West
        { row: 0, col: 1 }, // East
      ],
    },
    enemyElephant: {
      name: "enemyElephant",
      alt: "playerElephant",
      owner: 0,
      isCaptured: false,
      position: [0, 2],
      moves: [
        { row: 1, col: -1 }, // Southwest
        { row: -1, col: -1 }, // Northwest
        { row: 1, col: 1 }, // Southeast
        { row: -1, col: 1 }, // Northeast
      ],
    },
  },

  directions: [
    { row: 1, col: 0 }, // South
    { row: -1, col: 0 }, // North
    { row: 0, col: -1 }, // East
    { row: 0, col: 1 }, // West
    { row: 1, col: -1 }, // Southwest
    { row: -1, col: -1 }, // Northwest
    { row: 1, col: 1 }, // Southeast
    { row: -1, col: 1 }, // Northeast
  ];
};
