import { object, ObjectSchema, string } from "yup";

import { CategoryCreate } from "./category.types";

export const categoryCreateSchema: ObjectSchema<CategoryCreate> = object({
  category: string().required(),
});
