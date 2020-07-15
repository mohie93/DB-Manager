const { validateCreatePayload, validateDeletePayload } = require("./validators/database_validator");
const knexDbManager = require("../configs/knex");

exports.create = async (params) => {
  try {
    const payload = await validateCreatePayload(params);
    if (Object.keys(payload).includes("hasError") && payload.hasError) throw new Error(`Invalid Payload: ${payload.errors}`);
    else {
      const { databaseName } = params;
      return await knexDbManager.raw(`CREATE DATABASE ${databaseName}`);
    }
  } catch (error) {
    console.log(`create database model throw error: ${error}`);
    await knexDbManager.raw(`DROP DATABASE ${databaseName}`);
    return { hasError: true, error: `create database model throw error: ${error}`};
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
    return { hasError: true, error: `drop database model throw error: ${error}`};
  }
};

