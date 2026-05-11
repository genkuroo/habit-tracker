export async function onRequestDelete({ env, params }) {
  const segments = Array.isArray(params.id) ? params.id : [params.id];
  if (segments.length !== 1) {
    return new Response("Not found", { status: 404 });
  }

  const id = segments[0];
  await env.HABITS.delete(`habit:${id}`);
  return new Response(null, { status: 204 });
}
