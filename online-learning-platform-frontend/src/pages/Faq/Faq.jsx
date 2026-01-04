import { useEffect, useState } from "react";
import { FiHelpCircle, FiCreditCard, FiAward, FiSettings, FiBookOpen, FiChevronDown, FiClock } from "react-icons/fi";

const Faq = () => {
  useEffect(() => {
    document.title = "Course FAQs | EduLe";
  }, []);

  const sectionIds = ["enrollment", "payments", "certificates", "technical", "courses"];
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] }
    );
    const targets = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id) => (activeId === id ? "block text-[#2d8d54]" : "block hover:text-[#2d8d54]");
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  const QA = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="border border-[rgba(48,146,85,0.15)] rounded-md">
        <button
          className="w-full flex justify-between items-center px-4 py-3 text-left"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="font-medium">{q}</span>
          <FiChevronDown className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
        </button>
        {open && (
          <div className="px-4 pb-4 text-[#707a7c]">{a}</div>
        )}
      </div>
    );
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2d8d54] via-[#3aa567] to-[#71c39a] text-white">
        <div className="max-w-[1440px] mx-auto px-4 xl:px-0 py-16 md:py-20">
          <div className="flex items-center gap-3 text-white/80 text-sm mb-4">
            <span>Home</span>
            <span>›</span>
            <span className="text-white">Course FAQs</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Course FAQs</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Answers to common questions about enrollment, payments, certificates,
            technical issues, and course details.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <FiClock className="text-white" />
            <span className="text-white/90 text-sm">Updated: January 4, 2026</span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="max-w-[1440px] mx-auto px-4 xl:px-0 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 bg-white border border-[rgba(48,146,85,0.15)] rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3">Browse topics</h2>
              <nav className="text-[#707a7c] space-y-1">
                <a href="#enrollment" className={linkClass("enrollment")} aria-current={activeId === "enrollment" ? "page" : undefined} onClick={(e) => handleNavClick(e, "enrollment")}>
                  Enrollment
                </a>
                <a href="#payments" className={linkClass("payments")} aria-current={activeId === "payments" ? "page" : undefined} onClick={(e) => handleNavClick(e, "payments")}>
                  Payments
                </a>
                <a href="#certificates" className={linkClass("certificates")} aria-current={activeId === "certificates" ? "page" : undefined} onClick={(e) => handleNavClick(e, "certificates")}>
                  Certificates
                </a>
                <a href="#technical" className={linkClass("technical")} aria-current={activeId === "technical" ? "page" : undefined} onClick={(e) => handleNavClick(e, "technical")}>
                  Technical
                </a>
                <a href="#courses" className={linkClass("courses")} aria-current={activeId === "courses" ? "page" : undefined} onClick={(e) => handleNavClick(e, "courses")}>
                  Courses
                </a>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9">
            {/* Intro cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiHelpCircle className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Quick Answers</p>
                  <p className="text-[#707a7c]">Find solutions fast across topics.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiSettings className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Guided Help</p>
                  <p className="text-[#707a7c]">Step-by-step fixes for common issues.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiBookOpen className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Course Info</p>
                  <p className="text-[#707a7c]">Details on content and progress.</p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="bg-white rounded-lg shadow-sm border border-[rgba(48,146,85,0.15)] p-6 md:p-8 text-[#2b2b2b] leading-relaxed">
              <section id="enrollment" className="scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Enrollment</h3>
                <div className="space-y-3">
                  <QA q="How do I enroll in a course?" a="Open the course page and click ‘Enroll’. If required, complete payment to unlock the content." />
                  <QA q="Can I switch courses after enrolling?" a="You can switch before completing 10% of the course content. Contact support to assist with transfers." />
                  <QA q="Do I need an account to enroll?" a="Yes. Create an EduLe account to track progress, certificates, and purchases." />
                </div>
              </section>

              <section id="payments" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Payments</h3>
                <div className="space-y-3">
                  <QA q="What payment methods are supported?" a="We support major cards and mobile wallets via secure providers. We never store full card numbers." />
                  <QA q="Can I get a refund?" a="Refunds are available within 7 days if less than 10% of the course is completed. See Terms for details." />
                  <QA q="Why was my payment declined?" a="Check card limits, billing address, or try another method. Contact your bank or our support if issues persist." />
                </div>
              </section>

              <section id="certificates" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Certificates</h3>
                <div className="space-y-3">
                  <QA q="How do I earn a certificate?" a="Complete required modules and assessments. Certificates appear in your dashboard for download." />
                  <QA q="Are certificates verified?" a="Each certificate includes a verification ID and can be validated through our portal." />
                  <QA q="Can I share certificates on LinkedIn?" a="Yes, you can upload the certificate file or add it via the ‘Licenses & Certifications’ section." />
                </div>
              </section>

              <section id="technical" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Technical</h3>
                <div className="space-y-3">
                  <QA q="Videos are not loading. What should I do?" a="Refresh the page, clear cache, and ensure a stable connection. Try another browser if the issue persists." />
                  <QA q="The app logs me out frequently." a="Enable cookies and disable aggressive privacy extensions. If on multiple devices, avoid concurrent sessions." />
                  <QA q="I forgot my password." a="Use ‘Forgot Password’ on the login page to reset via email." />
                </div>
              </section>

              <section id="courses" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Courses</h3>
                <div className="space-y-3">
                  <QA q="How often are courses updated?" a="We update top courses quarterly and add new content throughout the year based on learner feedback." />
                  <QA q="Can I access course materials offline?" a="Select courses support downloadable resources. Videos require online access unless specifically stated." />
                  <QA q="Do courses include community discussions?" a="Many courses offer moderated discussion boards and Q&A sessions with instructors." />
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Faq;
