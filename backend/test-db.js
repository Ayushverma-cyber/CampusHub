// const db = require("./db");

// async function testConnection() {
//     try {
//         const [rows] = await db.query("SELECT DATABASE() AS db");

//         console.log("Database connected successfully!");
//         console.log(rows);

//     } catch (error) {
//         console.log("Database connection failed:", error.message);
//     } finally {
//         await db.end();
//     }
// }

// testConnection();



require('dotenv').config();
const db = require('./db');

async function testTables() {
  try {
    const [tables] = await db.query('SHOW TABLES');

    console.log('CampusHub Database Tables:');

    tables.forEach((table) => {
      console.log(Object.values(table)[0]);
    });

  } catch (error) {
    console.error(error.message);
  } finally {
    await db.end();
  }
}

testTables();