import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		cat: {
			type: String,
			default: 'Category',
		},
		img: {
			type: String,
		},
		userId: {
			type: String,
			required: true,
		},
		favUserId: {
			type: [],
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Posts || mongoose.model('Posts', PostSchema);
