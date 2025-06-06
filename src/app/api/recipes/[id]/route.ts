import { NextResponse } from "next/server";
import { recipeQueries } from "@/queries/recipeQueries";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const recipe = await recipeQueries.getById(Number(id));
    return NextResponse.json(recipe);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 