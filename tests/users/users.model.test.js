/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require("../../models/user");
const userData = { email: "test@testmail.com", password: "Testy123" };

describe('User Model Test', () => {
    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
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

    it('should create and save user successfully', async () => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password); 
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but if one or more fields that are not defined in schema and should return undefined', async () => {
        const userWithInvalidField = new User({ email: 'newuser@jmail.com', password: 'password', admin: 'true' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.admin).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('should fail creating user without required field', async () => {
        const userWithoutRequiredField = new User({ email: 'newuser@jmail.net' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.password).toBeDefined();
    });

    it('creating two users with the same email should fail', async () => {
        const firstUserWithSameEmail = new User({ email: "notunique@fail.com", password: "Thisshouldfail123!" });
        const secondUserWithSameEmail = new User({ email: "notunique@fail.com", password: "Hopefullythisfails1?" });
        let err;
        try {
            firstUserWithSameEmail.save();
            const secondUser = await secondUserWithSameEmail.save();
            error = secondUser;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.mongo.MongoError);
        expect(err.keyValue.email).toBeDefined();
    });

    // Cleans up database between each test
    afterEach(async () => {
        await User.deleteMany()
    });

    afterAll(async (done) => {
        // Removes the User collection
        try {
            await mongoose.connection.db.dropDatabase(done)
            await mongoose.connection.close(done);
        } catch (err) {
            console.log(err);
        }
    });
});