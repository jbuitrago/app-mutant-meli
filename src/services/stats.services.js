var MutantDna = require('../models/mutant.model')
var HumanDna = require('../models/human.model')
var mongoose = require('mongoose')
/**
 * @param 
 */

exports.getStats = async function () {

    try {
        let count_mutants_dna = await MutantDna.estimatedDocumentCount();
        let count_humans_dna = await HumanDna.estimatedDocumentCount();
        let ratio =0;
        if(count_humans_dna>0){
            ratio =count_mutants_dna/count_humans_dna;
        }

        return {"count_mutants_dna":count_mutants_dna,"count_humans_dna":count_humans_dna,"ratio":ratio};
    } catch (e) {
        throw Error( e.message)
    }
}

