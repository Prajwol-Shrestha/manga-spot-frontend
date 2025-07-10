export const END_POINTS = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
  },
  user: {
    me: '/user/me',
  },
  manga: {
    getMangas: '/manga',
    getRandomManga: '/manga/random',
    getLatestUpdatedChapters: '/manga/latest-updated-chapters',
  },
  bookmarks: {
    getBookmarks: '/bookmarks',
    addBookmark: '/bookmarks',
    removeBookmark: '/bookmarks/:id',
  },
};
