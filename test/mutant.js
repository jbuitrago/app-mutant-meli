let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "https://app-mutant-meli.herokuapp.com/api/v1";

describe("POST /api/v1/mutant: ", () => {

  it("ES HUMANO 403-FORBIDDEN", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAG","TATA","AGAG","TATA"]})
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("HUMANO");
        expect(res).to.have.status(403);
        done();
      });
  });
  it("ES HUMANO 403-FORBIDDEN", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAGT","TATAA","AGAGA","TATGG","AGAGA"]})
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("HUMANO");
        expect(res).to.have.status(403);
        done();
      });
  });
  it("ES HUMANO PERO EXISTE EN LA BASE DE DATOS 403-FORBIDDEN", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAG","TATA","AGAG","TATA" ]})
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("HUMANO-EXISTE");
        expect(res).to.have.status(403);
        done();
      });
  });
  it("ES HUMANO PERO EXISTE EN LA BASE DE DATOS 403-FORBIDDEN", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAGT","TATAA","AGAGA","TATGG","AGAGA"]})
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("HUMANO-EXISTE");
        expect(res).to.have.status(403);
        done();
      });
  });
  it("ES MUTANTE 200-OK", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAA","TATA","AGAA","TATA"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE");
        expect(res).to.have.status(200);
        done();
      });
  });
  it("ES MUTANTE 200-OK", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAAA","TATAA","AGAAG","TATAA","AGAGT"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE");
        expect(res).to.have.status(200);
        done();
      });
  });

  it("ES MUTANTE 200-OK", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAAA","TATAA","TGAAG","TATAA","AGAGT"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE");
        expect(res).to.have.status(200);
        done();
      });
  });
  it("ES MUTANTE 200-OK (10*10)", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","GGGGGGGGGG"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE");
        expect(res).to.have.status(200);
        done();
      });
  });
  it("ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAA","TATA","AGAA","TATA"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE-EXISTE");      
        expect(res).to.have.status(200);
        done();
      });
  });
  it("ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAAA","TATAA","AGAAG","TATAA","AGAGT"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE-EXISTE");
        expect(res).to.have.status(200);
        done();
      });
  });  
  it("ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAAA","TATAA","TGAAG","TATAA","AGAGT"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE-EXISTE");
        expect(res).to.have.status(200);
        done();
      });
  });  
  it("ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK (10*10)", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","GGGGGGGGGG"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("MUTANTE-EXISTE");
        expect(res).to.have.status(200);
        done();
      });
  });
  
  it("Error LETRA-INVALIDA (S) 400", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["SGAA","TATA","AGAA","TATA"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("Error LETRA-INVALIDA");
        expect(res).to.have.status(400);
        done();
      });
  });
  it("Error LETRA-INVALIDA (D) 400", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAA","TATA","DGAA","TATA"] })
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("Error LETRA-INVALIDA");
        expect(res).to.have.status(400);
        done();
      });
  });
  it("Error ARRAY-INVALIDO 400", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGA","TATA","DGAA","TATA"]})
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("Error ARRAY-INVALIDO");
        expect(res).to.have.status(400);
        done();
      });
  });
  it("Error ARRAY-INVALIDO 400", (done) => {
    chai
      .request(url)
      .post("/mutant")
      .send({"dna":["AGAA","TATA","DGAA"]})
      .end(function (err, res) {
        expect(res).to.be.json;
        expect(res.body.message).to.be.a('String');
        expect(res.body.message).to.be.equal("Error ARRAY-INVALIDO");
        expect(res).to.have.status(400);
        done();
      });
  });
});
