import React, { useState } from 'react';
import type { FormData } from './types';
import { SERVICE_OPTIONS, WHATSAPP_TARGET_NUMBER } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    whatsappNumber: '',
    email: '',
    service: SERVICE_OPTIONS[0],
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.name.trim() || !formData.address.trim() || !formData.whatsappNumber.trim() || !formData.email.trim()) {
      setError('Harap isi semua kolom yang wajib diisi.');
      return;
    }

    if (!/^\d{10,15}$/.test(formData.whatsappNumber)) {
        setError('Format nomor WhatsApp tidak valid. Harap masukkan hanya angka, 10-15 digit.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Format alamat email tidak valid.');
        return;
    }

    const message = `
*Form Pendaftaran Badan Usaha*

*Nama Lengkap:*
${formData.name}

*Alamat Lengkap:*
${formData.address}

*Nomor WhatsApp Aktif:*
${formData.whatsappNumber}

*Alamat Email:*
${formData.email}

*Jenis Layanan:*
${formData.service}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_TARGET_NUMBER}?text=${encodedMessage}`;

    // Open in a new tab to avoid "refused to connect" issues in sandboxed environments
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900 min-h-screen w-full flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl shadow-pink-500/20 p-6 md:p-10 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Form Registrasi</h1>
          <p className="text-slate-400 mt-2">Isi data di bawah ini untuk memulai proses pendirian badan usaha Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Contoh: Budi Santoso"
              className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              required
            />
          </div>

          {/* Address Input */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-2">
              Alamat Lengkap
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={4}
              placeholder="Contoh: Jl. Merdeka No. 10, Jakarta Pusat, DKI Jakarta, 10110"
              className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              required
            />
          </div>

          {/* WhatsApp Number Input */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-slate-300 mb-2">
              Nomor WhatsApp Aktif
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder="Contoh: 081234567890"
              className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Contoh: budi.santoso@example.com"
              className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              required
            />
          </div>

          {/* Service Selection */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2">
              Pilih Layanan
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
            >
              {SERVICE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500/50 transform hover:-translate-y-0.5 transition duration-300 ease-in-out shadow-lg shadow-pink-500/20"
            >
              Kirim Form via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default App;
