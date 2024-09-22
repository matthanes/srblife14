'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';
import { Rock_Salt } from 'next/font/google';

const navigation = [
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
  const pathname = usePathname();

  return (
    <Disclosure as='nav' aria-label={'Main'} className='h-16 bg-primary'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 md:sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
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
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={cn(
                                    'inline-flex items-center px-3 py-2 text-sm font-medium  text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300',
                                    open ||
                                      item.sublinks.some(
                                        (sublink) =>
                                          sublink.href.replace(/\/$/, '') ===
                                          pathname.replace(/\/$/, ''),
                                      ) // If it is open or if any of the sublinks are the current page
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
                                <Disclosure.Panel className='absolute left-0 z-[1] mt-2 w-56 rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5'>
                                  <div
                                    className='flex flex-col gap-4 px-4 py-1'
                                    role='menu'
                                    aria-orientation='vertical'
                                    aria-labelledby='options-menu'
                                  >
                                    {item.sublinks.map((sublink) => {
                                      return (
                                        <Link
                                          key={sublink.name}
                                          href={sublink.href}
                                          className={cn(
                                            'py-2 text-sm text-gray-300 shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:text-white',
                                            sublink.href.replace(/\/$/, '') ===
                                              pathname.replace(/\/$/, '')
                                              ? 'shadow-[0_2px_0_0_rgba(255,255,255,1)]'
                                              : 'hover:shadow-[0_2px_0_0_rgba(255,255,255,1)]',
                                            rockSalt.className,
                                          )}
                                          role='menuitem'
                                          aria-current={
                                            sublink.href.replace(/\/$/, '') ===
                                            pathname.replace(/\/$/, '')
                                              ? 'page'
                                              : undefined
                                          }
                                        >
                                          {sublink.name}
                                        </Link>
                                      );
                                    })}
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
                              'rounded-md px-3 py-2 text-sm font-medium',
                              item.href === pathname
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              rockSalt.className,
                            )}
                            aria-current={
                              item.href === pathname ? 'page' : undefined
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

          {/* Mobile Nav */}
          <Disclosure.Panel className='absolute left-0 top-16 z-50 w-full bg-primary md:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => {
                if (item.sublinks) {
                  return (
                    <Disclosure as='div' key={item.name} className='space-y-1'>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={cn(
                              'block w-full rounded-md px-3 py-2 text-left text-base font-medium',
                              item.href === pathname
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
                            <div className='space-y-1 px-2 pb-3 pt-2'>
                              {item.sublinks.map((sublink) => (
                                <Link
                                  key={sublink.name}
                                  href={sublink.href}
                                  className={cn(
                                    'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white',
                                    rockSalt.className,
                                  )}
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
                        'block rounded-md px-3 py-2 text-base font-medium',
                        item.href === pathname
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        rockSalt.className,
                      )}
                      aria-current={item.href === pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                }
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NewNavbar;
