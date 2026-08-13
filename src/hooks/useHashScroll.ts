import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Height of the fixed navbar, so a section doesn't land underneath it.
const NAV_OFFSET = 80;

// How long to keep waiting for a lazy-loaded section to mount before giving up.
const MAX_WAIT_MS = 5000;

// Re-check the position after the initial scroll — lazy sections and images
// above the target can still shift the layout under us.
const SETTLE_DELAYS_MS = [400, 900, 1600];

/**
 * Scrolls to the element named by the URL hash.
 *
 * The browser's built-in hash scrolling fires before our lazy-loaded sections
 * (Films, About, Contact) have mounted, so landing on /#films did nothing.
 * This waits for the target to actually exist, scrolls to it, then corrects
 * for any layout shift that happens while the rest of the page settles.
 */
const useHashScroll = () => {
  const { hash } = useLocation();

  useEffect(() => {
    let cancelled = false;
    let userScrolled = false;
    let observer: MutationObserver | null = null;
    const timers: number[] = [];

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const targetFor = (el: Element) =>
      Math.max(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, 0);

    const getTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      return id ? document.getElementById(id) : null;
    };

    const noteUserScroll = () => {
      userScrolled = true;
    };

    const clearTimers = () => {
      timers.forEach(window.clearTimeout);
      timers.length = 0;
    };

    const stopWaiting = () => {
      observer?.disconnect();
      observer = null;
    };

    // Nudge back into place if the layout moved after we scrolled.
    const settle = () => {
      if (cancelled || userScrolled) return;
      const el = getTarget();
      if (!el) return;
      const target = targetFor(el);
      if (Math.abs(window.scrollY - target) > 4) {
        window.scrollTo({ top: target, behavior: 'auto' });
      }
    };

    const attempt = () => {
      if (cancelled) return true;
      const el = getTarget();
      if (!el) return false;

      stopWaiting();
      // Let layout settle (images/fonts) before measuring the offset.
      window.requestAnimationFrame(() => {
        if (cancelled || userScrolled) return;
        window.scrollTo({
          top: targetFor(el),
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
        SETTLE_DELAYS_MS.forEach((delay) =>
          timers.push(window.setTimeout(settle, delay))
        );
      });
      return true;
    };

    const run = () => {
      stopWaiting();
      clearTimers();
      userScrolled = false;
      if (!window.location.hash) return;
      if (attempt()) return;
      // Target isn't mounted yet (lazy section) — watch for it to appear.
      observer = new MutationObserver(() => attempt());
      observer.observe(document.body, { childList: true, subtree: true });
      timers.push(window.setTimeout(stopWaiting, MAX_WAIT_MS));
    };

    run();

    // Plain anchor links (/#films) change the hash without a popstate, so
    // react-router's location never updates — listen for it directly.
    window.addEventListener('hashchange', run);
    window.addEventListener('wheel', noteUserScroll, { passive: true });
    window.addEventListener('touchstart', noteUserScroll, { passive: true });
    window.addEventListener('keydown', noteUserScroll);

    return () => {
      cancelled = true;
      window.removeEventListener('hashchange', run);
      window.removeEventListener('wheel', noteUserScroll);
      window.removeEventListener('touchstart', noteUserScroll);
      window.removeEventListener('keydown', noteUserScroll);
      stopWaiting();
      clearTimers();
    };
  }, [hash]);
};

export default useHashScroll;
