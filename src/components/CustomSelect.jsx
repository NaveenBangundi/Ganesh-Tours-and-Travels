import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable premium dropdown component to replace standard browser select elements.
 * Provides custom rounded borders, animations, and interactive selection effects.
 */
export default function CustomSelect({ value, onChange, options, name, placeholder = 'Select option', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optVal) => {
    if (onChange) {
      if (name) {
        // Mimic standard HTML select event object for seamless form integration
        onChange({ target: { name, value: optVal } });
      } else {
        onChange(optVal);
      }
    }
    setIsOpen(false);
  };

  // Find label for active value
  const selectedOption = options.find(o => 
    typeof o === 'object' ? o.value === value : o === value
  );
  
  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
    : (value || placeholder);

  return (
    <div className={`custom-select-container ${className}`} ref={containerRef}>
      {/* Dropdown Header Trigger */}
      <button
        type="button"
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select-value">{displayLabel}</span>
        <i className={`fa-solid fa-chevron-down custom-select-arrow ${isOpen ? 'up' : ''}`}></i>
      </button>

      {/* Dropdown Options Popup */}
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((opt, idx) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            const isSelected = optVal === value;

            return (
              <li
                key={idx}
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(optVal)}
              >
                <span>{optLabel}</span>
                {isSelected && <i className="fa-solid fa-check option-check-icon"></i>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
