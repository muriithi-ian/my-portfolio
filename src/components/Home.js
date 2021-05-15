import React from "react";
import workspace from "../workspace.jpg";

export default function Home() {
  return (
    <main>
      <img
        src={workspace}
        alt="Work Space"
        className="fixed object-cover w-full h-full"
      />
      <section className="fixed flex justify-center min-h-screen  lg:pt-64 px-8">
        <h1 className="text-4xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name">
          Aloha. I'm Muriithi Ian. An Innovative Programmer and Internet Entrepreneur striving to unify the world through code. A creative thinker, proficient in software development and working with technologies for over
        </h1>
      </section>
    </main>
  );
}
