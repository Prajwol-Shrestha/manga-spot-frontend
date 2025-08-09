export const END_POINTS = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    'request-reset-password': '/api/auth/request-reset-password',
    'reset-password': '/api/auth/reset-password',
  },
  user: {
    me: '/api/user/me',
  },
  manga: {
    getMangas: '/api/manga',
    getRandomManga: '/api/manga/random',
    getMangaById: '/api/manga/:id',
  },
  tags: {
    getAlltags: '/api/tags',
  },
  bookmarks: {
    getBookmarks: '/api/bookmarks',
    addBookmark: '/api/bookmarks',
    removeBookmark: '/api/bookmarks/:id',
  },
  chapters: {
    getLatestUpdatedChapters: '/api/chapters/latest-updated',
    chapterPages: '/api/chapters/:chapterId',
  },
  'reading-history': {
    getReadingHistory: '/api/reading-history',
  },
  'file-upload': {
    getSignedUrl: '/api/file-upload/signed-upload-url',
  },
};
