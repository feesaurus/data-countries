"use client";
import { useState } from "react";
import * as MainService from "../../services/services/MainService";

interface IHeader {
  onDataChange: any
}

const Header: React.FC<IHeader> = ({ onDataChange }) => {
  const [list, setList] = useState<String[]>([])
  const [openList, setOpenList] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const data = e.target.value
    setInputValue(data)
    data.split("");
    if (data.length >= 3) {
      setOpenList(true);
      const res = await MainService.searchByName(data);
      if (res.status === 200) {
        const mappingList = res.data.map((item: any) => { return item.name.common });
        setList(mappingList);
      } else {
        setList([]);
      }
    } else {
      setOpenList(false);
      setList([]);
    }
  }

  const onClear = (e: any) => {
    onDataChange({
      name: "",
      position: [],
      zoom: null,
      open: false,
      dataFull: {}
    })
    setOpenList(false);
    setInputValue('')
    setList([]);
  }
  
  const onSubmit = async (e: any) => {
    const res = await MainService.getByName(e.target.textContent)
    if (res.length === 1) {
      onDataChange({
        name: res[0].name.common,
        position: res[0].latlng,
        zoom: 8,
        open: false,
        dataFull: res[0]
      })
    } else if (res.length > 1 && e.target.textContent === "United States") {
      onDataChange({
        name: res[2].name.common,
        position: res[2].latlng,
        zoom: 8,
        open: false,
        dataFull: res[2],
      });
    }
    setOpenList(false);
    setInputValue('')
    setList([]);
  }

  return (
    <div className="px-14 pt-4 w-full absolute">
      <div className="sticky top-4 rounded-md bg-[#454545] z-[51] h-14 p-3 inset-x-16 flex flex-row">
        <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          onChange={handleChange}
          value={inputValue}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 end-5 flex items-center ps-3">
          <div className="cursor-pointer" onClick={onClear}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 dark:text-gray-400">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
      {list.length !== 0 && openList &&
        <div className="sticky rounded-md bg-[#454545] z-[51] h-auto p-3 inset-x-16 flex flex-col max-h-96 overflow-y-auto shadow-[0px_5px_15px_rgba(0, 0, 0, 0.35)]">
          {
            list.map((item, index) => {
              return (
                <div key={index} className="cursor-pointer hover:bg-[#696666]" onClick={onSubmit}>
                  {item}
                </div>
              )
            })
          }
      </div>
      }
    </div>
  )
}

export default Header;