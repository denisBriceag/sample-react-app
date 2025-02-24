export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export function sorted<T extends { key: string }>(
  items: T[],
  direction: SortDirection = SortDirection.ASC,
): T[] {
  if (direction === SortDirection.ASC) {
    return items.sort(
      (a: T, b: T) => parseInt(a.key, 10) - parseInt(b.key, 10),
    );
  }

  return items.sort((a: T, b: T) => parseInt(b.key, 10) - parseInt(a.key, 10));
}
