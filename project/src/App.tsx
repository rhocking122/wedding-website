import { useState, useEffect, FormEvent } from 'react';
import { Heart, Calendar, MapPin, Users, Gift, ChevronDown } from 'lucide-react';
import { supabase } from './supabaseClient';

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attendance: 'yes',
    guestCount: 1,
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const weddingDate = new Date('2026-04-25T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const { error } = await supabase.from('rsvps').insert({
        full_name: formData.fullName,
        email: formData.email,
        attendance: formData.attendance,
        message: formData.message
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        attendance: 'yes',
        guestCount: 1,
        message: ''
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#eddbca]">
      <nav className="fixed top-0 w-full bg-[#cfcd99] shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center py-3">
            {/* Left: Couple name as logo */}
            <div className="justify-self-start">
              <a href="#home" className="couple-name text-white text-lg font-serif hidden sm:flex">
                <span>Coralanne</span>
                <Heart className="w-5 h-5 text-[#f9a58a] transition-all" />
                <span>Alexander</span>
              </a>
            </div>

            {/* Center: Navigation links */}
            <div className="justify-self-center">
              <div className="relative inline-flex items-center">
                {/* Top horizontal bar */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/40"></div>

                {/* Navigation links */}
                <div className="flex space-x-3 sm:space-x-6 md:space-x-10 px-3 sm:px-4 py-2">
                  {['Our Story', 'RSVP', 'The Details', 'Gallery', 'FAQs'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="nav-link-spring text-white hover:text-[#e592a2] transition-colors text-sm sm:text-base tracking-wide relative whitespace-nowrap"
                    >
                      {item}
                    </a>
                  ))}
                </div>

                {/* Bottom horizontal bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/40"></div>
              </div>
            </div>

            {/* Right: Empty for balance */}
            <div className="justify-self-end"></div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/wallyphoto.png)',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "'Cedarville Cursive', cursive",
                fontWeight: 600,
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                fontSize: 'clamp(45px, 8vw, 80px)'
              }}
            >
              We're Getting Married!
            </h2>

            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                textShadow: '3px 3px 12px rgba(0,0,0,0.8)',
                letterSpacing: '0.1em',
                fontSize: 'clamp(24px, 4vw, 36px)',
                textTransform: 'uppercase'
              }}
            >
              {timeLeft.days} DAYS TO THE WEDDING
            </h1>
          </div>
        </div>
      </section>

      <section
        id="our-story"
        className="relative py-20 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url(/img_8001%20copy.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-[#695c22]/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-white text-center mb-12"
            style={{
              fontFamily: "'Cedarville Cursive', cursive",
              fontWeight: 600,
              fontSize: 'clamp(40px, 6vw, 70px)'
            }}
          >
            Our Story
          </h2>

          <div className="text-center">
            <p className="text-[#f5d7ca] text-xl leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our love story is no typical love story, nor is it a grand love story you will find in Hollywood movies. This love story is unique and special. It starts with a young girl walking into a coffee shop, Coralanne, and a young man robbing the store. Then, out of nowhere, my knight in shining armor stepped up and KILLED the guy robbing the store with one of his special raisin fart attacks.
            </p>
            <p className="text-[#f5d7ca] text-xl leading-relaxed mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              At that moment, I was in awe; I knew I had found the one for me. I went up to him and said, 'Me, you, dino nuggets at my place. 5 o'clock — be there or be a square.'
            </p>
            <p className="text-[#f5d7ca] text-xl leading-relaxed mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              And Alexander replied, 'Dino nuggies are my favorite!'
            </p>
          </div>
        </div>
      </section>

      <section id="rsvp" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-serif text-center text-[#695c22] mb-4 font-light tracking-wide">
            RSVP
          </h2>
          <div className="w-24 h-1 bg-[#cf2f75] mx-auto mb-16"></div>

          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 border border-[#e4919f]/20">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-[#695c22] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-[#d4a3a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf2f75] bg-[#f5d7ca]/20"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>

              <div>
                <label className="block text-[#695c22] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-[#d4a3a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf2f75] bg-[#f5d7ca]/20"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>

              <div>
                <label className="block text-[#695c22] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Will you attend?</label>
                <select
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-full px-4 py-3 border border-[#d4a3a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf2f75] bg-[#f5d7ca]/20"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <option value="yes">Accept with pleasure</option>
                  <option value="no">Regretfully decline</option>
                </select>
              </div>

              <div>
                <label className="block text-[#695c22] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Dietary Restrictions or Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-[#d4a3a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf2f75] bg-[#f5d7ca]/20 resize-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full bg-[#cf2f75] text-white py-4 rounded-lg text-lg hover:bg-[#ed4e22] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Submit RSVP'}
              </button>

              {submitStatus === 'success' && (
                <div className="text-center text-[#a5a55f] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Thank you! Your RSVP has been received.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-center text-[#ed4e22] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  There was an error. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section id="the-details" className="py-20 bg-[#ede9dd]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-serif text-center text-[#695c22] mb-4 font-light tracking-wide">
            The Details
          </h2>
          <div className="w-24 h-1 bg-[#cf2f75] mx-auto mb-16"></div>

          <div className="max-w-2xl mx-auto mb-20">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[#e4919f]/20">
              <div className="w-12 h-12 bg-[#95b5da] rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-serif text-[#695c22] mb-6 text-center">Ceremony</h3>
              <div className="space-y-4 text-[#ae611b] text-center">
                <p className="flex items-center justify-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 flex-shrink-0 text-[#cf2f75]" />
                  <span>April 25, 2026 at 3:30 PM</span>
                </p>
                <p className="flex items-start justify-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-[#cf2f75]" />
                  <span>1607 Missouri Street<br />Houston, TX 77006</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 border border-[#e4919f]/20">
            <h3 className="text-4xl font-serif text-center text-[#695c22] mb-8">Attire</h3>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xl text-[#ae611b] leading-relaxed">
                We kindly request that our guests dress in <span className="italic">Spring Cocktail</span> attire.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src="/dresscode.png"
                alt="Dress Code"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-[#e4919f]/20">
            <h3 className="text-4xl font-serif text-center text-[#695c22] mb-8">Travel Accommodations</h3>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-[#ae611b] leading-relaxed">
                Information about travel accommodations will be provided here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-serif text-center text-[#695c22] mb-4 font-light tracking-wide">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-[#cf2f75] mx-auto mb-16"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              '/img_0497.jpg',
              '/img_1998.jpg',
              '/img_8031.jpg',
              '/img_8001.jpg',
              '/64ccaf04-cc4e-43de-9688-6d09734e461a000115360016.jpeg',
              '/img_6754.jpg',
              '/309fd33a-8e4c-46ff-befd-3ff0fce33ea2.jpg',
              '/img_6554.jpg'
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="py-20 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "'Cedarville Cursive', cursive",
              fontWeight: 600,
              fontSize: 'clamp(40px, 6vw, 70px)',
              color: '#695c22'
            }}
          >
            FAQs
          </h2>
          <p className="text-center text-[#ae611b] text-lg mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Here you will find commonly asked questions and their answers
          </p>

          <div className="space-y-4">
            {[
              {
                question: 'Can I bring a plus one?',
                answer: 'Unfortunately not due to the limited space of the venue. We ask each person who is invited to register separately using the RSVP form.'
              },
              {
                question: 'Are children allowed?',
                answer: 'Yes… maybe? We honestly don\'t know yet.'
              },
              {
                question: 'Will there be a wedding registry?',
                answer: 'Your presence at our wedding is the greatest gift of all. However, if you wish to give us a gift, we are accepting monetary contributions that will be used toward our honeymoon.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-[#e4919f]/20 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#f5d7ca]/10 transition-colors"
                >
                  <span className="text-[#695c22] text-lg font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#cf2f75] transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-[#faf8f5] border-t border-[#e4919f]/20">
                    <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#695c22] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl font-serif">Coralanne</span>
            <Heart className="w-6 h-6 text-[#f9a58a]" />
            <span className="text-3xl font-serif">Alexander</span>
          </div>
          <p className="text-[#f5d7ca] font-serif text-lg">April 25, 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
