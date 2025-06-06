import { NextResponse } from "next/server";
import { recipeQueries } from "@/queries/recipeQueries";

export async function GET() {
  try {
    const recipes = await recipeQueries.getAll();
    return NextResponse.json(recipes);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 