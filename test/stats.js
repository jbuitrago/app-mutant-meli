let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "https://app-mutant-meli.herokuapp.com/api/v1";

describe("GET /api/v1/stats ", (suite) => {

  it("ESTADISTICAS", (done) => {
    chai
      .request(url)
      .get("/stats")
      .end(function (err, res) {
        expect(res.body.data.count_mutants_dna).to.be.a('Number');
        expect(res.body.data.count_humans_dna).to.be.a('Number');
        expect(res.body.data.ratio).to.be.a('Number');
        expect(res).to.have.status(200);
        done();
      });
  });
  
});
