import { useState, useEffect, FormEvent } from 'react';
import { Heart, Calendar, MapPin, Users, Gift } from 'lucide-react';
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

  const weddingDate = new Date('2026-04-25T15:30:00');

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-3">
            <div className="relative inline-flex items-center">
              {/* Top horizontal bar */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/40"></div>

              {/* Navigation links */}
              <div className="flex space-x-6 md:space-x-10 px-4 py-2">
                {['Home', 'Our Story', 'The Details', 'Gallery', 'Registry'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="nav-link-spring text-white hover:text-[#e592a2] transition-colors text-base tracking-wide relative"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Bottom horizontal bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/40"></div>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: 'url(/img_6754.jpg)',
            backgroundPosition: 'center 35%',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "'Edu NSW ACT Foundation', cursive",
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

            <p
              className="text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                fontSize: 'clamp(20px, 3vw, 28px)'
              }}
            >
              April 25, 2026 at 3:30 PM | 1607 Missouri St. Houston, TX
            </p>
          </div>
        </div>
      </section>

      <section id="our-story" className="relative py-20 bg-[#fbc1c6] overflow-hidden">
        {/* Floral decorations */}
        <div className="absolute top-8 left-8 text-white/20 text-6xl hidden md:block">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor">
            <circle cx="60" cy="60" r="15" />
            <circle cx="40" cy="50" r="12" />
            <circle cx="80" cy="50" r="12" />
            <circle cx="50" cy="75" r="10" />
            <circle cx="70" cy="75" r="10" />
            <path d="M60 60 Q50 80 45 95" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M60 60 Q70 80 75 95" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <div className="absolute top-8 right-8 text-white/20 text-6xl hidden md:block transform scale-x-[-1]">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor">
            <circle cx="60" cy="60" r="15" />
            <circle cx="40" cy="50" r="12" />
            <circle cx="80" cy="50" r="12" />
            <circle cx="50" cy="75" r="10" />
            <circle cx="70" cy="75" r="10" />
            <path d="M60 60 Q50 80 45 95" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M60 60 Q70 80 75 95" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-8 left-16 text-white/15 text-6xl hidden md:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="12" />
            <circle cx="35" cy="45" r="10" />
            <circle cx="65" cy="45" r="10" />
            <circle cx="42" cy="65" r="8" />
            <circle cx="58" cy="65" r="8" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-16 text-white/15 text-6xl hidden md:block transform scale-x-[-1]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="12" />
            <circle cx="35" cy="45" r="10" />
            <circle cx="65" cy="45" r="10" />
            <circle cx="42" cy="65" r="8" />
            <circle cx="58" cy="65" r="8" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-white text-center mb-20"
            style={{
              fontFamily: "'Edu NSW ACT Foundation', cursive",
              fontWeight: 600,
              fontSize: 'clamp(40px, 6vw, 70px)'
            }}
          >
            Our Story
          </h2>

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block relative py-8">
            {/* Central horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-white/50 -translate-y-1/2"></div>

            <div className="grid grid-cols-4 gap-12">
              {/* Milestone 1: Text above / Image below */}
              <div className="relative pt-0 pb-0" style={{ minHeight: '450px' }}>
                {/* Dot on center line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#fbc1c6] z-10"></div>

                {/* Vertical line up to text */}
                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] bg-white/50 mb-3" style={{ bottom: 'calc(50% + 12px)' }}></div>

                {/* Text content above line */}
                <div className="absolute bottom-1/2 left-0 right-0 text-center pb-[100px]">
                  <div className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    2019
                  </div>
                  <p className="text-white text-sm leading-relaxed px-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    First Meeting at a spring garden party
                  </p>
                </div>

                {/* Vertical line down to image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] mt-3" style={{ top: 'calc(50% + 12px)', background: 'rgba(255,255,255,0.5)' }}></div>

                {/* Image content below line */}
                <div className="absolute top-1/2 left-0 right-0 pt-[100px]">
                  <img
                    src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="First Meeting"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* Milestone 2: Image above / Text below */}
              <div className="relative pt-0 pb-0" style={{ minHeight: '450px' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#fbc1c6] z-10"></div>

                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] bg-white/50 mb-3" style={{ bottom: 'calc(50% + 12px)' }}></div>

                <div className="absolute bottom-1/2 left-0 right-0 pb-[100px]">
                  <img
                    src="https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="First Date"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] mt-3" style={{ top: 'calc(50% + 12px)', background: 'rgba(255,255,255,0.5)' }}></div>

                <div className="absolute top-1/2 left-0 right-0 text-center pt-[100px]">
                  <div className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    2020
                  </div>
                  <p className="text-white text-sm leading-relaxed px-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    First walk through countryside
                  </p>
                </div>
              </div>

              {/* Milestone 3: Text above / Image below */}
              <div className="relative pt-0 pb-0" style={{ minHeight: '450px' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#fbc1c6] z-10"></div>

                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] bg-white/50 mb-3" style={{ bottom: 'calc(50% + 12px)' }}></div>

                <div className="absolute bottom-1/2 left-0 right-0 text-center pb-[100px]">
                  <div className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    2024
                  </div>
                  <p className="text-white text-sm leading-relaxed px-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    The proposal in our garden
                  </p>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] mt-3" style={{ top: 'calc(50% + 12px)', background: 'rgba(255,255,255,0.5)' }}></div>

                <div className="absolute top-1/2 left-0 right-0 pt-[100px]">
                  <img
                    src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="The Proposal"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* Milestone 4: Image above / Text below */}
              <div className="relative pt-0 pb-0" style={{ minHeight: '450px' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#fbc1c6] z-10"></div>

                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] bg-white/50 mb-3" style={{ bottom: 'calc(50% + 12px)' }}></div>

                <div className="absolute bottom-1/2 left-0 right-0 pb-[100px]">
                  <img
                    src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Our Wedding Day"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[80px] mt-3" style={{ top: 'calc(50% + 12px)', background: 'rgba(255,255,255,0.5)' }}></div>

                <div className="absolute top-1/2 left-0 right-0 text-center pt-[100px]">
                  <div className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    2026
                  </div>
                  <p className="text-white text-sm leading-relaxed px-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Celebrating with loved ones
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet vertical timeline */}
          <div className="lg:hidden space-y-12">
            {[
              {
                year: '2019',
                description: 'First Meeting at a spring garden party',
                image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                year: '2020',
                description: 'First walk through countryside',
                image: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                year: '2024',
                description: 'The proposal in our garden',
                image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                year: '2026',
                description: 'Celebrating with loved ones',
                image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
            ].map((milestone, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full border-4 border-[#fbc1c6]"></div>
                {index !== 3 && <div className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-white/40 -mb-12"></div>}
                <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {milestone.year}
                </div>
                <p className="text-white mb-4 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {milestone.description}
                </p>
                <img
                  src={milestone.image}
                  alt={`Milestone ${milestone.year}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="the-details" className="py-20 bg-[#ede9dd]" style={{ fontFamily: "'Playfair Display', serif" }}>
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

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-6">
                  <svg viewBox="0 0 120 180" className="w-32 h-48 mx-auto">
                    <path
                      d="M 40 30 Q 35 35, 35 45 L 30 90 Q 30 110, 45 130 L 50 170 L 70 170 L 75 130 Q 90 110, 90 90 L 85 45 Q 85 35, 80 30 Q 60 20, 40 30 Z"
                      fill="#f0e5d8"
                      stroke="#d4a3a6"
                      strokeWidth="2"
                    />
                    <circle cx="50" cy="20" r="8" fill="#f0e5d8" stroke="#d4a3a6" strokeWidth="2" />
                    <circle cx="70" cy="20" r="8" fill="#f0e5d8" stroke="#d4a3a6" strokeWidth="2" />
                    <line x1="50" y1="28" x2="50" y2="35" stroke="#d4a3a6" strokeWidth="2" />
                    <line x1="70" y1="28" x2="70" y2="35" stroke="#d4a3a6" strokeWidth="2" />
                  </svg>
                </div>
                <h4 className="text-2xl font-serif text-[#695c22] mb-4">Women</h4>
                <div className="flex justify-center gap-3 flex-wrap">
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#ffc2d1' }} title="Blush Pink"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#e6f3ff' }} title="Sky Blue"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#fff5e6' }} title="Cream"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#e8f5e9' }} title="Mint Green"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#fff3e0' }} title="Peach"></div>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <svg viewBox="0 0 120 180" className="w-32 h-48 mx-auto">
                    <rect x="40" y="50" width="40" height="60" fill="#e8dcc8" stroke="#b8a890" strokeWidth="2" rx="2" />
                    <rect x="35" y="50" width="12" height="80" fill="#e8dcc8" stroke="#b8a890" strokeWidth="2" />
                    <rect x="73" y="50" width="12" height="80" fill="#e8dcc8" stroke="#b8a890" strokeWidth="2" />
                    <rect x="45" y="110" width="15" height="70" fill="#d4c5b0" stroke="#b8a890" strokeWidth="2" />
                    <rect x="60" y="110" width="15" height="70" fill="#d4c5b0" stroke="#b8a890" strokeWidth="2" />
                    <circle cx="60" cy="25" r="12" fill="#e8dcc8" stroke="#b8a890" strokeWidth="2" />
                    <line x1="60" y1="37" x2="60" y2="50" stroke="#b8a890" strokeWidth="2" />
                    <rect x="50" y="38" width="20" height="15" fill="#a8c5d9" stroke="#7a9bb5" strokeWidth="2" rx="1" />
                  </svg>
                </div>
                <h4 className="text-2xl font-serif text-[#695c22] mb-4">Men</h4>
                <div className="flex justify-center gap-3 flex-wrap">
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#c8d6e5' }} title="Light Blue"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#e8dcc8' }} title="Tan"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#d5d5d5' }} title="Light Gray"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#d4c5b0' }} title="Beige"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4a3a6] shadow-sm" style={{ backgroundColor: '#b8cfa8' }} title="Sage"></div>
                </div>
              </div>
            </div>
          </div>

          <div id="rsvp" className="bg-white rounded-lg shadow-xl p-8 md:p-12 border border-[#e4919f]/20">
            <h3 className="text-4xl font-serif text-center text-[#695c22] mb-8">RSVP</h3>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-[#695c22] font-serif text-lg mb-2">Full Name</label>
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
                <label className="block text-[#695c22] font-serif text-lg mb-2">Email</label>
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
                <label className="block text-[#695c22] font-serif text-lg mb-2">Will you attend?</label>
                <select
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-full px-4 py-3 border border-[#d4a3a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cf2f75] bg-[#f5d7ca]/20"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>

              <div>
                <label className="block text-[#695c22] font-serif text-lg mb-2">
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
                className="w-full bg-[#cf2f75] text-white py-4 rounded-lg text-lg font-serif hover:bg-[#ed4e22] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Submit RSVP'}
              </button>

              {submitStatus === 'success' && (
                <div className="text-center text-[#a5a55f] font-serif text-lg">
                  Thank you! Your RSVP has been received.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-center text-[#ed4e22] font-serif text-lg">
                  There was an error. Please try again.
                </div>
              )}
            </form>
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

      <section
        id="registry"
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/img_8001%20copy.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-[#695c22]/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-16 h-16 text-[#f9a58a] mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6 font-light tracking-wide">
            Wedding Registry
          </h2>
          <p className="text-xl text-[#f5d7ca] leading-relaxed mb-8 max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift,
            we have registered at the following location for items to help us begin our married life together.
          </p>
          <a
            href="https://www.registry.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#cf2f75] text-white px-12 py-4 rounded-full text-lg font-serif hover:bg-[#ed4e22] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
          >
            View Our Registry
          </a>
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
