import { NextRequest, NextResponse } from "next/server";
import { productQueries } from "@/queries/productQueries"; // Adjust to ingredientQueries if needed

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await productQueries.getById(Number(id)); // Change to ingredientQueries if for ingredients
    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
