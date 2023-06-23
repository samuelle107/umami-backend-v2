function sandwich(url: string) {
  return `/${url}/`;
}

export function prependColon(id: string) {
  return `:${id}`;
}

export function createUrl(routes: string[]) {
  return sandwich(routes.join("/"));
}
