import { create } from 'zustand';
import type { Product, BrandingOption } from '../types/product';
import type { QuoteItem, QuoteItemConfiguration, ClientDetails, QuoteTotals, QuoteDraft } from '../types/quote';
import { calculateLineItem, calculateQuoteTotals, generateQuoteNumber, roundCurrency } from '../utils/calculations';
import { PRODUCTS, STANDARD_COLORS, STANDARD_BRANDING_OPTIONS } from '../data/products';

const STORAGE_KEY = 'plum_thread_quote_store_v1';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  timestamp: number;
}

interface QuoteState {
  items: QuoteItem[];
  quoteNumber: string;
  client: ClientDetails;
  totals: QuoteTotals;
  savedDrafts: QuoteDraft[];
  lastSavedAt: string | null;
  activeDraftId: string | null;
  toasts: ToastMessage[];

  // Actions
  addItem: (product: Product, configuration: QuoteItemConfiguration, quantity: number) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  updateItemConfig: (itemId: string, partialConfig: Partial<QuoteItemConfiguration>) => void;
  removeItem: (itemId: string) => void;
  clearQuote: () => void;
  resetQuoteToSample: () => void;
  updateClientDetails: (details: Partial<ClientDetails>) => void;
  regenerateQuoteNumber: () => void;
  saveCurrentAsDraft: (customName?: string) => string;
  restoreDraft: (draftId: string) => boolean;
  deleteDraft: (draftId: string) => void;
  clearLocalStorageData: () => void;

  // Toast actions
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_CLIENT: ClientDetails = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  city: 'Mumbai',
  country: 'India',
  additionalNotes: '',
};

function createInitialSampleItems(): QuoteItem[] {
  const tee = PRODUCTS[0]; // Round-neck T-shirt (₹165, 5% GST)
  const teeBranding = STANDARD_BRANDING_OPTIONS[1]; // Screen Print (+₹25) -> ₹190
  const teeLine = calculateLineItem(tee, teeBranding, 100);

  const hoodie = PRODUCTS[2]; // Hoodie (₹480, 5% GST)
  const hoodieBranding = STANDARD_BRANDING_OPTIONS[3]; // Embroidery (+₹35) -> ₹515
  const hoodieLine = calculateLineItem(hoodie, hoodieBranding, 50);

  return [
    {
      id: `${tee.id}-M-${STANDARD_COLORS[0].name}-${teeBranding.id}`,
      product: tee,
      configuration: {
        size: 'M',
        color: STANDARD_COLORS[0],
        branding: teeBranding,
      },
      quantity: 100,
      unitPrice: teeLine.unitPrice,
      taxableSubtotal: teeLine.taxableSubtotal,
      gstRate: teeLine.gstRate,
      gstAmount: teeLine.gstAmount,
      totalAmount: teeLine.totalAmount,
    },
    {
      id: `${hoodie.id}-L-${STANDARD_COLORS[2].name}-${hoodieBranding.id}`,
      product: hoodie,
      configuration: {
        size: 'L',
        color: STANDARD_COLORS[2],
        branding: hoodieBranding,
      },
      quantity: 50,
      unitPrice: hoodieLine.unitPrice,
      taxableSubtotal: hoodieLine.taxableSubtotal,
      gstRate: hoodieLine.gstRate,
      gstAmount: hoodieLine.gstAmount,
      totalAmount: hoodieLine.totalAmount,
    },
  ];
}

