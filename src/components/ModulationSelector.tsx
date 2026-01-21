/**
 * Modulation Scheme Selector Component
 *
 * Provides a button group for selecting the digital modulation scheme.
 * Students can switch between BPSK, QPSK, 8-PSK, 16-QAM, and 64-QAM
 * to observe how constellation complexity affects performance.
 *
 * Educational Notes:
 * - Higher-order modulation = more bits per symbol = higher data rate
 * - But also = closer constellation points = higher error probability
 * - Trade-off between spectral efficiency and noise immunity
 *
 * @author Bhaskar Krishnamachari (USC), developed with Claude Code
 */

import React from 'react';
import type { ModulationScheme } from '../types';
import { BITS_PER_SYMBOL } from '../types';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface ModulationSelectorProps {
  /** Currently selected modulation scheme */
  selected: ModulationScheme;
  /** Callback when user selects a different scheme */
  onChange: (scheme: ModulationScheme) => void;
  /** Whether selection is disabled (e.g., during active simulation) */
  disabled?: boolean;
}

// =============================================================================
// MODULATION OPTIONS
// =============================================================================

/**
 * List of available modulation schemes with display labels.
 * Ordered from simplest (lowest data rate) to most complex (highest data rate).
 */
const MODULATION_OPTIONS: Array<{
  scheme: ModulationScheme;
  label: string;
  shortLabel: string;
}> = [
  { scheme: 'BPSK', label: 'BPSK', shortLabel: 'BPSK' },
  { scheme: 'QPSK', label: 'QPSK', shortLabel: 'QPSK' },
  { scheme: '8-PSK', label: '8-PSK', shortLabel: '8PSK' },
  { scheme: '16-QAM', label: '16-QAM', shortLabel: '16Q' },
  { scheme: '64-QAM', label: '64-QAM', shortLabel: '64Q' },
];

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * ModulationSelector Component
 *
 * Renders a button group allowing selection of modulation scheme.
 * Highlights the currently selected scheme and shows bits per symbol.
 */
export const ModulationSelector: React.FC<ModulationSelectorProps> = ({
  selected,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      className="rounded-lg p-4 border transition-colors"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--bg-border)'
      }}
    >
      {/* Section Header */}
      <div className="text-sm mb-3 font-medium" style={{ color: 'var(--text-muted)' }} id="modulation-label">
        MODULATION SCHEME
      </div>

      {/* Button Group */}
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby="modulation-label">
        {MODULATION_OPTIONS.map(({ scheme, label }) => {
          const isSelected = selected === scheme;
          const bitsPerSym = BITS_PER_SYMBOL[scheme];

          return (
            <button
              key={scheme}
              onClick={() => onChange(scheme)}
              disabled={disabled}
              className={`
                px-4 py-2 rounded-md font-medium text-sm
                transition-all duration-150 ease-in-out
                ${isSelected
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800
              `}
              title={`${label} - Transmits ${bitsPerSym} bit${bitsPerSym > 1 ? 's' : ''} per symbol (${Math.pow(2, bitsPerSym)} constellation points). Higher-order modulation = higher data rate but more sensitive to noise.`}
              aria-label={`${label} - ${bitsPerSym} bit${bitsPerSym > 1 ? 's' : ''} per symbol`}
              aria-pressed={isSelected}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Current Selection Info */}
      <div className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }} aria-live="polite">
        <span style={{ color: 'var(--text-secondary)' }}>{selected}</span>
        {' = '}
        <span className="text-cyan-400 font-mono">{BITS_PER_SYMBOL[selected]}</span>
        {' bit'}{BITS_PER_SYMBOL[selected] > 1 ? 's' : ''} per symbol
        {' = '}
        <span className="text-cyan-400 font-mono">{Math.pow(2, BITS_PER_SYMBOL[selected])}</span>
        {' constellation points'}
      </div>
    </div>
  );
};

export default ModulationSelector;
