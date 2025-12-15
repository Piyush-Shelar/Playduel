import React from 'react';

// Pricing Section
export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$0',
      features: ['Access to free quizzes', 'Leaderboard participation', 'Community support'],
      accent: 'from-[#1f5cff] to-[#00bcd4]',
    },
    {
      name: 'Pro',
      price: '$9.99/mo',
      features: ['All Basic features', 'Unlimited multiplayer battles', 'Advanced analytics'],
      accent: 'from-[#7c3aed] to-[#60a5fa]',
    },
    {
      name: 'Enterprise',
      price: '$49.99/mo',
      features: ['All Pro features', 'Custom team management', 'Priority support'],
      accent: 'from-[#f97316] to-[#f43f5e]',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#040506] to-[#05060a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Plans</h2>
        <p className="text-white/70 mb-12">Choose a plan that suits your learning and competitive style.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="p-8 rounded-3xl bg-gradient-to-br from-[#031425] to-[#041224] border border-white/4 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <div className={`text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${plan.accent}`}>{plan.price}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-white/70 text-sm">• {feature}</li>
                ))}
              </ul>
              <button className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r ${plan.accent} text-black font-semibold`}>Select Plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
