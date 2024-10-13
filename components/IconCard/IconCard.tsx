import Link from 'next/link';

type IconCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  target: string;
  href?: string;
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
  const content = (
    <article className='overflow-hidden rounded-lg bg-primary py-8 text-white shadow-lg hover:bg-secondary'>
      {icon}
      <div className='py-5'>
        <div className='mb-2 py-2 text-2xl font-bold'>{title}</div>
        <p className='text-lg'>{subtitle}</p>
      </div>
    </article>
  );

  return href ? (
    <Link
      href={href}
      target={target}
      rel={rel}
      className='w-full max-w-xl cursor-pointer text-center lg:max-w-md'
    >
      {content}
    </Link>
  ) : (
    <div className='w-full max-w-xl text-center lg:max-w-md'>{content}</div>
  );
};

export default IconCard;
