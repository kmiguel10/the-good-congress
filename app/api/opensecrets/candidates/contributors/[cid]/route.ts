import { candContrib } from "@/app/services/opensecretsService";
import { NextResponse } from "next/server";

export async function GET(
  requet: Request,
  { params }: { params: { cid: string } }
) {
  try {
    const data = await candContrib(params.cid);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET function:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
