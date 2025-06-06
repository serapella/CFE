import { NextResponse } from "next/server";
import { categoryQueries } from "@/queries/categoryQueries";

export async function GET() {
  try {
    const categories = await categoryQueries.getAll();
    return NextResponse.json(categories);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
