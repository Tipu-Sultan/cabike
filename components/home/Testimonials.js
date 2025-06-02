'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to static testimonials if fetch fails
        setTestimonials([
          {
            id: '1',
            name: 'Michael Chen',
            role: 'Car Buyer',
            image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
            content: 'I found my dream car on Cabike in just two days. The search filters made it easy to narrow down exactly what I wanted, and the seller was responsive and professional.',
            rating: 5,
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            role: 'Bike Seller',
            image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
            content: 'Selling my bike was a breeze. The listing process was straightforward, and I received multiple inquiries within hours. Sold it at my asking price in just a week!',
            rating: 5,
          },
          {
            id: '3',
            name: 'James Wilson',
            role: 'Car Enthusiast',
            image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
            content: 'As someone who buys and sells vehicles frequently, Cabike has become my go-to platform. The verification process adds a layer of trust that other sites don’t offer.',
            rating: 4,
          },
        ]);
      }
    }
    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers have to say about their experience with Cabike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-3 items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/testimonials"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all testimonials
          </a>
        </div>
      </div>
    </section>
  );
}