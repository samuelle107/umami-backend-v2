export function validateId(id: string | undefined) {
  if (id === undefined) throw Error('Recipe ID is undefined');

  const parsedId = parseInt(id, 10);

  if (Number.isNaN(parsedId)) throw Error('Recipe ID is invalid');

  return parsedId;
}
