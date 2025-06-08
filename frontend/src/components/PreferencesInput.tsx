import React from "react";

type PreferencesInputProps = {
  preferences: string[]; // Doit être un tableau
  onChange: (newPrefs: string[]) => void;
};

const ALL_PREFERENCES = [
  "Spicy",
  "Sweet",
  "Savory",
  "Vegan",
  "Gluten-Free",
  "Organic",
  "Traditional",
];

export function PreferencesInput({ preferences = [], onChange }: PreferencesInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
    onChange(selectedOptions);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Culinary Preferences
      </label>
      <select
        multiple
        value={preferences}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        size={ALL_PREFERENCES.length}
      >
        {ALL_PREFERENCES.map(pref => (
          <option key={pref} value={pref}>
            {pref}
          </option>
        ))}
      </select>
    </div>
  );
}
