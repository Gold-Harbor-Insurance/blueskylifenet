import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { USState } from "@shared/schema";

const US_STATES: USState[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

interface StateSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
}

const isMobileOrTablet = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
  return isMobile || isTablet;
};

export default function StateSelector({ value, onValueChange }: StateSelectorProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredStates = US_STATES.filter((state) =>
    state.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Auto-populate state based on IP geolocation for mobile/tablet
  useEffect(() => {
    const fetchGeolocation = async () => {
      // Only auto-populate on mobile/tablet and if no value is set
      if (!isMobileOrTablet() || value) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/geolocation');
        const data = await response.json();
        
        if (data.state && data.countryCode === 'US') {
          // Check if the returned state matches our list
          const matchedState = US_STATES.find(
            state => state.toLowerCase() === data.state.toLowerCase()
          );
          
          if (matchedState) {
            setInputValue(matchedState);
            onValueChange(matchedState);
          }
        }
      } catch (error) {
        console.error('Failed to fetch geolocation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeolocation();
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [highlightedIndex]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleStateSelect = (state: USState) => {
    setInputValue(state);
    onValueChange(state);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
      setHighlightedIndex((prev) =>
        prev < filteredStates.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredStates.length) {
        handleStateSelect(filteredStates[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label
        htmlFor="state-input"
        className="block text-xl md:text-2xl font-semibold text-black mb-3"
      >
        State
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id="state-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={isLoading ? "Detecting your location..." : "Type or select your state"}
          disabled={isLoading}
          className="w-full h-14 md:h-16 px-5 pr-14 text-lg md:text-xl font-medium text-black bg-white border-4 border-gray-400 rounded-xl focus:outline-none focus:border-[#3498DB] transition-colors disabled:opacity-60 disabled:cursor-wait"
          data-testid="input-state"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          data-testid="button-state-dropdown"
          aria-label={isOpen ? "Close state list" : "Open state list"}
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 md:w-7 md:h-7 text-black" />
          ) : (
            <ChevronDown className="w-6 h-6 md:w-7 md:h-7 text-black" />
          )}
        </button>

        {isOpen && filteredStates.length > 0 && (
          <ul
            ref={listRef}
            className="absolute z-50 w-full mt-2 max-h-[300px] md:max-h-[400px] overflow-y-auto bg-white border-4 border-gray-400 rounded-xl shadow-2xl"
            data-testid="list-states"
          >
            {filteredStates.map((state, index) => (
              <li
                key={state}
                onClick={() => handleStateSelect(state)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`
                  min-h-[44px] md:min-h-[52px] px-5 py-3 text-lg md:text-xl font-medium text-black cursor-pointer transition-colors
                  ${
                    highlightedIndex === index
                      ? "bg-[#3498DB] text-white"
                      : "hover:bg-blue-100"
                  }
                `}
                data-testid={`state-option-${state.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {state}
              </li>
            ))}
          </ul>
        )}

        {isOpen && filteredStates.length === 0 && (
          <div
            className="absolute z-50 w-full mt-2 p-5 bg-white border-4 border-gray-400 rounded-xl shadow-2xl text-center"
            data-testid="state-no-results"
          >
            <p className="text-lg md:text-xl text-gray-600">No states found</p>
          </div>
        )}
      </div>
    </div>
  );
}
