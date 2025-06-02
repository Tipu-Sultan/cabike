'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function ContactForm({ vehicleId, sellerPhone }) {
  const { data: session } = useSession();
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPhone, setShowPhone] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!session) {
      setError('Please sign in to send a message.');
      return;
    }
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    setIsSending(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      setSuccess('Message sent successfully!');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-3"
        onClick={() => setShowContactForm(!showContactForm)}
      >
        <MessageCircle size={18} />
        Contact Seller
      </button>
      {showContactForm && (
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          {error && <p className="text-red-600 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}
          <form onSubmit={handleSendMessage}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'm interested in this vehicle. Is it still available?"
                disabled={isSending}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              disabled={isSending}
            >
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Message'}
            </button>
          </form>
        </div>
      )}
      <button
        className="w-full border border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
        onClick={() => setShowPhone(!showPhone)}
      >
        <Phone size={18} />
        {showPhone && sellerPhone ? sellerPhone : 'Show Phone Number'}
      </button>
    </div>
  );
}