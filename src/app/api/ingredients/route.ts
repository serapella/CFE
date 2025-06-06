import { NextResponse } from "next/server";
import { ingredientQueries } from "@/queries/ingredientQueries";

export async function GET() {
  try {
    const ingredients = await ingredientQueries.getAll();
    return NextResponse.json(ingredients);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 