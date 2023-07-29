const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  label: { type: String, require: true },
  value: { type: String, require: true },
});

categorySchema.virtual("id").get(function () {
  return this._id;
});
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Category = mongoose.model("Category", categorySchema);
