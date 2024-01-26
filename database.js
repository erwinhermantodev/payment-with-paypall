const knex = require("knex");

const database = knex({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite",
  },
  useNullAsDefault: true,
});

async function setupDatabase() {
  // Create orders table if not exists
  const exists = await database.schema.hasTable("orders");
  if (!exists) {
    await database.schema.createTable("orders", (table) => {
      table.increments("id").primary();
      table.string("amount");
      table.string("currency");
      table.string("fullName");
      table.string("paymentGateway");
      table.json("paymentResult");
      table.timestamps(true, true);
    });
  }
}

async function saveOrderToDatabase(order) {
  const [orderId] = await database("orders").insert(order);
  return orderId;
}

async function getOrdersFromDatabase() {
  const orders = await database("orders").select();
  return orders;
}

module.exports = { setupDatabase, saveOrderToDatabase, getOrdersFromDatabase };
