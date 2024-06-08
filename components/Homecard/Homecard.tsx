import { ComponentType, ReactElement } from 'react';

type HomecardProps = {
  title?: string;
  subtitle?: string,
  icon?: ReactElement,
  target?: string,
  rel?: string,
  href?: string, 
  tag: ComponentType<any> | string
}

const Homecard: React.FC<HomecardProps> = ({ title, subtitle, icon, target, rel, href, tag: Tag }) => {
  return (
    <Tag
      href={href}
      target={target}
      rel={rel}
      className="cursor-pointer w-full max-w-xl lg:max-w-md text-center"
    >
      <div className="py-8 overflow-hidden rounded-lg shadow-lg hover:bg-secondary bg-primary text-white">
        {icon}
        <div className="py-5">
          <div className="py-2 font-bold text-2xl mb-2">{title}</div>
          <p className="text-lg">{subtitle}</p>
        </div>
      </div>
    </Tag>
  );
};

export default Homecard;