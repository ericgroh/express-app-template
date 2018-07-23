import User from '../models/user';

export default class UserService {

    findByEmail(email) {
        return User.findOne({ email });
    }

    createUser(email, password) {
        let newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        newUser.save((err) => {
            if (err) {
                throw err;
            }
            return;
        });
    }

    validateUser(user, password) {
        return new Promise( (resolve, reject) => {
            if (!user) {
                return reject(`User does not exist`);
            }
            if (user && !user.validPassword(password)) {
                return reject(`Incorrect password`);
            }
            resolve(user);
        });
    }
};
