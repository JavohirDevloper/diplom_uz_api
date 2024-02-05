const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db");
const handleError = require("./shared/errors/handle");
const UserRouter = require("./routers/user.router.js");
const ViewsRouter = require("./routers/views.router.js");
const IncomeRouter = require("./routers/income.router.js");
dotenv.config();
const app = express();
// app use
app.use(express.json());
app.use(cors());

// routers 
app.use(UserRouter);
app.use(ViewsRouter)
app.use(IncomeRouter);
// db
db();
// error handle
app.use(handleError);
//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishladi :)`);
});
