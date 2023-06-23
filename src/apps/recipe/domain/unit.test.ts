import { prismaMock } from "../../../utils/client/singleton";
import { createRecipe } from ".";

test("should create recipe", async () => {
  const data = {
    id: 1,
    imageUrl: "",
    name: "",
    srcUrl: "",
  };

  prismaMock.recipe.create.mockResolvedValue(data);

  await expect(createRecipe(data)).resolves.toEqual({
    id: 1,
    imageUrl: "",
    name: "",
    srcUrl: "",
  });
});
