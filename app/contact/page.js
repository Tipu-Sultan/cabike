'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-gray-600">
              Get in touch with our team for support or feedback.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50 text-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50 text-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50 text-gray-800"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                {status && (
                  <p
                    className={`mt-4 text-center ${
                      status.includes('success')
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {status}
                  </p>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>
                <ul className="space-y-4 text-gray-600">
                  <li>
                    <span className="font-medium text-gray-800">Email:</span>{' '}
                    <a
                      href="mailto:support@cabike.com"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      support@cabike.com
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Phone:</span>{' '}
                    <a
                      href="tel:+1-800-555-1234"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      +1-800-555-1234
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Address:</span>{' '}
                    123 Cabike Lane, Auto City, USA
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    href="/vehicles"
                    className="bg-white border border-gray-300 hover:shadow-sm text-gray-800 font-medium px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-all"
                  >
                    Browse Vehicles <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}