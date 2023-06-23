function sandwich(url: string) {
  return `/${url}/`;
}

function prependColon(id: string) {
  return `:${id}`;
}

function createUrl(routes: string[]) {
  return sandwich(routes.join("/"));
}

export const routeIds = {
  review: "reviewId",
  recipe: "recipeId",
  category: "categoryId",
};

const base = {
  recipes: "recipes",
  reviews: "reviews",
  categories: "categories",
};

const recipes = base.recipes;
const recipe = [base.recipes, prependColon(routeIds.recipe)].join("/");
const reviews = [recipe, base.reviews].join("/");
const categories = [recipe, base.categories].join("/");

export const routes = {
  recipes: createUrl([recipes]),
  recipe: createUrl([recipes, prependColon(routeIds.recipe)]),
  reviews: createUrl([recipe, base.reviews]),
  review: createUrl([reviews, prependColon(routeIds.review)]),
  categories: createUrl([recipe, base.categories]),
  category: createUrl([categories, prependColon(routeIds.category)]),
};
