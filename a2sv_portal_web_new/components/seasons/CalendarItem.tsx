import React from "react";
import ActivityItem from "./ActivityItem";

type Props = {};

const CalendarItem = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-y-4 max-w-sm w-full">
        <div className="bg-white rounded-t">
          <h1 className="p-1 text-xl font-semibold">Calendar</h1>
          <div className="p-1 flex items-center justify-between">
            <span
              className="focus:outline-none  text-md font-semibold text-gray-100 dark:text-gray-800"
            >
              October 2022
            </span>
            <div className="flex items-center">
              <button
                aria-label="calendar backward"
                className="focus:text-gray-400 hover:text-gray-400 text-gray-100 dark:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="calendar forward"
                className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-100 dark:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler  icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-100 dark:text-[#8A8A8A]">
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="font-medium text-center">Mon</p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="font-medium text-center">Tue</p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="font-medium text-center">Wed</p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="font-medium text-center">Thu</p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="font-medium text-center">Fri</p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="font-medium text-center">Sat</p>
                    </div>
                  </th>
                  <th>
                    <div className="w-full flex justify-center">
                      <p className="font-medium text-center">Sun</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-xs text-gray-100 dark:text-gray-800">
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>1</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>2</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>3</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>4</p>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs text-gray-100 dark:text-gray-800">
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>5</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>6</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>7</p>
                    </div>
                  </td>
                  <td>
                    <div className="w-full h-full">
                      <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                        <a
                          role="link"

                          className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 w-8 h-8 flex items-center justify-center font-medium shadow-indigo-500 shadow-md text-white bg-indigo-700 rounded-full"
                        >
                          8
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>9</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>10</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>11</p>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs text-gray-100 dark:text-gray-800">
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>12</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>13</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>14</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>15</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>16</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>17</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>18</p>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs text-gray-100 dark:text-gray-800">
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>19</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>20</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>21</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>22</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>23</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>24</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>25</p>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs text-gray-100 dark:text-gray-800">
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>26</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>27</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>28</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>29</p>
                    </div>
                  </td>
                  <td>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                      <p>30</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="md:py-4 py-2 pb-8 rounded-b">
          <h1 className="p-1 pb-2 text-md font-semibold">
            Upcoming Activities
          </h1>
          <div className="flex flex-col gap-y-4">
            <ActivityItem />


            <div className="flex flex-col h-fit p-4 rounded-md bg-[#FFF0F0]">
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-[#FFADAD] w-4 h-4"></div>
                <p className="text-xs font-light text-gray-300 dark:text-[#8A8A8A]">
                  10:00: 11:00 AM
                </p>
              </div>
              <div>
                <a

                  className="focus:outline-none text-sm font-medium text-gray-100 dark:text-gray-900"
                >
                  Orientation session with new hires
                </a>
                <p className="text-xs text-gray-300 dark:text-[#636363]">
                  Discussion on UX sprint and Wireframe review
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between p-4 h-fit rounded-md bg-[#FFF8DF]">
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-[#FFDC60] w-4 h-4"></div>
                <p className="text-xs font-light text-gray-300 dark:text-[#8A8A8A]">
                  11:00: 12:00 PM
                </p>
              </div>
              <div>
                <a

                  className="focus:outline-none text-sm font-medium text-gray-100 dark:text-gray-900"
                >
                  Zoom call with design team
                </a>
                <p className="text-xs text-gray-300 dark:text-[#636363]">
                  Discussion on UX sprint and Wireframe review
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarItem;
