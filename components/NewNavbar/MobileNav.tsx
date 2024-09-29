import React from 'react';
import { Disclosure } from '@headlessui/react';
import cn from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Rock_Salt } from 'next/font/google';
import { navigationItem } from './NewNavbar';

type MobileNavProps = {
  navigation: navigationItem[];
  pathname: string;
};

const rockSalt = Rock_Salt({ weight: ['400'], subsets: ['latin'] });

const MobileNav: React.FC<MobileNavProps> = ({ navigation, pathname }) => {
  return (
    <Disclosure.Panel className='absolute left-0 top-16 z-50 w-full h-screen bg-primary md:hidden'>
      {({ close }) => (
        <div className='flex flex-col items-center space-y-1 px-2 pb-3 pt-2'>
          {navigation.map((item) => {
            if (item.sublinks) {
              return (
                <Disclosure as='div' key={item.name} className='space-y-1'>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={cn(
                          'w-fit px-3 py-2 text-left text-base font-medium text-gray-300 shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300',
                          item.href === pathname
                            ? 'shadow-[0_2px_0_0_rgba(255,255,255,1)]'
                            : 'hover:shadow-[0_2px_0_0_rgba(255,255,255,1)]',
                          rockSalt.className,
                        )}
                      >
                        {item.name}
                        <ChevronDownIcon
                          className={cn(
                            open ? 'rotate-180 transform' : '',
                            'ml-2 inline-block h-5 w-5 transition-transform duration-300',
                          )}
                          aria-hidden='true'
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className='flex flex-col items-center space-y-1 px-2 pb-3 pt-2'>
                          {item.sublinks &&
                            item.sublinks.map((sublink) => (
                              <Link
                                key={sublink.name}
                                href={sublink.href}
                                className={cn(
                                  'w-fit px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white',
                                  rockSalt.className,
                                )}
                                onClick={() => close()}
                              >
                                {sublink.name}
                              </Link>
                            ))}
                        </div>
                      </Disclosure.Panel>
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
                    'w-fit px-3 py-2 text-base font-medium text-gray-300 shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300',
                    item?.href?.replace(/\/$/, '') ===
                      pathname.replace(/\/$/, '')
                      ? 'shadow-[0_2px_0_0_rgba(255,255,255,1)]'
                      : ' hover:text-white hover:shadow-[0_2px_0_0_rgba(255,255,255,1)]',
                    rockSalt.className,
                  )}
                  aria-current={
                    item?.href?.replace(/\/$/, '') ===
                    pathname.replace(/\/$/, '')
                      ? 'page'
                      : undefined
                  }
                  onClick={() => close()}
                >
                  {item.name}
                </Link>
              );
            }
          })}
        </div>
      )}
    </Disclosure.Panel>
  );
};

export default MobileNav;
