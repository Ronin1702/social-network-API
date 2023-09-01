const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
    {
        // Username field with validation
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: true,
            trim: true,
            minlength: [2, 'username must be at least 2 characters long'],
            maxlength: [20, 'username cannot be longer than 20 characters'],
        },
        // Email field with validation and a regular expression for further validation
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
            minlength: [6, 'email must be at least 6 characters long'],
            maxlength: [50, 'email cannot be longer than 50 characters'],
            //Replace regex with validate package library
            validate: [validator.isEmail, 'Please provide a valid email'],
            // match: [/([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))/, 'Must match an email address with a valid domain name!'],
        },
        // Array of thoughts, referencing the 'Thought' model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // Array of friends, referencing the 'User' model
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        // Use virtuals and remove _id in toJSON
        toJSON: {
            virtuals: true,
        },
        // Remove _id
        id: false,
        // Set the schema to use timestamps
        timestamps: true,
    }
);

// Virtual property to get the total count of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
