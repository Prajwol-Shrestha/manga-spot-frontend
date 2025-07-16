import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t px-4 py-10 mt-12"
      style={{
        backgroundColor: 'var(--card)',
        color: 'var(--card-foreground)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            MangaSpot
          </h2>
          <p className="text-sm opacity-80">
            Your favorite manga in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            Links
          </h2>
          <ul className="space-y-1 text-sm opacity-80">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            Follow Us
          </h2>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 hover:text-[var(--primary)]" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5 hover:text-[var(--primary)]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 hover:text-[var(--primary)]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="text-center text-sm pt-6 mt-10 border-t"
        style={{ borderColor: 'var(--border)', opacity: 0.7 }}
      >
        &copy; {year} MangaSpot. All rights reserved.
      </div>
    </footer>
  );
}
