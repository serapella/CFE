import { NextResponse } from "next/server";
import { recipeQueries } from "@/queries/recipeQueries";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = await recipeQueries.getById(Number(params.id));
    return NextResponse.json(recipe);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 