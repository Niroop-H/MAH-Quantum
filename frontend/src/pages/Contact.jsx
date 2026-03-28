import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Building2, Globe, Send, CheckCircle } from 'lucide-react';

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
{ icon: Mail, label: 'Email Us', value: '[nirooph@mahquantum.tech](mailto:nirooph@mahquantum.tech)', href: 'mailto:nirooph@mahquantum.tech' },
{ icon: Globe, label: 'Company', value: 'MAH Quantum', href: '#' },
{ icon: Building2, label: 'Focus', value: 'Enterprise AI & IT Systems', href: '#' },
];

export default function Contact() {
const [submitted, setSubmitted] = useState(false);

return ( <div className="bg-[#F8FAFC]">

```
  {/* Header */}
  <section className="relative pt-20 pb-16 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb-pink pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
        <span className="chip-blue mb-4 inline-block">Contact</span>
        <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 mb-6">
          Start a <span className="text-gradient">Conversation</span>
        </h1>
        <p className="text-slate-600 text-lg font-ibm">
          Discuss how MAH Quantum can embed intelligent systems into your operations.
        </p>
      </motion.div>
    </div>
  </section>

  {/* Main */}
  <section className="pb-24">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Contact Info */}
        <motion.div {...fadeUp} className="lg:col-span-2">
          <div className="space-y-4 mb-10">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="card-glass p-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#00B4FF]/10 flex items-center justify-center rounded-xl">
                    <Icon size={18} className="text-[#00B4FF]" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{item.label}</div>
                    <a href={item.href} className="text-slate-800 text-sm font-semibold">
                      {item.value}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div {...fadeUp} className="lg:col-span-3">
          
          {submitted ? (
            <div className="card-glass p-10 text-center">
              <CheckCircle size={40} className="text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Inquiry Sent</h2>
              <p className="text-slate-500 mt-2">We’ll respond within 24 hours.</p>
            </div>
          ) : (
            <form
              action="https://formspree.io/f/YOUR_ID_HERE"
              method="POST"
              onSubmit={() => setSubmitted(true)}
              className="card-glass p-8 space-y-6"
            >

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" required placeholder="Full Name" className="input-style" />
                <input type="email" name="email" required placeholder="Email" className="input-style" />
              </div>

              {/* Company + Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="company" required placeholder="Company" className="input-style" />
                <select name="industry" required className="input-style">
                  <option value="">Select Industry</option>
                  {industries.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>

              {/* Message */}
              <textarea name="message" required rows={5} placeholder="Your message..." className="input-style" />

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={16} />
                Send Message
              </button>

            </form>
          )}

        </motion.div>
      </div>
    </div>
  </section>
</div>
```

);
}
