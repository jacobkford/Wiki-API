/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require("../../models/user");
const userData = { email: "test@testmail.com", password: "Testy123" };

describe('User Model Test', () => {
    
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
    //Cleans up database between each test
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

    it('CREATE User - Success', async () => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password); 
    });

    // You shouldn't be able to add in any field that isn't defined in the schema
    it('FIELD Undefined - Fail', async () => {
        const userWithInvalidField = new User({ email: userData.email, password: userData.password, admin: 'true' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.admin).toBeUndefined();
    });

    // It should us told us the errors in on gender field.
    it('REQUIRED FIELD == Null - Fail', async () => {
        const userWithoutRequiredField = new User({ email: userData.email });
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

    it('DUPLICATE FIELD email - Fail', async () => {
        const firstUserWithSameEmail = new User({ email: userData.email, password: userData.password });
        const secondUserWithSameEmail = new User({ email: userData.email, password: "Hopefullythisfails1?" });
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
});

