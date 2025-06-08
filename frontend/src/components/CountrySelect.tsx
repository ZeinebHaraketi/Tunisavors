"use client"

import React, { useState } from "react";

type Country = {
  code: string;
  label: string;
};

const countries: Country[] = [
  { code: "af", label: "Afghanistan" },
  { code: "al", label: "Albania" },
  { code: "dz", label: "Algeria" },
  { code: "ad", label: "Andorra" },
  { code: "ao", label: "Angola" },
  { code: "ag", label: "Antigua and Barbuda" },
  { code: "ar", label: "Argentina" },
  { code: "am", label: "Armenia" },
  { code: "au", label: "Australia" },
  { code: "at", label: "Austria" },
  { code: "az", label: "Azerbaijan" },
  { code: "bs", label: "Bahamas" },
  { code: "bh", label: "Bahrain" },
  { code: "bd", label: "Bangladesh" },
  { code: "bb", label: "Barbados" },
  { code: "by", label: "Belarus" },
  { code: "be", label: "Belgium" },
  { code: "bz", label: "Belize" },
  { code: "bj", label: "Benin" },
  { code: "bt", label: "Bhutan" },
  { code: "bo", label: "Bolivia" },
  { code: "ba", label: "Bosnia and Herzegovina" },
  { code: "bw", label: "Botswana" },
  { code: "br", label: "Brazil" },
  { code: "bn", label: "Brunei" },
  { code: "bg", label: "Bulgaria" },
  { code: "bf", label: "Burkina Faso" },
  { code: "bi", label: "Burundi" },
  { code: "cv", label: "Cabo Verde" },
  { code: "kh", label: "Cambodia" },
  { code: "cm", label: "Cameroon" },
  { code: "ca", label: "Canada" },
  { code: "cf", label: "Central African Republic" },
  { code: "td", label: "Chad" },
  { code: "cl", label: "Chile" },
  { code: "cn", label: "China" },
  { code: "co", label: "Colombia" },
  { code: "km", label: "Comoros" },
  { code: "cg", label: "Congo (Brazzaville)" },
  { code: "cd", label: "Congo (Kinshasa)" },
  { code: "cr", label: "Costa Rica" },
  { code: "ci", label: "Côte d’Ivoire" },
  { code: "hr", label: "Croatia" },
  { code: "cu", label: "Cuba" },
  { code: "cy", label: "Cyprus" },
  { code: "cz", label: "Czechia" },
  { code: "dk", label: "Denmark" },
  { code: "dj", label: "Djibouti" },
  { code: "dm", label: "Dominica" },
  { code: "do", label: "Dominican Republic" },
  { code: "ec", label: "Ecuador" },
  { code: "eg", label: "Egypt" },
  { code: "sv", label: "El Salvador" },
  { code: "gq", label: "Equatorial Guinea" },
  { code: "er", label: "Eritrea" },
  { code: "ee", label: "Estonia" },
  { code: "sz", label: "Eswatini" },
  { code: "et", label: "Ethiopia" },
  { code: "fj", label: "Fiji" },
  { code: "fi", label: "Finland" },
  { code: "fr", label: "France" },
  { code: "ga", label: "Gabon" },
  { code: "gm", label: "Gambia" },
  { code: "ge", label: "Georgia" },
  { code: "de", label: "Germany" },
  { code: "gh", label: "Ghana" },
  { code: "gr", label: "Greece" },
  { code: "gd", label: "Grenada" },
  { code: "gt", label: "Guatemala" },
  { code: "gn", label: "Guinea" },
  { code: "gw", label: "Guinea-Bissau" },
  { code: "gy", label: "Guyana" },
  { code: "ht", label: "Haiti" },
  { code: "hn", label: "Honduras" },
  { code: "hu", label: "Hungary" },
  { code: "is", label: "Iceland" },
  { code: "in", label: "India" },
  { code: "id", label: "Indonesia" },
  { code: "ir", label: "Iran" },
  { code: "iq", label: "Iraq" },
  { code: "ie", label: "Ireland" },
  { code: "il", label: "Israel" },
  { code: "it", label: "Italy" },
  { code: "jm", label: "Jamaica" },
  { code: "jp", label: "Japan" },
  { code: "jo", label: "Jordan" },
  { code: "kz", label: "Kazakhstan" },
  { code: "ke", label: "Kenya" },
  { code: "ki", label: "Kiribati" },
  { code: "kw", label: "Kuwait" },
  { code: "kg", label: "Kyrgyzstan" },
  { code: "la", label: "Laos" },
  { code: "lv", label: "Latvia" },
  { code: "lb", label: "Lebanon" },
  { code: "ls", label: "Lesotho" },
  { code: "lr", label: "Liberia" },
  { code: "ly", label: "Libya" },
  { code: "li", label: "Liechtenstein" },
  { code: "lt", label: "Lithuania" },
  { code: "lu", label: "Luxembourg" },
  { code: "mg", label: "Madagascar" },
  { code: "mw", label: "Malawi" },
  { code: "my", label: "Malaysia" },
  { code: "mv", label: "Maldives" },
  { code: "ml", label: "Mali" },
  { code: "mt", label: "Malta" },
  { code: "mh", label: "Marshall Islands" },
  { code: "mr", label: "Mauritania" },
  { code: "mu", label: "Mauritius" },
  { code: "mx", label: "Mexico" },
  { code: "fm", label: "Micronesia" },
  { code: "md", label: "Moldova" },
  { code: "mc", label: "Monaco" },
  { code: "mn", label: "Mongolia" },
  { code: "me", label: "Montenegro" },
  { code: "ma", label: "Morocco" },
  { code: "mz", label: "Mozambique" },
  { code: "mm", label: "Myanmar" },
  { code: "na", label: "Namibia" },
  { code: "nr", label: "Nauru" },
  { code: "np", label: "Nepal" },
  { code: "nl", label: "Netherlands" },
  { code: "nz", label: "New Zealand" },
  { code: "ni", label: "Nicaragua" },
  { code: "ne", label: "Niger" },
  { code: "ng", label: "Nigeria" },
  { code: "kp", label: "North Korea" },
  { code: "mk", label: "North Macedonia" },
  { code: "no", label: "Norway" },
  { code: "om", label: "Oman" },
  { code: "pk", label: "Pakistan" },
  { code: "pw", label: "Palau" },
  { code: "ps", label: "Palestine State" },
  { code: "pa", label: "Panama" },
  { code: "pg", label: "Papua New Guinea" },
  { code: "py", label: "Paraguay" },
  { code: "pe", label: "Peru" },
  { code: "ph", label: "Philippines" },
  { code: "pl", label: "Poland" },
  { code: "pt", label: "Portugal" },
  { code: "qa", label: "Qatar" },
  { code: "ro", label: "Romania" },
  { code: "ru", label: "Russia" },
  { code: "rw", label: "Rwanda" },
  { code: "kn", label: "Saint Kitts and Nevis" },
  { code: "lc", label: "Saint Lucia" },
  { code: "vc", label: "Saint Vincent and the Grenadines" },
  { code: "ws", label: "Samoa" },
  { code: "sm", label: "San Marino" },
  { code: "st", label: "Sao Tome and Principe" },
  { code: "sa", label: "Saudi Arabia" },
  { code: "sn", label: "Senegal" },
  { code: "rs", label: "Serbia" },
  { code: "sc", label: "Seychelles" },
  { code: "sl", label: "Sierra Leone" },
  { code: "sg", label: "Singapore" },
  { code: "sk", label: "Slovakia" },
  { code: "si", label: "Slovenia" },
  { code: "sb", label: "Solomon Islands" },
  { code: "so", label: "Somalia" },
  { code: "za", label: "South Africa" },
  { code: "kr", label: "South Korea" },
  { code: "ss", label: "South Sudan" },
  { code: "es", label: "Spain" },
  { code: "lk", label: "Sri Lanka" },
  { code: "sd", label: "Sudan" },
  { code: "sr", label: "Suriname" },
  { code: "se", label: "Sweden" },
  { code: "ch", label: "Switzerland" },
  { code: "sy", label: "Syria" },
  { code: "tj", label: "Tajikistan" },
  { code: "tz", label: "Tanzania" },
  { code: "th", label: "Thailand" },
  { code: "tl", label: "Timor-Leste" },
  { code: "tg", label: "Togo" },
  { code: "to", label: "Tonga" },
  { code: "tt", label: "Trinidad and Tobago" },
  { code: "tn", label: "Tunisia" },
  { code: "tr", label: "Turkey" },
  { code: "tm", label: "Turkmenistan" },
  { code: "tv", label: "Tuvalu" },
  { code: "ug", label: "Uganda" },
  { code: "ua", label: "Ukraine" },
  { code: "ae", label: "United Arab Emirates" },
  { code: "gb", label: "United Kingdom" },
  { code: "us", label: "United States" },
  { code: "uy", label: "Uruguay" },
  { code: "uz", label: "Uzbekistan" },
  { code: "vu", label: "Vanuatu" },
  { code: "va", label: "Vatican City" },
  { code: "ve", label: "Venezuela" },
  { code: "vn", label: "Vietnam" },
  { code: "ye", label: "Yemen" },
  { code: "zm", label: "Zambia" },
  { code: "zw", label: "Zimbabwe" },
];

type FlagProps = {
  countryCode: string;
  alt?: string;
  className?: string;
};


type CountrySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function Flag({ countryCode, alt = "", className = "" }: FlagProps) {
  return (
    <img
      src={`/flags/${countryCode.toLowerCase()}.svg`}
      alt={alt}
      className={`w-5 h-4 rounded-sm object-cover inline-block mr-2 ${className}`}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const selectedCountry = countries.find((c) => c.code === value);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        {selectedCountry ? (
          <Flag countryCode={selectedCountry.code} alt={selectedCountry.label} />
        ) : null}
        <span className="text-gray-700 font-medium">
          {selectedCountry ? selectedCountry.label : "Aucun pays sélectionné"}
        </span>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-2 rounded-md cursor-pointer"
      >
        <option value="">Sélectionnez un pays</option>
        {countries.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
