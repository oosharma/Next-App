import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const greeting = "Hello s!!";
  const json = {
    greeting,
  };
  console.log(request.url);
  const query = request.url.split("?")[1];
  const searchParams = new URLSearchParams(query);

  const address = searchParams.get("address");
  const priceBedBath = searchParams.get("priceBedBath");
  const builtUpLotSize = searchParams.get("builtUpLotSize");
  const fileName = searchParams.get("fileName");

  if (address == null || priceBedBath == null || builtUpLotSize == null) {
    console.log("returning from execute API call");
    return NextResponse.json(json);
  }
  json.greeting = await new Promise((resolve, reject) => {
    exec(
      `python myscript.py ${address} ${priceBedBath} ${builtUpLotSize} ${fileName}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          json.greeting = "err";
          reject(error);
        } else {
          json.greeting = "eee";
          console.log("stdout");
          console.log(stdout);
          resolve(stdout);
        }
      }
    );
  });

  console.log("inside get call");
  return NextResponse.json(json);
}
