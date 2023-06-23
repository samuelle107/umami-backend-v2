import { Prisma } from "@prisma/client";
import { object, ObjectSchema, string } from "yup";

const recipeCreateSchema: ObjectSchema<
  Omit<Prisma.RecipeCreateInput, "reviews" | "recipeCategories">
> = object({
  name: string().required().max(255),
  imageUrl: string().max(255),
  srcUrl: string().max(255),
});

export default recipeCreateSchema;
