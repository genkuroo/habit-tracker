export function onRequest() {
  const body = {
    status: "ok",
    time: new Date().toISOString(),
  };
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json" },
  });
}
