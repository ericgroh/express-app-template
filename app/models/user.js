import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let userSchema = mongoose.Schema({
    email: String,
    password: { type: String, select: false }
})

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default mongoose.model('User', userSchema);
