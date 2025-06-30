import React from "react";

export default function loading() {
  return (
    <section className="flex h-[90vh] items-center justify-center">
      <h2 className="font-manrope flex items-center bg-gradient-to-tr from-indigo-600 to-pink-600 bg-clip-text text-2xl font-extrabold text-transparent">
        L{" "}
        <div className="flex h-6 w-6 animate-spin items-center justify-center rounded-md bg-gradient-to-tr from-indigo-500 to-pink-500">
          <div className="h-4 w-4 rounded-md bg-white "></div>
        </div>
        ading...
      </h2>
    </section>
  );
}
