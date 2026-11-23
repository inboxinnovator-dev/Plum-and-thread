import React, { useState } from 'react';
import { Bookmark, RotateCcw, Trash2, HardDrive, CheckCircle2 } from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';
import { formatDate, formatINR } from '../../utils/formatters';

export const QuoteDraftsManager: React.FC = () => {
  const {
    savedDrafts,
    saveCurrentAsDraft,
    restoreDraft,
    deleteDraft,
    clearLocalStorageData,
    lastSavedAt,
  } = useQuoteStore();

  const [draftName, setDraftName] = useState('');
  const [showDraftsList, setShowDraftsList] = useState(false);

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    saveCurrentAsDraft(draftName.trim() || undefined);
    setDraftName('');
  };

  return (
    <div className="p-5 rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] space-y-4">
      {/* LocalStorage Status Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CE]">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-[#747C66]" />
          <h4 className="font-serif text-lg text-[#171717] font-semibold">
            Local Browser Storage
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#747C66]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active in Browser</span>
        </div>
      </div>

      {/* Clear Explanation */}
      <p className="text-xs text-[#171717]/70 leading-relaxed">
        Your active quote is automatically cached in your browser’s LocalStorage. You can also save named snapshots, restore previous project drafts, or wipe stored data at any time. No server account required.
      </p>

      {lastSavedAt && (
        <div className="text-[11px] font-mono text-[#747C66]">
          Last synchronized: <span className="text-[#171717] font-medium">{formatDate(lastSavedAt)}</span>
        </div>
      )}

      {/* Save Draft Form */}
      <form onSubmit={handleSaveDraft} className="flex gap-2">
        <input
          type="text"
          placeholder="Snapshot name (e.g. Summer Drop V1)..."
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] placeholder:text-[#747C66] focus:outline-none focus:border-[#C66B4E]"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171717] text-[#F4F0E8] text-xs font-semibold hover:bg-[#C66B4E] transition-colors cursor-pointer shrink-0"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Save Draft</span>
        </button>
      </form>

      {/* Toggle View of Saved Drafts */}
      <div className="pt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowDraftsList(!showDraftsList)}
          className="text-xs font-mono font-medium text-[#C66B4E] hover:underline cursor-pointer"
        >
          {showDraftsList ? 'Hide Saved Drafts' : `View Saved Drafts (${savedDrafts.length})`}
        </button>

        {savedDrafts.length > 0 && (
          <button
            type="button"
            onClick={clearLocalStorageData}
            className="text-[11px] font-mono text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
          >
            Clear All Saved Data
          </button>
        )}
      </div>

      {/* Drafts List */}
      {showDraftsList && (
        <div className="space-y-2 pt-2 border-t border-[#D9D5CE]">
          {savedDrafts.length === 0 ? (
            <p className="text-xs text-[#747C66] italic py-2">
              No saved snapshots yet. Use the input above to capture a draft.
            </p>
          ) : (
            savedDrafts.map((draft) => (
              <div
                key={draft.id}
                className="p-3 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE] flex items-center justify-between text-xs font-mono gap-2"
              >
                <div>
                  <div className="font-semibold text-[#171717]">
                    {draft.client.additionalNotes || `Draft #${draft.quoteNumber}`}
                  </div>
                  <div className="text-[10px] text-[#747C66]">
                    {draft.totals.itemCount} items ({draft.totals.totalQuantity} pcs) &middot;{' '}
                    {formatINR(draft.totals.grandTotal, false)} &middot; {formatDate(draft.createdAt)}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => restoreDraft(draft.id)}
                    className="p-1.5 rounded-lg bg-[#EBE8E1] hover:bg-[#C66B4E] hover:text-white transition-colors"
                    title="Restore this draft"
                    aria-label="Restore draft"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    className="p-1.5 rounded-lg bg-[#EBE8E1] text-[#747C66] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete draft"
                    aria-label="Delete draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
