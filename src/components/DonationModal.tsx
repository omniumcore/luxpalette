import { X, Coffee, CreditCard, Landmark } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const { t } = useLang();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div
        className="relative w-full max-w-md rounded-2xl border border-gray-700 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200"
        style={{ backgroundColor: '#121e30' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <Coffee size={20} className="text-amber-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">{t('supportProject')}</h2>
            <p className="text-xs text-gray-400">{t('choosePayment')}</p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href="https://paypal.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <CreditCard size={18} className="text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-amber-300 group-hover:text-amber-200 transition-colors">
                {t('internationalSupport')}
              </div>
              <div className="text-xs text-gray-400">{t('paypalCredit')}</div>
            </div>
            <svg className="w-4 h-4 text-amber-400/50 group-hover:text-amber-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a
            href="https://mpago.li"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 to-blue-500/10 hover:from-sky-500/20 hover:to-blue-500/20 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
              <Landmark size={18} className="text-sky-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sky-300 group-hover:text-sky-200 transition-colors">
                {t('localPaymentMX')}
              </div>
              <div className="text-xs text-gray-400">{t('mercadoPagoSPEI')}</div>
            </div>
            <svg className="w-4 h-4 text-sky-400/50 group-hover:text-sky-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-gray-500 text-center mt-5">
          {t('contributionThanks')}
        </p>
      </div>
    </div>
  );
}
