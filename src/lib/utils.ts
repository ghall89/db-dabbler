export function generateSlug(input: string): string {
  const slug = input.toLowerCase().split(' ').join('-');

  return slug;
}
