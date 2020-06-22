import { Router } from "express";
const router = Router();
const MutantController = require("../controllers/mutant.controller");

router.post("/",MutantController.postMutant);


module.exports = router;