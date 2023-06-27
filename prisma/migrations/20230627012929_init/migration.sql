-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255),
    "srcUrl" VARCHAR(255),
    "description" VARCHAR(255),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "recipeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("recipeId","categoryId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "comment" VARCHAR(512),
    "rating" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "recipe_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "ingredient" VARCHAR(255) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_unique" ON "Category"("category");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredient_uniqe" ON "Ingredient"("ingredient");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "recipe_rating_recipe_id_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
