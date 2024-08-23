import { getLegislators } from "@/app/services/opensecretsService";
import { NextResponse } from "next/server";

//This will be called in the utils geCID function
export async function GET(
  request: Request,
  { params }: { params: { stateCode: string } }
) {
  try {
    const _stateCode = params.stateCode;
    const data = await getLegislators(_stateCode);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET function:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
