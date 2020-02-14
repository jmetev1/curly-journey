const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
});
const VisitSchema = new Schema({
  rep: String,
  date: String,
  purpose: String,
  materials: Array,
  amountSpent: Number,
  receiptID: String,
  providers: [String],
  clinic: String,
  clinicName: String,
});

const ProviderSchema = new Schema({
  name: String,
  ytdTotal: Number,
  type: String,
  clinic: String,
  rep: String,
});
const ClinicSchema = new Schema({
  name: String,
  providers: [String],
  address: String,
  rep: String,
});
const ReceiptSchema = new Schema({
  img: { data: Buffer, contentType: String },
  name: String,
});

module.exports = {
  ClinicModel: mongoose.model('ClinicModel', ClinicSchema),
  ProviderModel: mongoose.model('ProviderModel', ProviderSchema),
  ReceiptModel: mongoose.model('ReceiptModel', ReceiptSchema),
  VisitModel: mongoose.model('VisitModel', VisitSchema),
  UserModel: mongoose.model('UserModel', UserSchema),
};
