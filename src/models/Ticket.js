import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  exhibitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exhibition',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['active', 'refunded', 'used'],
    default: 'active'
  }
});

// Create a compound index to prevent duplicate ticket purchases
TicketSchema.index({ exhibitionId: 1, userId: 1 });

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket; 