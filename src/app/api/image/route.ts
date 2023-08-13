import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  console.log(data);

  console.log(request.headers);

  return NextResponse.json("have a response");
}
