import { NextRequest, NextResponse } from "next/server";
import { recipeQueries } from "@/queries/recipeQueries";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const recipe = await recipeQueries.getById(Number(id));
    return NextResponse.json(recipe);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
