import photos from "../../content/photos.json";

interface Env {
    DB: D1Database;
    LIMITER: RateLimit;
    ALLOWED_ORIGINS: string;
}

const photoIds = new Set(photos.map((photo) => photo.id));
const VISITOR = /^[0-9a-f-]{36}$/i;

function cors(request: Request, env: Env): Record<string, string> {
    const origin = request.headers.get("Origin") ?? "";
    if (!env.ALLOWED_ORIGINS.split(",").includes(origin)) return {};
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        Vary: "Origin",
    };
}

const json = (body: unknown, headers: Record<string, string>, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });

async function countFor(env: Env, photoId: number) {
    const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM likes WHERE photo_id = ?")
        .bind(photoId)
        .first<{ n: number }>();
    return row?.n ?? 0;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const headers = cors(request, env);
        if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });

        const url = new URL(request.url);

        if (request.method === "GET" && url.pathname === "/likes") {
            const { results } = await env.DB.prepare(
                "SELECT photo_id, COUNT(*) AS n FROM likes GROUP BY photo_id"
            ).all<{
                photo_id: number;
                n: number;
            }>();
            const counts = Object.fromEntries(results.map((r) => [r.photo_id, r.n]));
            return json({ counts }, { ...headers, "Cache-Control": "public, max-age=30" });
        }

        const match = url.pathname.match(/^\/likes\/(\d+)$/);
        if (match && (request.method === "POST" || request.method === "DELETE")) {
            const ip = request.headers.get("CF-Connecting-IP") ?? "local";
            if (!(await env.LIMITER.limit({ key: ip })).success) return json({ error: "slow down" }, headers, 429);

            const photoId = Number(match[1]);
            const { visitor } = await request.json<{ visitor?: string }>().catch(() => ({ visitor: undefined }));
            if (!photoIds.has(photoId) || !visitor || !VISITOR.test(visitor)) {
                return json({ error: "bad request" }, headers, 400);
            }

            const statement =
                request.method === "POST"
                    ? "INSERT OR IGNORE INTO likes (photo_id, visitor) VALUES (?, ?)"
                    : "DELETE FROM likes WHERE photo_id = ? AND visitor = ?";
            await env.DB.prepare(statement).bind(photoId, visitor).run();
            return json({ count: await countFor(env, photoId), liked: request.method === "POST" }, headers);
        }

        return json({ error: "not found" }, headers, 404);
    },
};
