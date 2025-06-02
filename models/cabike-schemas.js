const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CabikeUsers Schema
const CabikeUsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-]{10,15}$/, 'Please use a valid phone number'],
    sparse: true,
  },
  location: {
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true, default: 'USA' },
  },
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'CabikeVehicles',
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'CabikeVehicles',
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

CabikeUsersSchema.index({ email: 1 });

// CabikeVehicles Schema
const CabikeVehiclesSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  type: {
    type: String,
    required: true,
    enum: ['car', 'bike'],
    index: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    index: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
  },
  make: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  model: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  mileage: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, trim: true, default: 'USA' },
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
    maxlength: 2000,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'CabikeUsers',
    required: true,
    index: true,
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'VehicleImages',
  }],
  listedDate: {
    type: Date,
    default: Date.now,
  },
  carDetails: {
    type: {
      fuelType: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', null],
      },
      transmission: {
        type: String,
        enum: ['Automatic', 'Manual', 'CVT', 'Semi-Automatic', null],
      },
      bodyType: {
        type: String,
        enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Van', null],
      },
    },
    default: null,
    required: function() {
      return this.type === 'car';
    },
  },
  bikeDetails: {
    type: {
      engineSize: {
        type: Number,
        min: 50,
      },
      bikeType: {
        type: String,
        enum: ['Sport', 'Cruiser', 'Touring', 'Standard', 'Dual Sport', 'Off-Road', 'Scooter', null],
      },
    },
    default: null,
    required: function() {
      return this.type === 'bike';
    },
  },
}, { timestamps: true });

CabikeVehiclesSchema.index({ type: 1, 'location.city': 1, price: 1 });

// VehicleImages Schema
const VehicleImagesSchema = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'CabikeVehicles',
    required: true,
    index: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
    match: [/^https?:\/\/\S+$/, 'Please use a valid URL'],
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, {});

// FeaturedVehicles Schema
const FeaturedVehiclesSchema = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'CabikeVehicles',
    required: true,
    unique: true,
  },
  featureStartDate: {
    type: Date,
    default: Date.now,
  },
  featureEndDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

FeaturedVehiclesSchema.index({ featureEndDate: 1, priority: -1 });


// Purchases Schema
const purchaseSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'CabikeVehicles',
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

// models/cabike-schemas.js
const messageSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'CabikeUsers', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'CabikeVehicles', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = {
  CabikeUsers: mongoose.models.CabikeUsers || mongoose.model('CabikeUsers', CabikeUsersSchema),
  CabikeVehicles: mongoose.models.CabikeVehicles || mongoose.model('CabikeVehicles', CabikeVehiclesSchema),
  VehicleImages: mongoose.models.VehicleImages || mongoose.model('VehicleImages', VehicleImagesSchema),
  FeaturedVehicles: mongoose.models.FeaturedVehicles || mongoose.model('FeaturedVehicles', FeaturedVehiclesSchema),
  Purchases: mongoose.models.Purchases || mongoose.model('Purchases', purchaseSchema),
  CabikeMessages : mongoose.models.CabikeMessages || mongoose.model('CabikeMessages', messageSchema)
};