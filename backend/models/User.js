const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: Buffer, require: true },
  addresses: { type: [Schema.Types.Mixed] },
  role: { type: String, require: true, default: "user" },
  name: { type: String },
  salt: { type: Buffer },
});
userSchema.virtual("id").get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtual: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.User = mongoose.model("User", userSchema);
