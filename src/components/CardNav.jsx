"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { GoHeart } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { GoPackage } from 'react-icons/go';

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
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

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
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}>
        <div
          className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          {/* Hamburger - first on mobile */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-1 md:order-none`}
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

          {/* Logo - second on mobile, centered on desktop */}
          <div
            className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-2 md:order-0">
            <img src={logo} alt={logoAlt} className="logo h-[50px]" />
          </div>

          {/* Buttons - third on mobile */}
          <div className="card-nav-buttons flex items-center gap-2 order-3">
            {/* Wishlist (Like) - hidden on mobile, shown when expanded or on desktop */}
            <button
              type="button"
              className={`nav-icon-btn border-0 rounded-full w-[38px] h-[38px] items-center justify-center cursor-pointer transition-all duration-300 hover:opacity-75 ${isExpanded ? 'flex' : 'hidden'
                } md:flex`}
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              aria-label="Wishlist">
              <GoHeart size={18} />
            </button>
            {/* Profile - hidden on mobile, always visible on desktop */}
            <button
              type="button"
              className="nav-icon-btn border-0 rounded-full w-[38px] h-[38px] hidden md:flex items-center justify-center cursor-pointer transition-all duration-300 hover:opacity-75"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              aria-label="Profile">
              <GoPerson size={18} />
            </button>
            {/* Cart - always visible */}
            <button
              type="button"
              className="nav-icon-btn border-0 rounded-full w-[38px] h-[38px] flex items-center justify-center cursor-pointer transition-all duration-300 hover:opacity-75"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              aria-label="Cart">
              <GoPackage size={18} />
            </button>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 pb-6 flex flex-col items-stretch gap-2 justify-start z-[1] overflow-y-auto overflow-x-hidden custom-nav-scrollbar ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
            } lg:flex-row lg:items-start lg:gap-[12px] touch-action-auto`}
          aria-hidden={!isExpanded}>
          {(items || []).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card nav-card-mobile-height select-none relative flex flex-col gap-3 p-[16px_20px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto lg:h-auto lg:flex-[1_1_auto] overflow-hidden"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}>
              <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
                {/* Links section */}
                <div className="flex-1 min-w-0">
                  <div
                    className="nav-card-label font-semibold tracking-[-0.5px] text-[20px] lg:text-[24px] mb-1">
                    {item.label}
                  </div>
                  <div className="mt-2 nav-card-links flex flex-col gap-2">
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
                          border: `2px solid ${item.textColor}20`,
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

