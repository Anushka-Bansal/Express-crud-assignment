const express = require("express");
const app = express();
const PORT = 8899;

const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readFile("./Userdata.json", "utf-8", (err, json) => {
    res.render("home", { data: JSON.parse(json) });
    console.log(JSON.parse(json));
  });
});

app.post("/submit_data", (req, res) => {
  let usersjson = fs.readFileSync("./Userdata.json", "utf-8");
  let users = JSON.parse(usersjson);
  users.push(req.body);
  usersjson = JSON.stringify(users);
  fs.writeFileSync("./Userdata.json", usersjson, "utf-8");
  // console.log(req.body)
  res.redirect("/");
});

app.get("/delete/:id", function (req, res) {
  let a = [];
  fs.readFile("./Userdata.json", "utf-8", (err, data) => {
    if (err) throw err;
    a = JSON.parse(data);
    a.splice(req.params.id, 1);
    // console.log(a)
    fs.writeFile("./Userdata.json", `${JSON.stringify(a)}`, (err) => {
      if (err) throw err;
      res.end();
    });
    console.log(req.params.id);
  });
  res.redirect("back");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Work on ${PORT}`);
});
