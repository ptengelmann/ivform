'use client';
import { useState } from 'react';
import {
  Building, DollarSign, TrendingUp, Globe, CheckCircle2, ArrowRight,
  Rocket, Clock, Target, ShoppingBag, Zap, Monitor, Database, 
  Sparkles, Calendar, Award, Briefcase, Settings, ChevronRight,
  Send, FileText, Users, MessageCircle, Phone
} from 'lucide-react';

export default function IVCreativeBrief() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 'company_info',
      title: 'Tell us about your business',
      type: 'text_group',
      fields: [
        { key: 'company_name', label: 'Company Name', type: 'text', required: true },
        { key: 'industry', label: 'Industry', type: 'text', required: true },
        { key: 'business_age', label: 'Years in Business', type: 'number', required: true }
      ]
    },
    {
      id: 'revenue',
      title: 'What\'s your current annual revenue?',
      type: 'single_choice',
      options: [
        { value: 'startup', label: 'Pre-revenue/Startup', icon: Rocket },
        { value: 'small', label: '£20k - £150k', icon: DollarSign },
        { value: 'medium', label: '£150k - £750k', icon: TrendingUp },
        { value: 'large', label: '£750k - £5M', icon: Building },
        { value: 'enterprise', label: '£5M+', icon: Briefcase }
      ]
    },
    {
      id: 'current_website',
      title: 'What\'s your current online presence?',
      type: 'single_choice',
      options: [
        { value: 'none', label: 'No website yet', icon: Globe },
        { value: 'basic', label: 'Basic website, needs improvement', icon: Settings },
        { value: 'good', label: 'Good website that converts well', icon: CheckCircle2 },
        { value: 'excellent', label: 'High-performing, professional site', icon: Award }
      ]
    },
    {
      id: 'current_marketing',
      title: 'What marketing are you currently doing?',
      type: 'multiple_choice',
      options: [
        { value: 'social_media', label: 'Social Media', icon: MessageCircle },
        { value: 'google_ads', label: 'Google Ads', icon: Zap },
        { value: 'facebook_ads', label: 'Facebook/Instagram Ads', icon: Users },
        { value: 'email', label: 'Email Marketing', icon: Send },
        { value: 'seo', label: 'SEO', icon: TrendingUp },
        { value: 'content', label: 'Content Marketing', icon: FileText },
        { value: 'none', label: 'No current marketing', icon: Target }
      ]
    },
    {
      id: 'monthly_marketing_spend',
      title: 'What\'s your current monthly marketing budget?',
      type: 'single_choice',
      options: [
        { value: 'none', label: '£0 - No current spend', icon: Target },
        { value: 'low', label: '£500 - £2,000', icon: DollarSign },
        { value: 'medium', label: '£2,000 - £10,000', icon: TrendingUp },
        { value: 'high', label: '£10,000 - £50,000', icon: Building },
        { value: 'enterprise', label: '£50,000+', icon: Award }
      ]
    },
    {
      id: 'services_needed',
      title: 'Which services do you need?',
      type: 'multiple_choice',
      options: [
        { value: 'ecommerce', label: 'E-commerce Platform', icon: ShoppingBag },
        { value: 'marketing', label: 'Digital Marketing', icon: Zap },
        { value: 'design', label: 'Website Design/Redesign', icon: Monitor },
        { value: 'fulfillment', label: 'Order Fulfillment', icon: Database },
        { value: 'personalization', label: 'Product Personalization', icon: Sparkles },
        { value: 'branding', label: 'Branding & Design', icon: Award },
        { value: 'seo', label: 'SEO Optimization', icon: TrendingUp }
      ]
    },
    {
      id: 'primary_goal',
      title: 'What\'s your main goal for the next 12 months?',
      type: 'single_choice',
      options: [
        { value: 'launch', label: 'Launch online presence', icon: Rocket },
        { value: 'increase_sales', label: 'Increase online sales', icon: TrendingUp },
        { value: 'expand_markets', label: 'Expand to new markets', icon: Globe },
        { value: 'improve_conversion', label: 'Improve conversion rates', icon: Target },
        { value: 'scale_operations', label: 'Scale existing operations', icon: Building }
      ]
    },
    {
      id: 'timeline',
      title: 'What\'s your ideal timeline?',
      type: 'single_choice',
      options: [
        { value: 'urgent', label: 'ASAP (3-4 weeks)', icon: Clock },
        { value: 'standard', label: 'Standard (2-3 months)', icon: Calendar },
        { value: 'planned', label: 'Planned launch (6+ months)', icon: Target }
      ]
    },
    {
      id: 'budget_range',
      title: 'What\'s your total project budget?',
      type: 'single_choice',
      options: [
        { value: 'micro', label: '£1,000 - £5,000', icon: DollarSign },
        { value: 'small', label: '£5,000 - £15,000', icon: TrendingUp },
        { value: 'medium', label: '£15,000 - £50,000', icon: Building },
        { value: 'large', label: '£50,000+', icon: Award },
        { value: 'unsure', label: 'Need guidance on budget', icon: MessageCircle }
      ]
    },
    {
      id: 'contact_info',
      title: 'How can we reach you?',
      type: 'text_group',
      fields: [
        { key: 'contact_name', label: 'Your Name', type: 'text', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { key: 'company_website', label: 'Current Website (if any)', type: 'url', required: false }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'text_group') {
      const requiredFields = currentQuestion.fields.filter(field => field.required);
      return requiredFields.every(field => answer && answer[field.key] && answer[field.key].trim());
    }
    
    return answer !== undefined && answer !== null && 
           (Array.isArray(answer) ? answer.length > 0 : true);
  };

  const exportToPDF = () => {
    window.print();
  };

  const sendEmail = () => {
    const subject = encodeURIComponent('IV Creative Project Brief - ' + (answers.company_info?.company_name || 'New Client'));
    const body = encodeURIComponent(
      `New project brief submitted:\n\n` +
      `Company: ${answers.company_info?.company_name || 'N/A'}\n` +
      `Industry: ${answers.company_info?.industry || 'N/A'}\n` +
      `Revenue: ${answers.revenue || 'N/A'}\n` +
      `Services Needed: ${Array.isArray(answers.services_needed) ? answers.services_needed.join(', ') : 'N/A'}\n` +
      `Budget: ${answers.budget_range || 'N/A'}\n` +
      `Timeline: ${answers.timeline || 'N/A'}\n` +
      `Contact: ${answers.contact_info?.email || 'N/A'}\n\n` +
      `Full brief responses available in dashboard.`
    );
    window.location.href = `mailto:hello@ivcreative.com?subject=${subject}&body=${body}`;
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            We've received your project brief and will prepare a customized proposal for{' '}
            <span className="font-semibold text-pink-600">
              {answers.company_info?.company_name || 'your business'}
            </span>.
          </p>
          
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-pink-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-pink-800 space-y-1 text-left">
              <li>• We'll review your brief within 24 hours</li>
              <li>• Prepare a customized package recommendation</li>
              <li>• Schedule a strategy call to discuss your project</li>
              <li>• Deliver a detailed proposal with clear deliverables</li>
            </ul>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FileText size={20} />
              Save as PDF
            </button>
            
            <button
              onClick={sendEmail}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-colors"
            >
              <Send size={20} />
              Email Results
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Questions? Call us at <span className="font-medium">+44 20 1234 5678</span> or email{' '}
              <span className="font-medium text-pink-600">hello@ivcreative.com</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">IV Creative</h1>
                <p className="text-sm text-gray-600">Project Brief Questionnaire</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-pink-600">
                Step {currentStep + 1} of {questions.length}
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          
          {/* Question Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {currentStep + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentQuestion.title}
              </h2>
            </div>
          </div>

          {/* Question Content */}
          <div className="mb-8">
            {currentQuestion.type === 'single_choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-pink-500 bg-pink-50 text-pink-900'
                        : 'border-gray-200 bg-gray-50 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    <option.icon size={24} className={
                      answers[currentQuestion.id] === option.value ? 'text-pink-600' : 'text-gray-400'
                    } />
                    <span className="font-medium">{option.label}</span>
                    <ChevronRight size={20} className="ml-auto text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multiple_choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id]?.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        const currentAnswers = answers[currentQuestion.id] || [];
                        const newAnswers = isSelected
                          ? currentAnswers.filter(val => val !== option.value)
                          : [...currentAnswers, option.value];
                        handleAnswer(currentQuestion.id, newAnswers);
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 text-pink-900'
                          : 'border-gray-200 bg-gray-50 hover:border-pink-300 hover:bg-pink-50'
                      }`}
                    >
                      <option.icon size={24} className={
                        isSelected ? 'text-pink-600' : 'text-gray-400'
                      } />
                      <span className="font-medium flex-1">{option.label}</span>
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'text_group' && (
              <div className="space-y-4">
                {currentQuestion.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      value={answers[currentQuestion.id]?.[field.key] || ''}
                      onChange={(e) => {
                        const currentAnswers = answers[currentQuestion.id] || {};
                        handleAnswer(currentQuestion.id, {
                          ...currentAnswers,
                          [field.key]: e.target.value
                        });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ← Back
            </button>
            
            <div className="text-sm text-gray-500">
              {currentStep + 1} of {questions.length}
            </div>
            
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isStepComplete()
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}