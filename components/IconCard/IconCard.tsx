import Link from 'next/link';

type IconCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  target: string;
  href: string;
  rel?: string;
};

const IconCard = ({
  title,
  subtitle,
  icon,
  target,
  rel,
  href,
}: IconCardProps) => {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className='cursor-pointer w-full max-w-xl lg:max-w-md text-center'
    >
      <article className='py-8 overflow-hidden rounded-lg shadow-lg hover:bg-secondary bg-primary text-white'>
        {icon}
        <div className='py-5'>
          <div className='py-2 font-bold text-2xl mb-2'>{title}</div>
          <p className='text-lg'>{subtitle}</p>
        </div>
      </article>
    </Link>
  );
};

export default IconCard;
