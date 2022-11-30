import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: Date,
    hashed_password: {
        type: String,
        requiered: 'Password is required'
    },
    salt: String
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

/* Schema Methods */
UserSchema.methods = {
    authenticate: (plainText) => {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: (password) => {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: () => {
        return Math.round(( new Date().valueOf() * Math.random() ))+ ''
    }
}

UserSchema.path('hashed_password').validate( function(v) {
    if( this._password && this._password < 6 ){
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if( this.isNew && !this._password ) {
        this.invalidate('password', 'Password is requierd');
    }
}, null)

/*
    UserSchema methods provide following functionality
    * authenticate: Very sign-in attemps, matches the calculated hash of the Provided text with the hashed_password property saved in the database
    * encryptPassword: Returns a hashed value from the provided plainText and salt, uses crypro Module from Node
    * makeSalt: Generates a unique Salt using the current Timestamp and Math.random()
*/

/* NOTE: Page:164 Full-Stack React Projects, second Edition **
The crypto module provides a range of cryptographic functionality, including some standard cryptographic hashing algorithms.
In our code, we use the SHA1 hashing algorithm and createHmac from crypto to generate the cryptographic HMAC hash from the 
password text and salt pair. 

Hashing algorithms generate the same hash for the same input value. But to ensure two users don't end up with the same hashed
password if they happen to use the same password text, we pair each password with a unique salt value before generating the
hashed password for each user. This will also make it difficult to guess the hashing algorithm being used because the same
user input is seemingly generating different hashes.
*/

export default mongoose.model('User', UserSchema);