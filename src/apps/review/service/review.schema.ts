import { number, object, ObjectSchema, string } from "yup";

import { ReviewCreate } from "./review.types";

const reviewCreateSchema: ObjectSchema<ReviewCreate> = object({
  comment: string().max(512),
  rating: number().min(0).max(5).required(),
});

export default reviewCreateSchema;
