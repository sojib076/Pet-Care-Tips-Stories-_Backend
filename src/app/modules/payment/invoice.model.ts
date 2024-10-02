import { Schema, model } from 'mongoose';

const invoiceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    transactionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const InvoiceModel = model('Invoice', invoiceSchema);