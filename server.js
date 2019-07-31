const express = require("express");
const app = express();
const path = require("path");
//const proxy = require("http-proxy-middleware");
const connectDB = require("./config/db.js");
//connect database
connectDB();
app.use(express.json({ extended: false }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });
//Init Middleware

const PORT = process.env.PORT || 9000;

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT} `);
});
