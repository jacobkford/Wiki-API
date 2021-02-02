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
});