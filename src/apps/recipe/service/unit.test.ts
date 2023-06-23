import { prismaMock } from "../../../utils/client/singleton";
import { createRecipe, removeRecipe } from ".";

describe("recipe.service", () => {
  describe("create recipe", () => {
    test("should create recipe", async () => {
      const resolvedData = {
        id: 1,
        imageUrl: "",
        name: "Noodles",
        srcUrl: "",
      };

      prismaMock.recipe.create.mockResolvedValue(resolvedData);

      await expect(createRecipe(resolvedData)).resolves.toEqual({
        id: 1,
        imageUrl: "",
        name: "Noodles",
        srcUrl: "",
      });
    });

    test("should fail to create recipe w/o name", async () => {
      expect(createRecipe({})).rejects.toThrow();
    });

    test("should fail with empty name", () => {
      expect(createRecipe({ name: "" })).rejects.toThrow();
    });
  });

  describe("remove recipe", () => {
    test("it removes", () => {
      prismaMock.recipe.delete.mockResolvedValue({
        id: 1,
        imageUrl: "",
        name: "test",
        srcUrl: "",
      });

      expect(removeRecipe("1")).resolves.toEqual(1);
    });

    // Should be testing validateID instead
    test("it fails to remove", () => {
      expect(removeRecipe("a")).rejects.toThrow();
    });
  });
});
