import { useState, useEffect, FormEvent } from 'react';
import { Heart, Calendar, MapPin, Users, Gift, ChevronDown, Menu, X } from 'lucide-react';
import { supabase } from './supabaseClient';

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attendance: 'yes',
    brunchAttendance: 'yes',
    guestCount: 1,
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        brunch_attendance: formData.brunchAttendance,
        message: formData.message
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        attendance: 'yes',
        brunchAttendance: 'yes',
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
          <div className="relative py-3">
            {/* Desktop layout: 3-column grid */}
            <div className="hidden lg:grid lg:grid-cols-3 items-center">
              {/* Left: Couple name as logo */}
              <div className="justify-self-start">
                <a href="#home" className="couple-name text-white text-lg font-serif flex">
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
                    {['Our Story', 'RSVP', 'The Details', 'Travels', 'Gallery', 'FAQs'].map((item) => (
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

            {/* Mobile layout: Centered couple name with hamburger on right */}
            <div className="lg:hidden flex items-center justify-center">
              <a href="#home" className="couple-name text-white text-lg font-serif flex">
                <span>Coralanne</span>
                <Heart className="w-5 h-5 text-[#f9a58a] transition-all" />
                <span>Alexander</span>
              </a>

              {/* Hamburger menu button - absolute positioned to top-right */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="absolute right-2 text-white p-2 hover:text-[#e592a2] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#cfcd99] border-t border-white/20">
            <div className="px-4 py-2 space-y-2">
              {['Our Story', 'RSVP', 'The Details', 'Travels', 'Gallery', 'FAQs'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-[#e592a2] transition-colors py-2 text-base tracking-wide"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
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
              Like most young millennials during COVID, Coralanne and AJ found themselves on a dating app. The app meant to be deleted in fact, Hinge. And delete the app they did. They followed proper COVID etiquette and maintained 6ft of distance for their first month and a half of getting to know each other. After some drive-in movie dates and lots of picnics, AJ asked Coralanne if she'd like to shorten the 6ft distance and become his girlfriend. She said "yes!"
            </p>
            <p className="text-[#f5d7ca] text-xl leading-relaxed mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Coralanne quickly realized there was something very special about AJ, so when he told her he was thinking of moving out of state after only 6 months of dating, she said that was fine because she'd move with him. AJ played job roulette and landed in Boston, Massachusetts. Coralanne was still working on her Master's….so long distance was the only answer. They learned a lot about themselves and each other—like how long distance sucks.
            </p>
            <p className="text-[#f5d7ca] text-xl leading-relaxed mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              After a year of flying back and forth between Boston and Houston passed, Coralanne hopped off the stage with her diploma, into the car with her belongings and drove up to Boston. This is where the real test began. Introducing AJ's daughter Ruby and Coralanne's son Gigi to each other. Though there were many initial hisses, the blended family pushed through…to less hissing.
            </p>
            <p className="text-[#f5d7ca] text-xl leading-relaxed mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Through all the ups and downs, Coralanne and AJ have built a life together. In June 2025, AJ planned a surprise proposal with friends and family under the guise of a Beyoncé concert. Again, Coralanne said "yes!"
            </p>
            <p className="text-[#f5d7ca] text-xl leading-relaxed mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Now AJ and Coralanne are embarking on their next adventure together: marriage. Will there be another pandemic? Will the cats ever get along? What genre will Beyoncé's next album be? Only one way to find out.
            </p>
            <p className="text-[#f5d7ca] text-xl leading-relaxed mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              See you at the wedding!<br />
              Coralanne and AJ
            </p>
          </div>
        </div>
      </section>

      <section id="rsvp" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-serif text-center text-[#695c22] mb-4 font-light tracking-wide">
            RSVP
          </h2>
          <div className="w-24 h-1 bg-[#cf2f75] mx-auto mb-4"></div>
          <p className="text-center text-[#695c22] text-2xl mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Please RSVP by February 14th, 2026
          </p>

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
                <label className="block text-[#695c22] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Will you be attending the ceremony?</label>
                <p className="text-[#ae611b] text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>April 25, 2026 at 3:30 PM</p>
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
                <label className="block text-[#695c22] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Will you be attending the farewell brunch?</label>
                <p className="text-[#ae611b] text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>April 26, 2026 at 10 AM</p>
                <select
                  value={formData.brunchAttendance}
                  onChange={(e) => setFormData({ ...formData, brunchAttendance: e.target.value })}
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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
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

            <div className="bg-white rounded-lg shadow-lg p-8 border border-[#e4919f]/20">
              <div className="w-12 h-12 bg-[#95b5da] rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-serif text-[#695c22] mb-6 text-center">Farewell Brunch</h3>
              <div className="space-y-4 text-[#ae611b] text-center">
                <p className="flex items-center justify-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 flex-shrink-0 text-[#cf2f75]" />
                  <span>April 26, 2026 at 10:00 AM</span>
                </p>
                <p className="flex items-start justify-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-[#cf2f75]" />
                  <span>Location: TBD</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 border border-[#e4919f]/20">
            <h3 className="text-4xl font-serif text-center text-[#695c22] mb-8">Attire</h3>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xl text-[#ae611b] leading-relaxed">
                We invite you to celebrate with us in cocktail attire with a springtime feel. Think floral prints (Florals in spring? Groundbreaking.), soft pastels, and lighter fabrics are encouraged. Appropriate attire includes suits or blazers with dress pants, and dresses or jumpsuits. For comfort in the Houston weather, lighter materials are recommended; however, please refrain from casual wear such as jeans or sundresses.
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

        </div>
      </section>

      <section
        id="travels"
        className="relative py-20 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url(/history-of-houston.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-[#695c22]/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-serif text-center text-white mb-4 font-light tracking-wide">
            Travel Accommodations
          </h2>
          <div className="w-24 h-1 bg-[#cf2f75] mx-auto mb-12"></div>

          <div className="max-w-4xl mx-auto">
            <p className="text-[#f5d7ca] text-xl leading-relaxed text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              Given the size of our party, we are not able to reserve a hotel block. We do however have some lodging recommendations.
            </p>

            <div className="bg-white/95 rounded-lg shadow-lg p-8 md:p-12 mb-8 border border-[#e4919f]/20">
              <h3 className="text-3xl font-serif text-[#695c22] mb-8 text-center">Lodging</h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-serif text-[#695c22] mb-3">Hotel Saint Augustine</h4>
                  <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    4110 Loretto Drive<br />
                    Houston, TX 77006<br />
                    Located in the Montrose neighborhood.<br />
                    Just a short 18-minute walk or 2-minute drive to the venue.
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-serif text-[#695c22] mb-3">The Sam Houston, Curio Collection by Hilton</h4>
                  <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    1117 Prairie Street<br />
                    Houston, TX 77002<br />
                    Located in Downtown Houston near Coralanne's old apartment!<br />
                    A 13-minute drive or 28-minute bus ride.
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-serif text-[#695c22] mb-3">AirBnB Recommendations</h4>
                  <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    We recommend staying in the Montrose neighborhood if you're choosing an Airbnb, as this is the neighborhood where the wedding venue is located. Other nearby neighborhoods we recommend are the Heights or Midtown.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-lg shadow-lg p-8 md:p-12 mb-8 border border-[#e4919f]/20">
              <h3 className="text-3xl font-serif text-[#695c22] mb-4 text-center">Places to Eat</h3>
              <p className="text-[#ae611b] text-center mb-6 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Houston is a foodie city! Here are some of our favorite restaurants.
              </p>

              <ul className="space-y-3 text-[#ae611b] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                <li>• Truth's BBQ (get here at least 30 minutes before open)</li>
                <li>• Nancy's Hustle</li>
                <li>• Xochii</li>
                <li>• The Breakfast Klub (again, line up begins before open)</li>
                <li>• Wanna Bao</li>
              </ul>
            </div>

            <div className="bg-white/95 rounded-lg shadow-lg p-8 md:p-12 border border-[#e4919f]/20">
              <h3 className="text-3xl font-serif text-[#695c22] mb-4 text-center">Places to Visit</h3>
              <p className="text-[#ae611b] text-center mb-8 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                There is so much to do in the city of Houston. Below we are putting top must-see's of Houston.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-serif text-[#695c22] mb-2">The Menil</h4>
                  <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    A free art collection where AJ and Coralanne had many of their picnics.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-serif text-[#695c22] mb-2">The Natural Science Museum</h4>
                  <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Where Coralanne likes to brag about how extensive the paleontology collection is as if she collected the bones herself.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-serif text-[#695c22] mb-2">The MFAH</h4>
                  <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    AJ loves the Persian historical exhibit.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-serif text-[#695c22] mb-2">Hermann Park</h4>
                  <p className="text-[#ae611b] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Coralanne and AJ saw a wombat here once.
                  </p>
                </div>
              </div>
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
                answer: 'Due to the intimate size of our venue, we are unfortunately unable to accommodate additional guests. We can only invite those formally invited. We appreciate your understanding!'
              },
              {
                question: 'Are children allowed?',
                answer: 'Due to space constraints, we are unable to accommodate children. We appreciate you making arrangements so you can celebrate with us!'
              },
              {
                question: 'Is there a wedding registry?',
                answer: 'We don\'t have a traditional registry, as we\'re focusing on experiences rather than things! If you were thinking of giving a gift to help us celebrate, a contribution to our honeymoon fund would make our dream trip a reality.'
              },
              {
                question: 'What is the weather like in Houston?',
                answer: 'April in Houston typically features highs of 80°F and lows of 60°F. It\'s also the peak of wildflower season, so the city is in full bloom. We recommend bringing allergy medicine just in case.'
              },
              {
                question: 'Will the ceremony be indoors or outdoors?',
                answer: 'Weather permitting, the ceremony will be held outdoors. If the Houston weather doesn\'t cooperate, we will move everything inside.'
              },
              {
                question: 'What happens after the ceremony?',
                answer: 'Once we say "I do," the party begins! We\'ll head straight into an evening of delicious food, drinks, plenty of dancing and a bit of karaoke. Get ready to celebrate!'
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
