// Centralized image imports for the application
import logo from '@/assets/PexilBeaudryweblogo.png';
import pixal1 from '@/assets/pixal (1).png';
import pixal2 from '@/assets/pixal (2).png';
import pixal3 from '@/assets/pixal (3).png';
import pixal4 from '@/assets/pixal (4).png';
import heroScene from '@/assets/hero.png';
import heroSoftware from '@/assets/hero1.png';

export const images = {
  logo,
  /** Homepage hero — logo + hero + hero1 + pixal (1–4) */
  heroSection: {
    logoMark: logo,
    hero: heroScene,
    hero1: heroSoftware,
    pixal1,
    pixal2,
    pixal3,
    pixal4,
    /** Aliases for older keys */
    branding: pixal1,
    softwareScene: pixal4,
    packagingScene: heroScene,
    splash: pixal2,
    cube: pixal3,
  },
  robots: {
    heroMain: pixal1,
    heroSmall: pixal2,
    trustedPartner: pixal3,
    empoweringTop: pixal4,
    empoweringRight: heroScene,
    solution1: pixal1,
    solution2: pixal2,
    solution3: pixal3,
    solution4: heroSoftware,
    unlockPotential: pixal1,
    smartRetail: pixal2,
    faq: pixal3,
    testimonial: pixal4,
    extra1: pixal1,
    extra2: pixal2,
    extra3: pixal3,
    extra4: heroSoftware,
    extra5: pixal1,
    extra6: pixal2,
    extra7: pixal3,
    extra8: pixal4,
  },
};

export default images;
