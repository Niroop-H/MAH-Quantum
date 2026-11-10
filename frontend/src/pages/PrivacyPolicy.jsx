import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-4">{title}</h2>
    <div className="space-y-3 text-slate-600 leading-7 font-ibm">{children}</div>
  </section>
);

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] orb-blue pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="chip-blue mb-4 inline-block">Legal / Privacy</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-5">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-slate-600 font-ibm">MAH Quantum · Effective 10 November 2026 · Last updated 10 November 2026</p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
        <div className="card-glass p-6 sm:p-10">
          <p className="text-slate-700 leading-7 font-ibm mb-10">
            MAH Quantum ("MAH Quantum", "we", "us" or "our") respects your privacy. This policy explains
            how information may be collected and used when you visit our websites, contact us, or use
            MAH Quantum Workspace and related services.
          </p>
          <Section title="1. Information we process">
            <p><strong className="text-slate-800">Contact enquiries.</strong> When you submit our contact form, we collect the name, email address, company or organisation, industry and message that you provide. The form sends this information to our application backend so that we can receive and respond to your enquiry.</p>
            <p><strong className="text-slate-800">Technical information.</strong> Our website infrastructure and hosting providers may process technical information such as IP address, browser and device details, requested pages, timestamps, security events and diagnostic logs.</p>
            <p><strong className="text-slate-800">Workspace information.</strong> MAH Quantum Workspace may process quantum circuits, OpenQASM programs, experiment settings, simulation outputs, project snapshots and job history. Core circuit simulation is designed to run locally in your browser. Some workspace information may be saved in browser storage on your device.</p>
            <p><strong className="text-slate-800">Commercial communications.</strong> If you request product access, support or a subscription, we may process the contact and correspondence details you provide, together with access, subscription, payment confirmation and transaction-reference records needed to administer the relationship.</p>
          </Section>
          <Section title="2. How we use information">
            <p>We use information to operate and maintain our websites and services; respond to enquiries and support requests; provide access to products; administer subscriptions where offered; troubleshoot errors; protect against fraud, abuse and security incidents; improve reliability; and comply with legal obligations.</p>
          </Section>
          <Section title="3. Local processing and browser storage">
            <p>Core quantum circuit simulation is designed to execute in your browser rather than requiring remote quantum hardware. Workspace projects, snapshots, preferences and job history may be stored in browser storage on your device. These records may remain until you delete them, clear site data or remove the relevant browser storage.</p>
            <p>Clearing browser data may permanently remove locally stored projects or history. Export important work regularly. Browser-local execution does not mean that all website activity is necessarily local: the website, hosting layer, contact form and any optional backend features may transmit information as described in this policy.</p>
          </Section>
          <Section title="4. Backend services and service providers">
            <p>When you use a feature that communicates with our backend, the information required to fulfil that request may be transmitted to and processed by that service. We may use hosting, content delivery, security, communications, analytics or payment providers to support our operations. Those providers may process information on our behalf or under their own privacy terms, depending on the service.</p>
            <p>We do not claim that every feature is exclusively browser-local. The exact data processed depends on the feature used and the infrastructure serving it.</p>
          </Section>
          <Section title="5. Cookies and similar technologies">
            <p>Our websites or service providers may use cookies, local storage or similar technologies for essential functionality, preferences, security and diagnostics. You can manage or clear browser storage using your browser settings. Disabling essential storage may affect site functionality.</p>
          </Section>
          <Section title="6. Payments and subscriptions">
            <p>Where paid products or subscriptions are offered, payments may be handled independently by a payment service provider. We may retain payment confirmations, transaction references, subscription status, access validity dates and related records for administration, support, accounting and legal compliance. We do not need or intend to store full payment-card credentials in the quantum simulation workspace.</p>
          </Section>
          <Section title="7. Sharing and disclosure">
            <p>We do not sell personal information. We may disclose information to service providers who support our operations, payment providers when you make a payment, professional advisers where necessary, or public authorities when required by law or needed to protect rights, safety and security. We seek to limit disclosures to what is reasonably necessary for the relevant purpose.</p>
          </Section>
          <Section title="8. Retention">
            <p>We retain personal information for as long as reasonably necessary for the purposes described in this policy, including responding to enquiries, maintaining services, administering subscriptions, resolving disputes, security and legal compliance. Retention periods vary by data type and operational or legal requirements. Locally stored workspace information may remain on your device until you remove it.</p>
          </Section>
          <Section title="9. Security">
            <p>We use reasonable technical and organisational measures intended to protect information. No website, network transmission or electronic storage method can be guaranteed completely secure. You are responsible for protecting your devices and access credentials and for keeping backups of important locally stored work.</p>
          </Section>
          <Section title="10. Your choices and privacy requests">
            <p>Subject to applicable law, you may request access to, correction of or deletion of personal information we hold about you, or raise a concern about its handling. You may also clear locally stored workspace data through your browser settings. We may need to verify your identity and may retain certain information where the law permits or requires it.</p>
          </Section>
          <Section title="11. Children">
            <p>Our services are not specifically directed at children. Where applicable law requires parental or guardian consent for processing a child's personal information, we will follow those requirements.</p>
          </Section>
          <Section title="12. International processing">
            <p>Our infrastructure or service providers may process technical or other information in countries outside your place of residence. Where required, such processing will be subject to applicable data protection requirements and appropriate safeguards.</p>
          </Section>
          <Section title="13. Changes to this policy">
            <p>We may update this policy as our products, infrastructure or legal obligations change. The current version will be published on this page with its effective or last-updated date.</p>
          </Section>
          <Section title="14. Contact">
            <p>For privacy questions or requests, contact:</p>
            <p><strong className="text-slate-800">MAH Quantum</strong><br />
              Bengaluru, Karnataka, India<br />
              Email: <a className="text-[#008FCB] hover:underline" href="mailto:nirooph@mahquantum.tech">nirooph@mahquantum.tech</a><br />
              Website: <a className="text-[#008FCB] hover:underline" href="https://mahquantum.tech">https://mahquantum.tech</a>
            </p>
            <p>Please use the subject line "Privacy Request" so that we can identify your message.</p>
          </Section>
          <p className="text-sm text-slate-500 border-t border-slate-200 pt-6">
            This policy describes current intended practices at a general level. It should be kept aligned with the actual analytics, hosting, backend, cookies and payment services enabled on the site.
          </p>
        </div>
      </main>
    </div>
  );
}
