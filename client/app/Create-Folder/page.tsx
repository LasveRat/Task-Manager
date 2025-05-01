"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateFolderPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSave = () => {
    const existing = JSON.parse(localStorage.getItem("customFolders") || "[]");
    const newFolder = { id: Date.now().toString(), name };
    localStorage.setItem(
      "customFolders",
      JSON.stringify([...existing, newFolder])
    );
    router.push("/"); // back to home or where you want
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create a New Folder</h1>
      <input
        type="text"
        placeholder="Folder name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
}
