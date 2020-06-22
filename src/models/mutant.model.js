var mongoose = require('mongoose')

const Schema = mongoose.Schema;
 
const MutantDnaSchema = new Schema({
  dna: Array
})

const MutantDna = mongoose.model('mutant_dna', MutantDnaSchema)
module.exports = MutantDna    