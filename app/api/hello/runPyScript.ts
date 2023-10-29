import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

export const runPythonScript = (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  return new Promise((resolve, reject) => {
    exec("python3 myscript.py", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};
export default runPythonScript;
