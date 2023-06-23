export const routeIds = {
  review: ":reviewId",
  recipe: ":recipeId",
  category: ":categoryId",
};

const base = {
  recipes: "recipes",
  reviews: "reviews",
  categories: "categories",
};

const recipes = base.recipes;
const recipe = [base.recipes, routeIds.recipe].join("/");

const reviews = [recipe, base.reviews].join("/");
const review = [reviews, routeIds.review].join("/");

const categories = [recipe, base.categories].join("/");
const category = [categories, routeIds.category].join("/");

export const routes = {
  recipes,
  recipe,
  reviews,
  review,
  category,
  categories,
};
