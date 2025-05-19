import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL || '';

if (!DATABASE_URL) {
    throw new Error('Defina a variável de ambiente MONGODB_URI')
}

interface CachedMongoose {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: CachedMongoose | undefined;
}

const cached: CachedMongoose = globalThis.mongoose ?? { conn: null, promise: null };

if (!globalThis.mongoose) {
    globalThis.mongoose = cached;
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(DATABASE_URL as string, opts).then((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;