const { createCRUDRouter } = require("./crudRouter");
module.exports = createCRUDRouter("orders", "order_id");
