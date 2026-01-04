import { useEffect, useState } from "react";
import { FiShield, FiLock, FiDatabase, FiClock, FiUserCheck, FiAlertCircle } from "react-icons/fi";

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | EduLe";
  }, []);

  const sectionIds = [
    "overview",
    "collect",
    "use",
    "cookies",
    "sharing",
    "retention",
    "security",
    "rights",
    "children",
    "updates",
    "contact",
  ];

  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.target && visible.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  const linkClass = (id) =>
    activeId === id
      ? "block text-[#2d8d54]"
      : "block hover:text-[#2d8d54]";

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveId(id);
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-linear-to-br from-[#2d8d54] via-[#3aa567] to-[#71c39a] text-white">
        <div className="max-w-[1440px] mx-auto px-4 xl:px-0 py-16 md:py-20">
          <div className="flex items-center gap-3 text-white/80 text-sm mb-4">
            <span>Home</span>
            <span>›</span>
            <span className="text-white">Privacy Policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Learn how EduLe collects, uses, and protects your information. Your trust
            matters, and we’re committed to transparent, responsible practices.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <FiClock className="text-white" />
            <span className="text-white/90 text-sm">Effective: January 4, 2026</span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="max-w-[1440px] mx-auto px-4 xl:px-0 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar TOC */}
          <aside className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 bg-white border border-[rgba(48,146,85,0.15)] rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3">On this page</h2>
              <nav className="text-[#707a7c] space-y-2">
                <a
                  href="#overview"
                  className={linkClass("overview")}
                  aria-current={activeId === "overview" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "overview")}
                >
                  Overview
                </a>
                <a
                  href="#collect"
                  className={linkClass("collect")}
                  aria-current={activeId === "collect" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "collect")}
                >
                  Information We Collect
                </a>
                <a
                  href="#use"
                  className={linkClass("use")}
                  aria-current={activeId === "use" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "use")}
                >
                  How We Use Information
                </a>
                <a
                  href="#cookies"
                  className={linkClass("cookies")}
                  aria-current={activeId === "cookies" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "cookies")}
                >
                  Cookies & Tracking
                </a>
                <a
                  href="#sharing"
                  className={linkClass("sharing")}
                  aria-current={activeId === "sharing" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "sharing")}
                >
                  Data Sharing
                </a>
                <a
                  href="#retention"
                  className={linkClass("retention")}
                  aria-current={activeId === "retention" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "retention")}
                >
                  Data Retention
                </a>
                <a
                  href="#security"
                  className={linkClass("security")}
                  aria-current={activeId === "security" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "security")}
                >
                  Security
                </a>
                <a
                  href="#rights"
                  className={linkClass("rights")}
                  aria-current={activeId === "rights" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "rights")}
                >
                  Your Rights
                </a>
                <a
                  href="#children"
                  className={linkClass("children")}
                  aria-current={activeId === "children" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "children")}
                >
                  Children’s Privacy
                </a>
                <a
                  href="#updates"
                  className={linkClass("updates")}
                  aria-current={activeId === "updates" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "updates")}
                >
                  Updates
                </a>
                <a
                  href="#contact"
                  className={linkClass("contact")}
                  aria-current={activeId === "contact" ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  Contact
                </a>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9">
            {/* Intro cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiShield className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Commitment</p>
                  <p className="text-[#707a7c]">We prioritize your privacy and security.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiLock className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Control</p>
                  <p className="text-[#707a7c]">Manage preferences and access your data.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiDatabase className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Transparency</p>
                  <p className="text-[#707a7c]">Clear policies on collection and usage.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-[rgba(48,146,85,0.15)] p-6 md:p-8 text-[#2b2b2b] leading-relaxed">
              <section id="overview" className="scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Overview</h3>
                <p className="text-[#707a7c] mb-6">
                  EduLe ("we", "us", "our") is committed to protecting your privacy. This
                  Privacy Policy explains what information we collect, how we use it, and your
                  rights. By using our services, you agree to the practices described here.
                </p>
                <div className="flex items-start gap-3 bg-[#e7f8ee] rounded-lg p-4 text-[#2b2b2b]">
                  <FiAlertCircle className="text-[#2d8d54] mt-0.5" />
                  <p className="text-sm">
                    This policy applies to all EduLe services, including web and mobile
                    experiences, payments, analytics, and customer support.
                  </p>
                </div>
              </section>

              <section id="collect" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Information We Collect</h3>
                <ul className="list-disc pl-6 text-[#707a7c] space-y-2">
                  <li>
                    Account Information: name, email address, profile details provided during
                    registration.
                  </li>
                  <li>
                    Course Activity: enrollments, progress, assessments, certificates, and
                    interactions (reviews, discussions).
                  </li>
                  <li>
                    Payment Data: limited transaction details handled via secure payment
                    providers. We do not store full card numbers.
                  </li>
                  <li>
                    Technical Data: device information, browser type, IP address, cookies, and
                    usage analytics.
                  </li>
                </ul>
              </section>

              <section id="use" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">How We Use Information</h3>
                <ul className="list-disc pl-6 text-[#707a7c] space-y-2">
                  <li>Provide and improve courses, features, and support.</li>
                  <li>Personalize content and recommendations.</li>
                  <li>Process payments and prevent fraud.</li>
                  <li>Communicate updates, offers, and service notices.</li>
                  <li>Comply with legal obligations and enforce policies.</li>
                </ul>
              </section>

              <section id="cookies" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Cookies & Tracking</h3>
                <p className="text-[#707a7c]">
                  We use cookies and similar technologies to maintain sessions, remember
                  preferences, and analyze usage. You can manage cookies via your browser
                  settings. Disabling cookies may affect site functionality.
                </p>
              </section>

              <section id="sharing" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Data Sharing</h3>
                <p className="text-[#707a7c]">
                  We may share information with trusted service providers (e.g., payments,
                  analytics) under strict confidentiality agreements. We do not sell your
                  personal data. We may disclose information when required by law or to
                  protect rights, safety, and integrity.
                </p>
              </section>

              <section id="retention" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Data Retention</h3>
                <p className="text-[#707a7c]">
                  We retain personal data only as long as needed for service delivery,
                  compliance, and legitimate business purposes. When no longer necessary, we
                  securely delete or anonymize information.
                </p>
              </section>

              <section id="security" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Security</h3>
                <p className="text-[#707a7c]">
                  We implement administrative, technical, and physical safeguards to protect
                  information. However, no method of transmission or storage is completely
                  secure; please use strong passwords and keep your account details
                  confidential.
                </p>
              </section>

              <section id="rights" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Your Rights</h3>
                <ul className="list-disc pl-6 text-[#707a7c] space-y-2">
                  <li>Access, correct, or delete your personal information.</li>
                  <li>Opt out of non-essential communications.</li>
                  <li>Request a copy of your data where applicable.</li>
                  <li>Withdraw consent for processing where consent is the basis.</li>
                </ul>
                <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#e7f8ee] px-3 py-2 text-sm">
                  <FiUserCheck className="text-[#2d8d54]" />
                  <span className="text-[#2b2b2b]">Use in-app settings to manage preferences.</span>
                </div>
              </section>

              <section id="children" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Children’s Privacy</h3>
                <p className="text-[#707a7c]">
                  Our services are not directed to children under 13. If you believe a child
                  provided personal data, contact us to remove it.
                </p>
              </section>

              <section id="updates" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Updates to This Policy</h3>
                <p className="text-[#707a7c]">
                  We may update this Privacy Policy to reflect changes in our practices or
                  legal requirements. We will post the updated version with the effective date
                  at the top.
                </p>
              </section>

              <section id="contact" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
                <p className="text-[#707a7c]">
                  For privacy questions or requests, contact support@edule.com or write to
                  House 12, Road 4, Dhanmondi, Dhaka – 1209, Bangladesh.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
