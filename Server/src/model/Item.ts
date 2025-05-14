import mongoose, { Document, Model, Schema } from 'mongoose';
import { IMonthlyPlan } from './MonthlyPlan';

interface IItem extends Document {
    name: string;
    amount: number;
    monthlyPlan: mongoose.Types.ObjectId | IMonthlyPlan;
}

const ItemSchema: Schema<IItem> = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    monthlyPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'MonthlyPlan', required: true }
});

export const Item: Model<IItem> = mongoose.model<IItem>('Item', ItemSchema);