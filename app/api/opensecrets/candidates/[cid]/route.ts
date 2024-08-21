import { candSummary } from "@/app/services/opensecretsService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cid: string } }
) {
  try {
    const data = await candSummary(params.cid);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET function:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
