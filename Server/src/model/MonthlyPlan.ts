import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IMonthlyPlan extends Document {
    monthName: string;
    limit: number;
    user: mongoose.Types.ObjectId | IUser;
}

const MonthlyPlanSchema: Schema<IMonthlyPlan> = new mongoose.Schema({
    monthName: { type: String, required: true, unique: true },
    limit: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const MonthlyPlan: Model<IMonthlyPlan> = mongoose.model<IMonthlyPlan>('MonthlyPlan', MonthlyPlanSchema);