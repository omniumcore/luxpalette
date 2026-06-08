import { useLang } from '../i18n/LanguageContext';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const { t } = useLang();

  if (!isOpen) return null;

  // Función segura de JavaScript para abrir la pasarela sin bloqueos de servidor
  const handlePaymentRedirect = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div
        className="relative w-full max-w-md rounded-2xl border border-gray-700 shadow-2xl p-6"
        style={{ backgroundColor: '#121e30' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">{t('supportProject')}</h2>
            <p className="text-xs text-gray-400">{t('choosePayment')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Botón de PayPal Seguro */}
          <button
            onClick={() => handlePaymentRedirect('https://paypal.me/omniumcore')}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-200 group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
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
          </button>

          {/* Botón de Mercado Pago Seguro */}
          <button
            onClick={() => handlePaymentRedirect('https://link.mercadopago.com.mx/omniumcore')}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 to-blue-500/10 hover:from-sky-500/20 hover:to-blue-500/20 transition-all duration-200 group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2 2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
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
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-5">
          {t('contributionThanks')}
        </p>
      </div>
    </div>
  );
}
