"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { GoHeart } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { ShoppingCart } from "lucide-react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useShop } from "@/context/ShopContext";

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredImages, setHoveredImages] = useState({});
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const { cart, wishlist } = useShop();

  const cartTotal = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLinkHover = (cardIdx, imageUrl) => {
    setHoveredImages(prev => ({ ...prev, [cardIdx]: imageUrl }));
  };

  const handleLinkLeave = (cardIdx) => {
    setHoveredImages(prev => ({ ...prev, [cardIdx]: null }));
  };

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300;

    const contentEl = navEl.querySelector('.card-nav-content');
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      const wasPointerEvents = contentEl.style.pointerEvents;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'visible';
      contentEl.style.pointerEvents = 'auto';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';

      contentEl.offsetHeight;

      const topBar = 60;
      const padding = 16;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = wasVisible;
      contentEl.style.pointerEvents = wasPointerEvents;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;

      const totalHeight = topBar + contentHeight + padding;
      const maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.85 : 600;

      return Math.min(totalHeight, maxHeight);
    }
    return 300;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      '-=0.1'
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      setHoveredImages({});
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-[99] top-[1.2em] md:top-[2em] ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav w-full ${isExpanded ? 'open rounded-2xl' : 'rounded-2xl'} block p-0 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl border border-white/60 relative overflow-hidden will-change-[height] transition-[border-radius] duration-300`}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.65)" }}>
        <div
          className="card-nav-top absolute inset-x-0 top-0 h-15 flex items-center justify-between p-2 pl-[1.1rem] z-2">
          {/* Left Side: Hamburger & Logo */}
          <div className="flex items-center gap-2 md:gap-4 order-1 md:order-none z-10 lg:w-1/4">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px]`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              tabIndex={0}
              style={{ color: menuColor || '#000' }}>
              <div
                className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                  } group-hover:opacity-75`} />
              <div
                className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                  } group-hover:opacity-75`} />
            </div>

            <a href="/" aria-label="Home" className="flex items-center">
              <img src={logo} alt={logoAlt} className="logo h-10 md:h-[50px] rounded-4xl object-contain" />
            </a>
          </div>

          {/* Center: Desktop Quick Links */}
          <div className="hidden lg:flex items-center gap-10 justify-center flex-1 px-4 z-2">
            <a href="/shop/women" className="text-[12px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:bg-black/5 hover:text-black/80 transition-all duration-300" style={{ color: menuColor }}>Women</a>
            <a href="/shop/men" className="text-[12px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:bg-black/5 hover:text-black/80 transition-all duration-300" style={{ color: menuColor }}>Men</a>
            <a href="/collections/best-sellers" className="text-[12px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:bg-black/5 text-[#D4A373] hover:text-[#c49262] transition-colors" style={{ color: menuColor }}>Bestsellers</a>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="card-nav-buttons flex items-center justify-end gap-2 md:gap-3 order-3 lg:w-1/4">
            <form action="/search" method="get" className="hidden md:flex items-center rounded-full overflow-hidden px-3 py-1.5 bg-white/40 backdrop-blur-md hover:bg-white/60 focus-within:bg-white focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.08)] focus-within:ring-1 focus-within:ring-black/5 transition-all duration-500 border border-white/60">
              <input type="text" name="q" placeholder="Search..." className="bg-transparent border-none text-[13px] text-black outline-none w-28 lg:w-40 px-2 py-1 focus:w-40 lg:focus:w-56 transition-all duration-300 placeholder-black/50" />
              <button type="submit" className="flex items-center justify-center text-black/60 hover:text-black transition-colors" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </button>
            </form>
            <div className="flex md:hidden items-center justify-center w-10 h-10 relative">
              <div className={`transition-all duration-300 flex items-center ${isMobileSearchOpen ? 'w-[200px] sm:w-[250px] bg-white rounded-full shadow-md ring-1 ring-black/10 absolute right-0 z-[100] h-10' : 'w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 right-0 absolute'}`}>
                <form action="/search" method="get" className="flex items-center w-full h-full justify-center">
                  {!isMobileSearchOpen ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileSearchOpen(true);
                      }}
                      className="flex items-center justify-center w-full h-full text-black transition-colors"
                      aria-label="Search">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>
                  ) : (
                    <>
                      <input
                        autoFocus
                        type="text"
                        name="q"
                        placeholder="Search..."
                        className="bg-transparent border-none text-[13px] text-black outline-none flex-1 px-3 py-1 w-full h-full rounded-l-full"
                        onBlur={(e) => {
                          setTimeout(() => {
                            if (!e.target.value) setIsMobileSearchOpen(false);
                          }, 200);
                        }}
                      />
                      <button type="submit" className="flex items-center justify-center text-black/60 hover:text-black transition-colors p-2" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                      </button>
                      <button type="button" onClick={() => setIsMobileSearchOpen(false)} className="flex items-center justify-center text-black/40 hover:text-black transition-colors p-2 pr-3" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
            {/* Wishlist (Like) - hidden on mobile, shown when expanded or on desktop */}
            <a
              href="/account/wishlist"
              className={`nav-icon-btn relative items-center justify-center w-11 h-11 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 text-black border border-white/60 shadow-sm transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${isExpanded ? 'flex' : 'hidden'} md:flex`}
              aria-label="Wishlist">
              <GoHeart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </a>
            {/* Profile - shown on mobile when expanded, always visible on desktop */}
            <div className={`items-center justify-center ${isExpanded ? 'flex' : 'hidden'} md:flex`}>
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="nav-icon-btn flex items-center justify-center w-11 h-11 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 text-black border border-white/60 shadow-sm transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                    aria-label="Sign In">
                    <GoPerson size={20} />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm hover:bg-white/60 transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-[28px] h-[28px]"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
            {/* Cart - always visible */}
            <a
              href="/account/cart"
              className="nav-icon-btn relative flex items-center justify-center w-11 h-11 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 text-black border border-white/60 shadow-sm transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              aria-label="Cart">
              <ShoppingCart size={18} strokeWidth={2} />
              {cartTotal > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm border-2 border-white">
                  {cartTotal}
                </span>
              )}
            </a>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 pb-6 flex flex-col items-stretch gap-2 justify-start z-[1] overflow-y-auto overflow-x-hidden custom-nav-scrollbar ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
            } lg:flex-row lg:items-start lg:gap-3 touch-action-auto`}
          aria-hidden={!isExpanded}>
          {(items || []).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card nav-card-mobile-height select-none relative flex flex-col gap-3 p-6 rounded-3xl min-w-0 flex-[1_1_auto] h-auto lg:h-auto lg:flex-[1_1_auto] overflow-hidden bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-500"
              ref={setCardRef(idx)}
              style={{ color: "#111" }}>
              <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
                {/* Links section */}
                <div className="flex-1 min-w-0">
                  <div
                    className="nav-card-label font-serif tracking-wide text-[22px] lg:text-[26px] mb-3 border-b border-black/10 pb-2">
                    {item.label}
                  </div>
                  <div className="mt-4 nav-card-links flex flex-col gap-3">
                    {item.links?.map((lnk, i) => (
                      <a
                        key={`${lnk.label}-${i}`}
                        className="nav-card-link flex lg:inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] sm:text-[16px] lg:text-[18px] whitespace-nowrap"
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                        onMouseEnter={() => handleLinkHover(idx, lnk.hoverImageUrl)}
                        onMouseLeave={() => handleLinkLeave(idx)}>
                        <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                        {lnk.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hover image preview */}
                <div
                  className="hidden lg:flex items-center justify-center w-[180px] shrink-0 relative"
                  aria-hidden="true">
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${hoveredImages[idx] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}>
                    {hoveredImages[idx] && (
                      <img
                        src={hoveredImages[idx]}
                        alt=""
                        className="w-[120px] h-[120px] object-cover rounded-lg shadow-lg"
                        style={{
                          border: `2px solid rgba(0,0,0,0.1)`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;

