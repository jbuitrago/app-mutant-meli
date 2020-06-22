var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const HumanDnaSchema = new Schema({
    dna: Array
  })

const HumanDna = mongoose.model('human_dna', HumanDnaSchema)
module.exports = HumanDna    