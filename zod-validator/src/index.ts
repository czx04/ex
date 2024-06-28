import express from 'express'
import { z } from 'zod'

const app = express()
const PORT = 3000

app.use(express.json())

type User = {
    username: string
    email: string
    password: string,
    age: number,
    testnumber: number,
}

const userSchema = z.object({
    username: z.string().min(1, { message: 'must be at least 1 character' }).max(50),
    email: z.string().email({ message: 'invalid email address' }).min(1).max(50),
    password: z.string()
        .min(3, { message: 'Password must be at least 3 characters long' })
        .max(50, { message: 'Password must be at most 50 characters long' })
        .regex(/[a-z].*[a-z]/, { message: 'Password must contain at least 2 lowercase letters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least 1 uppercase letter' })
        .regex(/\d/, { message: 'Password must contain at least 1 number' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least 1 special character' }),
    age: z.number().gte(5).refine((age)=> age < 18, { message: 'must be > 18 age'}),
    // gte : min  lte : max 
    testnumber: z.number().superRefine((val, ctx) => {
        if (val < 10) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "should be >= 10",
            fatal: true,
          })
      
          return z.NEVER
        }
      
        if (val !== 12) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "should be twelve",
          })
        }
      })
})

const user: User = {
    username: 'mn',
    email: 'hungdu@gmail.com',
    password: 'aabA1!',
    age : 9,
    testnumber: 9
}

try {
    console.log(userSchema.parse(user))
} catch (e : any) {
    console.error(e.errors)
}


const stringPromise = z.string().promise() // Tạo schema cho Promise<string>

const myPromise: Promise<string> = Promise.resolve("djt con me met vcll")

// xác thực myPromise với schema
stringPromise.parse(myPromise)
  .then(validatedValue => {
    console.log("Validated value:", validatedValue)
    // if promise có giá trị là string thì in ro string k thì .catch ra lỗi 
  })
  .catch(error => {
    console.error("Validation failed:", error);
  })


app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})
