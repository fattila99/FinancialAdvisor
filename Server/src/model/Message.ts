import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

interface IMessage extends Document {
    senderEmail: string;
    text: string;
    user: mongoose.Types.ObjectId | IUser;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema({
    senderEmail: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Message: Model<IMessage> = mongoose.model<IMessage>('Message', MessageSchema);