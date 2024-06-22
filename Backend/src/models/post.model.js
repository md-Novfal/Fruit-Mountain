const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        postImage: {
            type: Buffer,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
        },
        isActive: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);
