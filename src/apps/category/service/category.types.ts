import { Prisma } from '@prisma/client';

export type CategoryCreate = Omit<
  Prisma.CategoryCreateInput,
  'recipeCategories'
>;
