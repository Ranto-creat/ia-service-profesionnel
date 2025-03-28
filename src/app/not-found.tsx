"use client";

import Head from "next/head";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Non Trouvée | 404</title>
        <meta
          name="description"
          content="La page que vous recherchez n'existe pas."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
          <div className="animate-bounce">
            <svg
              className="mx-auto h-24 w-24 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">404</h1>
          <h2 className="mt-2 text-xl font-medium text-gray-700">
            Page Non Trouvée
          </h2>

          <p className="mt-4 text-gray-500">
            Désolé, la page que vous recherchez n existe pas ou a été déplacée.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 transform hover:scale-105"
            >
              Retour à l accueil
            </Link>

            <BackButton />
          </div>
        </div>
      </div>
    </>
  );
}
