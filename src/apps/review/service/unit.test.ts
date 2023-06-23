import { prismaMock } from "src/utils/client/singleton";

import { createRecipeReview } from ".";

describe("review.service", () => {
  describe("creating review", () => {
    it("creates a review", () => {
      prismaMock.review.create.mockResolvedValue({
        id: 1,
        rating: 4,
        comment: null,
        recipeId: 1,
      });

      expect(
        createRecipeReview("1", {
          rating: 4,
        })
      ).resolves.toEqual({
        comment: null,
        id: 1,
        rating: 4,
        recipeId: 1,
      });
    });

    it("fails to create w/ no input", () => {
      expect(createRecipeReview("1", {})).rejects.toThrow();
    });

    it("fails to create w/ too high rating", () => {
      expect(
        createRecipeReview("1", {
          rating: 6,
        })
      ).rejects.toThrow();
    });

    it("fails to create w/ negative rating", () => {
      expect(
        createRecipeReview("1", {
          rating: -1,
        })
      ).rejects.toThrow();
    });
  });
});
