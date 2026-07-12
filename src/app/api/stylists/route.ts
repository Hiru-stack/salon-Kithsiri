import { NextResponse } from "next/server";
import { stylists } from "@/lib/data";

export async function GET() {
  return NextResponse.json(stylists);
}
