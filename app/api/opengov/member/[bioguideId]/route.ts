import { getMemberInfo } from "@/app/services/opengovService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { bioguideId: string } }
) {
  try {
    const memberId = params.bioguideId;
    const data = await getMemberInfo(memberId);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET function:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
