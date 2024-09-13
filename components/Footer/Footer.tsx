const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center bg-dark px-4 text-center text-white md:px-12 xl:px-40">
      <img
        className="block h-32 w-full lg:w-1/3"
        src="/SRB-White-01.svg"
        alt="SRB Logo"
      />
      <div className="w-full py-8 font-bodytext text-white lg:w-1/3">
        &copy; Schomburg Road Baptist Church <br />
        7155 Schomburg Road
        <br />
        Columbus, GA 31909
      </div>
      <div className="w-full pb-6 text-white lg:w-1/3 lg:pb-0">
        <span className="font-bold">Sundays</span>
        <ul className="text-center">
          <li>09:15 AM Sunday School</li>
          <li>10:30 AM Service</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;