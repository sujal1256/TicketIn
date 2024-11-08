import React, { useState } from 'react';

const PricingHomePage = () => {
  const [teamSize, setTeamSize] = useState(10);
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Simple, transparent pricing for every team.
      </h1>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center mb-10">
        <label className="text-lg font-semibold text-gray-600 mr-4">Bill me:</label>
        <button
          className={`px-4 py-2 rounded-l-lg ${billingCycle === 'monthly' ? 'bg-violet-600  text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${billingCycle === 'annually' ? 'bg-violet-600  text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setBillingCycle('annually')}
        >
          Annually <span className="text-sm font-semibold ml-1">(SAVE UP TO 17%)</span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Free</h2>
          <p className="text-gray-600 mt-2">Free forever for 10 users</p>
          <p className="text-4xl font-bold text-gray-800 mt-6">$0</p>
          <button className="bg-violet-600  text-white py-2 px-4 rounded-lg mt-6">Get it now</button>
          <ul className="text-left mt-6 text-gray-700">
            <li>✓ Unlimited goals, projects and tasks</li>
            <li>✓ 10 members</li>
          </ul>
        </div>

        {/* Standard Plan */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Standard</h2>
          <p className="text-gray-600 mt-2">Everything you need to get started</p>
          <p className="text-4xl font-bold text-gray-800 mt-6">${11.4}<span className="text-lg">/month</span></p>
          <button className="bg-violet-600  text-white py-2 px-4 rounded-lg mt-6">Start free trial</button>
          <ul className="text-left mt-6 text-gray-700">
            <li>✓ Everything from Free plus:</li>
            <li>✓ User roles and permissions </li>
            <li>✓ 50 members </li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Premium</h2>
          <p className="text-gray-600 mt-2">Align multiple teams</p>
          <p className="text-4xl font-bold text-gray-800 mt-6">${27.34}<span className="text-lg">/month</span></p>
          <button className="bg-violet-600 text-white py-2 px-4 rounded-lg mt-6">Start free trial</button>
          <ul className="text-left mt-6 text-gray-700">
            <li>✓ Everything from Standard plus:</li>
            <li>✓ Allows 500 members</li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingHomePage;
