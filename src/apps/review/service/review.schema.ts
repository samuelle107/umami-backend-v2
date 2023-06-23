import { Prisma } from "@prisma/client";
import { number, object, ObjectSchema, string } from "yup";

type ServiceSchema = ObjectSchema<Omit<Prisma.ReviewCreateInput, "recipe">>;

const reviewCreateSchema: ServiceSchema = object({
  comment: string().max(512),
  rating: number().min(0).max(5).required(),
});

export default reviewCreateSchema;
