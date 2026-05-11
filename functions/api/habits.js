export function onRequest() {
  const habits = [
    { id: "1", name: "Read for 20 minutes", category: "learn" },
    { id: "2", name: "Walk outside", category: "health" },
    { id: "3", name: "Write a journal entry", category: "reflect" },
  ];
  return new Response(JSON.stringify(habits), {
    headers: { "content-type": "application/json" },
  });
}
