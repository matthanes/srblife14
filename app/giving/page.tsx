import type { Metadata } from 'next';
import { FaRegUser, FaMailBulk, FaCcPaypal } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Giving | Schomburg Road Baptist Church Columbus, Georgia',
  description: 'Learn how to give to support our ministry and missions.',
  keywords: 'giving, paypal, tithe, offering, support',
};

export default function Giving() {
  return (
    <div className="bg-primary">
      <div className="min-h-screen-nav">
        <div className="text-4xl md:text-6xl bg-primary text-white text-center font-headings lg:px-32 md:px-12 py-8 lg:py-20 px-4 flex flex-wrap justify-center">
          <div className="text-4xl md:text-6xl inline-flex items-center px-1.5 md:px-3 py-2 md:py-0.5 border-2 border-white rounded-full font-semibold leading-4 bg-white text-primary">
            3
          </div>
          <div className="font-rock-salt text-3xl lg:text-5xl p[l-4 lg:pl-6 self-center">
            Ways to give
          </div>
        </div>

        <div className="bg-primary text-white text-center font-rock-salt lg:px-32 md:px-12 px-4 flex flex-wrap justify-center">
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2CMXSP4Q8PABU"
            target="_blank"
            className="text-3xl py-8 bg-primary text-white w-full lg:w-1/3 xl:px-12"
          >
            <FaCcPaypal className="block mx-auto pb-2" size="150" />
            <p className="font-rock-salt text-2xl px-6 py-4 lg:px-8 xl:px-12">
              Online
            </p>
          </a>
          <a className="text-3xl py-8 bg-primary text-white w-full lg:w-1/3">
            <FaRegUser className="block mx-auto pb-2" size="150" />
            <p className="font-rock-salt text-2xl px-6 py-4 lg:px-8 xl:px-12">
              In Person
            </p>
          </a>
          <a className="text-3xl py-8 bg-primary text-white w-full lg:w-1/3">
            <FaMailBulk className="block mx-auto pb-2" size="150" />
            <p className="font-rock-salt text-2xl px-6 py-4 lg:px-8 xl:px-12">
              By Mail
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
