import { NextResponse } from "next/server";
import { productQueries } from "@/queries/productQueries";
import { error } from "console";


export async function GET() {
  try {
    const products = await productQueries.getAll();
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 