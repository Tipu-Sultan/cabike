'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  User,
  Car,
  Heart,
  Bell,
  PlusCircle,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-gray-50 py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-md w-10 h-10">
              <Car size={24} className="transform -rotate-12" />
            </div>
            <span className="font-bold text-2xl text-gray-900">cabike</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/vehicles"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Browse
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Vehicles <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/vehicles?type=car"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Cars
                  </Link>
                  <Link
                    href="/vehicles?type=bike"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Bikes
                  </Link>
                </div>
              </div>
            </div>
            {session && (
              <Link
                href="/sell"
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sell
              </Link>
            )}
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth/User */}
          <div className="hidden md:flex items-center gap-3">
            {status === 'authenticated' ? (
              <>
                <Link
                  href="/dashboard/favorites"
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Favorites"
                >
                  <Heart size={22} className="text-gray-700" />
                </Link>
                <Link
                  href="/dashboard/notifications"
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Notifications"
                >
                  <Bell size={22} className="text-gray-700" />
                </Link>
                <Link
                  href="/sell"
                  className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  <PlusCircle size={18} /> Sell
                </Link>
                <div className="relative group">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700">
                    <User size={20} />
                  </button>
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/listings"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        My Listings
                      </Link>
                      <Link
                        href="/dashboard/messages"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Messages
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            {!isOpen && <Menu size={24} className="text-gray-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          className="md:hidden absolute top-4 right-4 p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen && <X size={24} className="text-gray-900" />}
        </button>
        <div className="pt-20 pb-6 px-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="/vehicles"
              className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Browse All
            </Link>
            <Link
              href="/vehicles?type=car"
              className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Cars
            </Link>
            <Link
              href="/vehicles?type=bike"
              className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Bikes
            </Link>
            {session && (
              <Link
                href="/sell"
                className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Sell
              </Link>
            )}
            <Link
              href="/about"
              className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="h-px bg-gray-200 my-2"></div>

            {status === 'authenticated' ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/listings"
                  className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  href="/dashboard/favorites"
                  className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  href="/dashboard/messages"
                  className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg text-left mt-2"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} /> Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} /> Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}