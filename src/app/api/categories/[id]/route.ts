import { NextResponse } from "next/server";
import { categoryQueries } from "@/queries/categoryQueries";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const category = await categoryQueries.getById(Number(id));
    return NextResponse.json(category);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 