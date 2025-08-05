'use client';
import { useState } from 'react';
import {
  FileText, Download, Send, Building, DollarSign, 
  TrendingUp, Globe, CheckCircle2, Phone, Mail
} from 'lucide-react';

export default function IVCreativeBriefPDF() {
  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    business_age: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    revenue: '',
    current_website: '',
    services_needed: [],
    marketing_activities: [],
    marketing_spend: '',
    primary_goal: '',
    timeline: '',
    budget_range: '',
    additional_info: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const generatePDF = () => {
    // Create a new window with the form data formatted for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>IV Creative - Project Brief</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px;
              color: #333;
            }
            .header { 
              text-align: center; 
              border-bottom: 3px solid #ec4899; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .header h1 { 
              color: #ec4899; 
              margin: 0; 
              font-size: 2.5em;
            }
            .section { 
              margin-bottom: 25px; 
              padding: 15px;
              border-left: 4px solid #ec4899;
              background: #f9f9f9;
            }
            .section h2 { 
              color: #ec4899; 
              margin-top: 0;
              font-size: 1.3em;
            }
            .field { 
              margin-bottom: 10px; 
              display: flex;
              justify-content: space-between;
              border-bottom: 1px dotted #ccc;
              padding-bottom: 5px;
            }
            .field strong { 
              color: #666; 
              min-width: 200px;
            }
            .field span { 
              flex: 1; 
              text-align: right;
              font-weight: bold;
            }
            .list-items {
              margin-left: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #ec4899;
              color: #666;
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .section { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>IV Creative</h1>
            <p>Project Brief Questionnaire</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="section">
            <h2>Company Information</h2>
            <div class="field"><strong>Company Name:</strong> <span>${formData.company_name || '_________________'}</span></div>
            <div class="field"><strong>Industry:</strong> <span>${formData.industry || '_________________'}</span></div>
            <div class="field"><strong>Years in Business:</strong> <span>${formData.business_age || '_________________'}</span></div>
            <div class="field"><strong>Current Website:</strong> <span>${formData.website || '_________________'}</span></div>
          </div>

          <div class="section">
            <h2>Contact Information</h2>
            <div class="field"><strong>Contact Name:</strong> <span>${formData.contact_name || '_________________'}</span></div>
            <div class="field"><strong>Email Address:</strong> <span>${formData.email || '_________________'}</span></div>
            <div class="field"><strong>Phone Number:</strong> <span>${formData.phone || '_________________'}</span></div>
          </div>

          <div class="section">
            <h2>Business Details</h2>
            <div class="field"><strong>Annual Revenue:</strong> <span>${formData.revenue || '_________________'}</span></div>
            <div class="field"><strong>Current Website Status:</strong> <span>${formData.current_website || '_________________'}</span></div>
            <div class="field"><strong>Monthly Marketing Spend:</strong> <span>${formData.marketing_spend || '_________________'}</span></div>
          </div>

          <div class="section">
            <h2>Services Needed</h2>
            <div class="list-items">
              ${['E-commerce Platform', 'Digital Marketing', 'Website Design', 'Order Fulfillment', 'Product Personalization', 'Branding & Design', 'SEO Optimization'].map(service => 
                `<div class="field"><strong>${service}:</strong> <span>${formData.services_needed.includes(service.toLowerCase().replace(/[^a-z]/g, '_')) ? '✓ Yes' : '☐ No'}</span></div>`
              ).join('')}
            </div>
          </div>

          <div class="section">
            <h2>Current Marketing Activities</h2>
            <div class="list-items">
              ${['Social Media', 'Google Ads', 'Facebook/Instagram Ads', 'Email Marketing', 'SEO', 'Content Marketing', 'None'].map(activity => 
                `<div class="field"><strong>${activity}:</strong> <span>${formData.marketing_activities.includes(activity.toLowerCase().replace(/[^a-z]/g, '_')) ? '✓ Yes' : '☐ No'}</span></div>`
              ).join('')}
            </div>
          </div>

          <div class="section">
            <h2>Project Goals</h2>
            <div class="field"><strong>Primary Goal:</strong> <span>${formData.primary_goal || '_________________'}</span></div>
            <div class="field"><strong>Timeline:</strong> <span>${formData.timeline || '_________________'}</span></div>
            <div class="field"><strong>Budget Range:</strong> <span>${formData.budget_range || '_________________'}</span></div>
          </div>

          <div class="section">
            <h2>Additional Information</h2>
            <div style="min-height: 100px; border: 1px solid #ccc; padding: 10px; background: white;">
              ${formData.additional_info || 'Please provide any additional information about your project, specific requirements, or questions you may have:'}
            </div>
          </div>

          <div class="footer">
            <p><strong>Next Steps:</strong></p>
            <p>• We'll review your brief within 24 hours</p>
            <p>• Prepare a customized package recommendation</p>
            <p>• Schedule a strategy call to discuss your project</p>
            <p>• Deliver a detailed proposal with clear deliverables</p>
            <br>
            <p><strong>Contact:</strong> hello@ivcreative.com | +44 20 1234 5678</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-width-4xl mx-auto px-6 py-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">IV Creative</h1>
            <p className="text-lg text-gray-600">Project Brief Questionnaire</p>
            <p className="text-sm text-gray-500 mt-2">Fill out the form below and save as PDF to send back to us</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          
          {/* Company Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
              <Building size={24} />
              Company Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., E-commerce, SaaS, Retail"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                <input
                  type="number"
                  value={formData.business_age}
                  onChange={(e) => handleInputChange('business_age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
              <Mail size={24} />
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.contact_name}
                  onChange={(e) => handleInputChange('contact_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="+44 20 1234 5678"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
              <TrendingUp size={24} />
              Business Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue</label>
                <select
                  value={formData.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select revenue range</option>
                  <option value="Pre-revenue/Startup">Pre-revenue/Startup</option>
                  <option value="£20k - £150k">£20k - £150k</option>
                  <option value="£150k - £750k">£150k - £750k</option>
                  <option value="£750k - £5M">£750k - £5M</option>
                  <option value="£5M+">£5M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Website Status</label>
                <select
                  value={formData.current_website}
                  onChange={(e) => handleInputChange('current_website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select status</option>
                  <option value="No website yet">No website yet</option>
                  <option value="Basic website, needs improvement">Basic website, needs improvement</option>
                  <option value="Good website that converts well">Good website that converts well</option>
                  <option value="High-performing, professional site">High-performing, professional site</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Marketing Spend</label>
                <select
                  value={formData.marketing_spend}
                  onChange={(e) => handleInputChange('marketing_spend', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select spend range</option>
                  <option value="£0 - No current spend">£0 - No current spend</option>
                  <option value="£500 - £2,000">£500 - £2,000</option>
                  <option value="£2,000 - £10,000">£2,000 - £10,000</option>
                  <option value="£10,000 - £50,000">£10,000 - £50,000</option>
                  <option value="£50,000+">£50,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services Needed */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Services Needed (select all that apply)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'E-commerce Platform',
                'Digital Marketing', 
                'Website Design/Redesign',
                'Order Fulfillment',
                'Product Personalization',
                'Branding & Design',
                'SEO Optimization'
              ].map((service) => (
                <label key={service} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services_needed.includes(service.toLowerCase().replace(/[^a-z]/g, '_'))}
                    onChange={() => handleCheckboxChange('services_needed', service.toLowerCase().replace(/[^a-z]/g, '_'))}
                    className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="font-medium text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Project Goals */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Project Goals</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
                <select
                  value={formData.primary_goal}
                  onChange={(e) => handleInputChange('primary_goal', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select primary goal</option>
                  <option value="Launch online presence">Launch online presence</option>
                  <option value="Increase online sales">Increase online sales</option>
                  <option value="Expand to new markets">Expand to new markets</option>
                  <option value="Improve conversion rates">Improve conversion rates</option>
                  <option value="Scale existing operations">Scale existing operations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP (3-4 weeks)">ASAP (3-4 weeks)</option>
                  <option value="Standard (2-3 months)">Standard (2-3 months)</option>
                  <option value="Planned launch (6+ months)">Planned launch (6+ months)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => handleInputChange('budget_range', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select budget range</option>
                  <option value="£1,000 - £5,000">£1,000 - £5,000</option>
                  <option value="£5,000 - £15,000">£5,000 - £15,000</option>
                  <option value="£15,000 - £50,000">£15,000 - £50,000</option>
                  <option value="£50,000+">£50,000+</option>
                  <option value="Need guidance on budget">Need guidance on budget</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Additional Information</h2>
            <textarea
              value={formData.additional_info}
              onChange={(e) => handleInputChange('additional_info', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Please provide any additional information about your project, specific requirements, challenges you're facing, or questions you may have..."
            />
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-8">
            <div className="text-center">
              <button
                onClick={generatePDF}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Download size={24} />
                Save as PDF & Send to IV Creative
              </button>
              <p className="text-sm text-gray-600 mt-4">
                This will generate a PDF with your responses that you can save and email to us at{' '}
                <span className="font-semibold text-pink-600">hello@ivcreative.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}