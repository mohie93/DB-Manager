const {
  validateCreatePayload,
  validateDeletePayload,
} = require("../validators/database_validator");
const knexDbManager = require("../configs/knex");

exports.create = async (params) => {
  try {
    const payload = await validateCreatePayload(params);
    if (Object.keys(payload).includes("hasError") && payload.hasError)
      throw new Error(`Invalid Payload: ${payload.errors}`);
    else {
      const { databaseName } = params;
      return await knexDbManager.raw(`CREATE DATABASE ${databaseName}`);
    }
  } catch (error) {
    console.log(`create database model throw error: ${error}`);
    return {
      hasError: true,
      error: `create database model throw error: ${error}`,
    };
  }
};

exports.drop = async (params) => {
  try {
    const payload = await validateDeletePayload(params);
    if (Object.keys(payload).includes("hasError") && payload.hasError)
      throw new Error(`Invalid Payload: ${payload.errors}`);
    else {
      const { databaseName } = params;
      return await knexDbManager.raw(`DROP DATABASE ${databaseName}`);
    }
  } catch (error) {
    console.log(`drop database model throw error: ${error}`);
    return {
      hasError: true,
      error: `drop database model throw error: ${error}`,
    };
  }
};

exports.list = async () => {
  try {
    const allDB = await knexDbManager.select("pg_database.datname").from("pg_database");
    
    const noneSystemDB = allDB.filter((database) => {
      return !process.env.DEFAULT_SCHEMA_DB.split(",").includes(
        database["datname"]
      );
    });
    
    const databases = noneSystemDB
      .map((item) => {
        return item.datname;
      })
      .join(",")
      .split(",");

    return {
      count: databases.length,
      databases,
    };
  } catch (error) {
    console.log(`list databases model throw error: ${error}`);
    return {
      hasError: true,
      error: `list databases model throw error: ${error}`,
    };
  }
};
