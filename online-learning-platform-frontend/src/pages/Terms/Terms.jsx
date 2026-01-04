import { useEffect, useState } from "react";
import { FiFileText, FiShield, FiAlertTriangle, FiCheckCircle, FiClock } from "react-icons/fi";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | EduLe";
  }, []);

  const sectionIds = [
    "introduction",
    "accounts",
    "payments",
    "content",
    "prohibited",
    "liability",
    "termination",
    "governing",
    "changes",
    "contact",
  ];

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

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2d8d54] via-[#3aa567] to-[#71c39a] text-white">
        <div className="max-w-[1440px] mx-auto px-4 xl:px-0 py-16 md:py-20">
          <div className="flex items-center gap-3 text-white/80 text-sm mb-4">
            <span>Home</span>
            <span>›</span>
            <span className="text-white">Terms & Conditions</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Terms & Conditions</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Please read these Terms carefully. They govern your use of EduLe’s
            services, courses, and features.
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
          {/* Sidebar */}
          <aside className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 bg-white border border-[rgba(48,146,85,0.15)] rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3">On this page</h2>
              <nav className="text-[#707a7c] space-y-1">
                <a href="#introduction" className={linkClass("introduction")} aria-current={activeId === "introduction" ? "page" : undefined} onClick={(e) => handleNavClick(e, "introduction")}>
                  Introduction
                </a>
                <a href="#accounts" className={linkClass("accounts")} aria-current={activeId === "accounts" ? "page" : undefined} onClick={(e) => handleNavClick(e, "accounts")}>
                  Accounts & Access
                </a>
                <a href="#payments" className={linkClass("payments")} aria-current={activeId === "payments" ? "page" : undefined} onClick={(e) => handleNavClick(e, "payments")}>
                  Payments & Billing
                </a>
                <a href="#content" className={linkClass("content")} aria-current={activeId === "content" ? "page" : undefined} onClick={(e) => handleNavClick(e, "content")}>
                  Content & Ownership
                </a>
                <a href="#prohibited" className={linkClass("prohibited")} aria-current={activeId === "prohibited" ? "page" : undefined} onClick={(e) => handleNavClick(e, "prohibited")}>
                  Prohibited Activities
                </a>
                <a href="#liability" className={linkClass("liability")} aria-current={activeId === "liability" ? "page" : undefined} onClick={(e) => handleNavClick(e, "liability")}>
                  Limitation of Liability
                </a>
                <a href="#termination" className={linkClass("termination")} aria-current={activeId === "termination" ? "page" : undefined} onClick={(e) => handleNavClick(e, "termination")}>
                  Termination
                </a>
                <a href="#governing" className={linkClass("governing")} aria-current={activeId === "governing" ? "page" : undefined} onClick={(e) => handleNavClick(e, "governing")}>
                  Governing Law
                </a>
                <a href="#changes" className={linkClass("changes")} aria-current={activeId === "changes" ? "page" : undefined} onClick={(e) => handleNavClick(e, "changes")}>
                  Changes to Terms
                </a>
                <a href="#contact" className={linkClass("contact")} aria-current={activeId === "contact" ? "page" : undefined} onClick={(e) => handleNavClick(e, "contact")}>
                  Contact
                </a>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiFileText className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Clarity</p>
                  <p className="text-[#707a7c]">Simple terms, easy to understand.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiShield className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Fair Use</p>
                  <p className="text-[#707a7c]">Respectful and secure usage expected.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] p-5 flex items-start gap-3">
                <FiCheckCircle className="text-[#2d8d54]" size={24} />
                <div>
                  <p className="font-semibold">Compliance</p>
                  <p className="text-[#707a7c]">Aligned with laws and standards.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-[rgba(48,146,85,0.15)] p-6 md:p-8 text-[#2b2b2b] leading-relaxed">
              <section id="introduction" className="scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Introduction</h3>
                <p className="text-[#707a7c]">
                  These Terms & Conditions ("Terms") govern your use of EduLe, including
                  access to courses, dashboards, and related services. By using EduLe, you
                  agree to these Terms.
                </p>
              </section>

              <section id="accounts" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Accounts & Access</h3>
                <p className="text-[#707a7c]">
                  You are responsible for maintaining the confidentiality of your account
                  credentials and for all activities under your account. Notify us
                  immediately of any unauthorized use.
                </p>
              </section>

              <section id="payments" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Payments & Billing</h3>
                <p className="text-[#707a7c]">
                  Payments are processed by secure third-party providers. Fees, refunds, and
                  billing cycles are disclosed at purchase. Where applicable, taxes may
                  apply.
                </p>
              </section>

              <section id="content" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Content & Ownership</h3>
                <p className="text-[#707a7c]">
                  Course materials, trademarks, and platform assets are owned by EduLe or
                  licensors. You may not reproduce, distribute, or create derivative works
                  without permission.
                </p>
              </section>

              <section id="prohibited" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Prohibited Activities</h3>
                <ul className="list-disc pl-6 text-[#707a7c] space-y-2">
                  <li>Attempting to breach security or access unauthorized areas.</li>
                  <li>Sharing accounts or reselling access without consent.</li>
                  <li>Uploading illegal, infringing, or harmful content.</li>
                </ul>
                <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#e7f8ee] px-3 py-2 text-sm">
                  <FiAlertTriangle className="text-[#2d8d54]" />
                  <span className="text-[#2b2b2b]">Violations may lead to suspension or termination.</span>
                </div>
              </section>

              <section id="liability" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Limitation of Liability</h3>
                <p className="text-[#707a7c]">
                  EduLe is provided "as is". To the maximum extent permitted by law, EduLe
                  is not liable for indirect, incidental, or consequential damages.
                </p>
              </section>

              <section id="termination" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Termination</h3>
                <p className="text-[#707a7c]">
                  We may suspend or terminate access for violations of these Terms or
                  applicable laws. You may stop using EduLe at any time.
                </p>
              </section>

              <section id="governing" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Governing Law</h3>
                <p className="text-[#707a7c]">
                  These Terms are governed by applicable laws of Bangladesh, without regard
                  to conflict of law principles, unless required otherwise by your
                  jurisdiction.
                </p>
              </section>

              <section id="changes" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Changes to Terms</h3>
                <p className="text-[#707a7c]">
                  We may update these Terms to reflect changes in our services or legal
                  requirements. The updated effective date will be posted at the top.
                </p>
              </section>

              <section id="contact" className="mt-10 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-3">Contact</h3>
                <p className="text-[#707a7c]">
                  For questions about these Terms, reach us at support@edule.com or write to
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

export default Terms;
