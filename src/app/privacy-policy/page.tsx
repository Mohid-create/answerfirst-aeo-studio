"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-6 flex flex-col items-center animate-fadeIn">
      <section className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
          Last updated: October 2025
        </p>

        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Welcome to <strong>AEO Snippet Optimizer</strong>. Your privacy is
            extremely important to us. This policy explains how we collect, use,
            and protect your information when you use our web app.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Information We Collect
          </h2>
          <p>
            We only collect basic usage data (such as page views and AEO tool
            usage) to improve performance and user experience. We do not store
            or share your content, queries, or personal data.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            How We Use Your Information
          </h2>
          <p>
            Your information helps us understand how our users interact with
            the tool. We use analytics to enhance performance, fix bugs, and
            create better experiences — never for selling or advertising your
            data.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Security
          </h2>
          <p>
            We implement top-level Firebase security practices and HTTPS
            encryption to protect all user activity within the app.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Third-Party Services
          </h2>
          <p>
            We may use trusted third-party services like Google Analytics or
            Firebase Hosting, which follow their own strict privacy policies.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Contact Us
          </h2>
          <p>
            If you have any questions about our Privacy Policy, feel free to
            contact us at{" "}
            <a
              href="mailto:aeosnippetoptimizer@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              aeosnippetoptimizer@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
