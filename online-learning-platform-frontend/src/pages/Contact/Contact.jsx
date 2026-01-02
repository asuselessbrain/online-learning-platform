import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ReadyToStart from '../../Components/Home/ReadyToStart';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <FiMail className="text-2xl text-[#309255]" />,
            title: "Email Us",
            details: "support@onlinelearn.com",
            description: "Send us an email and we'll respond within 24 hours."
        },
        {
            icon: <FiPhone className="text-2xl text-[#309255]" />,
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri from 8am to 5pm."
        },
        {
            icon: <FiMapPin className="text-2xl text-[#309255]" />,
            title: "Visit Us",
            details: "123 Learning Street, Education City, EC 12345",
            description: "Come say hello at our office."
        },
        {
            icon: <FiClock className="text-2xl text-[#309255]" />,
            title: "Business Hours",
            details: "Mon - Fri: 8am - 5pm",
            description: "We're here to help during business hours."
        }
    ];

    const faqs = [
        {
            question: "How do I enroll in a course?",
            answer: "Simply browse our courses, select the one you're interested in, and click 'Enroll Now'. You'll need to create an account if you haven't already."
        },
        {
            question: "Can I get a refund if I'm not satisfied?",
            answer: "Yes, we offer a 30-day money-back guarantee on all our courses. If you're not satisfied, contact our support team for a full refund."
        },
        {
            question: "Do you offer certificates?",
            answer: "Yes! Upon successful completion of any course, you'll receive a certificate that you can download and share on your professional profiles."
        },
        {
            question: "How do I become an instructor?",
            answer: "If you're an expert in your field, we'd love to have you! Contact us with your background and course ideas, and we'll guide you through the process."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-linear-to-br from-[#309255] to-[#256f42] text-white py-20">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                        Have questions? Need support? We're here to help. Get in touch with our team and we'll respond as soon as possible.
                    </p>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className="py-16 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h3>
                                <p className="text-[#309255] font-medium mb-2">{info.details}</p>
                                <p className="text-gray-600 text-sm">{info.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form and Map */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <div className="bg-white p-8 rounded-lg shadow-sm">
                                <div className="flex items-center mb-6">
                                    <FiMessageSquare className="text-2xl text-[#309255] mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255] focus:border-transparent"
                                                placeholder="Your full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255] focus:border-transparent"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255] focus:border-transparent"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255] focus:border-transparent resize-vertical"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#309255] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#256f42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Map and Additional Info */}
                        <div className="space-y-6">
                            {/* Map */}
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.0506827305944!2d90.38017237599688!3d22.464729636913948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30aacf2fe39e501f%3A0xec70c954a51b0386!2sPatuakhali%20Science%20%26%20Technology%20University%20(PSTU)!5e0!3m2!1sen!2sbd!4v1763122223495!5m2!1sen!2sbd"
                                    width="100%"
                                    height="320"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="OnlineLearn Office Location"
                                    className="w-full h-80"
                                ></iframe>
                            </div>

                            {/* Quick Contact */}
                            <div className="bg-[#309255] text-white p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                                <p className="mb-4 opacity-90">
                                    For urgent inquiries, you can also reach us through our live chat or call our support line directly.
                                </p>
                                <div className="space-y-2">
                                    <p className="flex items-center">
                                        <FiPhone className="mr-2" />
                                        <span>+1 (555) 123-4567</span>
                                    </p>
                                    <p className="flex items-center">
                                        <FiMail className="mr-2" />
                                        <span>urgent@onlinelearn.com</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find quick answers to common questions about our platform and services.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-start">
                                    <FiHelpCircle className="text-[#309255] mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ReadyToStart />
        </div>
    );
};

export default Contact;