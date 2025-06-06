import { NextResponse } from "next/server";
import { ingredientQueries } from "@/queries/ingredientQueries";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const ingredient = await ingredientQueries.getById(Number(id));
    return NextResponse.json(ingredient);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
