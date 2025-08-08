import NavBar from "@/components/nav/navBar";
import Hero from "@/components/hero/hero";
import What_We_Offer from "@/components/what_we_offer/offer";
import About from "@/components/about_us/about";
import Gallery from "@/components/gallery/gallery";
import ContactUs from "@/components/contact_us/contact";
import OpeningHours from "@/components/opening_hours/opening";
import Footer from "@/components/footer/footer";
// Language selection
type LanguageOption = {
  code: string;
  flag: string;
};

// Type for nav bar
type navTitle = {
  title: string;
  href: string;
};

// Type for hero section
type heroTitle = {
  title: string;
  subtitle: string;
  buttonOrder: string;
  buttonPreview: string;
};

// Type for offer section
type offerItem = {
  title: string;
  description: string;
  icon: string;
  price: string;
  image: string[];
};
type offerInfo = {
  title: string;
  subtitle: string;
};

type offerTitle = {
  title: string;
  subtitle: string;
  info: offerInfo[];
  viewMoreButton: string;
  viewLessButton: string;
  items: offerItem[];
  booking: string;
};

//Type for galery section
type galleryItems = {
  src: string;
  alt: string;
};

type galleryInfo = {
  title: string;
  subtitle: string;
  images: galleryItems[];
};

// Type for about us section
type aboutInfo = {
  title: string;
  text: string;
  image: string;
};

// Type for contact us section
type ContactInfo = {
  title: string;
  subtitle: string;
  addressButton: string;
  bookingButton: string;
};


// Type for opening hours
type openingHours = {
  day: string;
  hours: string;
};
type openingInfo = {
  title: string;
  days: openingHours[];
  tip: string;
  bookingButton: string;
  subtitle: string;
  weekly: string;
};

type footerData = {
  title: string;
  items: { title: string; href: string }[];
};

type footerInfo = {
  subtitle: string;
  services: footerData;
  company: footerData;
};

const validLocales = ["sk", "en"];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = validLocales.includes(locale) ? locale : "sk";

  //Dynamically import the locale file based on the current locale
  const t = (await import(`../../locales/${currentLocale}.json`)).default;

  const languageOptions: LanguageOption[] = [
    { code: "sk", flag: "/flags/sk.png" },
    { code: "en", flag: "/flags/en.png" },
  ];

  const navTitles: navTitle[] = [
    { title: t.nav.home, href: "#home" },
    { title: t.nav.services, href: "#services" },
    { title: t.nav.about, href: "#about" },
    { title: t.nav.contact, href: "#contacts" },
  ];
  const heroTitles: heroTitle[] = [
    {
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      buttonOrder: t.nav.book,
      buttonPreview: t.hero.buttonPreview,
    },
  ];
  const offerTitles: offerTitle[] = [
    {
      title: t.offer.title,
      subtitle: t.offer.subtitle,
      items: t.offer.items,
      booking: t.nav.book,
      info: t.offer.info,
      viewMoreButton: t.offer.viewMoreButton,
      viewLessButton: t.offer.viewLessButton,
    },
  ];

  const galleryInfo: galleryInfo[] = [
    {
      title: t.gallery.title,
      subtitle: t.gallery.subtitle,
      images: t.gallery.images,
    },
  ];

  const aboutInfo: aboutInfo[] = [
    {
      title: t.about_us.title,
      text: t.about_us.text,
      image: t.about_us.image,
    },
  ];

  const contactInfo: ContactInfo[] = [
    {
      title: t.contact.title,
      subtitle: t.contact.subtitle,
      addressButton: t.contact.addressButton,
      bookingButton: t.nav.book,
    },
  ];
  const openingHours: openingInfo[] = [
    {
      title: t.opening_hours.title,
      days: t.opening_hours.days,
      tip: t.opening_hours.tip,
      bookingButton: t.nav.book,
      subtitle: t.opening_hours.subtitle,
      weekly: t.opening_hours.weekly,
    },
  ];
  const footerInfo: footerInfo[] = [
    {
      subtitle: t.footer.subtitle,
      services: t.footer.services,
      company: t.footer.company,
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Nav Bar */}
      <NavBar
        navTitles={navTitles}
        languageOptions={languageOptions}
        locale={locale}
        t={t}
      />
      {/* Hero Section */}
      <Hero heroTitles={heroTitles} />
      {/* What we offer Section */}
      <What_We_Offer offerTitles={offerTitles} locale={locale} />
      {/* Gallery section */}
      <Gallery galleryInfo={galleryInfo} />
      {/* About us section */}
      <About aboutInfo={aboutInfo} />
      {/* Contact us with map section */}
      <ContactUs contactInfo={contactInfo} />
      {/* Opening hours section */}
      <OpeningHours openingHours={openingHours} />
      {/* Footer section */}
      <Footer footerInfo={footerInfo} />
    </div>
  );
}
