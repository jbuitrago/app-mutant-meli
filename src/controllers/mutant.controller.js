var MutantService = require("../services/mutant.services");
var HumanService = require("../services/human.services");

/**
* @param  {} req
 * @param  {} res
 * @param  {} next
  */
exports.postMutant = async function (req, res, next) {

  console.log(req.body.dna);
  const dna = {
    dna: req.body.dna,
  };

  try {

    return await MutantService.isMutant(req.body.dna).then((result) => {
      if (result) {
        return MutantService.saveMutant(dna).then((result2) => {
          if(result2){
            res.status(200).json({ status: 200,  message: "MUTANTE" });
          }else{
            res.status(200).json({ status: 200,  message: "MUTANTE-EXISTE" });
          }
        });
        
      } else {
        return HumanService.saveHuman(dna).then((result2) => {
          if(result2){
            res.status(403).json({ status: 403,  message: "HUMANO" });
          }else{
            res.status(403).json({ status: 403,  message: "HUMANO-EXISTE" });
          }
          
        });
      }
    });
  } catch (e) {

    return res.status(400).json({ status: 400, message: e.message });
  }
};

