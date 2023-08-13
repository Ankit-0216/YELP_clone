const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    console.log(results);
    console.log("rote handler ran");
    res.status(200).json({
      status: "open",
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(err);
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const results = await db.query("SELECT * FROM restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "close",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(err);
  }
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING * ",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "close",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(err);
  }
});

//update
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: "close",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(err);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
