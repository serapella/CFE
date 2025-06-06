import { NextResponse } from "next/server";
import { ingredientQueries } from "@/queries/ingredientQueries";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ingredient = await ingredientQueries.getById(Number(params.id));
    return NextResponse.json(ingredient);
  } catch (e) {
    console.error(e);
 