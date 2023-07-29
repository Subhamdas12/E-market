const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  title: { type: String, require: true, unique: true },
  description: { type: String, require: true },
  price: {
    type: Number,
    min: [0, "wrong min price"],
    max: [300000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [99, "Wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong maxrating"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "wrong min rating"],
    default: 0,
  },
  brand: { type: String, require: true },
  category: { type: String, require: true },
  thumbnail: { type: String, require: true },
  images: { type: [String], require: true },
  deleted: { type: Boolean, default: false },
});
productSchema.virtual("id").get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Product = mongoose.model("Product", productSchema);
