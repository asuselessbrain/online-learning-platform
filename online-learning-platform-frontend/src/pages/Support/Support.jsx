import { useEffect, useState } from "react";
import { FiMail, FiPhone, FiMessageSquare, FiClock, FiSend, FiCheckCircle } from "react-icons/fi";

const Support = () => {
  useEffect(() => {
    document.title = "Customer Support | EduLe";
  }, []);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Please provide at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Placeholder for API call
    setSubmitted(true);
  };

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2d8d54] via-[#3aa567] to-[#71c39a] text-white">
        <div className="max-w-[1440px] mx-auto px-4 xl:px-0 py-16 md:py-20">
          <div className="flex items-center gap-3 text-white/80 text-sm mb-4">
            <span>Home</span>
            <span>›</span>
            <span className="text-white">Customer Support</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">We’re here to help</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Get help with enrollment, payments, technical issues, and more. Reach us
            through any of the options below or submit a support request.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <FiClock className="text-white" />
            <span className="text-white/90 text-sm">Response time: within 24–48 hours</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1440px] mx-auto px-4 xl:px-0 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact options */}
          <aside className="lg:col-span-4 order-last lg:order-first">
            <div className="bg-white rounded-lg border border-[rgba(48,146,85,0.15)] shadow-sm p-6 space-y-5">
              <h2 className="text-xl font-semibold">Contact options</h2>
              <a href="mailto:support@edule.com" className="flex items-start gap-3 group">
                <div className="mt-0.5">
                  <FiMail className="text-[#2d8d54]" size={22} />
                </div>
                <div>
                  <p className="font-medium group-hover:text-[#2d8d54]">Email Support</p>
                  <p className="text-[#707a7c]">support@edule.com</p>
                </div>
              </a>
              <a href="tel:+8801700000000" className="flex items-start gap-3 group">
                <div className="mt-0.5">
                  <FiPhone className="text-[#2d8d54]" size={22} />
                </div>
                <div>
                  <p className="font-medium group-hover:text-[#2d8d54]">Phone Support</p>
                  <p className="text-[#707a7c]">+880 1700-000000</p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <FiMessageSquare className="text-[#2d8d54]" size={22} />
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-[#707a7c]">Available Mon–Fri, 9am–6pm (BST)</p>
                </div>
              </div>
              <div className="rounded-md bg-[#e7f8ee] p-3 text-sm inline-flex items-center gap-2">
                <FiCheckCircle className="text-[#2d8d54]" />
                <span className="text-[#2b2b2b]">Check the FAQs for quick solutions.</span>
              </div>
            </div>
          </aside>

          {/* Request form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-[rgba(48,146,85,0.15)] p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-2">Submit a support request</h2>
              <p className="text-[#707a7c] mb-6">Fill out the form and our team will get back to you.</p>
              {submitted ? (
                <div className="rounded-md bg-[#e7f8ee] p-4">
                  <p className="text-[#2b2b2b]">Thanks! Your request has been received. We’ll reach out via email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1">Name</label>
                    <input
                      type="text"
                      className="bg-white p-3 rounded-md w-full border border-[rgba(48,146,85,0.2)] focus:outline-none"
                      value={form.name}
                      onChange={onChange("name")}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      type="email"
                      className="bg-white p-3 rounded-md w-full border border-[rgba(48,146,85,0.2)] focus:outline-none"
                      value={form.email}
                      onChange={onChange("email")}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block mb-1">Subject</label>
                    <input
                      type="text"
                      className="bg-white p-3 rounded-md w-full border border-[rgba(48,146,85,0.2)] focus:outline-none"
                      value={form.subject}
                      onChange={onChange("subject")}
                    />
                    {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block mb-1">Message</label>
                    <textarea
                      rows={5}
                      className="bg-white p-3 rounded-md w-full border border-[rgba(48,146,85,0.2)] focus:outline-none"
                      value={form.message}
                      onChange={onChange("message")}
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="mt-2 bg-[#309255] px-6 py-3 text-white rounded-md inline-flex items-center gap-2">
                    <FiSend />
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Support;
