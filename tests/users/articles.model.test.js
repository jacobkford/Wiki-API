/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Article = require("../../models/article");
const articleData = { title: "Test", content: "This is a test..." };

describe('Article Model Test', () => {

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
    // Cleans up database between each test
    afterEach(async () => {
        try {
            await Article.deleteMany()
        } catch (err) {
            console.log(err);
        }
    });

    afterAll(async (done) => {
        // Removes the User collection
        try {
            await mongoose.connection.db.dropDatabase(done)
            mongoose.connection.close();
        } catch (err) {
            console.log(err);
        }
    });

    it('should create and save article successfully', async () => {
        const validArticle = new Article(articleData);
        const savedArticle = await validArticle.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedArticle._id).toBeDefined();
        expect(savedArticle.title).toBe(articleData.title);
        expect(savedArticle.content).toBe(articleData.content); 
    });

    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert article successfully, but if one or more fields that are not defined in schema and should return undefined', async () => {
        const articleWithInvalidField = new Article({ title: articleData.title, content: articleData.content, admin: 'true' });
        const savedArticleWithInvalidField = await articleWithInvalidField.save();
        expect(savedArticleWithInvalidField._id).toBeDefined();
        expect(savedArticleWithInvalidField.admin).toBeUndefined();
    });

    // It should us told us the errors in on gender field.
    it('should fail creating article without required field', async () => {
        const articleWithoutRequiredField = new Article({ title: articleData.title });
        let err;
        try {
            const savedArticleWithoutRequiredField = await articleWithoutRequiredField.save();
            error = savedArticleWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.content).toBeDefined();
    });
});