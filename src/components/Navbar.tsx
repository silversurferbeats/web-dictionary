"use client";

import { useState } from "react";
import UserHistory from "./UserHistory";
import { useSearchHistoryStore } from "@/store/useSearchHistoryStore";
import { getUserId } from "@/utils/user";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const user = getUserId();
  const [font, setFont] = useState<string>('serif');
  const [historyBar, setHistoryBar] = useState<boolean>(false);

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setFont(event.target.value);
    document.documentElement.style.setProperty("--font-family", event.target.value);
  }

  return (
    <nav className="w-full">
      <div className="mx-auto max-w-sm md:max-w-6xl">
        <div className="relative flex h-16 items-center justify-between items-stretch">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="#838383"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M27.23 4.5v15.9l2.72-3.63l2.73 3.63l-.05-15.89M12.7 4.5h-2.3c-1.1 0-2 .9-2 2v35c0 1.1.9 2 2 2h2.3"
                stroke-width="1"
              />
              <path
                fill="none"
                stroke="#838383"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12.7 4.5v39h24.9c1.1 0 2-.9 2-2v-35c0-1.1-.9-2-2-2z"
                stroke-width="1"
              />
            </svg>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-4">
              <button
                type="button"
                className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
                aria-expanded="false"
                onClick={() => setHistoryBar(!historyBar)}
              >
                <span>History</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {historyBar && (
              <div className="absolute left-[47rem] z-10 top-[3.5rem] flex w-screen max-w-max -translate-x-1/2 px-4">
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
                  <div className="p-4">
                    <UserHistory />
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    <button
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                      onClick={() =>
                        useSearchHistoryStore.getState().clearHistory(user)
                      }
                    >
                      <svg
                        className="size-5 flex-none text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Clear History
                    </button>
                    <button
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                      onClick={() => setHistoryBar(!historyBar)}
                    >
                      <svg
                        className="size-5 flex-none text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="relative ml-4">
              <form className="mx-auto">
                <label htmlFor="underline_select" className="sr-only">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  className="block py-2.5 px-0 w-full font-bold text-sm text-gray-500 bg-transparent border-0 border-r-2 border-gray-100 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  value={font}
                  onChange={handleFontChange}
                >
                  <option selected>Serif</option>
                  <option value="Sans-serif">Sans Serif</option>
                  <option value="Monospace">Monospace</option>
                </select>
              </form>
            </div>

            <div className="relative ml-4">
              <label className="inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={() => setDarkMode((prev) => !prev)}
                />
                <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300 dark:peer-checked:bg-gray-300"></div>
              </label>
            </div>

            <div className="relative ml-4">
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#fff"
                    d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64m-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48M58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M10.41 13.28C7.332 10.205 6.716 5.693 8.357 2c-1.23.41-2.256 1.23-3.281 2.256a10.4 10.4 0 0 0 0 14.768c4.102 4.102 10.46 3.897 14.562-.205c1.026-1.026 1.846-2.051 2.256-3.282c-3.896 1.436-8.409.82-11.486-2.256"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
