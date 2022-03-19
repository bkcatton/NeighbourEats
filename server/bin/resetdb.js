// load .env data into process.env
const dotenv = require('dotenv');
dotenv.config();

// require("dotenv").config();

// other dependencies
const fs = require('fs');
// const chalk = require('chalk');
const { Client } = require('pg');
const libdb = require('../lib/db.js');

const dbParams = libdb;
const db = new Client(dbParams);

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(`-> Loading Schema Files ...`);
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${fn}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(`-> Loading Seeds ...`);
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${fn}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  console.log(dbParams);
  try {
    dbParams.host &&
      console.log(
        `-> Connecting to PG on ${dbParams.host} as ${dbParams.user}...`
      );
    dbParams.connectionString &&
      console.log(`-> Connecting to PG with ${dbParams.connectionString}...`);
    await db.connect();
    await runSchemaFiles();
    await runSeedFiles();
    db.end();
  } catch (err) {
    console.error(`Failed due to error: ${err}`);
    db.end();
  }
};

runResetDB();
