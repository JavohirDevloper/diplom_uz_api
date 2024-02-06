const { hashSync } = require("bcryptjs");

const admins = [
  {
    fullname: "Muxammadiyev Javohir",
    role: "super_admin",
    email: "javohir@gmail.com",
    password: hashSync("1234", 10),
  },
  {
    fullname: "Super Admin",
    role: "super_admin",
    email: "superadmin@gmail.com",
    password: hashSync("1234", 10),
  },
  {
    fullname: "Admin",
    role: "admin",
    email: "admin@gmail.com",
    password: hashSync("1234", 10),
  },
  {
    fullname: "Baxa",
    role: "super_admin",
    email: "baxa@gmail.com",
    password: hashSync("1234", 10),
  },
];

module.exports = admins;
