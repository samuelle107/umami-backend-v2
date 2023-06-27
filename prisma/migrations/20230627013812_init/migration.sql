-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipeId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
