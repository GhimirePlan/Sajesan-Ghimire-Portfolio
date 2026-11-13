import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { styles } from '../../constants/styles';
import { navLinks } from '../../constants';
import { logo, menu, close } from '../../assets';
import { config } from '../../constants/config';

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll('section[id]');

      sections.forEach(current => {
        const sectionId = current.getAttribute('id');
        // @ts-ignore
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener('scroll', navbarHighlighter);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', navbarHighlighter);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-5 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
          <p className="flex cursor-pointer text-[15px] sm:text-[16px] font-semibold text-white ">
            {config.html.fullName}
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-6 md:gap-8 sm:flex">
          {navLinks.map(nav => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? 'text-white' : 'text-secondary'
              } cursor-pointer text-[14px] font-medium hover:text-white`}
              onClick={() => setActive(nav.id)}
            >
              {nav.link ? (
                <Link to={nav.link}>{nav.title}</Link>
              ) : location.pathname === '/' ? (
                <a href={`#${nav.id}`}>{nav.title}</a>
              ) : (
                <Link to={`/#${nav.id}`}>{nav.title}</Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <button
            aria-label={toggle ? 'Close menu' : 'Open menu'}
            aria-expanded={toggle}
            aria-controls="mobile-navigation"
            onClick={() => setToggle(!toggle)}
          >
            <img src={toggle ? close : menu} alt="" className="h-[28px] w-[28px] object-contain" />
          </button>

          <div
            id="mobile-navigation"
            className={`${
              !toggle ? 'hidden' : 'flex'
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map(nav => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? 'text-white' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.id);
                  }}
                >
                  {nav.link ? (
                    <Link to={nav.link}>{nav.title}</Link>
                  ) : location.pathname === '/' ? (
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  ) : (
                    <Link to={`/#${nav.id}`}>{nav.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
