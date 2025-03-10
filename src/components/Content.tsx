"use client";
import Link from "next/link";
import React, { useState } from "react";

interface ContentProps {
  darkMode: boolean;
}

interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string }[];
    synonyms?: string[];
  }[];
  sourceUrls: string[];
}

const Content: React.FC<ContentProps> = ({ darkMode }) => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    if (!query.trim()) return;
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      if (!response.ok) throw new Error("Word not found");
      const data: DictionaryEntry[] = await response.json();
      setResult(data[0]);
    } catch (e) {
      setError((e as Error).message);
      console.error(e);
    }
  };

  const handlePlay = () => {
    const audioElement = document.getElementById(
      "audioPlayer"
    ) as HTMLAudioElement | null;

    if (audioElement) {
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <div className="w-full mx-auto max-w-sm md:max-w-6xl p-2">
      <div className="relative">
        <input
          placeholder="Search..."
          className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl  transition-all w-full outline-none bg-[#F4F4F4]"
          name="search"
          type="search"
          value={query}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="size-6 absolute top-3 right-12 text-gray-500"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-8">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-col gap-4">
              <h2
                className={`text-4xl font-bold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {result.word}
              </h2>
              <p className="italic text-[#9F49DE]">{result.phonetic}</p>
            </div>
            {result.phonetics && (
              <>
                <audio
                  id="audioPlayer"
                  src={result.phonetics[2]?.audio || ""}
                ></audio>
                <button
                  className="w-14 h-14 px-4 py-2 bg-purple-200 text-white rounded-full focus:border-4 border-gray-300"
                  onMouseDown={handlePlay}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="#9C48DD" d="M8 5.14v14l11-7z" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <ul className="list-disc mt-4">
            {result.meanings.map((meaning, index) => (
              <p key={index}>
                <div className="relative flex py-4 items-center gap-2">
                  <span>
                    <strong
                      className={`text-xl ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {meaning.partOfSpeech}
                    </strong>
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>
                <span className="text-gray-400">Meaning</span>
                {meaning.definitions.map((definition, index) => (
                  <>
                    <li
                      key={index}
                      className={`mt-4 ml-4 md:ml-8 text-sm ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {" "}
                      {definition.definition}{" "}
                    </li>
                  </>
                ))}
                {meaning.synonyms.map((syn, index) => (
                  <div className="flex mt-4 gap-4">
                    <span className="text-gray-400">Synonyms </span>
                    <p key={index} className="font-bold text-[#9F49DE]">
                      {" "}{syn}{" "}
                    </p>
                  </div>
                ))}
              </p>
            ))}
          </ul>
          <div className="flex-grow border-t border-gray-200 my-4"></div>
          <div className="flex gap-2">
            <span className="text-gray-400">Surce: </span>
            <Link href={result.sourceUrls}>{result.sourceUrls}</Link>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 32 32"
              >
                <path
                  fill="none"
                  stroke="#818181"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M22 3h7v7m-1.5-5.5L20 12m-3-7H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-9"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
