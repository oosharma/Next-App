import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

//writing test GET request to see if running python works
export async function GET(request: NextRequest) {
  const stdout = await new Promise<string>((resolve, reject) => {
    exec(`python scripts/test.py "1" "2"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        console.log("success");
        console.log(stdout);
        resolve(stdout);
      }
    });
  });

  return new Response(stdout);
}
