import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { createWriteStream } from "fs";

export async function GET(request: NextRequest) {
  const subheading_text1 = "11 Comet Cir, Union City, CA 94587";
  const subheading_text2 = "$638,888 | 3 Beds | 2 Baths";
  const subheading_text3 =
    "1,255 sq. ft. (Built-Up) | 1,975 sq. ft. (Lot Size)";
  const query = request.url.split("?")[1];
  const searchParams = new URLSearchParams(query);

  const address = searchParams.get("address");
  const price = searchParams.get("price");
  const bed = searchParams.get("bed");
  const bath = searchParams.get("bath");
  const builtUp = searchParams.get("builtUp");
  const lotSize = searchParams.get("lotSize");

  const image = await new Promise<string>((resolve, reject) => {
    exec(
      `python scripts/image-gen.py "${address}" "${price} | ${bed} Beds | ${bath} Baths" "${builtUp} sq.ft. (Built-Up) | ${lotSize} sq.ft. (Lot Size)"`,
      { maxBuffer: 1024 * 1024 * 100 }, // Set max buffer size to 10 MB
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
        } else {
          console.log("success");
          resolve(stdout);
        }
      }
    );
  });

  const base64String: string = image;
  const imageBuffer: Buffer = Buffer.from(base64String, "base64");

  // fs.writeFile("image.png", imageBuffer, (err) => {
  //   if (err) {
  //     console.error("Error saving image:", err);
  //   } else {
  //     console.log("Image saved successfully.");
  //   }
  // });

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
