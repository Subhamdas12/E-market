const mongoose = require("mongoose");
const { Schema } = mongoose;
const brandSchema = new Schema({
  label: { type: String, require: true },
  value: { type: String, require: true },
});

brandSchema.virtual("id").get(function () {
  return this._id;
});
brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Brand = mongoose.model("Brand", brandSchema);
