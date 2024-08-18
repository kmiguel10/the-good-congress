import { getCurrentCongress } from "@/app/services/opengovService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("TEST");
    const data = await getCurrentCongress();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET function:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
