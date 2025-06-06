import { NextResponse } from "next/server";
import { categoryQueries } from "@/queries/categoryQueries";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await categoryQueries.getById(Number(params.id));
    return NextResponse.json(category);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 