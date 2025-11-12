import { useState, useRef, useCallback, useEffect } from 'react';
import { formatPhoneNumber } from '@/utils/phoneFormat';

export function usePhoneField(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with external changes to formData.phone (e.g., from IP geolocation, stored data)
  useEffect(() => {
    const formatted = formatPhoneNumber(initialValue);
    // Only update if the formatted external value differs from current internal value
    // This prevents infinite loops while still catching external updates
    if (formatted !== value) {
      setValue(formatted);
    }
  }, [initialValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;
    
    // Use shared formatter
    const formatted = formatPhoneNumber(input);
    setValue(formatted);
    
    // Calculate proper cursor position after formatting
    requestAnimationFrame(() => {
      if (inputRef.current && document.activeElement === inputRef.current) {
        // Count digits before cursor in the original input
        const digitsBeforeCursor = input.substring(0, cursorPosition).replace(/\D/g, '').length;
        
        // Calculate where cursor should be in formatted string
        let newPosition = 0;
        let digitCount = 0;
        
        for (let i = 0; i < formatted.length; i++) {
          if (/\d/.test(formatted[i])) {
            digitCount++;
            if (digitCount === digitsBeforeCursor) {
              newPosition = i + 1;
              break;
            }
          }
        }
        
        // If we're at the end, place cursor at the end
        const digitsOnly = input.replace(/\D/g, '');
        if (digitCount < digitsBeforeCursor || digitsBeforeCursor === digitsOnly.substring(0, 10).length) {
          newPosition = formatted.length;
        }
        
        inputRef.current.setSelectionRange(newPosition, newPosition);
      }
    });
  }, []);

  // Handle blur to catch autofilled values
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue(formatted);
  }, []);

  // Programmatic setter that also formats (for autofill detection, step changes, etc.)
  const setFormattedValue = useCallback((val: string) => {
    setValue(formatPhoneNumber(val));
  }, []);

  return {
    value,
    setValue: setFormattedValue,
    handleChange,
    handleBlur,
    inputRef,
  };
}
