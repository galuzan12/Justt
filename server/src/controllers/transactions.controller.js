const transactionsService = require("../services/transactions.service");

async function get(req, res, next) {
  try {
    const { page } = req.query;
    res.status(200).json({
      data: await transactionsService.getMultiple(page),
    });
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    console.log(req.body);
    res.json({ data: await transactionsService.create(req.body) });
  } catch (err) {
    console.error(`Error while creating new transaction`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.status(200).json({ data: await transactionsService.update(req.params.id, req.body) });
  } catch (err) {
    console.error(`Error while updating transaction`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.status(200).json({ data: await transactionsService.remove(req.params.id) });
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
};
