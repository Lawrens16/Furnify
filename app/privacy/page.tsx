import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#e8e7e3]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-[#91A57D]/15 flex items-center justify-center">
            <Shield size={22} className="text-[#91A57D]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#91A57D] mb-0.5">Legal</p>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
        </div>

        {/* Portfolio disclaimer */}
        <div className="bg-[#91A57D]/10 border border-[#91A57D]/30 rounded-2xl px-6 py-4 mb-10">
          <p className="text-sm text-[#5a6a4d] font-medium">
            <strong>Portfolio Notice:</strong> Furnify is a conceptual e-commerce project built for portfolio purposes only. No real transactions, user accounts, or personal data collection takes place.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to Furnify. This Privacy Policy explains how we would handle information in the context of a real e-commerce platform. As this is a portfolio project, <strong>no personal data is collected, stored, or processed</strong> beyond what is technically required to run the demo (e.g., anonymous session IDs stored in your browser).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Would Collect</h2>
            <p>In a production context, a platform like Furnify might collect:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
              <li>Name, email address, and phone number during checkout</li>
              <li>Shipping address and billing details</li>
              <li>Browsing behaviour and product interactions (analytics)</li>
              <li>Device and browser information for performance monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Would Use Your Information</h2>
            <p>Collected data would be used solely to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
              <li>Process and fulfil orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Improve the shopping experience</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies</h2>
            <p>
              This demo uses a single anonymous session cookie (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">furnify_session_id</code>) stored in your browser's localStorage to maintain your cart across page loads. No tracking cookies or third-party analytics are used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Sharing</h2>
            <p>
              We do not sell, trade, or share any personal information with third parties. In a real deployment, data would only be shared with payment processors and shipping partners strictly necessary to complete your order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p>
              Under GDPR and similar regulations, you would have the right to access, correct, or delete your personal data at any time. Since this is a portfolio demo, no such data exists.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>
              For questions about this policy, please reach out via the <a href="/contact" className="text-[#91A57D] hover:underline font-medium">Contact Us</a> page.
            </p>
          </section>

          <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
            Last updated: June 2025 · This policy applies to the Furnify portfolio project only.
          </div>
        </div>
      </div>
    </main>
  );
}
