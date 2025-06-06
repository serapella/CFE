import { NextResponse } from "next/server";
import { reviewQueries } from "@/queries/reviewQueries";

export async function GET() {
  try {
    const reviews = await reviewQueries.getAll();
    return NextResponse.json(reviews);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 