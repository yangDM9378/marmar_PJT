import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ClassDropDown() {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-m hover:bg-gray-50">
          놀이학습
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
        <Menu.Items className="absolute z-10 mt-4 right-[-25px] w-[145px] text-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/WordDifficulty"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-1 text-[18px]',
                  )}
                >
                  바르게 말하기
                </Link>
              )}
            </Menu.Item>
            <hr />
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/ClockDifficulty"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-1 text-[18px]',
                  )}
                >
                  시계 읽기
                </Link>
              )}
            </Menu.Item>
            <hr />
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/PictureDifficulty"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block pt-1 text-[18px]',
                  )}
                >
                  다른 그림 찾기
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
