// API route = endpoint/serverfunctie
// En een Server component = React component die data ophaalt/rendered op de server , is geen api route!

import { NextResponse } from 'next/server';
import { productQueries } from "@/queries/productQueries";
import { error } from "console";


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await productQueries.getById(Number(params.id));
    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
} 