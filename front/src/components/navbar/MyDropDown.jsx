/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/queries/useAuth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MyDropDown() {
  const { useLogOut, useStudentCheck, useTherapistCheck } = useAuth();
  const { data: student } = useStudentCheck();
  const { data: therapist } = useTherapistCheck();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-m text-gray-700 hover:bg-gray-50">
          <img src="logo.png" className="w-12 h-10 pt-1" />
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
        <Menu.Items className="absolute right-0 py-5 px-2 z-10 mt-2 w-36 origin-top-right rounded-md bg-[#8EB2FA] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            <Menu.Item>
              {({ active }) => (
                <div className="text-gray-700 text-sm px-4 py-2">
                  <span className="text-black font-extrabold">
                    {student ? student?.studentName : therapist?.therapistName}
                  </span>
                  님
                  <br />
                  반갑습니다.
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={student ? '/StudentMypage' : '/TherapistMypage'}
                  className={classNames(
                    active ? 'text-base' : '',
                    'block px-4 py-2 text-sm text-white',
                  )}
                >
                  마이페이지
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? 'text-base' : '',
                    'block px-4 py-2 text-sm text-white rounded-md w-full text-left',
                  )}
                  onClick={useLogOut}
                >
                  로그아웃
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
