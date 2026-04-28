import { NextResponse } from "next/server";
import { getCloudinarySignature } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body as { paramsToSign: Record<string, string> };

  const { signature } = await getCloudinarySignature(paramsToSign);

  return NextResponse.json({ signature });
}
