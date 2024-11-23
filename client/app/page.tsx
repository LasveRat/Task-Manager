"use client";
import { useUserContext } from "@/context/userContext";

export default function Home() {
  const { logoutUser } = useUserContext();
  const name = "Rona";
  return (
    <main className="py-[5rem] mx-[10rem]">
      <header className="flex justify-between">
        <h1 className="text-[2rem] font-bold">
          Hey there , <span className="text-red-600">{name}</span> Welcome to
          the home page.
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
    </main>
  );
}
