import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type MenuItemProps = {
  title: string;
  onClick: (event?: any) => void;
  className?: string;
  color?: string;
  icon: JSX.Element;
};
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
type Props = {
  color?: string;
  menuItems: MenuItemProps[];
};
export default function MenuItem({ menuItems, color }: Props) {
  return (
    <div className="text-right">
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <BsThreeDotsVertical color={color} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-fit right-0 drop-shadow-md z-[100] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {menuItems.map((menuItem: MenuItemProps, index: number) => (
              <div key={index} className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={menuItem.onClick}
                      className={clsx(
                        active
                          ? "bg-[#5956E9] text-white hover:fill-white"
                          : "text-gray-900",
                        "group flex w-full items-center rounded-md pl-1 pr-5 py-1 text-sm whitespace-nowrap z-50",
                        menuItem.className
                      )}
                    >
                      <div className={clsx("mx-2 h-5 w-5", menuItem.className)}>
                        {menuItem.icon}
                      </div>
                      <div className={menuItem.className}>{menuItem.title}</div>
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
