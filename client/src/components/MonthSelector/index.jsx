

function MonthSelector() {
  return (
    <div className="flex flex-row justify-start items-center flex-nowrap flex-grow-0 flex-shrink-0">
      <div className="flex flex-row justify-start items-start flex-nowrap flex-grow-0 flex-shrink-1 mb-4">
        <div>
          <div className="inline-block relative">
            <button type="button" tabIndex="0" className="flex items-center justify-center h-9 min-w-9 rounded-l-md bg-gray-200 text-gray-500 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-450 ease-in-out">
              <div className="relative">
                <span className="absolute inset-0" />
                <span className="relative px-3 font-medium">Prev</span>
              </div>
            </button>
          </div>
          <div className="inline-block relative">
            <button type="button" tabIndex="0" className="flex items-center justify-center h-9 min-w-9 rounded-r-md border border-gray-300 bg-gray-200 text-gray-500 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-450 ease-in-out">
              <div className="relative">
                <span className="absolute inset-0" />
                <span className="relative px-3 font-medium">Next</span>
              </div>
            </button>
          </div>
        </div>
        <div className="mt-[2px] ml-[-10px] mr-[10px] overflow-hidden whitespace-nowrap pl-[15px] text-2xl text-[#767a7d]">
          May 2023,
          {' '}
          <span className="text-[#afb4b4]">Current Month</span>
        </div>
      </div>
    </div>
  )
}

export default MonthSelector