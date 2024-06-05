import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, //THe ref is the id you will be refering to into which the Id you are trying to get
  userCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmmerseDB" }], // so for example the ref is recipes it can only get the ids that is stores in the recipes collection
});

//turns the schema into a collection
//the name of the collection is this VV
export const UserModel = mongoose.model("users", UserSchema);
