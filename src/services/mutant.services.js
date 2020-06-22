var MutantDna = require("../models/mutant.model");
var MutantDetector = require("./mutantDetector");

/**
 * @param  {} dna
 */
exports.saveMutant = async function (dna) {
  try {
    const total = await MutantDna.findOne(dna).count();
    if (total > 0) {
      return false;
    } else {
      const mutant = new MutantDna(dna);
      return await mutant.save();
    }
  } catch (e) {
    return false;
  }
};
/**
 * @param  {} dna
 */
exports.isMutant = async function (dna) {
  try {
    return await MutantDetector.isMutant(dna);
  } catch (e) {
    throw Error("Error " + e.message);
  }
};
