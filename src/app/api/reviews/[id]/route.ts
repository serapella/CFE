import { NextRequest, NextResponse } from "next/server";
import { reviewQueries } from "@/queries/reviewQueries";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const review = await reviewQueries.getById(Number(id));
    return NextResponse.json(review);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
