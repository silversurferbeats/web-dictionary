'use client';
import React from "react";
import {getUserId} from "@/utils/user";
import { useSearchHistoryStore } from "@/store/useSearchHistoryStore";

const UserHistory: React.FC = () => {
  const user = getUserId();
  const history = useSearchHistoryStore(
    (state) => state.history.find((h) => h.user === user)?.searches || []
  );

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Search History</h2>
      <ul className="list-disc pl-5">
        {history.map(({ word, timestamp }, index) => (
          <li
            key={index}
            className="text-gray-600 group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
          >
            <span className="font-semibold">{word}</span> - {timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserHistory;
