import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseJsonField } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const posts = await prisma.post.findMany({
    where: category ? { category } : undefined,
    take: Math.min(limit, 50),
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return NextResponse.json(
    posts.map((p) => ({ ...p, tags: parseJsonField(p.tags) }))
  );
}
