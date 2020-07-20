const DataBase = require("../models/database_model");

exports.create = async (req, res) => {
  const { requestId } = req; // global for try - catch scope
  try {
    const { databaseName } = req.body;
    const result = await DataBase.create({ databaseName });
    if (Object.keys(result).includes("hasError") && result.hasError) {
      res
        .status(422)
        .json({ meta: { requestId }, data: [], errors: result.error });
    } else {
      res.status(201).json({ meta: { requestId }, data: result, errors: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ meta: { requestId }, data: [], errors: error });
  }
};

exports.drop = async (req, res) => {
  const { requestId } = req; // global for try - catch scope
  try {
    const { databaseName } = req.body;
    const result = await DataBase.drop({ databaseName });
    if (Object.keys(result).includes("hasError") && result.hasError) {
      res
        .status(422)
        .json({ meta: { requestId }, data: [], errors: result.error });
    } else {
      res.status(204).json({ meta: { requestId }, data: [], errors: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ meta: { requestId }, data: [], errors: error });
  }
};

exports.list = async (req, res) => {
  const { requestId } = req; // global for try - catch scope
  try {
    const result = await DataBase.list();

    if (Object.keys(result).includes("hasError") && result.hasError) {
      res
        .status(404)
        .json({ meta: { requestId }, data: [], errors: result.error });
    } else {
      res.status(200).json({ meta: { requestId }, data: result, errors: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ meta: { requestId }, data: [], errors: error });
  }
};
