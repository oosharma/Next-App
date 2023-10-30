import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { createWriteStream } from "fs";

// export async function GET(request: NextRequest) {
//   const greeting = "Hello s!!";
//   const json = {
//     greeting,
//   };
//   console.log(request.url);
//   const query = request.url.split("?")[1];
//   const searchParams = new URLSearchParams(query);

//   const address = searchParams.get("address");
//   const priceBedBath = searchParams.get("priceBedBath");
//   const builtUpLotSize = searchParams.get("builtUpLotSize");
//   const fileName = searchParams.get("fileName");

//   if (address == null || priceBedBath == null || builtUpLotSize == null) {
//     console.log("returning from execute API call");
//     return NextResponse.json(json);
//   }
//   json.greeting = await new Promise((resolve, reject) => {
//     exec(
//       `python myscript.py ${address} ${priceBedBath} ${builtUpLotSize} ${fileName}`,
//       (error, stdout, stderr) => {
//         if (error) {
//           console.error(`exec error: ${error}`);
//           json.greeting = "err";
//           reject(error);
//         } else {
//           json.greeting = "eee";
//           console.log("stdout");
//           console.log(stdout);
//           resolve(stdout);
//         }
//       }
//     );
//   });

//   console.log("inside get call");
//   return NextResponse.json(json);
// }

// export async function GET(request: NextRequest) {
//   const greeting = "Hello s!!";
//   const json = {
//     greeting,
//   };

//   await new Promise((resolve, reject) => {
//     exec(`python myscript.py a a a a`, (error, stdout, stderr) => {
//       if (error) {
//         json.greeting = "myscript failed";
//         reject(error);
//       } else {
//         json.greeting = "myscript executed successfully";
//         resolve(stdout);
//       }
//     });
//     json.greeting = "outside ms1";
//     exec(
//       `python myscript-2.py ${new Date().toUTCString()}`,
//       (error, stdout, stderr) => {
//         if (error) {
//           json.greeting = "myscript-2 failed";
//           reject(error);
//         } else {
//           json.greeting = "myscript-2 executed successfully";
//           resolve(stdout);
//         }
//       }
//     );
//     json.greeting = "outside ms2";
//   });
//   const image = fs.readFileSync("output.png");

//   return NextResponse.json(json);
// }
// export async function GET(request: NextRequest) {
//   const subheading_text1 = "4226 Comet Cir, Union City, CA 94587";
//   const subheading_text2 = "$638,888 | 3 Beds | 2 Baths";
//   const subheading_text3 =
//     "1,255 sq. ft. (Built-Up) | 1,975 sq. ft. (Lot Size)";

//   const image = await new Promise((resolve, reject) => {
//     exec(
//       `python3 image-gen.py "${subheading_text1}" "${subheading_text2}" "${subheading_text3}"`,
//       { maxBuffer: 1024 * 1024 * 10 }, // Set max buffer size to 10 MB
//       (error, stdout, stderr) => {
//         if (error) {
//           console.error(`exec error: ${error}`);
//           reject(error);
//         } else {
//           console.log(`stdout: ${stdout}`);
//           console.error(`stderr: ${stderr}`);
//           resolve(stdout);
//         }
//       }
//     );
//   });

//   return new Response(image, {
//     headers: {
//       "Content-Type": "image/png",
//     },
//   });
// }
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
      `python image-gen.py "${address}" "${price} | ${bed} Beds | ${bath} Baths" "${builtUp} sq.ft. (Built-Up) | ${lotSize} sq.ft. (Lot Size)"`,
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
  //   "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQIHWP4//8/AAX+Av7czFnnAAAAAElFTkSuQmCC";
  const imageBuffer: Buffer = Buffer.from(base64String, "base64");

  // fs.writeFile("image.png", imageBuffer, (err) => {
  //   if (err) {
  //     console.error("Error saving image:", err);
  //   } else {
  //     console.log("Image saved successfully.");
  //   }
  // });

  // await fs.promises.writeFile(
  //   "output_image222.png",
  //   "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQIHWP4//8/AAX+Av7czFnnAAAAAElFTkSuQmCC"
  // );
  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