// Load initial persisted state or return defaults
function loadPersistedState(): {
  items: QuoteItem[];
  quoteNumber: string;
  client: ClientDetails;
  savedDrafts: QuoteDraft[];
  lastSavedAt: string | null;
} {
  if (typeof window === 'undefined') {
    const initialItems = createInitialSampleItems();
    return {
      items: initialItems,
      quoteNumber: generateQuoteNumber(),
      client: DEFAULT_CLIENT,
      savedDrafts: [],
      lastSavedAt: null,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.items)) {
        return {
          items: parsed.items,
          quoteNumber: parsed.quoteNumber || generateQuoteNumber(),
          client: { ...DEFAULT_CLIENT, ...parsed.client },
          savedDrafts: Array.isArray(parsed.savedDrafts) ? parsed.savedDrafts : [],
          lastSavedAt: parsed.lastSavedAt || null,
        };
      }
    }
  } catch (error) {
    console.warn('Failed to parse quote state from LocalStorage, resetting to default.', error);
  }

  const initialItems = createInitialSampleItems();
  return {
    items: initialItems,
    quoteNumber: generateQuoteNumber(),
    client: DEFAULT_CLIENT,
    savedDrafts: [],
    lastSavedAt: null,
  };
}

const initialData = loadPersistedState();
const initialTotals = calculateQuoteTotals(initialData.items);

