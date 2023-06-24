export function validateId(id: number | string | undefined) {
  if (id === undefined) throw Error('ID is undefined');

  if (typeof id === 'number') return id;

  const parsedId = parseInt(id, 10);

  if (Number.isNaN(parsedId)) throw Error('ID is invalid');

  return parsedId;
}
