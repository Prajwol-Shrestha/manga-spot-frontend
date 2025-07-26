import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

export const useNavItems = () => {
  const loggedIn = useIsLoggedIn();

  const navItems = [
    {
      title: 'Home',
      link: '/',
      show: true,
    },
    {
      title: 'Random',
      link: '/random',
      show: true,
    },
    {
      title: 'Browse',
      link: '/browse',
      show: true,
    },
    {
      title: 'Genres',
      link: '/genres',
      show: true,
    },
    {
      title: 'Bookmarks',
      link: '/bookmarks',
      show: loggedIn,
    },
    {
      title: 'History',
      link: '/reading-history',
      show: loggedIn,
    },
    // {
    //   title: 'Settings',
    //   link: '/settings',
    //   show: loggedIn,
    // },
    // {
    //   title: 'About',
    //   link: '/about',
    //   show: true,
    // },
    // {
    //   title: 'Contact',
    //   link: '/contact',
    //   show: true,
    // },
  ];

  const shownNavItems = navItems.filter((item) => item.show);
  return shownNavItems;
};
