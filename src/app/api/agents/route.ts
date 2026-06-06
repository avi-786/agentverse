import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseJsonField } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const agents = await prisma.agent.findMany({
    where: category ? { category } : undefined,
    take: Math.min(limit, 50),
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
    include: { seller: { select: { id: true, name: true } } },
  });

  return NextResponse.json(
    agents.map((a) => ({
      ...a,
      techStack: parseJsonField(a.techStack),
      features: parseJsonField(a.features),
      useCases: parseJsonField(a.useCases),
    }))
  );
}
