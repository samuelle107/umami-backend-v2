import { object, ObjectSchema, string } from "yup";

import { RecipeCreate } from "./recipe.types";

const recipeCreateSchema: ObjectSchema<RecipeCreate> = object({
  name: string().required().max(255),
  imageUrl: string().max(255),
  srcUrl: string().max(255),
  description: string().max(255),
});

export default recipeCreateSchema;
