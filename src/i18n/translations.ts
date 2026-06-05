export type Lang = 'es' | 'en';

const translations = {
  // Sidebar
  sidebarTitle: { es: 'Categorías', en: 'Categories' },
  allCategories: { es: 'Todos', en: 'All' },
  categoriesCount: { es: 'categorías', en: 'categories' },
  coffeeButton: { es: 'Invítame un café', en: 'Buy me a coffee' },

  // Color category labels
  cat_pastel: { es: 'Pastel', en: 'Pastel' },
  cat_red: { es: 'Rojo', en: 'Red' },
  cat_blue: { es: 'Azul', en: 'Blue' },
  cat_yellow: { es: 'Amarillo', en: 'Yellow' },
  cat_green: { es: 'Verde', en: 'Green' },
  cat_orange: { es: 'Naranja', en: 'Orange' },
  cat_brown: { es: 'Café', en: 'Brown' },
  cat_pink: { es: 'Rosa', en: 'Pink' },
  cat_grey: { es: 'Gris', en: 'Grey' },
  cat_purple: { es: 'Violeta', en: 'Purple' },
  cat_white: { es: 'Blanco', en: 'White' },
  cat_black: { es: 'Negro', en: 'Black' },
  cat_metallic: { es: 'Metálico', en: 'Metallic' },
  cat_neon: { es: 'Neón', en: 'Neon' },

  // Main panel headers
  colorSelector: { es: 'Selector de color', en: 'Color Selector' },
  colorCode: { es: 'Código del color', en: 'Color Code' },
  hsvValues: { es: 'Valores HSV', en: 'HSV Values' },

  // Mode toggle
  singleColor: { es: 'Color único', en: 'Single Color' },
  triadColors: { es: 'Tríada (3 colores)', en: 'Triad (3 Colors)' },

  // Brightness label
  brightness: { es: 'Brillo', en: 'Brightness' },

  // HSV labels
  hue: { es: 'Matiz', en: 'Hue' },
  saturation: { es: 'Saturación', en: 'Saturation' },
  value: { es: 'Valor', en: 'Value' },

  // Search bar
  searchPlaceholder: { es: 'Buscar colores (ej. Rojo, Pastel, #FF0000)...', en: 'Search colors (e.g., Red, Pastels, #FF0000)...' },

  // Grid info
  showing: { es: 'Mostrando', en: 'Showing' },
  of: { es: 'de', en: 'of' },
  palettes: { es: 'paletas', en: 'palettes' },
  palette_singular: { es: 'paleta', en: 'palette' },
  colorsTotal: { es: 'colores en total)', en: 'colors total)' },
  from: { es: 'de', en: 'from' },

  // Load more
  loadMore: { es: 'Cargar más', en: 'Load More' },
  remaining: { es: 'restantes', en: 'remaining' },

  // Empty state
  noPalettesFound: { es: 'No se encontraron paletas', en: 'No palettes found' },
  noPalettesHint: { es: 'Intenta ajustar tu búsqueda o filtro de categoría para encontrar la paleta perfecta.', en: 'Try adjusting your search query or category filter to find the perfect color palette.' },

  // Palette card labels
  labelName: { es: 'Nombre:', en: 'Name:' },
  copiedHEX: { es: 'HEX copiado!', en: 'Copied HEX!' },
  copiedRGB: { es: 'RGB copiado!', en: 'Copied RGB!' },
  copiedHSV: { es: 'HSV copiado!', en: 'Copied HSV!' },
  clickToCopy: { es: 'Clic para copiar', en: 'Click to copy' },

  // Donation modal
  supportProject: { es: 'Apoyar este Proyecto', en: 'Support This Project' },
  choosePayment: { es: 'Elige tu método de pago preferido', en: 'Choose your preferred payment method' },
  internationalSupport: { es: 'Apoyo Internacional', en: 'International Support' },
  paypalCredit: { es: 'PayPal / Tarjeta de Crédito', en: 'PayPal / Credit Card' },
  localPaymentMX: { es: 'Pago Local México', en: 'Local Payment Mexico' },
  mercadoPagoSPEI: { es: 'Mercado Pago / SPEI / OXXO', en: 'Mercado Pago / SPEI / OXXO' },
  contributionThanks: { es: 'Cada contribución ayuda a mantener esta herramienta gratuita y sin anuncios.', en: 'Every contribution helps keep this tool free and ad-free.' },

  // Tagline
  tagline: { es: 'Generador de 500 Paletas & Rueda de Tríadas', en: '500 Palette Generator & Triad Color Wheel' },

  // Author credits
  authorCredits: { es: 'Creado por Ancient of Light | OmniumCore', en: 'Created by Ancient of Light | OmniumCore' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}

export const CATEGORY_KEY_MAP: Record<string, TranslationKey> = {
  pastel: 'cat_pastel',
  red: 'cat_red',
  blue: 'cat_blue',
  yellow: 'cat_yellow',
  green: 'cat_green',
  orange: 'cat_orange',
  brown: 'cat_brown',
  pink: 'cat_pink',
  grey: 'cat_grey',
  purple: 'cat_purple',
  white: 'cat_white',
  black: 'cat_black',
  metallic: 'cat_metallic',
  neon: 'cat_neon',
};
