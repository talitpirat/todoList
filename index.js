import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world2",
  password: "0993612229zx",
  port: 5432
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let items = [];
(async () => {
  try {
    await db.connect();
  } catch (err) {
    console.log("Error fetching items:", err);
  }
})();

app.get("/", async(req, res) => {
  try{
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;
    res.render("index.ejs",{
      listTitle: "Today",
      listItems: items,
    })
  }catch(err){
    console.log("Error fetching:",err);
    res.render("index.ejs",{
      listTitle:"Today",
      listItems:[],
    })
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    items.push({ title: item });
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
  }
});

app.post("/delete", async(req, res) => {
  const itemDelete = req.body.deleteItemId;
  try{
    await db.query("DELETE FROM items WHERE id = $1",[itemDelete]);
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
