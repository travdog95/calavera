import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("calavera.db");

export const initGames = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY NOT NULL, game TEXT NOT NULL);",
        [],
        () => {
          resolve("Games table initialized");
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const initSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, data TEXT NOT NULL);",
        [],
        () => {
          resolve("Settings table initialized");
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertGame = (game) => {
  const gameString = JSON.stringify(game);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO games (game) VALUES (?);",
        [gameString],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertJSON = (tableName, jsonKey, jsonValue) => {
  const jsonString = JSON.stringify(jsonValue);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${tableName} (${jsonKey}) VALUES (?);`,
        [jsonString],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchAll = (tableName) => {
  console.log(`fetchAll from ${tableName}`);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from ${tableName}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const dropTable = (tableName) => {
  console.log("dropTable", tableName);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE from ${tableName}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const deleteGameFromDB = (gameId) => {
  console.log("deleteGameFromDB");
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE from games WHERE id = ?;`,
        [gameId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const updateGame = (game) => {
  console.log("updateGame");
  const gameString = JSON.stringify(game);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE games SET game = (?) WHERE id = (?);",
        [gameString, game.id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const updateTable = (tableName, id, fieldName, jsonValue) => {
  console.log("updateTable");
  const jsonString = JSON.stringify(jsonValue);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${tableName} SET ${fieldName} = (?) WHERE id = (?);`,
        [jsonString, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};
