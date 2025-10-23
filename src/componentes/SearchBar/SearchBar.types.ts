export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export interface QuickSearchOption {
  label: string;
  ingredients: string[];
  icon: string;
}

export interface SuggestionItemProps {
  suggestion: string;
  onClick: (suggestion: string) => void;
}