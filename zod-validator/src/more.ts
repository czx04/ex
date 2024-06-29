import { z } from "zod"

// Tạo schema cho chuỗi
const stringSchema = z.string()

// 1. .parse
try {
  console.log(stringSchema.parse("hello")) // "hello"
  console.log(stringSchema.parse(42)) // throws an error
} catch (error) {
  console.error("parse:", error)
}

// 2. .parseAsync
const asyncSchema = z.string()
async function parseAsyncExample() {
  try {
    console.log(await asyncSchema.parseAsync("hello")) // "hello"
    console.log(await asyncSchema.parseAsync(42)) // throws an error
  } catch (error) {
    console.error("parseAsync:", error)
  }
}
parseAsyncExample()

// 3. .safeParse
const safeSchema = z.string()
const safeResult = safeSchema.safeParse("hello")
if (safeResult.success) {
  console.log("safeParse:", safeResult.data) // "hello"
} else {
  console.error("safeParse:", safeResult.error)
}

// 4. .safeParseAsync
const safeAsyncSchema = z.string()
async function safeParseAsyncExample() {
  const safeAsyncResult = await safeAsyncSchema.safeParseAsync("hello")
  if (safeAsyncResult.success) {
    console.log("safeParseAsync:", safeAsyncResult.data) // "hello"
  } else {
    console.error("safeParseAsync:", safeAsyncResult.error)
  }
}
safeParseAsyncExample()

// 5. .refine
const numberSchema = z.number().refine(val => val > 10, {
  message: "Number must be greater than 10",
})
try {
  console.log(numberSchema.parse(5)) // throws an error
  console.log(numberSchema.parse(15)) // 15
} catch (error) {
  console.error("refine:", error)
}

// 6. .superRefine
const superRefineSchema = z.number().superRefine((val, ctx) => {
  if (val < 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Number must be greater than 10",
    })
  }
})
try {
  console.log(superRefineSchema.parse(5)) // throws an error
  console.log(superRefineSchema.parse(15)) // 15
} catch (error) {
  console.error("superRefine:", error)
}

// 7. .transform
const transformSchema = z.string().transform(val => val.toUpperCase())
console.log("transform:", transformSchema.parse("hello")) // "HELLO"

// 8. .default
const defaultSchema = z.string().default("default value")
console.log("default:", defaultSchema.parse(undefined)) // "default value"
console.log("default:", defaultSchema.parse("hello")) // "hello"

// 9. .describe
const describedSchema = z.string().describe("A simple string schema")
console.log("describe:", describedSchema.description) // "A simple string schema"

// 10. .catch
const catchSchema = z.string().catch("default value")
console.log("catch:", catchSchema.parse("hello")) // "hello"
console.log("catch:", catchSchema.parse(42)) // "default value"

// 11. .optional
const optionalSchema = z.string().optional()
console.log("optional:", optionalSchema.parse(undefined)) // undefined
console.log("optional:", optionalSchema.parse("hello")) // "hello"

// 12. .nullable
const nullableSchema = z.string().nullable()
console.log("nullable:", nullableSchema.parse(null)) // null
console.log("nullable:", nullableSchema.parse("hello")) // "hello"

// 13. .nullish
const nullishSchema = z.string().nullish()
console.log("nullish:", nullishSchema.parse(null)) // null
console.log("nullish:", nullishSchema.parse(undefined)) // undefined
console.log("nullish:", nullishSchema.parse("hello")) // "hello"

// 14. .array
const arraySchema = z.string().array()
console.log("array:", arraySchema.parse(["hello", "world"])) // ["hello", "world"]

// 15. .promise
const promiseSchema = z.string().promise()
const promiseValue = Promise.resolve("hello")
promiseSchema.parseAsync(promiseValue).then(result => console.log("promise:", result)) // "hello"

// 16. .or
const orSchema = z.string().or(z.number())
console.log("or:", orSchema.parse("hello")) // "hello"
console.log("or:", orSchema.parse(42)) // 42

// 17. .and
const andSchema = z.string().and(z.string().min(5))
console.log("and:", andSchema.parse("hello")) // "hello"
console.log("and:", andSchema.parse("hi")) // throws an error

// 18. .brand
const brandedSchema = z.string().brand<"MyBrand">()
type MyBrand = z.infer<typeof brandedSchema>

// 19. .readonly
const readonlySchema = z.object({
  name: z.string(),
  age: z.number(),
}).readonly()

// 20. .pipe
const pipeSchema = z.string().pipe(z.number())
console.log("pipe:", pipeSchema.parse("123")) // 123
console.log("pipe:", pipeSchema.parse("hello")) // throws an error