import supertest from "supertest"
import app from "../app"

describe("GET /api/books", () => {
  test("GET /api/books", (done) => {
    supertest(app)
      .get("/api/books")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data[0]).toHaveProperty('bookId')
        expect(res.status).toBe(200)
        expect(res.body)
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  //test for post
  test("POST /api/books", (done) => {
    supertest(app)
      .post("/api/books")
      .expect("Content-Type", /json/)
      .send({
        "bookId": 5,
        "dateUploaded": 1637529157659,
        "Title": "agadns;gad",
        "Author": "Bsdmf.ngfga",
        "datePublished": "2020-0-12T19:0455.455z",
        "Description": "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series",
        "pageCount": 574,
        "Genre": "d.m,fds.fd",
        "Publisher": "dgn;sdfj;aifg",
        "dateEdited": "1637532140585"
      })
      .expect(201)
      .expect((res) => {
        res.body.data.length > 0
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  //test for put
  test("PUT /api/books/2", (done) => {
    supertest(app)
      .put(`/api/books/2`)
      .expect("Content-Type", /json/)
      .send({
        "bookId": 5,
        "dateUploaded": 1637529157659,
        "Title": "agadns;gad",
        "Author": "Bsdmf.ngfga",
        "datePublished": "2020-0-12T19:0455.455z",
        "Description": "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series",
        "pageCount": 574,
        "Genre": "d.m,fds.fd",
        "Publisher": "dgn;sdfj;aifg",
        "dateEdited": "1637532140585"
      })
      .expect(200)
      .expect((res) => {
        res.body.data.length > 0;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
//test for delete
  test("DELETE /api/books/2", (done) => {
    supertest(app)
      .delete('/api/books/2')
      .expect("Content-Type", /json/)
      .send({
        "bookId": 5,
        "dateUploaded": 1637529157659,
        "Title": "agadns;gad",
        "Author": "Bsdmf.ngfga",
        "datePublished": "2020-0-12T19:0455.455z",
        "Description": "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series",
        "pageCount": 574,
        "Genre": "d.m,fds.fd",
        "Publisher": "dgn;sdfj;aifg",
        "dateEdited": "1637532140585"
      })
      .expect(200)
      .expect((res) => {
        res.body.data.length > 0
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

})