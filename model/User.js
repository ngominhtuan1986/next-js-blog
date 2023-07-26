import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		favPosts: {
			type: [],
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Users || mongoose.model('Users', UserSchema);
