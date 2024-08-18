import { getMembersByCurrentCongress } from "@/app/services/opengovService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { congress: string } }
) {
  try {
    const congressNumber = params.congress;
    const data: Member[] = await getMembersByCurrentCongress(congressNumber);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET function:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
