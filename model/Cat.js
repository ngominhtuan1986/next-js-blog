import mongoose from 'mongoose';

const { Schema } = mongoose;

const CatSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Cats || mongoose.model('Cats', CatSchema);
