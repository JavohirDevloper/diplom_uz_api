const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db");
const handleError = require("./shared/errors/handle");

// router routes
const UserRouter = require("./routers/user.router.js");
const ViewsRouter = require("./routers/views.router.js");
const IncomeRouter = require("./routers/income.router.js");
const SuperAdminRouter = require("./routers/super_admin.router.js");
const CategoryRouter = require("./routers/category.router.js");
const SubCategoryRouter = require("./routers/sub_category.router.js");
const FilesRouter = require("./routers/file.router.js");
dotenv.config();
const app = express();
// app use
app.use(express.json());
app.use(express.static("upload"));
app.use(cors());

// routers
app.use(UserRouter);
app.use(ViewsRouter);
app.use(IncomeRouter);
app.use(SuperAdminRouter);
app.use(CategoryRouter);
app.use(SubCategoryRouter);
app.use(FilesRouter);
// databaza
db();

// error handle
app.use(handleError);

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishladi :)`);
});
