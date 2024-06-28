import express from 'express';
import { z } from 'zod';

const app = express();
const PORT = 3000;

app.use(express.json());

type User = {
    username: string;
    email: string;
    password: string;
};

const userSchema = z.object({
    username: z.string().min(1, { message: 'must be at least 1 character' }).max(50),
    email: z.string().email({ message: 'Invalid email address' }).min(1).max(50),
    password: z.string()
        .min(3, { message: 'Password must be at least 3 characters long' })
        .max(50, { message: 'Password must be at most 50 characters long' })
        .regex(/[a-z].*[a-z]/, { message: 'Password must contain at least 2 lowercase letters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least 1 uppercase letter' })
        .regex(/\d/, { message: 'Password must contain at least 1 number' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least 1 special character' })
});

const user: User = {
    username: 'mn',
    email: 'hungdugmail.com',
    password: 'aA1!'
};

try {
    console.log(userSchema.parse(user));
} catch (e : any) {
    console.error(e.errors);
}

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});