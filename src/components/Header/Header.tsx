'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ThemeToggler } from './ThemeToggler';
import { navItems } from '@/constants/nav-items';
import Typography from '../ui/Typography';
import { Button } from '../ui/Button';
import useAuthStore, { isLoggedIn } from '@/stores/authStore';
import { toast } from 'sonner';
import fetcher from '@/lib/fetcher';
import { END_POINTS } from '@/constants/endpoints';

export default function Navbar() {
  const { logout } = useAuthStore();
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);

  const showLogin = !isLoggedIn();
  const showLogOut = isLoggedIn();

  const stickyStyle = ['sticky', 'top-[8px]', 'backdrop-blur-sm', 'shadow-md'];

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarEl: HTMLHeadingElement = navbarRef.current;
        stickyStyle.map((style) => navbarEl.classList.toggle(style, window.scrollY > 20));
        navbarEl.classList.toggle('rounded-md', window.scrollY > 20);
        navbarEl.classList.toggle('', window.scrollY > 20);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetcher(END_POINTS.auth.logout)
      logout();
      toast.success('Logged out!');
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <nav ref={navbarRef} className="text-foreground z-50 container h-[70px] bg-transparent transition-all">
      <div className="flex items-center justify-between px-2 py-4">
        <Link href={'/'}>
          <Typography variant={'h6'} className="text-primary">
            {' '}
            MangaSpot
          </Typography>
        </Link>
        <div
          onClick={() => setShowNavbar((prev) => !prev)}
          className={`z-30 flex lg:hidden ${showNavbar ? 'opened' : ''}`}
        >
          <svg width="40" height="40" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </div>

        <ul className="hidden items-center justify-center gap-4 lg:flex">
          {navItems.map((link) => (
            <li key={link.title}>
              {' '}
              <Link href={link.link}> {link.title} </Link>{' '}
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex lg:gap-4">
          <div className="flex items-center gap-2">
            {showLogin && (
              <Link href={'/login'}>
                <Button variant={'default'} size={'sm'} className="py-2">
                  {' '}
                  Login{' '}
                </Button>
              </Link>
            )}
            {showLogOut && (
              <Button onClick={handleLogout} variant={'default'} size={'sm'} className="w-full py-2">
                {' '}
                Logout{' '}
              </Button>
            )}
          </div>

          <ThemeToggler />
        </div>
      </div>
      {showNavbar && (
        <div
          onClick={() => setShowNavbar(false)}
          className="bg-secondary-300/90 absolute top-0 z-20 flex h-full w-full items-center justify-end lg:hidden"
        >
          <ul
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-secondary-400 flex h-full w-9/12 flex-col items-center justify-center gap-4"
          >
            {navItems.map((link) => (
              <li key={link.title} className="text-xl">
                {' '}
                <Link href={link.link}> {link.title} </Link>{' '}
              </li>
            ))}
            <div className="flex flex-col gap-2">
              <>
                {showLogin && (
                  <Link href={'/login'}>
                    <Button variant={'default'} size={'sm'} className="w-full py-2">
                      {' '}
                      Login{' '}
                    </Button>
                  </Link>
                )}
                {showLogOut && (
                  <Button onClick={handleLogout} variant={'default'} size={'sm'} className="w-full py-2">
                    {' '}
                    Logout{' '}
                  </Button>
                )}
              </>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
