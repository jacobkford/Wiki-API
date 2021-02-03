/* eslint-disable no-undef */
const express = require("express");
const Article = require("../../models/article");
const articleController = require("../../controllers/controllers").articleController;
const request = require("supertest");
const mongoose = require('mongoose');
const articleTestData = { title: "Test", content: "This is a test..." };
const articlePreTestData = [
    { title: "Success", content: "Hopefully this passes..." },
    { title: "Failure", content: "Hopefully this doesn't fail..." },
];

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.get("/articles", articleController.getMany);
app.post("/articles", articleController.postOne);
app.delete("/articles", articleController.deleteMany);

app.get("/articles/:articleTitle", articleController.getOne);
app.put("/articles/:articleTitle", articleController.putOne);
app.patch("/articles/:articleTitle", articleController.patchOne);
app.delete("/articles/:articleTitle", articleController.deleteOne);

describe('Article API Test', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1)
            }
        });
    });

    beforeEach(async (done) => {
        for (i = 0; i < articlePreTestData.length; i++) {
            const newArticle = new Article(articlePreTestData[i]);
            await newArticle.save((err) => {
                if (err) console.error(err);
            });
        }
        done();
    });

    afterEach(async (done) => {
        await Article.deleteMany(done);
    });

    afterAll(async (done) => {
        try {
            await mongoose.connection.db.dropDatabase(done)
            await mongoose.connection.close(done);
        } catch (err) {
            console.log(err);
        }
    });

    it("GET /articles - success", async () => {
        const { body } = await request(app).get("/articles");
        for (i = 0; i < body.length; i++) {
            expect(body[i]._id).toBeDefined();
            expect(body[i].title).toBe(articlePreTestData[i].title);
            expect(body[i].content).toBe(articlePreTestData[i].content);
        }
    });

    it("POST /articles - success", async () => {
        await request(app).post("/articles").send(articleTestData);
        await Article.findOne(
            { title: articleTestData.title },
            (err, article) => {
                if (err) {
                    console.error(err);
                } else {
                    expect(article.title).toBe(articleTestData.title);
                    expect(article.content).toBe(articleTestData.content);
                }
            }
        );
    });

    it("DELETE /articles - success", async () => {
        const { body } = await request(app).delete("/articles");
        expect(body).toEqual({
            status: "success",
            removed: "all",
            newLength: 0,
        });
    });

    it("GET /articles/Test - success", async () => {
        await request(app).post("/articles").send(articleTestData);
        const { body } = await request(app).get("/articles/" + articleTestData.title);
        expect(body._id).toBeDefined();
        expect(body.title).toBe(articleTestData.title);
        expect(body.content).toBe(articleTestData.content);
    });

    it("PUT /articles/Test - success", async () => {
        await request(app).post("/articles").send(articleTestData);
        const articlePutTestData = { title: "tseT", content: "...tset a si sihT" };
        await request(app).put("/articles/" + articleTestData.title
        ).send(articlePutTestData);

        const { body } = await request(app).get("/articles/" + articlePutTestData.title);

        expect(body._id).toBeDefined();
        expect(body.title).toBe(articlePutTestData.title);
        expect(body.content).toBe(articlePutTestData.content);
    });

    it("PATCH /articles/Test - success", async () => {
        await request(app).post("/articles").send(articleTestData);
        const articlePutTestData = { content: "...tset a si sihT" };
        await request(app).patch("/articles/" + articleTestData.title
        ).send(articlePutTestData);

        const { body } = await request(app).get("/articles/" + articleTestData.title);

        expect(body._id).toBeDefined();
        expect(body.title).toBe(articleTestData.title);
        expect(body.content).toBe(articlePutTestData.content);
    });

});