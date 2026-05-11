export async function onRequestGet({ env }) {
  const { keys } = await env.HABITS.list({ prefix: "habit:" });
  const habits = await Promise.all(
    keys.map(async ({ name }) => {
      const value = await env.HABITS.get(name);
      return JSON.parse(value);
    })
  );
  return Response.json(habits);
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  if (!name || !category) {
    return new Response("name and category are required", { status: 400 });
  }

  const id = crypto.randomUUID();
  const habit = { id, name, category };
  await env.HABITS.put(`habit:${id}`, JSON.stringify(habit));
  return Response.json(habit, { status: 201 });
}
