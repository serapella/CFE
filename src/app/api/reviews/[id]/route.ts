import { NextResponse } from "next/server";
import { reviewQueries } from "@/queries/reviewQueries";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const review = await reviewQueries.getById(Number(params.id));
    return NextResponse.json(review);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 