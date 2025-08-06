'use client';
import { useState } from 'react';
import {
  FileText, Send, Building, DollarSign, 
  TrendingUp, Globe, CheckCircle2, Phone, Mail, Target,
  Zap, Monitor, Database, Sparkles, Award, Clock, Calendar,
  Users, MessageCircle, Search, ShoppingBag, Star, Heart,
  Loader2, CheckCircle, UserCheck, BarChart3, Settings,
  Briefcase, PieChart, ThumbsUp, AlertCircle
} from 'lucide-react';

export default function EnhancedIVCreativeForm() {
  const [formData, setFormData] = useState({
    // Company Info
    company_name: '',
    industry: '',
    business_age: '',
    website: '',
    company_size: '',
    business_model: '',
    
    // Contact Info
    contact_name: '',
    job_title: '',
    email: '',
    phone: '',
    decision_maker: '',
    
    // Business Details
    revenue: '',
    current_website: '',
    main_products_services: '',
    target_customers: '',
    unique_selling_point: '',
    biggest_challenge: '',
    
    // Marketing & Competition
    marketing_activities: [],
    marketing_spend: '',
    current_conversion_rate: '',
    main_competitors: '',
    marketing_goals: [],
    
    // Services & Technical
    services_needed: [],
    technical_requirements: [],
    integrations_needed: [],
    current_tools: '',
    
    // Project Specifics
    primary_goal: '',
    success_metrics: [],
    timeline: '',
    budget_range: '',
    project_urgency: '',
    
    // Additional Context
    previous_agencies: '',
    what_went_wrong: '',
    inspiration_sites: '',
    additional_info: '',
    
    // Lead Qualification
    ready_to_start: '',
    decision_timeline: '',
    heard_about_us: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sections = [
    { id: 'company', title: 'Company Info', icon: Building, color: 'from-pink-500 to-pink-600' },
    { id: 'contact', title: 'Contact Details', icon: UserCheck, color: 'from-pink-400 to-pink-500' },
    { id: 'business', title: 'Business Overview', icon: Briefcase, color: 'from-pink-600 to-pink-700' },
    { id: 'marketing', title: 'Marketing & Competition', icon: BarChart3, color: 'from-pink-500 to-pink-600' },
    { id: 'services', title: 'Services & Technical', icon: Settings, color: 'from-pink-400 to-pink-500' },
    { id: 'goals', title: 'Project Goals', icon: Target, color: 'from-pink-600 to-pink-700' },
    { id: 'context', title: 'Additional Context', icon: MessageCircle, color: 'from-pink-500 to-pink-600' },
    { id: 'qualification', title: 'Next Steps', icon: ThumbsUp, color: 'from-pink-400 to-pink-500' }
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
    setCurrentSection(index);
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Format the data for email submission
      const submissionData = {
        ...formData,
        services_needed: formData.services_needed.join(', '),
        marketing_activities: formData.marketing_activities.join(', '),
        technical_requirements: formData.technical_requirements.join(', '),
        integrations_needed: formData.integrations_needed.join(', '),
        marketing_goals: formData.marketing_goals.join(', '),
        success_metrics: formData.success_metrics.join(', '),
        submission_date: new Date().toISOString(),
        formatted_date: new Date().toLocaleDateString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Your Formspree endpoint
      const response = await fetch('https://formspree.io/f/mnnzgwjz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            company_name: '', industry: '', business_age: '', website: '', company_size: '', business_model: '',
            contact_name: '', job_title: '', email: '', phone: '', decision_maker: '',
            revenue: '', current_website: '', main_products_services: '', target_customers: '', unique_selling_point: '', biggest_challenge: '',
            marketing_activities: [], marketing_spend: '', current_conversion_rate: '', main_competitors: '', marketing_goals: [],
            services_needed: [], technical_requirements: [], integrations_needed: [], current_tools: '',
            primary_goal: '', success_metrics: [], timeline: '', budget_range: '', project_urgency: '',
            previous_agencies: '', what_went_wrong: '', inspiration_sites: '', additional_info: '',
            ready_to_start: '', decision_timeline: '', heard_about_us: ''
          });
          setSubmitStatus(null);
          setCurrentSection(0);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Brief Submitted Successfully!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your submission. We'll review your brief and get back to you within 24 hours with a customized proposal.
          </p>
          <div className="bg-gray-900 rounded-2xl p-6 border border-pink-500/20">
            <h3 className="text-pink-500 font-semibold mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-gray-300">Brief received and logged in our system</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-pink-500" />
                <span className="text-gray-300">Our team will review your requirements</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-pink-500" />
                <span className="text-gray-300">Custom proposal sent to your email</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-pink-500" />
                <span className="text-gray-300">Strategy call scheduled to discuss next steps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-4 overflow-x-auto pb-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 min-w-0 ${
                      currentSection === index 
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg scale-105 shadow-pink-500/25' 
                        : 'text-gray-400 hover:text-pink-500 hover:bg-gray-800/50'
                    }`}
                  >
                    <section.icon size={20} className="mb-1" />
                    <span className="text-xs font-medium hidden sm:block whitespace-nowrap">{section.title}</span>
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
      <form onSubmit={handleSubmit} className="relative z-10 max-w-5xl mx-auto px-6 py-12">
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
                  name="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="Enter your company name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Industry *</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="e.g., E-commerce, SaaS, Healthcare, Fashion"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Years in Business</label>
                <select
                  name="business_age"
                  value={formData.business_age}
                  onChange={(e) => handleInputChange('business_age', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                >
                  <option value="">Select years</option>
                  <option value="Pre-launch">Pre-launch</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Current Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Company Size</label>
                <select
                  name="company_size"
                  value={formData.company_size}
                  onChange={(e) => handleInputChange('company_size', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                >
                  <option value="">Select size</option>
                  <option value="Solo entrepreneur">Solo entrepreneur</option>
                  <option value="2-5 employees">2-5 employees</option>
                  <option value="6-20 employees">6-20 employees</option>
                  <option value="21-50 employees">21-50 employees</option>
                  <option value="50+ employees">50+ employees</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Business Model</label>
                <select
                  name="business_model"
                  value={formData.business_model}
                  onChange={(e) => handleInputChange('business_model', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                >
                  <option value="">Select model</option>
                  <option value="B2C - Direct to Consumer">B2C - Direct to Consumer</option>
                  <option value="B2B - Business to Business">B2B - Business to Business</option>
                  <option value="B2B2C - Business to Business to Consumer">B2B2C - Business to Business to Consumer</option>
                  <option value="Marketplace">Marketplace</option>
                  <option value="Subscription/SaaS">Subscription/SaaS</option>
                  <option value="Service-based">Service-based</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div id="section-1" className="p-8 border-b border-gray-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <UserCheck size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Contact Details</h2>
                <p className="text-gray-400 mt-1">How can we reach you?</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Your Name *</label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => handleInputChange('contact_name', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Job Title</label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={(e) => handleInputChange('job_title', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="e.g., CEO, Marketing Director, Founder"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                  placeholder="+44 20 1234 5678"
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-semibold text-white">Are you the primary decision maker for this project?</label>
                <select
                  name="decision_maker"
                  value={formData.decision_maker}
                  onChange={(e) => handleInputChange('decision_maker', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                >
                  <option value="">Select option</option>
                  <option value="Yes, I make the final decision">Yes, I make the final decision</option>
                  <option value="I influence the decision but need approval">I influence the decision but need approval</option>
                  <option value="I'm gathering information for someone else">I'm gathering information for someone else</option>
                </select>
              </div>
            </div>
          </div>

          {/* Business Overview */}
          <div id="section-2" className="p-8 border-b border-gray-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Briefcase size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Business Overview</h2>
                <p className="text-gray-400 mt-1">Help us understand your current situation</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white">Annual Revenue Range</label>
                  <select
                    name="revenue"
                    value={formData.revenue}
                    onChange={(e) => handleInputChange('revenue', e.target.value)}
                    className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                  >
                    <option value="">Select revenue range</option>
                    <option value="Pre-revenue/Startup">Pre-revenue/Startup</option>
                    <option value="£20k - £150k">£20k - £150k</option>
                    <option value="£150k - £750k">£150k - £750k</option>
                    <option value="£750k - £3M">£750k - £3M</option>
                    <option value="£3M - £10M">£3M - £10M</option>
                    <option value="£10M+">£10M+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white">Current Website Status</label>
                  <select
                    name="current_website"
                    value={formData.current_website}
                    onChange={(e) => handleInputChange('current_website', e.target.value)}
                    className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                  >
                    <option value="">Select website status</option>
                    <option value="No website yet">No website yet</option>
                    <option value="Basic website, needs major improvement">Basic website, needs major improvement</option>
                    <option value="Decent website, could be better">Decent website, could be better</option>
                    <option value="Good website that converts well">Good website that converts well</option>
                    <option value="High-performing, professional site">High-performing, professional site</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Main Products/Services *</label>
                <textarea
                  name="main_products_services"
                  value={formData.main_products_services}
                  onChange={(e) => handleInputChange('main_products_services', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                  placeholder="Describe what you sell or the services you provide..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Target Customers *</label>
                <textarea
                  name="target_customers"
                  value={formData.target_customers}
                  onChange={(e) => handleInputChange('target_customers', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                  placeholder="Who are your ideal customers? Demographics, behaviors, pain points..."
                  required
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white">What makes you unique?</label>
                  <textarea
                    name="unique_selling_point"
                    value={formData.unique_selling_point}
                    onChange={(e) => handleInputChange('unique_selling_point', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                    placeholder="What sets you apart from competitors? Your unique value proposition..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white">Biggest Business Challenge *</label>
                  <textarea
                    name="biggest_challenge"
                    value={formData.biggest_challenge}
                    onChange={(e) => handleInputChange('biggest_challenge', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                    placeholder="What's your biggest challenge right now? Low traffic, poor conversions, competition..."
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Marketing & Competition */}
          <div id="section-3" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <BarChart3 size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Marketing & Competition</h2>
               <p className="text-gray-400 mt-1">Current marketing situation and competitors</p>
             </div>
           </div>
           
           <div className="space-y-8">
             <div>
               <label className="block text-lg font-semibold text-white mb-4">Current Marketing Activities</label>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[
                   { key: 'social_media', label: 'Social Media', icon: Users },
                   { key: 'google_ads', label: 'Google Ads', icon: Search },
                   { key: 'facebook_instagram_ads', label: 'Facebook/Instagram Ads', icon: MessageCircle },
                   { key: 'email_marketing', label: 'Email Marketing', icon: Mail },
                   { key: 'seo', label: 'SEO', icon: TrendingUp },
                   { key: 'content_marketing', label: 'Content Marketing', icon: FileText },
                   { key: 'influencer_marketing', label: 'Influencer Marketing', icon: Star },
                   { key: 'affiliate_marketing', label: 'Affiliate Marketing', icon: Users },
                   { key: 'none', label: 'No current marketing', icon: AlertCircle }
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

             <div className="grid lg:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Monthly Marketing Spend</label>
                 <select
                   name="marketing_spend"
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
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Current Conversion Rate (if known)</label>
                 <input
                   type="text"
                   name="current_conversion_rate"
                   value={formData.current_conversion_rate}
                   onChange={(e) => handleInputChange('current_conversion_rate', e.target.value)}
                   className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white placeholder-gray-400"
                   placeholder="e.g., 2.5%, Don't know, 1 in 50 visitors"
                 />
               </div>
             </div>

             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Main Competitors</label>
               <textarea
                 name="main_competitors"
                 value={formData.main_competitors}
                 onChange={(e) => handleInputChange('main_competitors', e.target.value)}
                 rows={3}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                 placeholder="Who are your main competitors? What are they doing well that you're not?"
               />
             </div>

             <div>
               <label className="block text-lg font-semibold text-white mb-4">Marketing Goals (select all that apply)</label>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[
                   { key: 'increase_website_traffic', label: 'Increase Website Traffic', icon: TrendingUp },
                   { key: 'improve_conversion_rates', label: 'Improve Conversion Rates', icon: Target },
                   { key: 'generate_more_leads', label: 'Generate More Leads', icon: Users },
                   { key: 'increase_brand_awareness', label: 'Increase Brand Awareness', icon: Globe },
                   { key: 'reduce_customer_acquisition_cost', label: 'Reduce Customer Acquisition Cost', icon: DollarSign },
                   { key: 'improve_customer_retention', label: 'Improve Customer Retention', icon: Heart }
                 ].map((goal) => {
                   const isSelected = formData.marketing_goals.includes(goal.key);
                   return (
                     <label 
                       key={goal.key} 
                       className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                         isSelected 
                           ? 'border-pink-500 bg-pink-900/20 shadow-md shadow-pink-500/10' 
                           : 'border-gray-700 bg-gray-800/50 hover:border-pink-500/50 hover:bg-gray-800'
                       }`}
                     >
                       <input
                         type="checkbox"
                         checked={isSelected}
                         onChange={() => handleCheckboxChange('marketing_goals', goal.key)}
                         className="w-5 h-5 text-pink-600 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                       />
                       <goal.icon size={20} className={isSelected ? 'text-pink-500' : 'text-gray-400'} />
                       <span className={`font-medium text-sm ${isSelected ? 'text-pink-500' : 'text-white'}`}>
                         {goal.label}
                       </span>
                     </label>
                   );
                 })}
               </div>
             </div>
           </div>
         </div>

         {/* Services & Technical */}
         <div id="section-4" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <Settings size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Services & Technical Requirements</h2>
               <p className="text-gray-400 mt-1">What services do you need and any technical considerations?</p>
             </div>
           </div>
           
           <div className="space-y-8">
             <div>
               <label className="block text-lg font-semibold text-white mb-4">Services Needed *</label>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[
                   { key: 'website_design_development', label: 'Website Design & Development', icon: Monitor },
                   { key: 'ecommerce_platform', label: 'E-commerce Platform', icon: ShoppingBag },
                   { key: 'digital_marketing_strategy', label: 'Digital Marketing Strategy', icon: Zap },
                   { key: 'paid_advertising_management', label: 'Paid Advertising Management', icon: Search },
                   { key: 'seo_optimization', label: 'SEO Optimization', icon: TrendingUp },
                   { key: 'content_creation', label: 'Content Creation', icon: FileText },
                   { key: 'branding_design', label: 'Branding & Design', icon: Award },
                   { key: 'email_marketing_automation', label: 'Email Marketing & Automation', icon: Mail },
                   { key: 'social_media_management', label: 'Social Media Management', icon: Users },
                   { key: 'conversion_optimization', label: 'Conversion Rate Optimization', icon: Target },
                   { key: 'analytics_tracking', label: 'Analytics & Tracking Setup', icon: BarChart3 },
                   { key: 'ongoing_maintenance', label: 'Ongoing Maintenance & Support', icon: Settings }
                 ].map((service) => {
                   const isSelected = formData.services_needed.includes(service.key);
                   return (
                     <label 
                       key={service.key} 
                       className={`relative flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
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
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                         isSelected ? 'bg-gradient-to-br from-pink-500 to-pink-600' : 'bg-gray-700'
                       }`}>
                         <service.icon size={20} className="text-white" />
                       </div>
                       <div className="flex-1">
                         <span className={`font-medium text-sm block ${isSelected ? 'text-pink-500' : 'text-white'}`}>
                           {service.label}
                         </span>
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

             <div className="grid lg:grid-cols-2 gap-6">
               <div>
                 <label className="block text-lg font-semibold text-white mb-4">Technical Requirements</label>
                 <div className="space-y-3">
                   {[
                     { key: 'mobile_responsive', label: 'Mobile Responsive Design' },
                     { key: 'fast_loading', label: 'Fast Loading Speed' },
                     { key: 'seo_optimized', label: 'SEO Optimized' },
                     { key: 'multi_language', label: 'Multi-language Support' },
                     { key: 'accessibility_compliant', label: 'Accessibility Compliant' },
                     { key: 'gdpr_compliant', label: 'GDPR Compliant' },
                     { key: 'payment_processing', label: 'Payment Processing' },
                     { key: 'inventory_management', label: 'Inventory Management' },
                     { key: 'user_accounts', label: 'User Accounts/Login' },
                     { key: 'booking_system', label: 'Booking/Appointment System' }
                   ].map((req) => {
                     const isSelected = formData.technical_requirements.includes(req.key);
                     return (
                       <label 
                         key={req.key} 
                         className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                           isSelected 
                             ? 'border-pink-500 bg-pink-900/20' 
                             : 'border-gray-700 bg-gray-800/50 hover:border-pink-500/50'
                         }`}
                       >
                         <input
                           type="checkbox"
                           checked={isSelected}
                           onChange={() => handleCheckboxChange('technical_requirements', req.key)}
                           className="w-4 h-4 text-pink-600 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                         />
                         <span className={`text-sm ${isSelected ? 'text-pink-500' : 'text-white'}`}>
                           {req.label}
                         </span>
                       </label>
                     );
                   })}
                 </div>
               </div>

               <div>
                 <label className="block text-lg font-semibold text-white mb-4">Integrations Needed</label>
                 <div className="space-y-3">
                   {[
                     { key: 'google_analytics', label: 'Google Analytics' },
                     { key: 'google_ads', label: 'Google Ads' },
                     { key: 'facebook_pixel', label: 'Facebook Pixel' },
                     { key: 'mailchimp', label: 'Mailchimp/Email Platform' },
                     { key: 'crm_system', label: 'CRM System' },
                     { key: 'payment_gateway', label: 'Payment Gateway' },
                     { key: 'inventory_system', label: 'Inventory Management System' },
                     { key: 'booking_software', label: 'Booking Software' },
                     { key: 'chatbot', label: 'Live Chat/Chatbot' },
                     { key: 'social_media_feeds', label: 'Social Media Feeds' }
                   ].map((integration) => {
                     const isSelected = formData.integrations_needed.includes(integration.key);
                     return (
                       <label 
                         key={integration.key} 
                         className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                           isSelected 
                             ? 'border-pink-500 bg-pink-900/20' 
                             : 'border-gray-700 bg-gray-800/50 hover:border-pink-500/50'
                         }`}
                       >
                         <input
                           type="checkbox"
                           checked={isSelected}
                           onChange={() => handleCheckboxChange('integrations_needed', integration.key)}
                           className="w-4 h-4 text-pink-600 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                         />
                         <span className={`text-sm ${isSelected ? 'text-pink-500' : 'text-white'}`}>
                           {integration.label}
                         </span>
                       </label>
                     );
                   })}
                 </div>
               </div>
             </div>

             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Current Tools/Platforms</label>
               <textarea
                 name="current_tools"
                 value={formData.current_tools}
                 onChange={(e) => handleInputChange('current_tools', e.target.value)}
                 rows={3}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                 placeholder="What tools/platforms are you currently using? (Shopify, WordPress, HubSpot, etc.)"
               />
             </div>
           </div>
         </div>

         {/* Project Goals */}
         <div id="section-5" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <Target size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Project Goals</h2>
               <p className="text-gray-400 mt-1">What do you want to achieve?</p>
             </div>
           </div>
           
           <div className="space-y-6">
             <div className="grid lg:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Primary Goal *</label>
                 <select
                   name="primary_goal"
                   value={formData.primary_goal}
                   onChange={(e) => handleInputChange('primary_goal', e.target.value)}
                   className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                   required
                 >
                   <option value="">Select your primary goal</option>
                   <option value="Launch online presence">Launch online presence</option>
                   <option value="Increase online sales">Increase online sales</option>
                   <option value="Generate more qualified leads">Generate more qualified leads</option>
                   <option value="Improve conversion rates">Improve conversion rates</option>
                   <option value="Expand to new markets">Expand to new markets</option>
                   <option value="Scale existing operations">Scale existing operations</option>
                   <option value="Rebrand/modernize image">Rebrand/modernize image</option>
                   <option value="Reduce marketing costs">Reduce marketing costs</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Project Urgency</label>
                 <select
                   name="project_urgency"
                   value={formData.project_urgency}
                   onChange={(e) => handleInputChange('project_urgency', e.target.value)}
                   className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                 >
                   <option value="">Select urgency</option>
                   <option value="Critical - Launch ASAP">Critical - Launch ASAP</option>
                   <option value="High - Need to start soon">High - Need to start soon</option>
                   <option value="Medium - Planning ahead">Medium - Planning ahead</option>
                   <option value="Low - Just exploring options">Low - Just exploring options</option>
                 </select>
               </div>
             </div>

             <div className="grid lg:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Timeline *</label>
                 <select
                   name="timeline"
                   value={formData.timeline}
                   onChange={(e) => handleInputChange('timeline', e.target.value)}
                   className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                   required
                 >
                   <option value="">Select your timeline</option>
                   <option value="ASAP (2-4 weeks)">ASAP (2-4 weeks)</option>
                   <option value="Fast track (1-2 months)">Fast track (1-2 months)</option>
                   <option value="Standard (2-4 months)">Standard (2-4 months)</option>
                   <option value="Planned launch (4-6 months)">Planned launch (4-6 months)</option>
                   <option value="Long-term project (6+ months)">Long-term project (6+ months)</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Budget Range *</label>
                 <select
                   name="budget_range"
                   value={formData.budget_range}
                   onChange={(e) => handleInputChange('budget_range', e.target.value)}
                   className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                   required
                 >
                   <option value="">Select budget range</option>
                   <option value="£2,500 - £7,500">£2,500 - £7,500</option>
                   <option value="£7,500 - £20,000">£7,500 - £20,000</option>
                   <option value="£20,000 - £50,000">£20,000 - £50,000</option>
                   <option value="£50,000 - £150,000">£50,000 - £150,000</option>
                   <option value="£150,000+">£150,000+</option>
                   <option value="Need guidance on budget">Need guidance on budget</option>
                 </select>
               </div>
             </div>

             <div>
               <label className="block text-lg font-semibold text-white mb-4">Success Metrics (How will you measure success?)</label>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[
                   { key: 'increased_revenue', label: 'Increased Revenue', icon: DollarSign },
                   { key: 'more_website_traffic', label: 'More Website Traffic', icon: TrendingUp },
                   { key: 'higher_conversion_rate', label: 'Higher Conversion Rate', icon: Target },
                   { key: 'more_leads_inquiries', label: 'More Leads/Inquiries', icon: Users },
                   { key: 'improved_brand_recognition', label: 'Improved Brand Recognition', icon: Award },
                   { key: 'better_customer_engagement', label: 'Better Customer Engagement', icon: Heart },
                   { key: 'reduced_bounce_rate', label: 'Reduced Bounce Rate', icon: BarChart3 },
                   { key: 'improved_seo_rankings', label: 'Improved SEO Rankings', icon: Search },
                   { key: 'faster_sales_cycle', label: 'Faster Sales Cycle', icon: Clock }
                 ].map((metric) => {
                   const isSelected = formData.success_metrics.includes(metric.key);
                   return (
                     <label 
                       key={metric.key} 
                       className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                         isSelected 
                           ? 'border-pink-500 bg-pink-900/20 shadow-md shadow-pink-500/10' 
                           : 'border-gray-700 bg-gray-800/50 hover:border-pink-500/50 hover:bg-gray-800'
                       }`}
                     >
                       <input
                         type="checkbox"
                         checked={isSelected}
                         onChange={() => handleCheckboxChange('success_metrics', metric.key)}
                         className="w-5 h-5 text-pink-600 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                       />
                       <metric.icon size={18} className={isSelected ? 'text-pink-500' : 'text-gray-400'} />
                       <span className={`font-medium text-sm ${isSelected ? 'text-pink-500' : 'text-white'}`}>
                         {metric.label}
                       </span>
                     </label>
                   );
                 })}
               </div>
             </div>
           </div>
         </div>

         {/* Additional Context */}
         <div id="section-6" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <MessageCircle size={28} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Additional Context</h2>
               <p className="text-gray-400 mt-1">Help us understand your history and preferences</p>
             </div>
           </div>
           
           <div className="space-y-6">
             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Have you worked with agencies/freelancers before?</label>
               <textarea
                 name="previous_agencies"
                 value={formData.previous_agencies}
                 onChange={(e) => handleInputChange('previous_agencies', e.target.value)}
                 rows={3}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                 placeholder="Tell us about your experience with previous agencies or freelancers..."
               />
             </div>

             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">What went wrong or what would you do differently?</label>
               <textarea
                 name="what_went_wrong"
                 value={formData.what_went_wrong}
                 onChange={(e) => handleInputChange('what_went_wrong', e.target.value)}
                 rows={3}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                 placeholder="What didn't work well in past projects? Communication issues, missed deadlines, etc..."
               />
             </div>

             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Inspiration Websites</label>
               <textarea
                 name="inspiration_sites"
                 value={formData.inspiration_sites}
                 onChange={(e) => handleInputChange('inspiration_sites', e.target.value)}
                 rows={3}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                 placeholder="Share websites you love - design, functionality, user experience..."
               />
             </div>

             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">Additional Information</label>
               <textarea
                 name="additional_info"
                 value={formData.additional_info}
                 onChange={(e) => handleInputChange('additional_info', e.target.value)}
                 rows={4}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg resize-none text-white placeholder-gray-400"
                 placeholder="Any other details, specific requirements, or questions you'd like us to know about..."
               />
             </div>
           </div>
         </div>

         {/* Lead Qualification */}
         <div id="section-7" className="p-8 border-b border-gray-800">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
               <ThumbsUp size={28} className="text-white" />
               </div>
             <div>
               <h2 className="text-3xl font-bold text-white">Next Steps</h2>
               <p className="text-gray-400 mt-1">A few final questions to help us serve you better</p>
             </div>
           </div>
           
           <div className="space-y-6">
             <div className="grid lg:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Are you ready to start this project? *</label>
                 <select
                   name="ready_to_start"
                   value={formData.ready_to_start}
                   onChange={(e) => handleInputChange('ready_to_start', e.target.value)}
                   className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                   required
                 >
                   <option value="">Select readiness</option>
                   <option value="Yes, ready to start immediately">Yes, ready to start immediately</option>
                   <option value="Ready to start within 1-2 weeks">Ready to start within 1-2 weeks</option>
                   <option value="Ready to start within 1 month">Ready to start within 1 month</option>
                   <option value="Still planning, start in 2-3 months">Still planning, start in 2-3 months</option>
                   <option value="Just gathering information">Just gathering information</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-white">Decision Timeline</label>
                 <select
                   name="decision_timeline"
                   value={formData.decision_timeline}
                   onChange={(e) => handleInputChange('decision_timeline', e.target.value)}
                   className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
                 >
                   <option value="">When will you decide?</option>
                   <option value="Within 1 week">Within 1 week</option>
                   <option value="Within 2 weeks">Within 2 weeks</option>
                   <option value="Within 1 month">Within 1 month</option>
                   <option value="Within 2-3 months">Within 2-3 months</option>
                   <option value="No specific timeline">No specific timeline</option>
                 </select>
               </div>
             </div>

             <div className="space-y-2">
               <label className="block text-sm font-semibold text-white">How did you hear about IV Creative?</label>
               <select
                 name="heard_about_us"
                 value={formData.heard_about_us}
                 onChange={(e) => handleInputChange('heard_about_us', e.target.value)}
                 className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 text-lg text-white"
               >
                 <option value="">Select source</option>
                 <option value="Google search">Google search</option>
                 <option value="Social media">Social media</option>
                 <option value="Referral from friend/colleague">Referral from friend/colleague</option>
                 <option value="LinkedIn">LinkedIn</option>
                 <option value="Industry event/conference">Industry event/conference</option>
                 <option value="Previous client">Previous client</option>
                 <option value="Online advertisement">Online advertisement</option>
                 <option value="Other">Other</option>
               </select>
             </div>
           </div>
         </div>

         {/* Submit Section */}
         <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 text-white">
           <div className="text-center">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
               <Send size={32} className="text-white" />
             </div>
             <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
             <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
               Submit your brief and we'll send you a customized proposal within 24 hours!
             </p>
             
             {submitStatus === 'error' && (
               <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 mb-6 max-w-md mx-auto">
                 <div className="flex items-center gap-3">
                   <AlertCircle size={20} className="text-red-400" />
                   <span className="text-red-100">There was an error submitting your form. Please try again.</span>
                 </div>
               </div>
             )}
             
             <button
               type="submit"
               disabled={isSubmitting}
               className="inline-flex items-center gap-4 px-8 py-4 bg-white text-pink-600 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
             >
               {isSubmitting ? (
                 <>
                   <Loader2 size={28} className="animate-spin" />
                   Submitting Brief...
                 </>
               ) : (
                 <>
                   <Send size={28} />
                   Submit Brief to IV Creative
                 </>
               )}
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
                 <a href="mailto:info@iv-creative.co.uk" className="flex items-center gap-2 hover:text-pink-200 transition-colors">
                   <Mail size={20} />
                   info@iv-creative.co.uk
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
     </form>
   </div>
 );
}