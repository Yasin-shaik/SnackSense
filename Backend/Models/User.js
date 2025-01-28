import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  };
  
  export default mongoose.model('User', UserSchema);