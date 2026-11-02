export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  return context.env.ASSETS.fetch(new URL('/api/courses.json', url));
}
