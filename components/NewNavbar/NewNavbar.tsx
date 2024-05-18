'use client';

import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';

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

const NewNavbar: React.FC = () => {
  const pathname = usePathname();
  return (
    <Disclosure as='nav' className='bg-primary h-16'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
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
              <div className='flex flex-1 items-center justify-center sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <Logo />
                </div>
                <div className='hidden sm:ml-6 sm:block'>
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
                                    'rounded-md px-3 py-2 text-sm font-medium inline-flex items-center',
                                    item.href === pathname
                                      ? 'bg-gray-700 text-white'
                                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  )}
                                >
                                  {item.name}
                                  <ChevronDownIcon
                                    className={cn(
                                      open ? 'transform rotate-180' : '',
                                      'ml-2 h-5 w-5',
                                    )}
                                    aria-hidden='true'
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className='absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5'>
                                  <div
                                    className='py-1'
                                    role='menu'
                                    aria-orientation='vertical'
                                    aria-labelledby='options-menu'
                                  >
                                    {item.sublinks.map((sublink) => (
                                      <a
                                        key={sublink.name}
                                        href={sublink.href}
                                        className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white'
                                        role='menuitem'
                                      >
                                        {sublink.name}
                                      </a>
                                    ))}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        );
                      } else {
                        return (
                          <a
                            key={item.name}
                            href={item.href || '#'}
                            className={cn(
                              'rounded-md px-3 py-2 text-sm font-medium',
                              item.href === pathname
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            )}
                            aria-current={
                              item.href === pathname ? 'page' : undefined
                            }
                          >
                            {item.name}
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden absolute top-16 left-0 w-full bg-primary z-50'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => {
                if (item.sublinks) {
                  return (
                    <Disclosure as='div' key={item.name} className='space-y-1'>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={cn(
                              'block rounded-md px-3 py-2 text-base font-medium w-full text-left',
                              item.href === pathname
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            )}
                          >
                            {item.name}
                            <ChevronDownIcon
                              className={cn(
                                open ? 'transform rotate-180' : '',
                                'ml-2 h-5 w-5 inline-block',
                              )}
                              aria-hidden='true'
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            <div className='px-2 pt-2 pb-3 space-y-1'>
                              {item.sublinks.map((sublink) => (
                                <a
                                  key={sublink.name}
                                  href={sublink.href}
                                  className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                >
                                  {sublink.name}
                                </a>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  );
                } else {
                  return (
                    <a
                      key={item.name}
                      href={item.href || '#'}
                      className={cn(
                        'block rounded-md px-3 py-2 text-base font-medium',
                        item.href === pathname
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      )}
                      aria-current={item.href === pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
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
