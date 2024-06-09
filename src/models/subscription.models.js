import mongoose, {Schema} from 'mongoose';
import { type } from 'os';

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: 'User'
    },
    channel: {
        type: Schema.Types.ObjectId, // one to who is being subscribed
        ref: 'User'
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)