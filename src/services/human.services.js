var HumanDna = require("../models/human.model");


/**
 * @param  {} dna
 */
exports.saveHuman = async function (dna) {
 

  try {
    const total = await HumanDna.findOne(dna).count();
    if( total>0){
      return false;
    }else{
      const human = new HumanDna(dna);
      return await human.save();
    }

  } catch (e) {
   
    return false;
  }
};