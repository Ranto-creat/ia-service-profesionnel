"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="px-6 py-3 border border-gray-300 hover:border-indigo-500 text-gray-700 font-medium rounded-lg transition duration-200 hover:text-indigo-600"
    >
      Page précédente
    </button>
  );
}
