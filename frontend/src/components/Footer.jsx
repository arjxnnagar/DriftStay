import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold">StayFinder</h2>
            <p className="text-sm text-gray-600 mt-2">
              Find unique stays around the world with ease.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a className="hover:text-black" href="/about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="/careers">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="/blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a className="hover:text-black" href="/help">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="/privacy">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-8 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
          <p>© {new Date().getFullYear()} StayFinder. All rights reserved.</p>

          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-black">
              Twitter
            </a>
            <a href="#" className="hover:text-black">
              Instagram
            </a>
            <a href="#" className="hover:text-black">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
