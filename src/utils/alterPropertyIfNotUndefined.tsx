export const alterPropertyIfNotUndefined = (toAlter: Record<string, any>, properties: Record<string, any>) => {
  return Object.entries(properties).reduce((acc, [key, value]) => {
    return value !== undefined ? {
      ...acc,
      [key]: value,
    } : acc;
  }, toAlter);
}
