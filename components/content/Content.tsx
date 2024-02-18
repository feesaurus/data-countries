"use client";
import { useEffect, useState } from "react";
import * as MainService from "../../services/services/MainService";
import Image from "next/image";

interface IContext {
  name: string,
  isOpen: boolean,
  isClose: any,
  data: any
}

const Context: React.FC<IContext> = ({ name, isOpen, isClose, data }) => {
  const closeInfo = (e: any) => {
    isClose(false)
  }

  return (
    <>
      {isOpen && (
        <div className="overflow-x-hidden w-full absolute h-3/4 bottom-0 bg-[#454545] rounded-t-xl animate-[rotate_0.2s_ease-in] shadow-[0px_5px_15px_rgba(0, 0, 0, 0.35)]">
          <div
            className="translate-x-1/2 p-px cursor-pointer"
            onClick={closeInfo}
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
              />
            </svg>
          </div>
          <div className="sticky z-50 px-10 pt-2">
            <div className="flex gap-2">
              <p className="text-2xl font-semibold whitespace-nowrap w-[fit-content]">{name}</p>
              <div className="w-full flex align-middle">
                <Image alt="flag" width={20} height={20} src={data.flags?.svg} />
              </div>
            </div>
            <p className="text-sm font-normal">{data.capital}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Context;