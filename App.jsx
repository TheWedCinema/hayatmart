import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Shield, Sparkles, Upload, Image as ImageIcon, Users, Settings, 
  Layers, LogOut, Check, Search, Trash2, Eye, Download, Share2, 
  Smartphone, X, RefreshCw, Camera, Plus, Copy, FileText, Cpu, Send, 
  Menu, FolderHeart, CalendarDays, Sliders, Play, Globe, HardDrive, Edit2, Link,
  ChevronLeft, ChevronRight, Grid, List, Heart, HardDriveDownload, SlidersHorizontal
} from 'lucide-react';

const PRESET_OTP = "482019";

export default function App() {
  // Navigation & Screen View State - Defaults to First Looks Landing
  const [currentView, setCurrentView] = useState('customer-first-looks'); 
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpChannel, setOtpChannel] = useState('whatsapp'); 
  
  // Storage & Tier plans
  const [currentPlan, setCurrentPlan] = useState('PAID'); 
  const [storageUsedBytes, setStorageUsedBytes] = useState(38485901200); // ~35.84 GB
  const [maxStorageBytes] = useState(107374182400); // 100 GB Limit
  const [planExpiryDate] = useState('June 17, 2028');

  // Modals & Control states
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showWatermarkEditModal, setShowWatermarkEditModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [showDownloadAllModal, setShowDownloadAllModal] = useState(false);
  const [isGallerySettingsOpen, setIsGallerySettingsOpen] = useState(false);
  
  // Interactive watermark configurations
  const [watermarkSize, setWatermarkSize] = useState(16); 
  const [watermarkX, setWatermarkX] = useState(85); 
  const [watermarkY, setWatermarkY] = useState(85); 
  
  // Feedback Toast
  const [toast, setToast] = useState(null);

  // AI Support Assistant Chat State
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [botMessages, setBotMessages] = useState([
    { role: 'assistant', text: 'Welcome to Hayat AI Support. I can help configure your zero-cost self-hosted VGG-Face / RetinaFace indexing coordinates, verify storage, or adjust watermarks.' }
  ]);
  const [botInput, setBotInput] = useState('');
  const [botLoading, setBotLoading] = useState(false);

  // Gallery Filters
  const [dashboardTab, setDashboardTab] = useState('show_all'); 
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL'); 
  const [gridColumns, setGridColumns] = useState(3); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Client Selection Lists
  const [favoriteMediaIds, setFavoriteMediaIds] = useState([]);
  const [guestEmailForDownload, setGuestEmailForDownload] = useState('');
  const [aiMatchedIds, setAiMatchedIds] = useState([]);
  const [selectedSelfieCharacter, setSelectedSelfieCharacter] = useState(null);

  const [settingsForm, setSettingsForm] = useState({
    companyName: 'Golden Hour Studios Ltd',
    companyLogo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=150&auto=format&fit=crop',
    watermarkText: 'THE WED CINEMA',
    toggleText: true,
    toggleSaveImages: true
  });

  const [activeEvent, setActiveEvent] = useState({
    id: 'evt-siddhant-vedika',
    title: 'AKSHAY & ANJALI',
    location: 'Badi-Gorela-Mulla Talai Rd, Udaipur, Rajasthan 313001',
    date: '2024-01-25',
    eventCode: '7478',
    coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    description: 'Beautiful luxury wedding coverage of Akshay and Anjali in Udaipur, Rajasthan. Captured with zero-cost AI pipelines.',
    status: 'PUBLISHED', 
    storage: 'CLOUDFLARE_R2',
    pinCode: '7478',
    addToShowcase: true,
    clientEmailMsg: 'When your photos are uploaded, then all your photos will be found here. Thank you for joining Ai gallery.',
    shareWithClientUrl: 'https://hayatmart.com/client/akshay-anjali-7478',
    media: [
      { id: 'm1', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', name: 'Highlights First Look 01', fileSize: '4.8 MB', fileSizeBytes: 5033164, type: 'IMAGE', isPublic: true, folderCategory: 'HIGHLIGHT', exif: 'Sony A7R V · 85mm · f/1.4 · ISO 100' },
      { id: 'm2', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop', name: 'Ceremony Royal Mandap', fileSize: '6.2 MB', fileSizeBytes: 6501171, type: 'IMAGE', isPublic: true, folderCategory: 'WEDDING', exif: 'Sony A7R V · 35mm · f/1.8 · ISO 200' },
      { id: 'm3', url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=800&auto=format&fit=crop', name: 'Pre-Wedding Haldi Splashes', fileSize: '5.1 MB', fileSizeBytes: 5347737, type: 'IMAGE', isPublic: true, folderCategory: 'HALDI', exif: 'Sony A7R V · 50mm · f/1.2 · ISO 100' },
      { id: 'm4', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop', name: 'Sangeet Evening Symphony', fileSize: '7.8 MB', fileSizeBytes: 8178892, type: 'IMAGE', isPublic: true, folderCategory: 'SANGEET', exif: 'Sony A7R V · 24-70mm · f/2.8 · ISO 800' },
      { id: 'm5', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', name: 'Reception Gala Dinner Entry', fileSize: '8.4 MB', fileSizeBytes: 8808038, type: 'IMAGE', isPublic: true, folderCategory: 'RECEPTION', exif: 'Sony A7R V · 85mm · f/1.4 · ISO 400' },
      { id: 'm6', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', name: 'Decor Empty Setup Backstage', fileSize: '3.2 MB', fileSizeBytes: 3355443, type: 'IMAGE', isPublic: false, folderCategory: 'NO_FACE', exif: 'iPhone 15 Pro · 24mm · f/1.78 · ISO 50' }
    ]
  });

  const [events, setEvents] = useState([activeEvent]);
  const [previewMedia, setPreviewMedia] = useState(null); 
  const [uploadDrawer, setUploadDrawer] = useState(null); 
  const [customerUploadedImage, setCustomerUploadedImage] = useState(null);
  const [customerUploadProgress, setCustomerUploadProgress] = useState(0);

  const otpRefs = useRef([]);

  const PRESET_CHARACTERS = [
    { id: 'char-1', name: 'Bride Portrait', role: 'Anjali', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop', matches: ['m1', 'm5'] },
    { id: 'char-2', name: 'Groom Portrait', role: 'Akshay', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', matches: ['m1', 'm2', 'm5'] }
  ];

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    triggerToast("Link copied to clipboard!", "success");
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentView('otp');
      setOtpTimer(60);
      triggerToast(`Verification code sent! Standard code is: ${PRESET_OTP}`, 'info');
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    if (value !== '' && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleVerifyOtp = () => {
    if (otpValues.join('') === PRESET_OTP) {
      triggerToast('Studio logged in successfully', 'success');
      setCurrentView('dashboard');
    } else {
      triggerToast('Incorrect code. Use simulation bypass pin: 482019', 'error');
    }
  };

  const handleCustomerSelfieSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomerUploadedImage(URL.createObjectURL(file));
    setAiMatchedIds(['m1', 'm3']);
    setCustomerUploadProgress(0);
    setCurrentView('customer-uploading');
  };

  const triggerPresetSelfieScan = (character) => {
    setCustomerUploadedImage(character.avatarUrl);
    setAiMatchedIds(character.matches);
    setCustomerUploadProgress(0);
    setCurrentView('customer-uploading');
  };

  useEffect(() => {
    if (currentView === 'customer-uploading') {
      const interval = setInterval(() => {
        setCustomerUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 20;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [currentView]);

  const handleUploadImages = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadDrawer({ progress: 10, count: files.length });
    
    let prog = 10;
    const interval = setInterval(() => {
      prog += 30;
      if (prog >= 100) {
        clearInterval(interval);
        setUploadDrawer(null);
        triggerToast(`${files.length} photos auto-rotated & cataloged under ₹0 cost policy.`, 'success');
      } else {
        setUploadDrawer({ progress: prog, count: files.length });
      }
    }, 300);
  };

  const toggleFavorite = (id) => {
    if (favoriteMediaIds.includes(id)) {
      setFavoriteMediaIds(prev => prev.filter(item => item !== id));
    } else {
      setFavoriteMediaIds(prev => [...prev, id]);
      triggerToast("Added to Album Selection list!", "success");
    }
  };

  const moveWatermark = (direction) => {
    if (direction === 'up') setWatermarkY(p => Math.max(0, p - 5));
    if (direction === 'down') setWatermarkY(p => Math.min(100, p + 5));
    if (direction === 'left') setWatermarkX(p => Math.max(0, p - 5));
    if (direction === 'right') setWatermarkX(p => Math.min(100, p + 5));
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 flex flex-col font-sans select-none relative">
      
      {/* Dynamic Toast Center */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-gray-700 animate-fadeIn">
          <Sparkles size={14} className="text-[#d4af37]" />
          <p className="font-semibold font-mono">{toast.message}</p>
        </div>
      )}

      {/* Luxury Navbar */}
      <header className="w-full bg-[#111215] text-white py-4 px-6 flex items-center justify-between shadow-md border-b border-gray-800 z-40">
        <span className="font-bold tracking-widest text-sm text-white font-mono">
          HAYAT MART <span className="text-xs text-[#d4af37] font-light ml-2">| ZERO COST AI GALLERY</span>
        </span>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView('customer-first-looks')} className="text-xs text-gray-300 hover:text-white font-semibold uppercase tracking-wider font-mono">
            Guest View
          </button>
          <button onClick={() => setCurrentView('customer-showcase-hub')} className="text-xs text-[#d4af37] hover:text-yellow-400 font-semibold uppercase tracking-wider font-mono">
            Showcase Hub
          </button>
          <button onClick={() => setCurrentView('login')} className="px-3 py-1 bg-[#d4af37] text-black font-bold text-[11px] rounded-full uppercase font-mono tracking-wider">
            Studio Portal
          </button>
        </div>
      </header>

      {/* Core Screen Architecture Routing */}
      <main className="flex-grow flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full justify-start">
        
        {/* SCREEN: CUSTOMER FIRST LOOKS (Inspired by First Looks.jpg Layout) */}
        {currentView === 'customer-first-looks' && (
          <div className="w-full space-y-6 animate-fadeIn">
            <div className="bg-[#111215] text-white p-6 rounded-2xl text-center space-y-4 shadow-xl border border-gray-800">
              <span className="text-[11px] tracking-[0.3em] text-[#d4af37] font-bold block uppercase font-mono">
                Welcome to Ai Face Recognition Grid
              </span>
              <h1 className="text-3xl font-serif tracking-widest uppercase text-white font-bold">
                {activeEvent.title}
              </h1>
              <p className="text-xs text-gray-400 font-mono tracking-wide">{activeEvent.location}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Main Selection Area */}
              <div className="md:col-span-8 bg-white border rounded-2xl p-6 text-center space-y-6 shadow-sm">
                <div className="bg-gray-50 border p-4 rounded-xl text-center font-mono">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    "When your photos are uploaded, then all your photos will be found here"
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1">Thank you for joining Ai gallery system.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto font-mono">
                  <button 
                    onClick={() => setCurrentView('customer-selfie-source')}
                    className="py-4 bg-[#111215] text-[#d4af37] text-xs font-bold rounded-xl border border-[#d4af37]/30 flex flex-col items-center justify-center gap-2 shadow-sm uppercase tracking-widest"
                  >
                    <Camera size={20} />
                    <span>Upload Selfie to Match</span>
                  </button>
                  <button 
                    onClick={() => setCurrentView('customer-login')}
                    className="py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl border flex flex-col items-center justify-center gap-2 shadow-sm uppercase tracking-widest"
                  >
                    <Search size={20} />
                    <span>Enter Event Passcode</span>
                  </button>
                </div>

                {/* Sub Directories Mapping */}
                <div className="pt-6 border-t">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 text-left mb-3 font-mono">
                    AI Auto-Classified Directories
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-left">
                    {['HIGHLIGHT', 'HALDI', 'SANGEET', 'WEDDING', 'RECEPTION'].map((folder) => (
                      <div 
                        key={folder}
                        onClick={() => {
                          setSelectedCategoryFilter(folder);
                          setCurrentView('customer-gallery');
                        }}
                        className="p-3 bg-gray-50 border rounded-lg hover:border-[#d4af37] cursor-pointer transition-all shadow-xs"
                      >
                        <span className="text-[11px] font-bold block">/{folder}</span>
                        <span className="text-[9px] text-gray-400">Zero cost indexed</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info Section */}
              <div className="md:col-span-4 bg-gray-900 text-white p-5 rounded-2xl space-y-4 font-mono">
                <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37]">
                  <Smartphone size={16} />
                  <span>Get Mobile Experience</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Download the companion application on the App Store or Google Play to lock favorites and get real-time face alerts.
                </p>
                <div className="pt-2 space-y-2 text-[10px]">
                  <div onClick={() => setShowAppModal(true)} className="p-2 bg-gray-800 rounded border border-gray-700 text-center font-bold uppercase cursor-pointer hover:bg-black transition-colors">
                    App Store Download
                  </div>
                  <div onClick={() => setShowAppModal(true)} className="p-2 bg-gray-800 rounded border border-gray-700 text-center font-bold uppercase cursor-pointer hover:bg-black transition-colors">
                    Google Play Download
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SCREEN: SMARTPHONE METRIC HANDOFF CONSOLE (02 PC User.jpg) */}
        {currentView === 'customer-selfie-source' && (
          <div className="w-full max-w-4xl mx-auto space-y-4 animate-fadeIn font-mono">
            <button onClick={() => setCurrentView('customer-first-looks')} className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1">
              ← Back
            </button>

            <div className="bg-[#eeeff1] border rounded-xl overflow-hidden flex flex-col md:flex-row relative min-h-[460px] shadow-lg">
              
              {/* Left Segment: QR Generator Platform */}
              <div className="w-full md:w-3/5 p-8 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Captur selfie As Passport Photos</span>
                
                {/* Character Profile Simulation for Fast Bypass testing */}
                <div className="flex justify-center gap-2 w-full max-w-xs">
                  {PRESET_CHARACTERS.map(c => (
                    <div 
                      key={c.id} 
                      onClick={() => triggerPresetSelfieScan(c)}
                      className="bg-white p-1.5 border rounded-lg text-center text-[9px] font-bold flex-1 cursor-pointer hover:border-gray-800 transition-all"
                    >
                      <img src={c.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover mx-auto border" />
                      <span className="block mt-1 truncate">{c.role}</span>
                    </div>
                  ))}
                </div>

                <div 
                  onClick={() => triggerPresetSelfieScan(PRESET_CHARACTERS[0])}
                  className="p-4 bg-white border border-gray-300 rounded shadow-md cursor-pointer hover:border-[#d4af37] transition-all"
                >
                  <div className="w-40 h-40 bg-gray-100 flex items-center justify-center border text-[11px] font-bold text-center p-4">
                    [Click to Simulate Mobile Camera Handoff QR Code]
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 max-w-xs leading-normal">
                  <p className="font-bold text-gray-700">Let's create your Ai Gallery</p>
                  <p className="mt-1">Scan the QR code with your mobile device. Follow prompts to take a selfie. Return to your desktop computer.</p>
                </div>
              </div>

              {/* Node Center Badge Divider */}
              <div className="hidden md:flex flex-col items-center justify-center relative w-1">
                <div className="absolute top-0 bottom-0 w-[1px] bg-gray-300"></div>
                <div className="z-10 w-6 h-6 rounded-full bg-[#eeeff1] border text-[10px] font-bold text-gray-400 flex items-center justify-center shadow-sm">
                  &
                </div>
              </div>

              {/* Right Segment: Manual Drop Zone Option */}
              <div className="w-full md:w-2/5 p-8 flex flex-col items-center justify-center bg-gray-50/50 text-center">
                <label className="w-full max-w-[200px] aspect-square bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-gray-500 transition-colors shadow-inner group">
                  <Upload size={24} className="text-gray-400 group-hover:text-black mb-1" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase">Drop your Images</span>
                  <span className="text-[8px] text-gray-400 font-sans">As Passport Photos</span>
                  <input type="file" accept="image/*" onChange={handleCustomerSelfieSelect} className="hidden" />
                </label>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-6 block font-bold">OPTIONAL</span>
              </div>

            </div>
          </div>
        )}

        {/* SCREEN: REVOLVING BACKEND PIPELINE PROGRESS SCANNER (03_3.jpg) */}
        {currentView === 'customer-uploading' && (
          <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center animate-fadeIn font-mono">
            <div className="bg-[#eeeff1] border rounded-xl p-8 w-full flex flex-col items-center space-y-8 shadow-xl min-h-[420px] justify-center">
              
              <div className="bg-white border rounded-lg p-6 w-full flex flex-col items-center justify-center shadow-inner relative">
                <div className="w-20 h-20 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-800 animate-spin"></div>
                  <Cpu className="text-gray-700" size={20} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-700 mt-4">Uploading</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Free Self-Hosted Pipeline Processing</p>
              </div>

              <button 
                onClick={() => {
                  setSelectedCategoryFilter('MATCHED_PHOTOS');
                  setCurrentView('customer-gallery');
                  triggerToast(`Face Search match complete under 3 seconds!`, 'success');
                }}
                disabled={customerUploadProgress < 100}
                className={`w-20 h-20 rounded-full font-bold text-[11px] uppercase tracking-widest flex items-center justify-center shadow transition-all ${
                  customerUploadProgress >= 100 
                    ? 'bg-black text-[#d4af37] border border-[#d4af37]/30 hover:scale-105' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>

              <p className="text-[10px] text-gray-400 font-sans uppercase">Note Same View As Mobile and pc</p>
            </div>
          </div>
        )}

        {/* SCREEN: MATCHED PERSONAL GALLERY & DIRECORIES */}
        {currentView === 'customer-gallery' && (
          <div className="w-full space-y-6 animate-fadeIn font-mono">
            <div className="bg-white p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex flex-wrap gap-1.5">
                {['ALL', 'HIGHLIGHT', 'HALDI', 'SANGEET', 'WEDDING', 'RECEPTION'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedCategoryFilter(f)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                      selectedCategoryFilter === f ? 'bg-black text-[#d4af37]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
                {aiMatchedIds.length > 0 && (
                  <button
                    onClick={() => setSelectedCategoryFilter('MATCHED_PHOTOS')}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${
                      selectedCategoryFilter === 'MATCHED_PHOTOS' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    Matched For You ({aiMatchedIds.length})
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setIsFavoritesOpen(true)} className="px-3 py-1 bg-pink-50 text-pink-700 text-[10px] font-bold rounded flex items-center gap-1 border border-pink-200">
                  Loved Selection ({favoriteMediaIds.length})
                </button>
                <button onClick={() => setShowDownloadAllModal(true)} className="px-3 py-1 bg-black text-[#d4af37] text-[10px] font-bold rounded uppercase">
                  Download All
                </button>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {activeEvent.media
                .filter(m => {
                  if (selectedCategoryFilter === 'ALL') return m.isPublic;
                  if (selectedCategoryFilter === 'MATCHED_PHOTOS') return aiMatchedIds.includes(m.id);
                  return m.folderCategory === selectedCategoryFilter && m.isPublic;
                })
                .map((item) => (
                  <div key={item.id} className="bg-white border rounded-xl overflow-hidden shadow-xs relative group flex flex-col justify-between">
                    <div onClick={() => setPreviewMedia(item)} className="aspect-square bg-gray-50 relative cursor-pointer overflow-hidden">
                      <img src={item.url} alt="" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                      
                      {/* Watermark layer mapping configuration inputs */}
                      {settingsForm.toggleText && (
                        <div 
                          className="absolute text-white/40 border border-white/10 select-none uppercase tracking-widest pointer-events-none p-0.5 text-center rounded whitespace-nowrap"
                          style={{ left: `${watermarkX}%`, top: `${watermarkY}%`, transform: 'translate(-50%, -50%)', fontSize: `${watermarkSize}px`, backgroundColor: 'rgba(0,0,0,0.1)' }}
                        >
                          {settingsForm.watermarkText}
                        </div>
                      )}

                      <div className="absolute top-2 right-2 bg-black/60 text-[8px] text-white font-mono px-2 py-0.5 rounded-full uppercase">
                        /{item.folderCategory}
                      </div>
                    </div>

                    <div className="p-2.5 bg-white border-t flex items-center justify-between text-[10px]">
                      <span className="text-gray-400 font-semibold max-w-[120px] truncate">{item.exif}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                        className={`p-1 rounded-full border ${favoriteMediaIds.includes(item.id) ? 'bg-pink-50 border-pink-200 text-pink-600' : 'text-gray-400 hover:text-black'}`}
                      >
                        <Heart size={11} className={favoriteMediaIds.includes(item.id) ? "fill-pink-600" : ""} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center pt-4">
              <button onClick={() => setCurrentView('customer-first-looks')} className="px-5 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                Back to First Looks Overview
              </button>
            </div>
          </div>
        )}

        {/* SCREEN: PHOTOGRAPHER INVOICE / ENTERPRISE DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn font-mono">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-gray-800 uppercase tracking-wide">Studio Management Canvas</h2>
                <p className="text-xs text-gray-400">Zero recurring AI SaaS charges model active.</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setIsCreateEventOpen(true)} className="px-4 py-2 bg-white text-gray-700 border rounded-full text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-gray-50 flex items-center gap-1">
                  <Plus size={12} /> Create Event
                </button>
                <button onClick={() => setCurrentView('settings')} className="px-4 py-2 bg-white text-gray-700 border rounded-full text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-gray-50 flex items-center gap-1">
                  <Settings size={12} /> Studio Settings
                </button>
                <button onClick={() => setCurrentView('customer-showcase-hub')} className="px-4 py-2 bg-black text-[#d4af37] border border-[#d4af37]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Grid size={12} /> Public Hub View
                </button>
              </div>
            </div>

            {/* Event List Rendering Card Mapping backend schema list variables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((evt) => (
                <div 
                  key={evt.id} 
                  onClick={() => setCurrentView('event-editor')}
                  className="bg-white border rounded-xl p-5 shadow-xs hover:border-indigo-400 cursor-pointer transition-all space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] bg-indigo-50 border text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">
                        {evt.storage}
                      </span>
                      <h3 className="text-base font-bold font-serif uppercase tracking-wide text-gray-800 mt-2">{evt.title}</h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">{evt.location} • {evt.date}</p>
                    </div>
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded font-mono border border-emerald-200">
                      {evt.status}
                    </span>
                  </div>

                  <div className="aspect-[21/9] w-full rounded-lg bg-gray-50 border overflow-hidden">
                    <img src={evt.coverUrl} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t">
                    <span>Access Code: #{evt.eventCode}</span>
                    <span className="text-gray-900 font-bold uppercase tracking-wider">Configure Assets ({evt.media.length}) →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN: BACKEND DIGITAL LIGHTTABLE FILE SYSTEM MANAGER */}
        {currentView === 'event-editor' && (
          <div className="space-y-6 animate-fadeIn font-mono">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-2">
                <label className="px-4 py-2 bg-white text-gray-700 border rounded-full text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-gray-50 cursor-pointer flex items-center gap-1">
                  <Upload size={12} />
                  <span>Upload Bulk Images</span>
                  <input type="file" multiple accept="image/*" onChange={handleUploadImages} className="hidden" />
                </label>
                <button onClick={() => setShowVideoModal(true)} className="px-4 py-2 bg-white text-gray-700 border rounded-full text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-gray-50 flex items-center gap-1">
                  <Link size={12} /> Link Cinema Video
                </button>
                <button onClick={() => setIsGallerySettingsOpen(true)} className="px-4 py-2 bg-[#111215] text-[#d4af37] border border-[#d4af37]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Settings size={12} /> Gallery Settings
                </button>
              </div>

              <h2 className="text-lg font-serif font-bold uppercase tracking-wider text-gray-700 bg-gray-100 border px-3 py-1 rounded">
                {activeEvent.title}
              </h2>
            </div>

            {/* Folder Tabs Mapped directly to specific Category array filters */}
            <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-xl border">
              {['ALL', 'HIGHLIGHT', 'HALDI', 'SANGEET', 'WEDDING', 'RECEPTION', 'NO_FACE'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-bold tracking-wider uppercase transition-all ${
                    selectedCategoryFilter === cat ? 'bg-black text-[#d4af37]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {cat} ({cat === 'ALL' ? activeEvent.media.length : activeEvent.media.filter(m => m.folderCategory === cat).length})
                </button>
              ))}
            </div>

            {/* Lighttable Window Layout */}
            <div className="bg-[#a0a0a0] rounded-xl border border-gray-400 shadow-inner overflow-hidden flex flex-col min-h-[460px]">
              <div className="bg-[#7f7f7f] text-white px-4 py-2 text-xs font-bold flex justify-between items-center select-none border-b border-gray-400">
                <span>File Management Pipeline Control Viewport</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setMediaViewMode('grid')} className={`p-1 ${mediaViewMode === 'grid' ? 'text-white font-bold' : 'text-gray-300'}`}><Grid size={14} /></button>
                  <button onClick={() => setMediaViewMode('list')} className={`p-1 ${mediaViewMode === 'list' ? 'text-white font-bold' : 'text-gray-300'}`}><List size={14} /></button>
                </div>
              </div>

              <div className="p-4 overflow-y-auto max-h-[460px]">
                {mediaViewMode === 'grid' ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {activeEvent.media
                      .filter(m => selectedCategoryFilter === 'ALL' || m.folderCategory === selectedCategoryFilter)
                      .map((item) => (
                        <div key={item.id} onClick={() => setPreviewMedia(item)} className="aspect-square bg-[#bfbfbf] border border-gray-400 rounded relative group overflow-hidden shadow-xs cursor-pointer">
                          <img src={item.url} alt="" className="w-full h-full object-cover" />
                          <div className="absolute top-1 left-1 bg-black/60 text-[8px] text-white px-1.5 py-0.5 rounded font-mono uppercase">
                            /{item.folderCategory}
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteSingleMedia(item.id); }}
                              className="p-1.5 bg-white text-red-600 rounded shadow hover:bg-red-50"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  /* Table list system */
                  <div className="bg-white rounded border overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs text-gray-700">
                      <thead>
                        <tr className="bg-gray-100 text-gray-600 font-bold border-b">
                          <th className="p-2.5">Asset Frame Name</th>
                          <th className="p-2.5">Auto AI Folder</th>
                          <th className="p-2.5">Metadata EXIF</th>
                          <th className="p-2.5 w-16 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {activeEvent.media
                          .filter(m => selectedCategoryFilter === 'ALL' || m.folderCategory === selectedCategoryFilter)
                          .map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="p-2.5 font-bold text-gray-900">{item.name}</td>
                              <td className="p-2.5"><span className="px-2 py-0.5 bg-gray-100 border text-gray-700 rounded font-bold text-[9px]">/{item.folderCategory}</span></td>
                              <td className="p-2.5 text-gray-400 font-mono text-[10px]">{item.exif}</td>
                              <td className="p-2.5 text-center">
                                <button onClick={() => handleDeleteSingleMedia(item.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={13} /></button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Background task upload tracking template state */}
            {uploadDrawer && (
              <div className="bg-gray-900 text-white p-4 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#d4af37] font-bold uppercase flex items-center gap-1">
                    <RefreshCw className="animate-spin" size={12} /> Pre-Processing {uploadDrawer.count} Upload Batch Assets
                  </span>
                  <span>{uploadDrawer.progress}%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#d4af37] transition-all" style={{ width: `${uploadDrawer.progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCREEN: BRANDING CALIBRATION PROFILE SYSTEM */}
        {currentView === 'settings' && (
          <div className="w-full max-w-2xl mx-auto bg-white border rounded-2xl p-6 shadow-sm space-y-6 font-mono animate-fadeIn">
            <div className="text-center">
              <h2 className="text-lg font-serif font-bold text-gray-800 uppercase tracking-wide">Studio Calibration Dashboard</h2>
              <p className="text-xs text-gray-400 mt-0.5">Adjust zero cost watermarking text vectors and protection standards.</p>
            </div>

            <div className="space-y-4 text-xs divide-y divide-gray-150">
              <div className="pt-2 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <span className="font-bold text-gray-700">Studio Operation Brand Title</span>
                <input 
                  type="text" 
                  value={settingsForm.companyName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                  className="bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 text-xs w-full sm:w-2/3"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <span className="font-bold text-gray-700">Watermark Text Presets</span>
                <input 
                  type="text" 
                  value={settingsForm.watermarkText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, watermarkText: e.target.value })}
                  className="bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 text-xs w-full sm:w-2/3"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-700 block">Apply Safety Watermark layer</span>
                  <span className="text-[10px] text-gray-400 font-sans">Protects digital showcase proofs automatically</span>
                </div>
                <button 
                  onClick={() => setSettingsForm(prev => ({ ...prev, toggleText: !prev.toggleText }))}
                  className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider text-white transition-all ${settingsForm.toggleText ? 'bg-indigo-600' : 'bg-gray-400'}`}
                >
                  {settingsForm.toggleText ? 'Active' : 'Disabled'}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-center gap-3">
              <button 
                type="button"
                onClick={() => { setShowWatermarkEditModal(true); triggerToast("Loaded interactive watermark D-pad", "info"); }}
                className="px-6 py-2 bg-gray-900 hover:bg-black text-[#d4af37] text-xs font-bold uppercase rounded-full shadow border border-[#d4af37]/20"
              >
                Set D-Pad Placement Coordinates
              </button>
              <button 
                type="button" 
                onClick={() => { setCurrentView('dashboard'); triggerToast('Studio preferences records successfully synchronized', 'success'); }}
                className="px-6 py-2 bg-gray-100 text-gray-700 text-xs font-bold uppercase rounded-full border hover:bg-gray-200"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* SCREEN: ADVANCED CLIENT SHARING DISPATCH RULES (Inspired by FotoOwl Links Model) */}
        {currentView === 'share-client' && (
          <div className="w-full max-w-4xl mx-auto bg-white border rounded-2xl p-6 shadow-md font-mono space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-base font-serif font-bold uppercase tracking-wider text-gray-800">Configure Client Secure Delivery Link</h2>
              <p className="text-xs text-gray-400">Generate encrypted invite URLs and secure PIN authentication bypass gateways.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t pt-4">
              <div className="md:col-span-4 bg-gray-50 p-4 rounded-xl border space-y-3">
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-widest">WhatsApp Message Copy Description</span>
                <p className="text-xs font-bold text-gray-800 uppercase font-serif">{activeEvent.title}</p>
                <textarea 
                  rows="3"
                  value={activeEvent.clientEmailMsg}
                  onChange={(e) => setActiveEvent({ ...activeEvent, clientEmailMsg: e.target.value })}
                  className="w-full bg-white border rounded-lg p-2 text-xs text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans leading-relaxed"
                />
                <div className="text-[10px] text-gray-400 flex justify-between">
                  <span>Pin: #{activeEvent.pinCode}</span>
                  <span>{activeEvent.clientEmailMsg.length}/150</span>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border">
                  <div>
                    <span className="font-bold text-gray-700 block">Add to Showcase Hub</span>
                    <span className="text-[9px] text-gray-400 font-sans">Index this public gallery inside the master portfolio matrix</span>
                  </div>
                  <button 
                    onClick={() => {
                      const ns = !activeEvent.addToShowcase;
                      setActiveEvent({ ...activeEvent, addToShowcase: ns });
                      triggerToast(ns ? "Added to public portfolio showcase" : "Removed from showcase", "info");
                    }}
                    className={`px-3 py-1 font-bold rounded uppercase text-[10px] tracking-wider text-white ${activeEvent.addToShowcase ? 'bg-indigo-600' : 'bg-gray-400'}`}
                  >
                    {activeEvent.addToShowcase ? 'Active' : 'Muted'}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-gray-400 uppercase tracking-wider text-[9px] font-bold">Secure Delivery Target Link</span>
                    <button onClick={() => copyToClipboard(activeEvent.shareWithClientUrl)} className="text-[10px] text-indigo-600 font-bold hover:underline">Copy Link</button>
                  </div>
                  <input 
                    type="text" 
                    value={activeEvent.shareWithClientUrl}
                    onChange={(e) => setActiveEvent({ ...activeEvent, shareWithClientUrl: e.target.value })}
                    className="w-full bg-gray-50 border rounded-lg p-2.5 focus:outline-none text-xs text-gray-600 font-mono"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={() => { setCurrentView('event-editor'); triggerToast("Sharing distribution policies compiled successfully", "success"); }}
                    className="px-8 py-2.5 bg-black text-[#d4af37] text-xs font-bold uppercase rounded-full shadow border border-[#d4af37]/20 tracking-widest"
                  >
                    Save Distribution Rules
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN: AGGREGATED PORTFOLIO PUBLIC MATRIX HUB (FotoOwl Showcase Rebrand) */}
        {currentView === 'customer-showcase-hub' && (
          <div className="w-full space-y-6 animate-fadeIn font-mono">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-serif font-bold uppercase tracking-wider text-gray-900">Hayat Showcase Hub</h1>
              <p className="text-xs text-gray-400 mt-1">Our studio comprehensive public digital showcase portfolio network.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-3">
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-widest">ACTIVE PUBLIC SHOWCASES</span>
                {events.filter(e => e.addToShowcase).map(evt => (
                  <div 
                    key={evt.id}
                    onClick={() => { setCurrentView('customer-first-looks'); triggerToast(`Switched portal context to ${evt.title}`, 'success'); }}
                    className="bg-white border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center p-3 gap-4 group"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border">
                      <img src={evt.coverUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-800 font-serif uppercase tracking-wider group-hover:text-[#d4af37] transition-colors">{evt.title}</h4>
                      <p className="text-[10px] text-gray-400">{evt.location} • {evt.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#111215] text-white p-6 rounded-2xl border border-gray-800 shadow-xl text-center space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Master Showcase Index QR</h4>
                <div className="p-3 bg-white rounded-xl inline-block border">
                  <div className="w-36 h-36 bg-gray-200 border-2 border-black flex items-center justify-center text-black font-bold text-[10px] p-4">
                    [Master Showcase Matrix QR]
                  </div>
                </div>
                <p className="text-[9px] text-gray-400 leading-normal">Print this comprehensive code. Event guests scan once to access all authorized wedding galleries securely.</p>
                <button onClick={() => triggerToast("HD Master Print QR downloaded as vectorized draft", "success")} className="w-full py-2 bg-gray-900 border border-gray-700 hover:bg-black rounded-lg text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                  Download Print Vector
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* CORE INTEGRATED MODAL DIALOGS */}

      {/* MODAL: GALLERY SETTINGS MODAL SYSTEM */}
      {isGallerySettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-mono">
          <div className="bg-white rounded-2xl border w-full max-w-lg p-6 space-y-5 relative shadow-2xl animate-fadeIn">
            <button onClick={() => setIsGallerySettingsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"><X size={16} /></button>
            <div>
              <h3 className="text-sm font-bold text-gray-800 font-serif uppercase tracking-wide">Active Gallery Management Parameters</h3>
              <p className="text-xs text-gray-400">Configure event details, cover illustrations, and access credentials.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Modify Cover Asset Art</span>
                <div className="aspect-video w-full rounded-xl bg-gray-50 border overflow-hidden relative flex flex-col justify-center items-center text-center p-4">
                  <img src={activeEvent.coverUrl} alt="" className="w-full h-full object-cover absolute inset-0 filter brightness-75" />
                  <label className="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded cursor-pointer shadow z-10">
                    Change Cover
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <button 
                  onClick={() => { setActiveEvent(p => ({ ...p, status: 'PRIVATE' })); triggerToast("Status changed to Private", "info"); }}
                  className={`py-2 rounded font-bold uppercase tracking-wider border text-[11px] ${activeEvent.status === 'PRIVATE' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-gray-400'}`}
                >
                  Private Mode
                </button>
                <button 
                  onClick={() => { setActiveEvent(p => ({ ...p, status: 'PUBLISHED' })); triggerToast("Status changed to Published", "success"); }}
                  className={`py-2 rounded font-bold uppercase tracking-wider border text-[11px] ${activeEvent.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-white text-gray-400'}`}
                >
                  Publish Live
                </button>
              </div>

              <div className="pt-3 border-t grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { setIsGallerySettingsOpen(false); setCurrentView('share-client'); }}
                  className="py-2 bg-black hover:bg-gray-800 text-white font-bold rounded uppercase tracking-wider text-center text-[10px]"
                >
                  Distribution Setup
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 font-bold uppercase text-[10px]"
                >
                  Delete Pipeline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: WATERMARK CALIBRATION POSITION D-PAD CODES */}
      {showWatermarkEditModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-white border rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl animate-fadeIn flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-800 font-serif uppercase tracking-wide">Watermark Alignment Calibration Canvas</h3>
              <button onClick={() => setShowWatermarkEditModal(false)} className="text-gray-400 hover:text-black"><X size={16} /></button>
            </div>

            <div className="relative w-full aspect-[16/9] bg-[#222] border rounded-xl overflow-hidden shadow-inner">
              <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop" alt="" className="w-full h-full object-cover select-none pointer-events-none filter brightness-50" />
              {settingsForm.toggleText && (
                <div 
                  className="absolute p-2 border border-white/20 text-white uppercase tracking-widest font-light text-center whitespace-nowrap bg-black/40 rounded pointer-events-none"
                  style={{ left: `${watermarkX}%`, top: `${watermarkY}%`, transform: 'translate(-50%, -50%)', fontSize: `${watermarkSize}px` }}
                >
                  {settingsForm.watermarkText}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 pt-2 border-t text-xs">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <input type="range" min="8" max="32" value={watermarkSize} onChange={(e) => setWatermarkSize(parseInt(e.target.value))} className="w-full bg-gray-200 rounded-lg cursor-pointer appearance-none accent-black h-1" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">Font Scale: {watermarkSize}px</span>
              </div>

              <div className="text-center">
                <button onClick={() => { setShowWatermarkEditModal(false); triggerToast(`Coordinates locked: (${watermarkX}%, ${watermarkY}%)`, 'success'); }} className="px-5 py-2 bg-black text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-gray-800">
                  Save Placement
                </button>
              </div>

              {/* D-Pad controls mapping */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 bg-gray-50 border rounded-full flex items-center justify-center shadow-inner">
                  <button onClick={() => moveWatermark('up')} className="absolute top-0 text-gray-700 hover:text-black">▲</button>
                  <button onClick={() => moveWatermark('left')} className="absolute left-1 text-gray-700 hover:text-black">◀</button>
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                  <button onClick={() => moveWatermark('right')} className="absolute right-1 text-gray-700 hover:text-black">▶</button>
                  <button onClick={() => moveWatermark('down')} className="absolute bottom-0 text-gray-700 hover:text-black">▼</button>
                </div>
                <span className="text-[9px] text-gray-400 uppercase font-bold mt-1 block">D-Pad Positioning</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: STUDIO OWNER REGISTRATION SECURE OTP SIGN IN */}
      {currentView === 'login' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#eeeff1] border w-full max-w-[420px] p-8 rounded-2xl shadow-2xl text-center relative font-mono animate-fadeIn">
            <button onClick={() => setCurrentView('customer-first-looks')} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={16} /></button>
            <div className="mb-6 mt-2">
              <h2 className="text-2xl font-serif text-gray-700 tracking-wide italic">"Business with Hayat Mart"</h2>
              <p className="text-gray-400 text-[11px] mt-1 tracking-wide font-medium">Verify credentials to access Studio Dashboard console</p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="flex bg-white rounded-full border items-center p-1.5 shadow-inner">
                <span className="px-3 text-gray-500 text-xs font-bold border-r font-mono">+91</span>
                <input 
                  type="tel" maxLength="10" placeholder="98765 43210" value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent text-gray-800 px-3 py-1.5 focus:outline-none text-xs font-bold tracking-widest font-mono placeholder-gray-300" required
                />
              </div>

              <button type="submit" className="w-full py-3 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-full uppercase tracking-widest transition-all">
                Send Authentication Code
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SECURITY CODE VERIFICATION FLOW */}
      {currentView === 'otp' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#eeeff1] border w-full max-w-[400px] p-8 rounded-2xl shadow-2xl text-center relative font-mono animate-fadeIn">
            <button onClick={() => setCurrentView('login')} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={16} /></button>
            <div className="mb-6">
              <p className="text-gray-600 text-xs font-bold uppercase tracking-wider text-gray-400">Security Gate Check</p>
              <p className="text-xs text-gray-500 mt-1">Enter code sent to +91 {phoneNumber.slice(0,5)}XXXXX</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx} ref={(el) => (otpRefs.current[idx] = el)} type="text" maxLength="1" value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-8 h-10 bg-white border rounded-lg text-center font-bold text-sm text-gray-800 focus:outline-none focus:border-black"
                  />
                ))}
              </div>

              <button onClick={handleVerifyOtp} className="w-full py-3 bg-black text-[#d4af37] text-xs font-bold rounded-full uppercase tracking-widest transition-all">
                Verify Passcode
              </button>
              <p className="text-[10px] text-gray-400">Simulation Pin code bypass: <span className="font-bold text-gray-700">482019</span></p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SLIDE-OUT CLIENT LOVED PICTURES DRAFT SELECTION */}
      {isFavoritesOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end font-mono animate-fadeIn">
          <div className="w-full max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-gray-700">Loved Portrait Selection Draft</span>
                <button onClick={() => setIsFavoritesOpen(false)} className="text-gray-400 hover:text-black"><X size={16} /></button>
              </div>

              {favoriteMediaIds.length === 0 ? (
                <p className="text-xs text-gray-400 py-8 text-center">No loved pictures saved yet. Heart photos in your matched gallery.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {activeEvent.media.filter(m => favoriteMediaIds.includes(m.id)).map(item => (
                    <div key={item.id} className="relative aspect-square border rounded bg-gray-50 overflow-hidden">
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t space-y-2">
              <button 
                onClick={() => { setIsFavoritesOpen(false); triggerToast("Selection draft securely dispatched to photographer for print blueprint configuration!", "success"); }}
                disabled={favoriteMediaIds.length === 0}
                className="w-full py-2.5 bg-black text-[#d4af37] text-xs font-bold uppercase tracking-widest rounded disabled:bg-gray-100 disabled:text-gray-400"
              >
                Submit to Studio for Album
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREMIUM COMPILED HD ZIP ZIP DOWNLOAD REQUEST */}
      {showDownloadAllModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-white border rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center space-y-4 animate-fadeIn">
            <button onClick={() => setShowDownloadAllModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={16} /></button>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto"><HardDriveDownload size={20} /></div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Package Premium Zip Download</h3>
            <p className="text-[10px] text-gray-400 leading-normal">Input your verified customer email node to receive the master full-resolution unwatermarked zip bundle path directly.</p>
            <input type="email" placeholder="guest@gmail.com" value={guestEmailForDownload} onChange={(e) => setGuestEmailForDownload(e.target.value)} className="w-full bg-gray-50 border p-2 rounded text-xs text-center focus:outline-none" />
            <button onClick={() => { if(!guestEmailForDownload.includes('@')) { triggerToast('Enter valid email','error'); return; } triggerToast('High-definition zip download link compiled & dispatched!','success'); setShowDownloadAllModal(false); }} className="w-full py-2 bg-black text-white rounded font-bold text-xs uppercase tracking-wider">Package Bundle Link</button>
          </div>
        </div>
      )}

      {/* MODAL: PHOTO ENLARGEMENT EXIF PREVIEW SYSTEM */}
      {previewMedia && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-6 animate-fadeIn font-mono">
          <div className="flex justify-between items-center text-white text-xs">
            <div>
              <span className="text-[10px] tracking-widest text-[#d4af37] font-bold uppercase">Metadata Lightbox Viewport</span>
              <h2 className="font-serif text-sm font-semibold mt-0.5">{previewMedia.name}</h2>
            </div>
            <button onClick={() => setPreviewMedia(null)} className="text-gray-400 hover:text-white p-2"><X size={22} /></button>
          </div>

          <div className="flex-grow flex items-center justify-center relative">
            <img src={previewMedia.url} alt="" className="max-h-[65vh] max-w-full object-contain rounded border border-white/10 shadow-2xl" />
            {settingsForm.toggleText && (
              <div 
                className="absolute text-white/30 border border-white/10 select-none uppercase tracking-widest p-1 text-center whitespace-nowrap rounded pointer-events-none"
                style={{ left: `${watermarkX}%`, top: `${watermarkY}%`, transform: 'translate(-50%, -50%)', fontSize: `${watermarkSize + 4}px` }}
              >
                {settingsForm.watermarkText}
              </div>
            )}
          </div>

          <div className="bg-white/10 border border-white/10 p-4 rounded-xl max-w-xl mx-auto w-full text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Auto-Extracted EXIF Metrics</span>
              <span className="font-bold text-white tracking-wide block font-mono">{previewMedia.exif}</span>
              <span className="text-[9px] text-gray-500 block">Directory classification node: /{previewMedia.folderCategory}</span>
            </div>
            <button onClick={() => { toggleFavorite(previewMedia.id); setPreviewMedia(null); }} className="px-4 py-2 bg-pink-600 hover:bg-pink-700 font-bold text-[11px] rounded uppercase tracking-wider shrink-0 transition-transform active:scale-95">
              {favoriteMediaIds.includes(previewMedia.id) ? '♥ Unlove Portrait' : '♥ Love Portrait'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL: LINK EXTERNAL CINEMATIC VIDEO */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 font-mono">
          <div className="bg-[#f0f0f2] p-6 border rounded-xl shadow-2xl w-full max-w-md relative animate-fadeIn">
            <button onClick={() => setShowVideoModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold">X</button>
            <h3 className="text-xs font-bold tracking-widest text-gray-600 uppercase mb-3">Integrate External Video Stream URL</h3>
            <input type="url" required placeholder="https://vimeo.com/cinematography-stream" className="w-full bg-white border p-2.5 rounded text-xs focus:outline-none mb-4" />
            <button onClick={() => { setShowVideoModal(false); triggerToast('External Cinematic stream integrated','success'); }} className="w-full py-2 bg-black text-white rounded text-xs font-bold uppercase tracking-wider">Link Video</button>
          </div>
        </div>
      )}

      {/* MODAL: DELETE EVENT PIPELINE CONFIRMATION */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 font-mono">
          <div className="bg-white p-5 rounded-xl max-w-sm w-full border text-center space-y-4 animate-scaleUp">
            <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">Verify Permanent Purge</h4>
            <p className="text-[11px] text-gray-400">Are you sure you want to permanently delete this operational pipeline?</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button onClick={() => setShowDeleteConfirm(false)} className="py-2 bg-gray-100 rounded">Cancel</button>
              <button onClick={() => { setEvents([]); setShowDeleteConfirm(false); setIsGallerySettingsOpen(false); setCurrentView('dashboard'); triggerToast('Event pipeline cleared','info'); }} className="py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}