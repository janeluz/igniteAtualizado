export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-z]+)/g

  const pathWithParams = path.replaceAll(routeParametersRegex,'([a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
