import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import redis from "../lib/cache";

const prisma = new PrismaClient();

class UserController {
    static async find(req: Request, res: Response) {
        try {
            const cacheKey = "users:all";

            const cachedUsers = await redis.get(cacheKey);

            if(cachedUsers) {
                console.log("Cached users");
                return res.json(JSON.parse(cachedUsers));
            }

            console.time("Find users");

            const users = await prisma.user.findMany();

            console.timeEnd("Find users");
            await redis.set(cacheKey, JSON.stringify(users))
            return res.json(users)
        } catch(e) {
            console.error(e);

            return res.json({
                error: e
            })
        }
    }
}

export default UserController;
