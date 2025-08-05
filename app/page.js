'use client';
import { useState } from 'react';
import {
  FileText, Download, Send, Building, DollarSign, 
  TrendingUp, Globe, CheckCircle2, Phone, Mail, Target,
  Zap, Monitor, Database, Sparkles, Award, Clock, Calendar,
  Users, MessageCircle, Search, ShoppingBag, Star, Heart
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

  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sections = [
    { id: 'company', title: 'Company Information', icon: Building, color: 'from-pink-500 to-pink-600' },
    { id: 'contact', title: 'Contact Information', icon: Mail, color: 'from-pink-400 to-pink-500' },
    { id: 'business', title: 'Business Details', icon: TrendingUp, color: 'from-pink-600 to-pink-700' },
    { id: 'services', title: 'Services Needed', icon: Zap, color: 'from-pink-500 to-pink-600' },
    { id: 'goals', title: 'Project Goals', icon: Target, color: 'from-pink-400 to-pink-500' },
    { id: 'additional', title: 'Additional Info', icon: MessageCircle, color: 'from-pink-600 to-pink-700' }
  ];

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

  const scrollToSection = (index) => {
    setIsAnimating(true);
    setCurrentSection(index);
    setTimeout(() => setIsAnimating(false), 500);
    
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const generatePDF = () => {
    // Create email body with all form data
    const emailSubject = encodeURIComponent(`IV Creative Project Brief - ${formData.company_name || 'New Client'}`);
    
    const emailBody = encodeURIComponent(`
IV CREATIVE PROJECT BRIEF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPANY INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Company Name: ${formData.company_name || 'Not provided'}
- Industry: ${formData.industry || 'Not provided'}
- Years in Business: ${formData.business_age || 'Not provided'}
- Current Website: ${formData.website || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Contact Name: ${formData.contact_name || 'Not provided'}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Annual Revenue: ${formData.revenue || 'Not provided'}
- Website Status: ${formData.current_website || 'Not provided'}
- Marketing Spend: ${formData.marketing_spend || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICES NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.services_needed.length > 0 ? formData.services_needed.map(service => `✓ ${service.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`).join('\n') : '• None selected'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CURRENT MARKETING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.marketing_activities.length > 0 ? formData.marketing_activities.map(activity => `✓ ${activity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`).join('\n') : '• None selected'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT GOALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Primary Goal: ${formData.primary_goal || 'Not provided'}
- Timeline: ${formData.timeline || 'Not provided'}
- Budget Range: ${formData.budget_range || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.additional_info || 'No additional information provided.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBMISSION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleDateString('en-GB', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

This client is ready to discuss their project. Please prepare a customized proposal and reach out within 24 hours.

Best regards,
IV Creative Brief System
    `);

    // Open email client with data pre-filled
    window.location.href = `mailto:pedro@iv-creative.co.uk?subject=${emailSubject}&body=${emailBody}`;
    
    // Also generate PDF for client records
    generatePDFForClient();
  };

  const generatePDFForClient = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>IV Creative - Project Brief</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.7; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 40px;
              color: #ffffff;
              background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
              min-height: 100vh;
            }
            .container {
              background: linear-gradient(135deg, #111111, #000000);
              border-radius: 24px;
              padding: 50px;
              box-shadow: 0 30px 60px rgba(236, 72, 153, 0.3);
              border: 1px solid #ec4899;
            }
            .header { 
              text-align: center; 
              border-bottom: 3px solid #ec4899; 
              padding-bottom: 40px; 
              margin-bottom: 50px; 
              position: relative;
            }
            .header::after {
              content: '';
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 120px;
              height: 6px;
              background: linear-gradient(90deg, #ec4899, #be185d);
              border-radius: 3px;
              box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
            }
            .header h1 { 
              background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin: 0; 
              font-size: 3.5em;
              font-weight: 900;
              letter-spacing: -3px;
              text-shadow: 0 0 30px rgba(236, 72, 153, 0.3);
            }
            .header .subtitle {
              font-size: 1.4em;
              color: #ffffff;
              margin-top: 15px;
              font-weight: 600;
              opacity: 0.9;
            }
            .header .date {
              background: linear-gradient(135deg, #ec4899, #be185d);
              padding: 15px 30px;
              border-radius: 30px;
              display: inline-block;
              margin-top: 25px;
              font-weight: 700;
              color: #ffffff;
              box-shadow: 0 10px 25px rgba(236, 72, 153, 0.3);
            }
            .section { 
              margin-bottom: 40px; 
              padding: 35px;
              border-radius: 20px;
              background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
              border: 1px solid #333333;
              position: relative;
              overflow: hidden;
            }
            .section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #ec4899, #be185d);
              box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
            }
            .section h2 { 
              color: #ec4899;
              margin: 0 0 30px 0;
              font-size: 1.6em;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
              text-shadow: 0 0 10px rgba(236, 72, 153, 0.3);
            }
            .field { 
              margin-bottom: 18px; 
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 18px 25px;
              background: linear-gradient(135deg, #222222, #111111);
              border-radius: 12px;
              border: 1px solid #333333;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }
            .field:hover {
              border-color: #ec4899;
              box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);
            }
            .field strong { 
              color: #ffffff; 
              min-width: 240px;
              font-weight: 700;
              opacity: 0.9;
            }
            .field span { 
              flex: 1; 
              text-align: right;
              font-weight: 700;
              color: #ffffff;
            }
            .field .empty {
              color: #666666;
              font-style: italic;
            }
            .field .filled {
              color: #ec4899;
              background: linear-gradient(135deg, #2a1a2a, #1a0f1a);
              padding: 10px 18px;
              border-radius: 10px;
              border: 1px solid #ec4899;
              box-shadow: 0 0 15px rgba(236, 72, 153, 0.2);
            }
            .list-items {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 15px;
            }
            .list-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 15px 20px;
              background: linear-gradient(135deg, #222222, #111111);
              border-radius: 10px;
              border: 1px solid #333333;
            }
            .list-item.checked {
              background: linear-gradient(135deg, #2a1a2a, #1a0f1a);
              border-color: #ec4899;
              box-shadow: 0 0 15px rgba(236, 72, 153, 0.2);
            }
            .list-item .check {
              font-weight: bold;
              font-size: 1.2em;
            }
            .list-item.checked .check {
              color: #ec4899;
            }
            .list-item:not(.checked) .check {
              color: #666666;
            }
            .list-item.checked span:first-child {
              color: #ec4899;
              font-weight: 600;
            }
            .list-item:not(.checked) span:first-child {
              color: #ffffff;
            }
            .additional-info {
              background: linear-gradient(135deg, #222222, #111111);
              border: 2px solid ${formData.additional_info ? '#ec4899' : '#333333'};
              border-radius: 15px;
              padding: 25px;
              min-height: 140px;
              font-style: ${formData.additional_info ? 'normal' : 'italic'};
              color: ${formData.additional_info ? '#ffffff' : '#666666'};
              line-height: 1.8;
              ${formData.additional_info ? 'box-shadow: 0 0 20px rgba(236, 72, 153, 0.1);' : ''}
            }
            .footer {
              text-align: center;
              margin-top: 60px;
              padding: 40px;
              background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
              border-radius: 20px;
              border: 2px solid #ec4899;
              box-shadow: 0 0 30px rgba(236, 72, 153, 0.2);
            }
            .footer h3 {
              color: #ec4899;
              margin-bottom: 25px;
              font-size: 1.5em;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .footer ul {
              text-align: left;
              max-width: 550px;
              margin: 0 auto 30px;
              padding: 0;
              list-style: none;
            }
            .footer li {
              padding: 12px 0;
              border-bottom: 1px dotted #333333;
              position: relative;
              padding-left: 30px;
              color: #ffffff;
              font-weight: 500;
            }
            .footer li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: #ec4899;
              font-weight: bold;
              font-size: 1.1em;
            }
            .footer .contact {
              background: linear-gradient(135deg, #ec4899, #be185d);
              color: #ffffff;
              padding: 18px 35px;
              border-radius: 30px;
              display: inline-block;
              font-weight: 700;
              text-decoration: none;
              box-shadow: 0 10px 25px rgba(236, 72, 153, 0.4);
              font-size: 1.1em;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 20px; 
                background: #000000 !important;
                color: #ffffff !important;
              }
              .container { 
                box-shadow: none; 
                border: 2px solid #ec4899;
              }
              .section { 
                break-inside: avoid; 
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>IV Creative</h1>
              <div class="subtitle">Project Brief Questionnaire</div>
              <div class="date">Submitted: ${new Date().toLocaleDateString('en-GB', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>

            <div class="section">
              <h2>Company Information</h2>
              <div class="field">
                <strong>Company Name:</strong> 
                <span class="${formData.company_name ? 'filled' : 'empty'}">
                  ${formData.company_name || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Industry:</strong> 
                <span class="${formData.industry ? 'filled' : 'empty'}">
                  ${formData.industry || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Years in Business:</strong> 
                <span class="${formData.business_age ? 'filled' : 'empty'}">
                  ${formData.business_age ? formData.business_age + ' years' : 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Current Website:</strong> 
                <span class="${formData.website ? 'filled' : 'empty'}">
                  ${formData.website || 'Not provided'}
                </span>
              </div>
            </div>

            <div class="section">
              <h2>Contact Information</h2>
              <div class="field">
                <strong>Contact Name:</strong> 
                <span class="${formData.contact_name ? 'filled' : 'empty'}">
                  ${formData.contact_name || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Email Address:</strong> 
                <span class="${formData.email ? 'filled' : 'empty'}">
                  ${formData.email || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Phone Number:</strong> 
                <span class="${formData.phone ? 'filled' : 'empty'}">
                  ${formData.phone || 'Not provided'}
                </span>
              </div>
            </div>

            <div class="section">
              <h2>Business Details</h2>
              <div class="field">
                <strong>Annual Revenue:</strong> 
                <span class="${formData.revenue ? 'filled' : 'empty'}">
                  ${formData.revenue || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Current Website Status:</strong> 
                <span class="${formData.current_website ? 'filled' : 'empty'}">
                  ${formData.current_website || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Monthly Marketing Spend:</strong> 
                <span class="${formData.marketing_spend ? 'filled' : 'empty'}">
                  ${formData.marketing_spend || 'Not provided'}
                </span>
              </div>
            </div>

            <div class="section">
              <h2>Services Needed</h2>
              <div class="list-items">
                ${['E-commerce Platform', 'Digital Marketing', 'Website Design/Redesign', 'Order Fulfillment', 'Product Personalization', 'Branding & Design', 'SEO Optimization'].map(service => {
                  const isChecked = formData.services_needed.includes(service.toLowerCase().replace(/[^a-z]/g, '_'));
                  return `<div class="list-item ${isChecked ? 'checked' : ''}">
                    <span>${service}</span>
                    <span class="check">${isChecked ? '✓' : '○'}</span>
                  </div>`;
                }).join('')}
              </div>
            </div>

            <div class="section">
              <h2>Current Marketing Activities</h2>
              <div class="list-items">
                ${['Social Media', 'Google Ads', 'Facebook/Instagram Ads', 'Email Marketing', 'SEO', 'Content Marketing', 'None'].map(activity => {
                  const isChecked = formData.marketing_activities.includes(activity.toLowerCase().replace(/[^a-z]/g, '_'));
                  return `<div class="list-item ${isChecked ? 'checked' : ''}">
                    <span>${activity}</span>
                    <span class="check">${isChecked ? '✓' : '○'}</span>
                  </div>`;
                }).join('')}
              </div>
            </div>

            <div class="section">
              <h2>Project Goals</h2>
              <div class="field">
                <strong>Primary Goal:</strong> 
                <span class="${formData.primary_goal ? 'filled' : 'empty'}">
                  ${formData.primary_goal || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Timeline:</strong> 
                <span class="${formData.timeline ? 'filled' : 'empty'}">
                  ${formData.timeline || 'Not provided'}
                </span>
              </div>
              <div class="field">
                <strong>Budget Range:</strong> 
                <span class="${formData.budget_range ? 'filled' : 'empty'}">
                  ${formData.budget_range || 'Not provided'}
                </span>
              </div>
            </div>

            <div class="section">
              <h2>Additional Information</h2>
              <div class="additional-info">
                ${formData.additional_info || 'No additional information provided.'}
              </div>
            </div>

            <div class="footer">
              <h3>What happens next?</h3>
              <ul>
                <li>We'll review your brief within 24 hours</li>
                <li>Prepare a customized package recommendation</li>
                <li>Schedule a strategy call to discuss your project</li>
                <li>Deliver a detailed proposal with clear deliverables</li>
              </ul>
              <a href="mailto:pedro@iv-creative.co.uk" class="contact">
                Contact: pedro@iv-creative.co.uk | +44 20 1234 5678
              </a>
            </div>
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-20 text-pink-500 opacity-20 animate-bounce" size={20} />
        <Star className="absolute top-40 right-32 text-pink-400 opacity-30 animate-pulse" size={16} />
        <Globe className="absolute bottom-40 left-32 text-pink-600 opacity-25 animate-bounce delay-1000" size={18} />
        <Zap className="absolute bottom-20 right-20 text-pink-500 opacity-20 animate-pulse delay-500" size={22} />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-pink-500/20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <FileText size={36} className="text-white" />
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-500 to-pink-600 mb-4 tracking-tight">
              IV Creative
            </h1>
            <p className="text-2xl text-white font-semibold mb-2">Project Brief Questionnaire</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Help us understand your business so we can create the perfect solution for your growth
            </p>
            
            {/* Progress Indicator */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                      currentSection === index 
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg scale-105 shadow-pink-500/25' 
                        : 'text-gray-400 hover:text-pink-500 hover:bg-gray-800/50'
                    }`}
                  >
                    <section.icon size={20} className="mb-1" />
                    <span className="text-xs font-medium hidden sm:block">{section.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-500 ease-out shadow-lg shadow-pink-500/30"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-500/20 overflow-hidden">
          
          {/* Company Information */}
          <div id="section-0" className="p-8 border-b border-gray-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Building size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Company Information</h2>
                <p className="text-gray-400 mt-1">Tell us about your business</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Company Name *</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Industry *</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                 placeholder="e.g., E-commerce, SaaS, Retail"
               />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Years in Business</label>
               <input
                 type="number"
                 value={formData.business_age}
                 onChange={(e) => handleInputChange('business_age', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                 placeholder="0"
               />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Current Website</label>
               <input
                 type="url"
                 value={formData.website}
                 onChange={(e) => handleInputChange('website', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                 placeholder="https://yourwebsite.com"
               />
             </div>
           </div>
         </div>

         {/* Contact Information */}
         <div id="section-1" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <Mail size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Contact Information</h2>
               <p className="text-gray-400 mt-1">How can we reach you?</p>
             </div>
           </div>
           <div className="grid lg:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Your Name *</label>
               <input
                 type="text"
                 value={formData.contact_name}
                 onChange={(e) => handleInputChange('contact_name', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                 placeholder="Enter your full name"
               />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Email Address *</label>
               <input
                 type="email"
                 value={formData.email}
                 onChange={(e) => handleInputChange('email', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                 placeholder="your@email.com"
               />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Phone Number</label>
               <input
                 type="tel"
                 value={formData.phone}
                 onChange={(e) => handleInputChange('phone', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                 placeholder="+44 20 1234 5678"
               />
             </div>
           </div>
         </div>

         {/* Business Details */}
         <div id="section-2" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <TrendingUp size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Business Details</h2>
               <p className="text-gray-400 mt-1">Help us understand your current situation</p>
             </div>
           </div>
           <div className="grid lg:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Annual Revenue Range</label>
               <select
                 value={formData.revenue}
                 onChange={(e) => handleInputChange('revenue', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
               >
                 <option value="">Select revenue range</option>
                 <option value="Pre-revenue/Startup">Pre-revenue/Startup</option>
                 <option value="£20k - £150k">£20k - £150k</option>
                 <option value="£150k - £750k">£150k - £750k</option>
                 <option value="£750k - £5M">£750k - £5M</option>
                 <option value="£5M+">£5M+</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Current Website Status</label>
               <select
                 value={formData.current_website}
                 onChange={(e) => handleInputChange('current_website', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
               >
                 <option value="">Select website status</option>
                 <option value="No website yet">No website yet</option>
                 <option value="Basic website, needs improvement">Basic website, needs improvement</option>
                 <option value="Good website that converts well">Good website that converts well</option>
                 <option value="High-performing, professional site">High-performing, professional site</option>
               </select>
             </div>
             <div className="space-y-2 lg:col-span-2">
               <label className="block text-sm font-semibold text-white">Monthly Marketing Spend</label>
               <select
                 value={formData.marketing_spend}
                 onChange={(e) => handleInputChange('marketing_spend', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
               >
                 <option value="">Select monthly spend</option>
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
         <div id="section-3" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <Zap size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Services Needed</h2>
               <p className="text-gray-400 mt-1">Select all services that interest you</p>
             </div>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {[
               { key: 'ecommerce_platform', label: 'E-commerce Platform', icon: ShoppingBag },
               { key: 'digital_marketing', label: 'Digital Marketing', icon: Zap },
               { key: 'website_design_redesign', label: 'Website Design/Redesign', icon: Monitor },
               { key: 'order_fulfillment', label: 'Order Fulfillment', icon: Database },
               { key: 'product_personalization', label: 'Product Personalization', icon: Sparkles },
               { key: 'branding___design', label: 'Branding & Design', icon: Award },
               { key: 'seo_optimization', label: 'SEO Optimization', icon: Search }
             ].map((service) => {
               const isSelected = formData.services_needed.includes(service.key);
               return (
                 <label 
                   key={service.key} 
                   className={`relative flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                     isSelected 
                       ? 'border-pink-500 bg-gradient-to-br from-pink-900/20 to-pink-800/20 shadow-lg scale-105 shadow-pink-500/10' 
                       : 'border-gray-700 bg-gray-800/50 hover:border-pink-500/50 hover:bg-gray-800'
                   }`}
                 >
                   <input
                     type="checkbox"
                     checked={isSelected}
                     onChange={() => handleCheckboxChange('services_needed', service.key)}
                     className="sr-only"
                   />
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-pink-500 to-pink-600`}>
                     <service.icon size={24} className="text-white" />
                   </div>
                   <div className="flex-1">
                     <span className="font-semibold text-white block">{service.label}</span>
                   </div>
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                     isSelected ? 'border-pink-500 bg-pink-500' : 'border-gray-600'
                   }`}>
                     {isSelected && <CheckCircle2 size={16} className="text-white" />}
                   </div>
                 </label>
               );
             })}
           </div>
         </div>

         {/* Current Marketing Activities */}
         <div className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <Users size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Current Marketing</h2>
               <p className="text-gray-400 mt-1">What marketing are you currently doing?</p>
             </div>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {[
               { key: 'social_media', label: 'Social Media', icon: Users },
               { key: 'google_ads', label: 'Google Ads', icon: Search },
               { key: 'facebook_instagram_ads', label: 'Facebook/Instagram Ads', icon: MessageCircle },
               { key: 'email_marketing', label: 'Email Marketing', icon: Mail },
               { key: 'seo', label: 'SEO', icon: TrendingUp },
               { key: 'content_marketing', label: 'Content Marketing', icon: FileText },
               { key: 'none', label: 'No current marketing', icon: Target }
             ].map((activity) => {
               const isSelected = formData.marketing_activities.includes(activity.key);
               return (
                 <label 
                   key={activity.key} 
                   className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                     isSelected 
                       ? 'border-pink-500 bg-pink-900/20 shadow-md shadow-pink-500/10' 
                       : 'border-gray-700 bg-gray-800/50 hover:border-pink-500/50 hover:bg-gray-800'
                   }`}
                 >
                   <input
                     type="checkbox"
                     checked={isSelected}
                     onChange={() => handleCheckboxChange('marketing_activities', activity.key)}
                     className="w-5 h-5 text-pink-600 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                   />
                   <activity.icon size={20} className={isSelected ? 'text-pink-500' : 'text-gray-400'} />
                   <span className={`font-medium ${isSelected ? 'text-pink-500' : 'text-white'}`}>
                     {activity.label}
                   </span>
                 </label>
               );
             })}
           </div>
         </div>

         {/* Project Goals */}
         <div id="section-4" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <Target size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Project Goals</h2>
               <p className="text-gray-400 mt-1">What do you want to achieve?</p>
             </div>
           </div>
           <div className="grid lg:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Primary Goal</label>
               <select
                 value={formData.primary_goal}
                 onChange={(e) => handleInputChange('primary_goal', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
               >
                 <option value="">Select your primary goal</option>
                 <option value="Launch online presence">Launch online presence</option>
                 <option value="Increase online sales">Increase online sales</option>
                 <option value="Expand to new markets">Expand to new markets</option>
                 <option value="Improve conversion rates">Improve conversion rates</option>
                 <option value="Scale existing operations">Scale existing operations</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Timeline</label>
               <select
                 value={formData.timeline}
                 onChange={(e) => handleInputChange('timeline', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
               >
                 <option value="">Select your timeline</option>
                 <option value="ASAP (3-4 weeks)">ASAP (3-4 weeks)</option>
                 <option value="Standard (2-3 months)">Standard (2-3 months)</option>
                 <option value="Planned launch (6+ months)">Planned launch (6+ months)</option>
               </select>
             </div>
             <div className="space-y-2 lg:col-span-2">
               <label className="block text-sm font-semibold text-white">Budget Range</label>
               <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
                 {[
                   { value: '£1,000 - £5,000', label: '£1k - £5k' },
                   { value: '£5,000 - £15,000', label: '£5k - £15k' },
                   { value: '£15,000 - £50,000', label: '£15k - £50k' },
                   { value: '£50,000+', label: '£50k+' },
                   { value: 'Need guidance on budget', label: 'Need Guidance' }
                 ].map((budget) => (
                   <label 
                     key={budget.value}
                     className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                       formData.budget_range === budget.value
                         ? 'border-pink-500 bg-pink-900/20 shadow-lg scale-105 shadow-pink-500/10'
                         : 'border-gray-700 bg-gray-800/50 hover:border-pink-500/50 hover:bg-gray-800'
                     }`}
                   >
                     <input
                       type="radio"
                       name="budget_range"
                       value={budget.value}
                       checked={formData.budget_range === budget.value}
                       onChange={(e) => handleInputChange('budget_range', e.target.value)}
                       className="sr-only"
                     />
                     <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-2 shadow-md`}>
                       <DollarSign size={24} className="text-white" />
                     </div>
                     <span className="text-sm font-semibold text-white text-center">{budget.label}</span>
                   </label>
                 ))}
               </div>
             </div>
           </div>
         </div>

         {/* Additional Information */}
         <div id="section-5" className="p-8">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <MessageCircle size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Additional Information</h2>
               <p className="text-gray-400 mt-1">Anything else you'd like us to know?</p>
             </div>
           </div>
           <div className="space-y-2">
             <label className="block text-sm font-semibold text-white">
               Tell us more about your project, challenges, or specific requirements
             </label>
             <textarea
               value={formData.additional_info}
               onChange={(e) => handleInputChange('additional_info', e.target.value)}
               rows={8}
               className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
               placeholder="Share any specific requirements, challenges you're facing, questions you have, or anything else that would help us understand your needs better..."
             />
           </div>
         </div>

         {/* CTA Section */}
         <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 text-white">
           <div className="text-center">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
               <Send size={32} className="text-white" />
             </div>
             <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
             <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
               This will open your email client with all your details pre-filled and send directly to Pedro. Just click send!
             </p>
             
             <button
               onClick={generatePDF}
               className="inline-flex items-center gap-4 px-8 py-4 bg-white text-pink-600 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
             >
               <Send size={28} />
               Send Brief to IV Creative
             </button>
             
             <div className="mt-8 pt-8 border-t border-pink-400/30">
               <div className="grid md:grid-cols-3 gap-6 text-center">
                 <div className="flex flex-col items-center">
                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                     <Clock size={24} className="text-white" />
                   </div>
                   <h4 className="font-semibold mb-1">24 Hour Response</h4>
                   <p className="text-pink-100 text-sm">We'll review and respond quickly</p>
                 </div>
                 <div className="flex flex-col items-center">
                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                     <Award size={24} className="text-white" />
                   </div>
                   <h4 className="font-semibold mb-1">Custom Proposal</h4>
                   <p className="text-pink-100 text-sm">Tailored to your specific needs</p>
                 </div>
                 <div className="flex flex-col items-center">
                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                     <Phone size={24} className="text-white" />
                   </div>
                   <h4 className="font-semibold mb-1">Strategy Call</h4>
                   <p className="text-pink-100 text-sm">Free consultation to discuss your project</p>
                 </div>
               </div>
             </div>
             
             <div className="mt-8 text-center">
               <p className="text-pink-100 mb-2">Questions? We're here to help!</p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg font-semibold">
                 <a href="mailto:pedro@iv-creative.co.uk" className="flex items-center gap-2 hover:text-pink-200 transition-colors">
                   <Mail size={20} />
                   pedro@iv-creative.co.uk
                 </a>
                 <a href="tel:+442012345678" className="flex items-center gap-2 hover:text-pink-200 transition-colors">
                   <Phone size={20} />
                   +44 20 1234 5678
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}