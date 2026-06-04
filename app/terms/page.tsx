import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#e8e7e3]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-[#91A57D]/15 flex items-center justify-center">
            <FileText size={22} className="text-[#91A57D]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#91A57D] mb-0.5">Legal</p>
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
        </div>

        {/* Portfolio disclaimer */}
        <div className="bg-[#91A57D]/10 border border-[#91A57D]/30 rounded-2xl px-6 py-4 mb-10">
          <p className="text-sm text-[#5a6a4d] font-medium">
            <strong>Portfolio Notice:</strong> Furnify is a conceptual e-commerce project built for portfolio purposes only. These Terms of Service are illustrative and do not constitute a legally binding agreement.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Furnify demo, you acknowledge that this is a portfolio project created for demonstration purposes. No binding contract is formed by your use of this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use of the Service</h2>
            <p>You agree to use Furnify only for lawful purposes and in a manner consistent with all applicable laws. You may not:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
              <li>Attempt to gain unauthorised access to any part of the system</li>
              <li>Use the platform to transmit harmful, offensive, or misleading content</li>
              <li>Scrape, reproduce, or redistribute content without permission</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Orders & Payments</h2>
            <p>
              All orders placed on this demo are <strong>simulated only</strong>. No actual purchases are processed, no payment information is collected, and no goods will be shipped. The checkout flow is included purely to demonstrate a realistic e-commerce experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Product Information</h2>
            <p>
              Product names, descriptions, prices, and images are illustrative. They are intended to represent a realistic catalogue and do not correspond to actual products for sale. Pricing shown is fictional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>
              All design, code, and content on Furnify is the intellectual property of the creator unless otherwise noted. Third-party assets (fonts, icons, imagery) are used under their respective licenses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Disclaimer of Warranties</h2>
            <p>
              Furnify is provided "as is" for demonstration purposes. We make no warranties regarding availability, accuracy, or fitness for a particular purpose. The platform may be taken offline or modified at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, the creator of Furnify shall not be liable for any indirect, incidental, or consequential damages arising from your use of this demo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p>
              These terms may be updated at any time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <p>
              Questions about these terms? Use the <a href="/contact" className="text-[#91A57D] hover:underline font-medium">Contact Us</a> page to get in touch.
            </p>
          </section>

          <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
            Last updated: June 2025 · These terms apply to the Furnify portfolio project only.
          </div>
        </div>
      </div>
    </main>
  );
}
