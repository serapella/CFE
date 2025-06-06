import { NextResponse } from "next/server";
import { reviewQueries } from "@/queries/reviewQueries";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const review = await reviewQueries.getById(Number(id));
    return NextResponse.json(review);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 