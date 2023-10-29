import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const greeting = "Hello World!!";
  const json = {
    greeting,
  };

  return NextResponse.json(json);
}
// export async function GET(request: NextRequest) {
//   const greeting = "Hello World!!";
//   const json = {
//     success: "234",
//   };

//   // exec("python3 myscript.py", (error, stdout, stderr) => {
//   //   if (error) {
//   //     console.error(`exec error: ${error}`);

//   //     return;
//   //   }
//   //   json.success = "123";
//   // });
//   return NextResponse.json(json);
// }

// export const runPythonScript = (
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     exec("python3 myscript.py", (error, stdout, stderr) => {
//       if (error) {
//         console.error(`exec error: ${error}`);
//         reject(error);
//         return;
//       }
//       resolve(stdout);
//     });
//   });
// };
// export default runPythonScript;
