const db = require("./db.service");
const helper = require("../utils/helper.util");
const config = require("../configs/general.config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT t.* 
    FROM transactions t inner join customers c on t.customer_id = c.customer_id LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const transactions = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    transactions,
    meta,
  };
}

async function create(transactions) {
  const result = await db.query(
    `INSERT INTO transactions
    (customer_id, total_price, currency, credit_card_type, credit_card_number) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [transactions.customer_id, transactions.total_price, transactions.currency, transactions.credit_card_type, transactions.credit_card_number]
  );

  let message = "Error in creating transaction";

  if (result.affectedRows) {
    message = "Transaction created successfully";
  }

  return { message };
}

async function update(id, transaction) {
  const result = await db.query(
    `UPDATE transactions 
    SET customer_id=?, total_price=?, currency:=?, credit_card_type=?, 
    credit_card_number=?
    WHERE id=?`,
    [transaction.customer_id, transaction.total_price, transaction.currency, transaction.credit_card_type, transaction.credit_card_number, id]
  );

  let message = "Error in updating transaction ";

  if (result.affectedRows) {
    message = "Transaction updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM transactions WHERE id=?`, [id]);
  console.log("asda", id);
  let message = "Error in deleting transaction";

  if (result.affectedRows) {
    message = "Transaction deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
