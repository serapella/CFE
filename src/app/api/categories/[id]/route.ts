import { NextRequest, NextResponse } from "next/server";
import { categoryQueries } from "@/queries/categoryQueries";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const category = await categoryQueries.getById(Number(id));
    return NextResponse.json(category);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
