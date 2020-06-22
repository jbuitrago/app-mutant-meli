import { Router } from "express";
const router = Router();
const StatsController = require("../controllers/stats.controller");

router.get("/",StatsController.getMutants);


export default router;