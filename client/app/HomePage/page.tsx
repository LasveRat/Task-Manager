"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full bg-white ">
      <div className="flex justify-between items-center p-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Image
          src="/Logo-White.png"
          alt="logo"
          width={140}
          height={130}
          className="transition-all"
        />

        {/* Login & Register Buttons */}
        <div className="flex items-center space-x-4">
          <button
            className="text-white bg-blue-500 px-6 py-2 rounded-lg text-lg shadow-lg"
            onClick={() => router.push("/Login")}
          >
            Login
          </button>
          <button className="text-blue-500 bg-white px-6 py-2 rounded-lg text-lg shadow-lg">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between mt-10rem p-8 max-w-screen-2xl mx-auto mt-[10rem]">
      {/* Left Text Content */}
      <div className="max-w-lg">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Organize your work and life, finally.
        </h1>
        <p className="text-xl text-gray-600 mt-10 mb-10">
          Simplify life for both you and your team with the world's #1 task
          manager and to-do list app.
        </p>
        <div className="bg-blue-500 text-white px-6 py-2 text-lg text-center rounded-lg w-[10rem] h-[3rem]">
          Start for free
        </div>
      </div>

      {/* Right Image Content */}
      <div className="mt-6 md:mt-0 md:ml-8">
        <Image
          src="/App-img.png"
          alt="App Screenshot"
          width={1000}
          height={1000}
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

const DescriptionCard = ({
  title = "string",
  description = "string",
  imgSrc = "string",
  alt = "string",
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center justify-center">
        <Image src={imgSrc} alt={alt} width={200} height={200} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mt-4">{title}</h2>
      <p className="text-gray-600 mt-4">{description}</p>
    </div>
  );
};

const TrackProgress = () => {
  return (
    <div className=" bg-slate-100 p-8 rounded-lg shadow-md">
      <div className="flex items-center justify-center">
        <Image
          src="/Logo-White.png"
          alt="Track Progress"
          width={200}
          height={200}
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mt-4">Track progress</h2>
      <p className="text-gray-600 mt-4">
        Track the progress of the task and get notified on completion.
      </p>
    </div>
  );
};

const DescriptionSection = () => {
  return (
    // 3 description cards in center of the page
    <section className="flex flex-col items-center p-8 max-w-screen-xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        How it works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DescriptionCard
          title="Create a task"
          description="Create a task and add all the necessary details to it."
          imgSrc="/Logo-White.png"
          alt="Create Task"
        />
        <DescriptionCard
          title="Assign to team"
          description="Assign the task to your team members and set deadlines."
          imgSrc="/Logo-White.png"
          alt="Assign Task"
        />
        <DescriptionCard
          title="Track progress"
          description="Track the progress of the task and get notified on completion."
          imgSrc="/Logo-White.png"
          alt="Track Progress"
        />
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="bg-white">
      <Navbar />
      <HeroSection />
      <DescriptionSection />
      <TrackProgress />
    </div>
  );
}
