import mongoose from 'mongoose';

const ExhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    required: [true, 'Please add an image path']
  },
  dateRange: {
    type: String,
    required: [true, 'Please add exhibition dates']
  },
  price: {
    type: Number,
    required: [true, 'Please add a ticket price']
  },
  capacity: {
    type: Number,
    required: [true, 'Please add total capacity']
  },
  ticketsSold: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Exhibition = mongoose.model('Exhibition', ExhibitionSchema);

export default Exhibition; 