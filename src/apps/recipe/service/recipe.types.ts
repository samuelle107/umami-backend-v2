import { Prisma } from '@prisma/client';

export type RecipeCreate = Omit<
  Prisma.RecipeCreateInput,
  'reviews' | 'recipeCategories' | 'user'
>;
