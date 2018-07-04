const mongoose = require('mongoose');

const factorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    numbers: [Number],
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line func-names
factorySchema.virtual('id').get(function() {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
factorySchema.set('toJSON', {
  virtuals: true,
});

// eslint-disable-next-line func-names
factorySchema.methods.generateNumbers = function(cb) {
  const randomNumbers = [];
  for (let x = 0; x < this.qty; x += 1) {
    randomNumbers.push(
      Math.floor(Math.random() * (this.max - this.min + 1) + this.min),
    );
  }
  this.numbers = randomNumbers;
  this.save();
  cb(this);
  // return this.model('Animal').find({ type: this.type }, cb);
};

const Factory = mongoose.model('Factory', factorySchema);
module.exports = Factory;
