import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Mail, Building2, Globe, Send, CheckCircle, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const industries = [
  'Manufacturing',
  'Logistics & Supply Chain',
  'Healthcare Operations',
  'Energy',
  'Enterprise Infrastructure',
  'Finance & Banking',
  'Retail & E-Commerce',
  'Government & Public Sector',
  'Other',
];

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'nirooph@mahquantum.tech', href: 'mailto:nirooph@mahquantum.tech' },
  { icon: Globe, label: 'Company', value: 'MAH Quantum', href: '#' },
  { icon: Building2, label: 'Focus', value: 'Enterprise AI & IT Systems', href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', industry: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.industry || !form.message) {
      setErrorMsg('Please fill in all required fields.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', company: '', industry: '', message: '' });
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb-pink pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="chip-blue mb-4 inline-block">Contact</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              Discuss how MAH Quantum can embed intelligent systems into your operational infrastructure. We respond to all inquiries within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Info */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="lg:col-span-2">
              <div className="space-y-4 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="card-glass p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#00B4FF]/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#00B4FF]" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-ibm mb-0.5">{item.label}</div>
                        <a href={item.href} className="text-slate-800 text-sm font-semibold font-ibm hover:text-[#00B4FF] transition-colors">{item.value}</a>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="card-glass p-6">
                <h3 className="font-outfit font-bold text-lg text-slate-900 mb-3">What to Expect</h3>
                <ul className="space-y-3">
                  {['Response within 24 hours', 'Custom AI architecture assessment', 'Industry-specific solution proposal', 'Dedicated implementation team', 'Ongoing support & optimization'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600 text-sm font-ibm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B4FF] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.6 }} className="lg:col-span-3">
              {status === 'success' ? (
                <div className="card-glass p-10 flex flex-col items-center justify-center text-center min-h-[500px]">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-3">Inquiry Received</h2>
                  <p className="text-slate-500 text-base font-ibm max-w-sm">
                    Thank you for reaching out to MAH Quantum. Our team will review your inquiry and respond within 24 hours.
                  </p>
                  <button
                    data-testid="contact-send-another"
                    onClick={() => setStatus('idle')}
                    className="mt-8 btn-secondary"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  data-testid="contact-form"
                  className="card-glass p-8 lg:p-10 space-y-6"
                  noValidate
                >
                  <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-2">Submit an Inquiry</h2>
                  <p className="text-slate-500 text-sm font-ibm">Tell us about your organization and AI requirements.</p>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-ibm">
                        Full Name <span className="text-[#FF00A0]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        data-testid="contact-name-input"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-slate-200 focus:border-[#00B4FF] focus:ring-2 focus:ring-[#00B4FF]/20 outline-none text-slate-900 text-sm placeholder-slate-400 transition-all font-ibm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-ibm">
                        Email Address <span className="text-[#FF00A0]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        data-testid="contact-email-input"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-slate-200 focus:border-[#00B4FF] focus:ring-2 focus:ring-[#00B4FF]/20 outline-none text-slate-900 text-sm placeholder-slate-400 transition-all font-ibm"
                        required
                      />
                    </div>
                  </div>

                  {/* Company + Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-ibm">
                        Company / Organization <span className="text-[#FF00A0]">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        data-testid="contact-company-input"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-slate-200 focus:border-[#00B4FF] focus:ring-2 focus:ring-[#00B4FF]/20 outline-none text-slate-900 text-sm placeholder-slate-400 transition-all font-ibm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-ibm">
                        Industry <span className="text-[#FF00A0]">*</span>
                      </label>
                      <select
                        name="industry"
                        data-testid="contact-industry-select"
                        value={form.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-slate-200 focus:border-[#00B4FF] focus:ring-2 focus:ring-[#00B4FF]/20 outline-none text-slate-900 text-sm transition-all font-ibm appearance-none cursor-pointer"
                        required
                      >
                        <option value="" className="text-slate-400">Select your industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-ibm">
                      Message <span className="text-[#FF00A0]">*</span>
                    </label>
                    <textarea
                      name="message"
                      data-testid="contact-message-input"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your operational challenges and how you're looking to leverage AI..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-slate-200 focus:border-[#00B4FF] focus:ring-2 focus:ring-[#00B4FF]/20 outline-none text-slate-900 text-sm placeholder-slate-400 transition-all resize-none font-ibm"
                      required
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-ibm">
                      <AlertCircle size={16} />
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    data-testid="contact-submit-button"
                    disabled={status === 'loading'}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