export const useQuoteStore = create<QuoteState>((set, get) => {
  // Helper to persist state to LocalStorage
  const persistState = (newItems: QuoteItem[], newClient: ClientDetails, newQuoteNumber: string, drafts: QuoteDraft[]) => {
    if (typeof window !== 'undefined') {
      try {
        const payload = {
          items: newItems,
          client: newClient,
          quoteNumber: newQuoteNumber,
          savedDrafts: drafts,
          lastSavedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (err) {
        console.error('LocalStorage write failed:', err);
      }
    }
  };

  return {
    items: initialData.items,
    quoteNumber: initialData.quoteNumber,
    client: initialData.client,
    totals: initialTotals,
    savedDrafts: initialData.savedDrafts,
    lastSavedAt: initialData.lastSavedAt,
    activeDraftId: null,
    toasts: [],

    addToast: (toast) => {
      const id = 'toast-' + Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { ...toast, id, timestamp: Date.now() };
      set((state) => ({ toasts: [...state.toasts, newToast] }));
      setTimeout(() => {
        get().removeToast(id);
      }, 4500);
    },

    removeToast: (id) => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    },

    addItem: (product, configuration, quantity) => {
      const safeQty = Math.max(1, Math.floor(quantity));
      const configKey = `${product.id}-${configuration.size}-${configuration.color.name}-${configuration.branding.id}`;

      set((state) => {
        const existingIndex = state.items.findIndex((item) => item.id === configKey);
        let updatedItems: QuoteItem[];

        if (existingIndex > -1) {
          // Increment quantity of exact same specification
          const existingItem = state.items[existingIndex];
          const newQty = existingItem.quantity + safeQty;
          const lineCalc = calculateLineItem(product, configuration.branding, newQty);
          
          updatedItems = [...state.items];
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: newQty,
            unitPrice: lineCalc.unitPrice,
            taxableSubtotal: lineCalc.taxableSubtotal,
            gstRate: lineCalc.gstRate,
            gstAmount: lineCalc.gstAmount,
            totalAmount: lineCalc.totalAmount,
          };
        } else {
          // Add new item
          const lineCalc = calculateLineItem(product, configuration.branding, safeQty);
          const newItem: QuoteItem = {
            id: configKey,
            product,
            configuration,
            quantity: safeQty,
            unitPrice: lineCalc.unitPrice,
            taxableSubtotal: lineCalc.taxableSubtotal,
            gstRate: lineCalc.gstRate,
            gstAmount: lineCalc.gstAmount,
            totalAmount: lineCalc.totalAmount,
          };
          updatedItems = [...state.items, newItem];
        }

        const newTotals = calculateQuoteTotals(updatedItems);
        const lastSavedAt = new Date().toISOString();
        persistState(updatedItems, state.client, state.quoteNumber, state.savedDrafts);

        return {
          items: updatedItems,
          totals: newTotals,
          lastSavedAt,
        };
      });

      get().addToast({
        type: 'success',
        title: 'Added to Quote Studio',
        description: `${safeQty}x ${product.name} (${configuration.size}, ${configuration.color.name})`,
      });
    },

    updateItemQuantity: (itemId, quantity) => {
      // Prevent negative quantities: strictly at least 1
      const safeQty = Math.max(1, Math.floor(quantity));

      set((state) => {
        const updatedItems = state.items.map((item) => {
          if (item.id === itemId) {
            const lineCalc = calculateLineItem(item.product, item.configuration.branding, safeQty);
            return {
              ...item,
              quantity: safeQty,
              unitPrice: lineCalc.unitPrice,
              taxableSubtotal: lineCalc.taxableSubtotal,
              gstRate: lineCalc.gstRate,
              gstAmount: lineCalc.gstAmount,
              totalAmount: lineCalc.totalAmount,
            };
          }
          return item;
        });

        const newTotals = calculateQuoteTotals(updatedItems);
        const lastSavedAt = new Date().toISOString();
        persistState(updatedItems, state.client, state.quoteNumber, state.savedDrafts);

        return {
          items: updatedItems,
          totals: newTotals,
          lastSavedAt,
        };
      });
    },

    updateItemConfig: (itemId, partialConfig) => {
      set((state) => {
        const itemIndex = state.items.findIndex((i) => i.id === itemId);
        if (itemIndex === -1) return state;

        const currentItem = state.items[itemIndex];
        const newConfig: QuoteItemConfiguration = {
          ...currentItem.configuration,
          ...partialConfig,
        };

        const newKey = `${currentItem.product.id}-${newConfig.size}-${newConfig.color.name}-${newConfig.branding.id}`;
        const lineCalc = calculateLineItem(currentItem.product, newConfig.branding, currentItem.quantity);

        const updatedItem: QuoteItem = {
          ...currentItem,
          id: newKey,
          configuration: newConfig,
          unitPrice: lineCalc.unitPrice,
          taxableSubtotal: lineCalc.taxableSubtotal,
          gstRate: lineCalc.gstRate,
          gstAmount: lineCalc.gstAmount,
          totalAmount: lineCalc.totalAmount,
        };

        const updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;

        const newTotals = calculateQuoteTotals(updatedItems);
        const lastSavedAt = new Date().toISOString();
        persistState(updatedItems, state.client, state.quoteNumber, state.savedDrafts);

        return {
          items: updatedItems,
          totals: newTotals,
          lastSavedAt,
        };
      });
    },

    removeItem: (itemId) => {
      set((state) => {
        const itemToRemove = state.items.find((i) => i.id === itemId);
        const updatedItems = state.items.filter((item) => item.id !== itemId);
        const newTotals = calculateQuoteTotals(updatedItems);
        const lastSavedAt = new Date().toISOString();
        persistState(updatedItems, state.client, state.quoteNumber, state.savedDrafts);

        if (itemToRemove) {
          get().addToast({
            type: 'info',
            title: 'Item Removed',
            description: `${itemToRemove.product.name} removed from your quote.`,
          });
        }

        return {
          items: updatedItems,
          totals: newTotals,
          lastSavedAt,
        };
      });
    },

    clearQuote: () => {
      set((state) => {
        const emptyItems: QuoteItem[] = [];
        const newTotals = calculateQuoteTotals(emptyItems);
        const lastSavedAt = new Date().toISOString();
        persistState(emptyItems, state.client, state.quoteNumber, state.savedDrafts);

        return {
          items: emptyItems,
          totals: newTotals,
          lastSavedAt,
          activeDraftId: null,
        };
      });

      get().addToast({
        type: 'warning',
        title: 'Quote Cleared',
        description: 'All items have been removed from your active workspace.',
      });
    },

    resetQuoteToSample: () => {
      const sampleItems = createInitialSampleItems();
      const newTotals = calculateQuoteTotals(sampleItems);
      const newQuoteNum = generateQuoteNumber();

      set((state) => {
        const lastSavedAt = new Date().toISOString();
        persistState(sampleItems, state.client, newQuoteNum, state.savedDrafts);

        return {
          items: sampleItems,
          totals: newTotals,
          quoteNumber: newQuoteNum,
          lastSavedAt,
          activeDraftId: null,
        };
      });

      get().addToast({
        type: 'info',
        title: 'Reset to Sample Items',
        description: 'Loaded default sample items to demonstrate calculations.',
      });
    },

    updateClientDetails: (details) => {
      set((state) => {
        const updatedClient = { ...state.client, ...details };
        persistState(state.items, updatedClient, state.quoteNumber, state.savedDrafts);
        return { client: updatedClient, lastSavedAt: new Date().toISOString() };
      });
    },

    regenerateQuoteNumber: () => {
      const newNum = generateQuoteNumber();
      set((state) => {
        persistState(state.items, state.client, newNum, state.savedDrafts);
        return { quoteNumber: newNum, lastSavedAt: new Date().toISOString() };
      });
    },

    saveCurrentAsDraft: (customName) => {
      const state = get();
      if (state.items.length === 0) {
        state.addToast({
          type: 'error',
          title: 'Cannot Save Empty Quote',
          description: 'Add at least one garment before saving a local draft.',
        });
        return '';
      }

      const draftId = 'draft-' + Date.now();
      const now = new Date().toISOString();
      const draftName = customName || `${state.client.companyName || 'Draft'} (${state.totals.itemCount} items)`;

      const newDraft: QuoteDraft = {
        id: draftId,
        quoteNumber: state.quoteNumber,
        createdAt: now,
        updatedAt: now,
        client: { ...state.client, additionalNotes: draftName },
        items: [...state.items],
        totals: { ...state.totals },
      };

      const updatedDrafts = [newDraft, ...state.savedDrafts.slice(0, 9)]; // keep up to 10 drafts

      set((s) => {
        persistState(s.items, s.client, s.quoteNumber, updatedDrafts);
        return {
          savedDrafts: updatedDrafts,
          activeDraftId: draftId,
          lastSavedAt: now,
        };
      });

      get().addToast({
        type: 'success',
        title: 'Draft Saved Locally',
        description: `Stored safely in browser storage as "${draftName}".`,
      });

      return draftId;
    },

    restoreDraft: (draftId) => {
      const state = get();
      const draft = state.savedDrafts.find((d) => d.id === draftId);
      if (!draft) {
        state.addToast({
          type: 'error',
          title: 'Draft Not Found',
          description: 'The selected draft could not be loaded.',
        });
        return false;
      }

      const newTotals = calculateQuoteTotals(draft.items);

      set((s) => {
        persistState(draft.items, draft.client, draft.quoteNumber, s.savedDrafts);
        return {
          items: draft.items,
          client: draft.client,
          quoteNumber: draft.quoteNumber,
          totals: newTotals,
          activeDraftId: draft.id,
          lastSavedAt: new Date().toISOString(),
        };
      });

      get().addToast({
        type: 'success',
        title: 'Draft Restored',
        description: `Restored draft #${draft.quoteNumber} with ${draft.items.length} items.`,
      });

      return true;
    },

    deleteDraft: (draftId) => {
      set((state) => {
        const updated = state.savedDrafts.filter((d) => d.id !== draftId);
        persistState(state.items, state.client, state.quoteNumber, updated);
        return {
          savedDrafts: updated,
          activeDraftId: state.activeDraftId === draftId ? null : state.activeDraftId,
          lastSavedAt: new Date().toISOString(),
        };
      });

      get().addToast({
        type: 'info',
        title: 'Draft Deleted',
        description: 'The saved draft was permanently removed from local storage.',
      });
    },

    clearLocalStorageData: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      const emptyItems: QuoteItem[] = [];
      const newTotals = calculateQuoteTotals(emptyItems);
      const newQuoteNum = generateQuoteNumber();

      set({
        items: emptyItems,
        client: DEFAULT_CLIENT,
        quoteNumber: newQuoteNum,
        totals: newTotals,
        savedDrafts: [],
        activeDraftId: null,
        lastSavedAt: null,
      });

      get().addToast({
        type: 'info',
        title: 'Local Storage Wiped',
        description: 'All saved drafts and quote items have been cleared from this browser.',
      });
    },
  };
});
