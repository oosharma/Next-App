import Image from "next/image";
import runPythonScript from "./api/hello/runPyScript";
import { useState } from "react";

export default async function Home() {
  const staticData = await fetch(`http://localhost:3000/api/hello`, {
    cache: "force-cache",
  });

  const staticDataJSON = await staticData.json();
  console.log("JSON.stringify(staticData, null, 2)");
  console.log(JSON.stringify(staticDataJSON, null, 2));
  const mockReq = {} as any; // Replace with actual data if necessary
  const mockRes = {
    status: (statusCode: number) => ({
      json: (data: any) => {
        console.log(data); // Handle the response data
      },
    }),
  } as any;
  await runPythonScript(mockReq, mockRes);

  console.log('completed"');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Auto Design Generator
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <img src="public/output.png" />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Abhishek Sharma
          </a>
        </div>
      </div>
    </main>
  );
}
