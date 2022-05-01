const express = require("express");
const router = express.Router();
const { transactionsController } = require("../controllers/index.controllers");

/* GET programming languages. */
router.get("/", transactionsController.get);

/* POST programming language */
router.post("/", transactionsController.create);

/* PUT programming language */
router.put("/:id", transactionsController.update);

/* DELETE programming language */
router.delete("/:id", transactionsController.remove);

module.exports = router;
