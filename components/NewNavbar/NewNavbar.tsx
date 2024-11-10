'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';
import { Rock_Salt } from 'next/font/google';
import MobileNav from './MobileNav';

export type navigationItem = {
  name: string;
  href: string | null;
  sublinks?: { name: string; href: string }[];
};

const navigation: navigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'News', href: '/news' },
  { name: 'Youth', href: '/youth' },
  { name: 'Calendar', href: '/calendar' },
  {
    name: 'About Us',
    href: null,
    sublinks: [
      { name: 'Our Beliefs', href: '/ourbeliefs' },
      { name: 'Our Ministries', href: '/ourministries' },
      { name: 'Our Purpose', href: '/ourpurpose' },
    ],
  },
  { name: 'Salvation', href: '/salvation' },
  { name: 'Giving', href: '/giving' },
];

const rockSalt = Rock_Salt({ weight: ['400'], subsets: ['latin'] });

const NewNavbar: React.FC = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const pathname = usePathname();

  return (
    <Disclosure as='nav' aria-label={'Main'} className='h-16 bg-primary'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 md:sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button
                  onClick={() =>
                    setOpenMobileNav((openMobileNav) => !openMobileNav)
                  }
                  className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-white hover:text-white'
                >
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center md:justify-between'>
                <div className='flex flex-shrink-0 items-center'>
                  <Logo />
                </div>
                <div className='hidden md:ml-6 md:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => {
                      if (item.sublinks) {
                        return (
                          <Disclosure
                            as='div'
                            key={item.name}
                            className='relative'
                          >
                            {({ open, close }) => (
                              <>
                                <Disclosure.Button
                                  className={cn(
                                    'inline-flex items-center px-3 py-2 text-sm font-medium  text-gray-300 shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300',
                                    open ||
                                      (item.sublinks &&
                                        item.sublinks.some(
                                          (sublink) =>
                                            sublink.href.replace(/\/$/, '') ===
                                            pathname.replace(/\/$/, ''),
                                        )) // If it is open or if any of the sublinks are the current page
                                      ? 'shadow-[0_2px_0_0_rgba(255,255,255,1)]'
                                      : 'hover:shadow-[0_2px_0_0_rgba(255,255,255,1)]',
                                    rockSalt.className,
                                  )}
                                >
                                  {item.name}
                                  <ChevronDownIcon
                                    className={cn(
                                      open ? 'rotate-180 transform' : '',
                                      'ml-2 h-5 w-5 transition-transform duration-300',
                                    )}
                                    aria-hidden='true'
                                  />
                                </Disclosure.Button>
                                <Transition
                                  enter='transition duration-300 ease-out'
                                  enterFrom='transform scale-95 opacity-0'
                                  enterTo='transform scale-100 opacity-100'
                                  leave='transition duration-300 ease-out'
                                  leaveFrom='transform scale-100 opacity-100'
                                  leaveTo='transform scale-95 opacity-0'
                                >
                                  <Disclosure.Panel className='absolute left-0 z-[1] mt-2 w-56 rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5'>
                                    <div
                                      className='flex flex-col gap-4 px-4 py-1'
                                      role='menu'
                                      aria-orientation='vertical'
                                      aria-labelledby='options-menu'
                                    >
                                      {item.sublinks &&
                                        item.sublinks.map((sublink) => {
                                          return (
                                            <Link
                                              key={sublink.name}
                                              href={sublink.href}
                                              className={cn(
                                                'py-2 text-sm text-gray-300 shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:text-white',
                                                sublink.href.replace(
                                                  /\/$/,
                                                  '',
                                                ) ===
                                                  pathname.replace(/\/$/, '')
                                                  ? 'shadow-[0_2px_0_0_rgba(255,255,255,1)]'
                                                  : 'hover:shadow-[0_2px_0_0_rgba(255,255,255,1)]',
                                                rockSalt.className,
                                              )}
                                              role='menuitem'
                                              aria-current={
                                                sublink.href.replace(
                                                  /\/$/,
                                                  '',
                                                ) ===
                                                pathname.replace(/\/$/, '')
                                                  ? 'page'
                                                  : undefined
                                              }
                                              onClick={() => close()}
                                            >
                                              {sublink.name}
                                            </Link>
                                          );
                                        })}
                                    </div>
                                  </Disclosure.Panel>
                                </Transition>
                              </>
                            )}
                          </Disclosure>
                        );
                      } else {
                        return (
                          <Link
                            key={item.name}
                            href={item.href || '#'}
                            className={cn(
                              'px-3 py-2 text-sm font-medium text-gray-300 shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:text-white',
                              item?.href?.replace(/\/$/, '') ===
                                pathname.replace(/\/$/, '')
                                ? 'text-white shadow-[0_2px_0_0_rgba(255,255,255,1)]'
                                : ' hover:text-white hover:shadow-[0_2px_0_0_rgba(255,255,255,1)]',
                              rockSalt.className,
                            )}
                            data-test-data={item.href}
                            aria-current={
                              item?.href?.replace(/\/$/, '') ===
                              pathname.replace(/\/$/, '')
                                ? 'page'
                                : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Transition
            show={openMobileNav}
            enter='transition-opacity duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <MobileNav
              navigation={navigation}
              pathname={pathname}
              setOpenMobileNav={setOpenMobileNav}
            />
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default NewNavbar;
