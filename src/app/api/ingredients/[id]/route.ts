import { NextRequest, NextResponse } from "next/server";
import { ingredientQueries } from "@/queries/ingredientQueries"; // Adjust if needed

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const ingredient = await ingredientQueries.getById(Number(id)); // Use ingredientQueries
    return NextResponse.json(ingredient);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
