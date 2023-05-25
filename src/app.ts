import express from "express";
import UserController from "./controllers/UserController";
import redis from "./lib/cache";

const app = express();

app.get("/", (req, res) => res.send("Hello! It's node-redis app."));

app.get("/users", UserController.find)

app.get("clear-cache", async (req, res) => {
    await redis.del("users.all");

    res.json({
        response: "Cache clear"
    })
})

app.listen(3000);
