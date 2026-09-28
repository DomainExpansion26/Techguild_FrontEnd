// [TechGuild Update: 21-09-2026] Client profile onboarding wizard & OpenAPI step-save integration
// [TechGuild Update: 28-09-26] Country dial/currency metadata, phone prefix + budget currency sync, useRef enhancements
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton, TextInput, Stepper } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/services/api";
import { ICON_SIZES } from "@/constants/sizes";
import "@/flows/individual/pages/DashBoard/dashboard.css";
import "./Profile.css";

/**
 * ============================================================================
 * TECHGUILD UNIFIED DESIGN SYSTEM USAGE IN CLIENT PROFILE:
 * 
 * 1. Stepper Component (from "@/Components") -> 3-step progress bar (Agency Info -> Services -> Review)
 * 2. Header Component (from "@/Components")  -> Top workspace bar with Search & Account
 * 3. variant="base" (Profile Main Card)      -> Main custom form & multi-step layout container
 * 4. Step 3 Summary Cards                    -> Review & Submit overview blocks
 * 5. Completion Reward Banner                -> Trust Points milestone notification
 * ============================================================================
 */

const clientStepSlugMap = {
  1: "company-info",
  2: "hiring-preferences",
  3: "review",
  4: "completed"
};

const clientSlugStepMap = {
  "company-info": 1,
  "hiring-preferences": 2,
  "review": 3,
  "completed": 4
};

// [28-09-26] Country + dial code + currency metadata. Selecting a country drives the
// phone dial-code prefix and the Step 2 budget currency.
const isoToFlag = (iso = "") =>
  `${iso || ""}`.toUpperCase().replace(/[^A-Z]/g, "").split("").map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join("");
const flagOf = (entry) => entry?.flag || isoToFlag(entry?.iso);
const COUNTRY_DIAL_LIST = [
  { country: "Afghanistan", dial: "+93", currency: "AFN", symbol: "AFN ", iso: "AF" },
  { country: "Albania", dial: "+355", currency: "ALL", symbol: "ALL ", iso: "AL" },
  { country: "Algeria", dial: "+213", currency: "DZD", symbol: "DZD ", iso: "DZ" },
  { country: "Andorra", dial: "+376", currency: "EUR", symbol: "€", iso: "AD" },
  { country: "Angola", dial: "+244", currency: "AOA", symbol: "AOA ", iso: "AO" },
  { country: "Antigua and Barbuda", dial: "+1684", currency: "XCD", symbol: "EC$ ", iso: "AG" },
  { country: "Argentina", dial: "+54", currency: "ARS", symbol: "AR$ ", flag: "🇦🇷", iso: "AR" },
  { country: "Armenia", dial: "+374", currency: "AMD", symbol: "AMD ", iso: "AM" },
  { country: "Australia", dial: "+61", currency: "AUD", symbol: "A$", flag: "🇦🇺", iso: "AU" },
  { country: "Austria", dial: "+43", currency: "EUR", symbol: "€", iso: "AT" },
  { country: "Azerbaijan", dial: "+994", currency: "AZN", symbol: "AZN ", iso: "AZ" },
  { country: "Bahamas", dial: "+1242", currency: "BSD", symbol: "BSD ", iso: "BS" },
  { country: "Bahrain", dial: "+973", currency: "BHD", symbol: "BHD ", iso: "BH" },
  { country: "Bangladesh", dial: "+880", currency: "BDT", symbol: "BDT ", iso: "BD" },
  { country: "Barbados", dial: "+1246", currency: "BBD", symbol: "BBD ", iso: "BB" },
  { country: "Belarus", dial: "+375", currency: "BYN", symbol: "BYN ", iso: "BY" },
  { country: "Belgium", dial: "+32", currency: "EUR", symbol: "€", iso: "BE" },
  { country: "Belize", dial: "+501", currency: "BZD", symbol: "BZD ", iso: "BZ" },
  { country: "Benin", dial: "+229", currency: "XOF", symbol: "CFA ", iso: "BJ" },
  { country: "Bermuda", dial: "+1441", currency: "BMD", symbol: "BMD ", iso: "BM" },
  { country: "Bhutan", dial: "+975", currency: "BTN", symbol: "BTN ", iso: "BT" },
  { country: "Bolivia", dial: "+591", currency: "BOB", symbol: "BOB ", iso: "BO" },
  { country: "Bosnia and Herzegovina", dial: "+387", currency: "BAM", symbol: "BAM ", iso: "BA" },
  { country: "Botswana", dial: "+267", currency: "BWP", symbol: "BWP ", iso: "BW" },
  { country: "Brazil", dial: "+55", currency: "BRL", symbol: "R$", flag: "🇧🇷", iso: "BR" },
  { country: "Brunei", dial: "+673", currency: "BND", symbol: "BND ", iso: "BN" },
  { country: "Bulgaria", dial: "+359", currency: "BGN", symbol: "BGN ", iso: "BG" },
  { country: "Burkina Faso", dial: "+226", currency: "XOF", symbol: "CFA ", iso: "BF" },
  { country: "Burundi", dial: "+257", currency: "BIF", symbol: "BIF ", iso: "BI" },
  { country: "Cambodia", dial: "+855", currency: "KHR", symbol: "KHR ", iso: "KH" },
  { country: "Cameroon", dial: "+237", currency: "XAF", symbol: "FCFA ", iso: "CM" },
  { country: "Canada", dial: "+1", currency: "CAD", symbol: "C$", flag: "🇨🇦", iso: "CA" },
  { country: "Cape Verde", dial: "+238", currency: "CVE", symbol: "CVE ", iso: "CV" },
  { country: "Central African Republic", dial: "+236", currency: "XAF", symbol: "FCFA ", iso: "CF" },
  { country: "Chad", dial: "+235", currency: "XAF", symbol: "FCFA ", iso: "TD" },
  { country: "Chile", dial: "+56", currency: "CLP", symbol: "CLP ", iso: "CL" },
  { country: "China", dial: "+86", currency: "CNY", symbol: "¥", flag: "🇨🇳", iso: "CN" },
  { country: "Colombia", dial: "+57", currency: "COP", symbol: "COP ", iso: "CO" },
  { country: "Comoros", dial: "+269", currency: "KMF", symbol: "KMF ", iso: "KM" },
  { country: "Congo", dial: "+242", currency: "XAF", symbol: "FCFA ", iso: "CG" },
  { country: "DR Congo", dial: "+243", currency: "CDF", symbol: "CDF ", iso: "CD" },
  { country: "Costa Rica", dial: "+506", currency: "CRC", symbol: "CRC ", iso: "CR" },
  { country: "Croatia", dial: "+385", currency: "EUR", symbol: "€", iso: "HR" },
  { country: "Cuba", dial: "+53", currency: "CUP", symbol: "CUP ", iso: "CU" },
  { country: "Cyprus", dial: "+357", currency: "EUR", symbol: "€", iso: "CY" },
  { country: "Czechia", dial: "+420", currency: "CZK", symbol: "CZK ", iso: "CZ" },
  { country: "Denmark", dial: "+45", currency: "DKK", symbol: "kr ", iso: "DK" },
  { country: "Djibouti", dial: "+253", currency: "DJF", symbol: "DJF ", iso: "DJ" },
  { country: "Dominica", dial: "+1767", currency: "XCD", symbol: "EC$ ", iso: "DM" },
  { country: "Dominican Republic", dial: "+1809", currency: "DOP", symbol: "DOP ", iso: "DO" },
  { country: "Ecuador", dial: "+593", currency: "USD", symbol: "$", iso: "EC" },
  { country: "Egypt", dial: "+20", currency: "EGP", symbol: "E£ ", flag: "🇪🇬", iso: "EG" },
  { country: "El Salvador", dial: "+503", currency: "USD", symbol: "$", iso: "SV" },
  { country: "Equatorial Guinea", dial: "+240", currency: "XAF", symbol: "FCFA ", iso: "GQ" },
  { country: "Eritrea", dial: "+291", currency: "ERN", symbol: "ERN ", iso: "ER" },
  { country: "Estonia", dial: "+372", currency: "EUR", symbol: "€", iso: "EE" },
  { country: "Eswatini", dial: "+268", currency: "SZL", symbol: "SZL ", iso: "SZ" },
  { country: "Ethiopia", dial: "+251", currency: "ETB", symbol: "ETB ", iso: "ET" },
  { country: "Fiji", dial: "+679", currency: "FJD", symbol: "FJD ", iso: "FJ" },
  { country: "Finland", dial: "+358", currency: "EUR", symbol: "€", iso: "FI" },
  { country: "France", dial: "+33", currency: "EUR", symbol: "€", flag: "🇫🇷", iso: "FR" },
  { country: "Gabon", dial: "+241", currency: "XAF", symbol: "FCFA ", iso: "GA" },
  { country: "Gambia", dial: "+220", currency: "GMD", symbol: "GMD ", iso: "GM" },
  { country: "Georgia", dial: "+995", currency: "GEL", symbol: "GEL ", iso: "GE" },
  { country: "Germany", dial: "+49", currency: "EUR", symbol: "€", flag: "🇩🇪", iso: "DE" },
  { country: "Ghana", dial: "+233", currency: "GHS", symbol: "GHS ", iso: "GH" },
  { country: "Greece", dial: "+30", currency: "EUR", symbol: "€", iso: "GR" },
  { country: "Greenland", dial: "+299", currency: "DKK", symbol: "kr ", iso: "GL" },
  { country: "Grenada", dial: "+1473", currency: "XCD", symbol: "EC$ ", iso: "GD" },
  { country: "Guatemala", dial: "+502", currency: "GTQ", symbol: "GTQ ", iso: "GT" },
  { country: "Guinea", dial: "+224", currency: "GNF", symbol: "GNF ", iso: "GN" },
  { country: "Guinea-Bissau", dial: "+245", currency: "XOF", symbol: "CFA ", iso: "GW" },
  { country: "Guyana", dial: "+592", currency: "GYD", symbol: "GYD ", iso: "GY" },
  { country: "Haiti", dial: "+509", currency: "HTG", symbol: "HTG ", iso: "HT" },
  { country: "Honduras", dial: "+504", currency: "HNL", symbol: "HNL ", iso: "HN" },
  { country: "Hungary", dial: "+36", currency: "HUF", symbol: "HUF ", iso: "HU" },
  { country: "Iceland", dial: "+354", currency: "ISK", symbol: "ISK ", iso: "IS" },
  { country: "India", dial: "+91", currency: "INR", symbol: "₹", flag: "🇮🇳", iso: "IN" },
  { country: "Indonesia", dial: "+62", currency: "IDR", symbol: "Rp", flag: "🇮🇩", iso: "ID" },
  { country: "Iran", dial: "+98", currency: "IRR", symbol: "IRR ", iso: "IR" },
  { country: "Iraq", dial: "+964", currency: "IQD", symbol: "IQD ", iso: "IQ" },
  { country: "Ireland", dial: "+353", currency: "EUR", symbol: "€", flag: "🇮🇪", iso: "IE" },
  { country: "Israel", dial: "+972", currency: "ILS", symbol: "₪", flag: "🇮🇱", iso: "IL" },
  { country: "Italy", dial: "+39", currency: "EUR", symbol: "€", flag: "🇮🇹", iso: "IT" },
  { country: "Ivory Coast", dial: "+225", currency: "XOF", symbol: "CFA ", iso: "CI" },
  { country: "Jamaica", dial: "+1876", currency: "JMD", symbol: "JMD ", iso: "JM" },
  { country: "Japan", dial: "+81", currency: "JPY", symbol: "¥", flag: "🇯🇵", iso: "JP" },
  { country: "Jordan", dial: "+962", currency: "JOD", symbol: "JOD ", iso: "JO" },
  { country: "Kazakhstan", dial: "+7", currency: "KZT", symbol: "KZT ", iso: "KZ" },
  { country: "Kenya", dial: "+254", currency: "KES", symbol: "KSh ", flag: "🇰🇪", iso: "KE" },
  { country: "Kiribati", dial: "+686", currency: "AUD", symbol: "A$", iso: "KI" },
  { country: "Kosovo", dial: "+383", currency: "EUR", symbol: "€", iso: "XK" },
  { country: "Kuwait", dial: "+965", currency: "KWD", symbol: "KWD ", iso: "KW" },
  { country: "Kyrgyzstan", dial: "+996", currency: "KGS", symbol: "KGS ", iso: "KG" },
  { country: "Laos", dial: "+856", currency: "LAK", symbol: "LAK ", iso: "LA" },
  { country: "Latvia", dial: "+371", currency: "EUR", symbol: "€", iso: "LV" },
  { country: "Lebanon", dial: "+961", currency: "LBP", symbol: "LBP ", iso: "LB" },
  { country: "Lesotho", dial: "+266", currency: "LSL", symbol: "LSL ", iso: "LS" },
  { country: "Liberia", dial: "+231", currency: "LRD", symbol: "LRD ", iso: "LR" },
  { country: "Libya", dial: "+218", currency: "LYD", symbol: "LYD ", iso: "LY" },
  { country: "Liechtenstein", dial: "+423", currency: "CHF", symbol: "CHF ", iso: "LI" },
  { country: "Lithuania", dial: "+370", currency: "EUR", symbol: "€", iso: "LT" },
  { country: "Luxembourg", dial: "+352", currency: "EUR", symbol: "€", iso: "LU" },
  { country: "Madagascar", dial: "+261", currency: "MGA", symbol: "MGA ", iso: "MG" },
  { country: "Malawi", dial: "+265", currency: "MWK", symbol: "MWK ", iso: "MW" },
  { country: "Malaysia", dial: "+60", currency: "MYR", symbol: "RM", flag: "🇲🇾", iso: "MY" },
  { country: "Maldives", dial: "+960", currency: "MVR", symbol: "MVR ", iso: "MV" },
  { country: "Mali", dial: "+223", currency: "XOF", symbol: "CFA ", iso: "ML" },
  { country: "Malta", dial: "+356", currency: "EUR", symbol: "€", iso: "MT" },
  { country: "Marshall Islands", dial: "+692", currency: "USD", symbol: "$", iso: "MH" },
  { country: "Mauritania", dial: "+222", currency: "MRU", symbol: "MRU ", iso: "MR" },
  { country: "Mauritius", dial: "+230", currency: "MUR", symbol: "MUR ", iso: "MU" },
  { country: "Mexico", dial: "+52", currency: "MXN", symbol: "M$", flag: "🇲🇽", iso: "MX" },
  { country: "Micronesia", dial: "+691", currency: "USD", symbol: "$", iso: "FM" },
  { country: "Moldova", dial: "+373", currency: "MDL", symbol: "MDL ", iso: "MD" },
  { country: "Monaco", dial: "+377", currency: "EUR", symbol: "€", iso: "MC" },
  { country: "Mongolia", dial: "+976", currency: "MNT", symbol: "MNT ", iso: "MN" },
  { country: "Montenegro", dial: "+382", currency: "EUR", symbol: "€", iso: "ME" },
  { country: "Morocco", dial: "+212", currency: "MAD", symbol: "MAD ", iso: "MA" },
  { country: "Mozambique", dial: "+258", currency: "MZN", symbol: "MZN ", iso: "MZ" },
  { country: "Myanmar", dial: "+95", currency: "MMK", symbol: "MMK ", iso: "MM" },
  { country: "Namibia", dial: "+264", currency: "NAD", symbol: "NAD ", iso: "NA" },
  { country: "Nauru", dial: "+674", currency: "AUD", symbol: "A$", iso: "NR" },
  { country: "Nepal", dial: "+977", currency: "NPR", symbol: "NPR ", iso: "NP" },
  { country: "Netherlands", dial: "+31", currency: "EUR", symbol: "€", flag: "🇳🇱", iso: "NL" },
  { country: "New Zealand", dial: "+64", currency: "NZD", symbol: "NZ$", flag: "🇳🇿", iso: "NZ" },
  { country: "Nicaragua", dial: "+505", currency: "NIO", symbol: "NIO ", iso: "NI" },
  { country: "Niger", dial: "+227", currency: "XOF", symbol: "CFA ", iso: "NE" },
  { country: "Nigeria", dial: "+234", currency: "NGN", symbol: "₦", flag: "🇳🇬", iso: "NG" },
  { country: "North Korea", dial: "+850", currency: "KPW", symbol: "KPW ", iso: "KP" },
  { country: "North Macedonia", dial: "+389", currency: "MKD", symbol: "MKD ", iso: "MK" },
  { country: "Norway", dial: "+47", currency: "NOK", symbol: "kr ", flag: "🇳🇴", iso: "NO" },
  { country: "Oman", dial: "+968", currency: "OMR", symbol: "OMR ", iso: "OM" },
  { country: "Pakistan", dial: "+92", currency: "PKR", symbol: "PKR ", iso: "PK" },
  { country: "Palau", dial: "+680", currency: "USD", symbol: "$", iso: "PW" },
  { country: "Palestine", dial: "+970", currency: "ILS", symbol: "₪", iso: "PS" },
  { country: "Panama", dial: "+507", currency: "PAB", symbol: "PAB ", iso: "PA" },
  { country: "Papua New Guinea", dial: "+675", currency: "PGK", symbol: "PGK ", iso: "PG" },
  { country: "Paraguay", dial: "+595", currency: "PYG", symbol: "PYG ", iso: "PY" },
  { country: "Peru", dial: "+51", currency: "PEN", symbol: "PEN ", iso: "PE" },
  { country: "Philippines", dial: "+63", currency: "PHP", symbol: "₱", flag: "🇵🇭", iso: "PH" },
  { country: "Poland", dial: "+48", currency: "PLN", symbol: "zł ", flag: "🇵🇱", iso: "PL" },
  { country: "Portugal", dial: "+351", currency: "EUR", symbol: "€", iso: "PT" },
  { country: "Puerto Rico", dial: "+1787", currency: "USD", symbol: "$", iso: "PR" },
  { country: "Qatar", dial: "+974", currency: "QAR", symbol: "QAR ", iso: "QA" },
  { country: "Romania", dial: "+40", currency: "RON", symbol: "RON ", iso: "RO" },
  { country: "Russia", dial: "+7", currency: "RUB", symbol: "₽", flag: "🇷🇺", iso: "RU" },
  { country: "Rwanda", dial: "+250", currency: "RWF", symbol: "RWF ", iso: "RW" },
  { country: "Saint Kitts and Nevis", dial: "+1869", currency: "XCD", symbol: "EC$ ", iso: "KN" },
  { country: "Saint Lucia", dial: "+1758", currency: "XCD", symbol: "EC$ ", iso: "LC" },
  { country: "Saint Vincent and the Grenadines", dial: "+1784", currency: "XCD", symbol: "EC$ ", iso: "VC" },
  { country: "Samoa", dial: "+685", currency: "WST", symbol: "WST ", iso: "WS" },
  { country: "San Marino", dial: "+378", currency: "EUR", symbol: "€", iso: "SM" },
  { country: "Sao Tome and Principe", dial: "+239", currency: "STN", symbol: "STN ", iso: "ST" },
  { country: "Saudi Arabia", dial: "+966", currency: "SAR", symbol: "SAR ", flag: "🇸🇦", iso: "SA" },
  { country: "Senegal", dial: "+221", currency: "XOF", symbol: "CFA ", iso: "SN" },
  { country: "Serbia", dial: "+381", currency: "RSD", symbol: "RSD ", iso: "RS" },
  { country: "Seychelles", dial: "+248", currency: "SCR", symbol: "SCR ", iso: "SC" },
  { country: "Sierra Leone", dial: "+232", currency: "SLE", symbol: "SLE ", iso: "SL" },
  { country: "Singapore", dial: "+65", currency: "SGD", symbol: "S$", flag: "🇸🇬", iso: "SG" },
  { country: "Slovakia", dial: "+421", currency: "EUR", symbol: "€", iso: "SK" },
  { country: "Slovenia", dial: "+386", currency: "EUR", symbol: "€", iso: "SI" },
  { country: "Solomon Islands", dial: "+677", currency: "SBD", symbol: "SBD ", iso: "SB" },
  { country: "Somalia", dial: "+252", currency: "SOS", symbol: "SOS ", iso: "SO" },
  { country: "South Africa", dial: "+27", currency: "ZAR", symbol: "R ", flag: "🇿🇦", iso: "ZA" },
  { country: "South Korea", dial: "+82", currency: "KRW", symbol: "₩", flag: "🇰🇷", iso: "KR" },
  { country: "South Sudan", dial: "+211", currency: "SSP", symbol: "SSP ", iso: "SS" },
  { country: "Spain", dial: "+34", currency: "EUR", symbol: "€", flag: "🇪🇸", iso: "ES" },
  { country: "Sri Lanka", dial: "+94", currency: "LKR", symbol: "LKR ", iso: "LK" },
  { country: "Sudan", dial: "+249", currency: "SDG", symbol: "SDG ", iso: "SD" },
  { country: "Suriname", dial: "+597", currency: "SRD", symbol: "SRD ", iso: "SR" },
  { country: "Sweden", dial: "+46", currency: "SEK", symbol: "kr ", flag: "🇸🇪", iso: "SE" },
  { country: "Switzerland", dial: "+41", currency: "CHF", symbol: "CHF ", flag: "🇨🇭", iso: "CH" },
  { country: "Syria", dial: "+963", currency: "SYP", symbol: "SYP ", iso: "SY" },
  { country: "Taiwan", dial: "+886", currency: "TWD", symbol: "TWD ", iso: "TW" },
  { country: "Tajikistan", dial: "+992", currency: "TJS", symbol: "TJS ", iso: "TJ" },
  { country: "Tanzania", dial: "+255", currency: "TZS", symbol: "TZS ", iso: "TZ" },
  { country: "Thailand", dial: "+66", currency: "THB", symbol: "฿", flag: "🇹🇭", iso: "TH" },
  { country: "Timor-Leste", dial: "+670", currency: "USD", symbol: "$", iso: "TL" },
  { country: "Togo", dial: "+228", currency: "XOF", symbol: "CFA ", iso: "TG" },
  { country: "Tonga", dial: "+676", currency: "TOP", symbol: "TOP ", iso: "TO" },
  { country: "Trinidad and Tobago", dial: "+1868", currency: "TTD", symbol: "TTD ", iso: "TT" },
  { country: "Tunisia", dial: "+216", currency: "TND", symbol: "TND ", iso: "TN" },
  { country: "Turkey", dial: "+90", currency: "TRY", symbol: "₺", flag: "🇹🇷", iso: "TR" },
  { country: "Turkmenistan", dial: "+993", currency: "TMT", symbol: "TMT ", iso: "TM" },
  { country: "Tuvalu", dial: "+688", currency: "AUD", symbol: "A$", iso: "TV" },
  { country: "Uganda", dial: "+256", currency: "UGX", symbol: "UGX ", iso: "UG" },
  { country: "Ukraine", dial: "+380", currency: "UAH", symbol: "₴", flag: "🇺🇦", iso: "UA" },
  { country: "United Arab Emirates", dial: "+971", currency: "AED", symbol: "AED ", flag: "🇦🇪", iso: "AE" },
  { country: "United Kingdom", dial: "+44", currency: "GBP", symbol: "£", flag: "🇬🇧", iso: "GB" },
  { country: "United States", dial: "+1", currency: "USD", symbol: "$", flag: "🇺🇸", iso: "US" },
  { country: "Uruguay", dial: "+598", currency: "UYU", symbol: "UYU ", iso: "UY" },
  { country: "Uzbekistan", dial: "+998", currency: "UZS", symbol: "UZS ", iso: "UZ" },
  { country: "Vanuatu", dial: "+678", currency: "VUV", symbol: "VUV ", iso: "VU" },
  { country: "Vatican City", dial: "+379", currency: "EUR", symbol: "€", iso: "VA" },
  { country: "Venezuela", dial: "+58", currency: "VES", symbol: "VES ", iso: "VE" },
  { country: "Vietnam", dial: "+84", currency: "VND", symbol: "₫", flag: "🇻🇳", iso: "VN" },
  { country: "Yemen", dial: "+967", currency: "YER", symbol: "YER ", iso: "YE" },
  { country: "Zambia", dial: "+260", currency: "ZMW", symbol: "ZMW ", iso: "ZM" },
  { country: "Zimbabwe", dial: "+263", currency: "ZWL", symbol: "ZWL ", iso: "ZW" },
  { country: "Aland Islands", dial: "+358", currency: "EUR", symbol: "€", iso: "AX" },
  { country: "American Samoa", dial: "+1684", currency: "USD", symbol: "$", iso: "AS" },
  { country: "Anguilla", dial: "+1264", currency: "XCD", symbol: "EC$ ", iso: "AI" },
  { country: "Aruba", dial: "+297", currency: "AWG", symbol: "AWG ", iso: "AW" },
  { country: "Bonaire", dial: "+599", currency: "USD", symbol: "$", iso: "BQ" },
  { country: "Bouvet Island", dial: "+47", currency: "NOK", symbol: "kr ", iso: "BV" },
  { country: "British Indian Ocean Territory", dial: "+246", currency: "USD", symbol: "$", iso: "IO" },
  { country: "British Virgin Islands", dial: "+1284", currency: "USD", symbol: "$", iso: "VG" },
  { country: "Cayman Islands", dial: "+1345", currency: "KYD", symbol: "KYD ", iso: "KY" },
  { country: "Christmas Island", dial: "+61", currency: "AUD", symbol: "A$", iso: "CX" },
  { country: "Cocos Islands", dial: "+61", currency: "AUD", symbol: "A$", iso: "CC" },
  { country: "Cook Islands", dial: "+682", currency: "NZD", symbol: "NZ$", iso: "CK" },
  { country: "Curacao", dial: "+599", currency: "ANG", symbol: "ANG ", iso: "CW" },
  { country: "Falkland Islands", dial: "+500", currency: "FKP", symbol: "FKP ", iso: "FK" },
  { country: "Faroe Islands", dial: "+298", currency: "DKK", symbol: "kr ", iso: "FO" },
  { country: "French Guiana", dial: "+594", currency: "EUR", symbol: "€", iso: "GF" },
  { country: "French Polynesia", dial: "+689", currency: "XPF", symbol: "XPF ", iso: "PF" },
  { country: "French Southern Territories", dial: "+262", currency: "EUR", symbol: "€", iso: "TF" },
  { country: "Gibraltar", dial: "+350", currency: "GIP", symbol: "GIP ", iso: "GI" },
  { country: "Guadeloupe", dial: "+590", currency: "EUR", symbol: "€", iso: "GP" },
  { country: "Guam", dial: "+1671", currency: "USD", symbol: "$", iso: "GU" },
  { country: "Guernsey", dial: "+44", currency: "GBP", symbol: "£", iso: "GG" },
  { country: "Heard Island", dial: "+672", currency: "AUD", symbol: "A$", iso: "HM" },
  { country: "Hong Kong", dial: "+852", currency: "HKD", symbol: "HK$", iso: "HK" },
  { country: "Isle of Man", dial: "+44", currency: "GBP", symbol: "£", iso: "IM" },
  { country: "Jersey", dial: "+44", currency: "GBP", symbol: "£", iso: "JE" },
  { country: "Macau", dial: "+853", currency: "MOP", symbol: "MOP ", iso: "MO" },
  { country: "Martinique", dial: "+596", currency: "EUR", symbol: "€", iso: "MQ" },
  { country: "Mayotte", dial: "+262", currency: "EUR", symbol: "€", iso: "YT" },
  { country: "Montserrat", dial: "+1664", currency: "XCD", symbol: "EC$ ", iso: "MS" },
  { country: "New Caledonia", dial: "+687", currency: "XPF", symbol: "XPF ", iso: "NC" },
  { country: "Niue", dial: "+683", currency: "NZD", symbol: "NZ$", iso: "NU" },
  { country: "Norfolk Island", dial: "+672", currency: "AUD", symbol: "A$", iso: "NF" },
  { country: "Northern Mariana Islands", dial: "+1670", currency: "USD", symbol: "$", iso: "MP" },
  { country: "Pitcairn", dial: "+64", currency: "NZD", symbol: "NZ$", iso: "PN" },
  { country: "Reunion", dial: "+262", currency: "EUR", symbol: "€", iso: "RE" },
  { country: "Saint Barthelemy", dial: "+590", currency: "EUR", symbol: "€", iso: "BL" },
  { country: "Saint Helena", dial: "+290", currency: "SHP", symbol: "SHP ", iso: "SH" },
  { country: "Saint Martin", dial: "+590", currency: "EUR", symbol: "€", iso: "MF" },
  { country: "Saint Pierre and Miquelon", dial: "+508", currency: "EUR", symbol: "€", iso: "PM" },
  { country: "Sint Maarten", dial: "+1721", currency: "ANG", symbol: "ANG ", iso: "SX" },
  { country: "South Georgia", dial: "+500", currency: "GBP", symbol: "£", iso: "GS" },
  { country: "Svalbard", dial: "+47", currency: "NOK", symbol: "kr ", iso: "SJ" },
  { country: "Tokelau", dial: "+690", currency: "NZD", symbol: "NZ$", iso: "TK" },
  { country: "Turks and Caicos", dial: "+1649", currency: "USD", symbol: "$", iso: "TC" },
  { country: "US Minor Outlying Islands", dial: "+1", currency: "USD", symbol: "$", iso: "UM" },
  { country: "US Virgin Islands", dial: "+1340", currency: "USD", symbol: "$", iso: "VI" },
  { country: "Wallis and Futuna", dial: "+681", currency: "XPF", symbol: "XPF ", iso: "WF" },
  { country: "Western Sahara", dial: "+212", currency: "MAD", symbol: "MAD ", iso: "EH" },
];

const DEFAULT_COUNTRY_META = { country: "India", dial: "+91", currency: "USD", symbol: "$", iso: "IN", flag: "🇮🇳" };

const getCountryMeta = (countryName) =>
  COUNTRY_DIAL_LIST.find((c) => c.country === countryName) || null;

// Budget ranges per currency. Option VALUES stay stable slugs so the API
// payload never changes shape — only the displayed labels carry currency.
const BUDGET_OPTIONS_BY_CURRENCY = {
  USD: [
    { value: "under-1k", label: "Under $1,000" },
    { value: "1k-5k", label: "$1,000 - $5,000" },
    { value: "5k-10k", label: "$5,000 - $10,000" },
    { value: "10k-plus", label: "$10,000+" },
  ],
  INR: [
    { value: "under-1k", label: "Under ₹10,000" },
    { value: "1k-5k", label: "₹10,000 - ₹50,000" },
    { value: "5k-10k", label: "₹50,000 - ₹2,00,000" },
    { value: "10k-plus", label: "₹2,00,000+" },
  ],
  EUR: [
    { value: "under-1k", label: "Under €1,000" },
    { value: "1k-5k", label: "€1,000 - €5,000" },
    { value: "5k-10k", label: "€5,000 - €10,000" },
    { value: "10k-plus", label: "€10,000+" },
  ],
  GBP: [
    { value: "under-1k", label: "Under £1,000" },
    { value: "1k-5k", label: "£1,000 - £5,000" },
    { value: "5k-10k", label: "£5,000 - £10,000" },
    { value: "10k-plus", label: "£10,000+" },
  ],
  AED: [
    { value: "under-1k", label: "Under AED 4,000" },
    { value: "1k-5k", label: "AED 4,000 - 18,000" },
    { value: "5k-10k", label: "AED 18,000 - 36,000" },
    { value: "10k-plus", label: "AED 36,000+" },
  ],
  SGD: [
    { value: "under-1k", label: "Under S$1,500" },
    { value: "1k-5k", label: "S$1,500 - S$7,000" },
    { value: "5k-10k", label: "S$7,000 - S$14,000" },
    { value: "10k-plus", label: "S$14,000+" },
  ],
  AUD: [
    { value: "under-1k", label: "Under A$1,500" },
    { value: "1k-5k", label: "A$1,500 - A$7,000" },
    { value: "5k-10k", label: "A$7,000 - A$14,000" },
    { value: "10k-plus", label: "A$14,000+" },
  ],
  CAD: [
    { value: "under-1k", label: "Under C$1,500" },
    { value: "1k-5k", label: "C$1,500 - C$7,000" },
    { value: "5k-10k", label: "C$7,000 - C$14,000" },
    { value: "10k-plus", label: "C$14,000+" },
  ],
};

// Split a stored full phone ("+919876543210") into dial prefix + national digits.
const splitStoredPhone = (full) => {
  const cleaned = `${full || ""}`.trim();
  if (!cleaned) return { dial: DEFAULT_COUNTRY_META.dial, national: "" };
  const dials = [...new Set(COUNTRY_DIAL_LIST.map((c) => c.dial))].sort((a, b) => b.length - a.length);
  const hit = dials.find((d) => cleaned.replace(/[\s-]/g, "").startsWith(d));
  if (!hit) return { dial: DEFAULT_COUNTRY_META.dial, national: cleaned.replace(/\D/g, "") };
  return {
    dial: hit,
    national: cleaned.replace(/[\s-]/g, "").slice(hit.length).replace(/\D/g, ""),
  };
};

export default function ClientProfile() {
  const navigate = useNavigate();
  const { step } = useParams();
  const { user } = useAuth();

  // Derive current step and completion state directly from URL params
  const currentStep = clientSlugStepMap[step] || 1;
  const isSubmitted = step === "completed";

  const [profile, setProfile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Step 1 Form States
  const [clientName, setClientName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  // Required by CreateClientProfileRequest (all keys required, no extras)
  // [28-09-26] `phone` holds national digits only; `countryCode` holds the dial prefix.
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_META.dial);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState("");
  const [step1Errors, setStep1Errors] = useState({});

  // [28-09-26] Currency follows the selected country (e.g. India -> INR ₹).
  const countryMeta = getCountryMeta(country);
  const activeCurrency = countryMeta?.currency || DEFAULT_COUNTRY_META.currency;
  const activeSymbol = countryMeta?.symbol || DEFAULT_COUNTRY_META.symbol;
  const activeFlag = (countryMeta && flagOf(countryMeta)) || "🇮🇳";

  // [28-09-26] Intl-tel-input style flag picker (single phone box).
  const [phonePanelOpen, setPhonePanelOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const phoneBoxRef = useRef(null);

  useEffect(() => {
    if (!phonePanelOpen) return;
    const onDown = (e) => {
      if (phoneBoxRef.current && !phoneBoxRef.current.contains(e.target)) {
        setPhonePanelOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [phonePanelOpen]);

  const filteredCountries = COUNTRY_DIAL_LIST.filter((c) => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return true;
    return (
      c.country.toLowerCase().includes(q) ||
      c.dial.includes(q) ||
      (c.iso || "").toLowerCase().includes(q)
    );
  });

  const selectPhoneCountry = (meta) => {
    handleCountryChange(meta.country);
    setPhonePanelOpen(false);
    setCountrySearch("");
  };
  // Currencies with hand-tuned ranges use them; every other currency gets a
  // generic range built from its own symbol so budget labels always match.
  const budgetOptions = BUDGET_OPTIONS_BY_CURRENCY[activeCurrency] || [
    { value: "under-1k", label: `Under ${activeSymbol}1,000` },
    { value: "1k-5k", label: `${activeSymbol}1,000 - ${activeSymbol}5,000` },
    { value: "5k-10k", label: `${activeSymbol}5,000 - ${activeSymbol}10,000` },
    { value: "10k-plus", label: `${activeSymbol}10,000+` },
  ];
  const fullPhone = `${countryCode}${(phone || "").replace(/\D/g, "")}`;

  // Step 2 Form States
  const [projectTypes, setProjectTypes] = useState("");
  const [budget, setBudget] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [step2Errors, setStep2Errors] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        // get-my-profile: { account_type, individual, client, agency }
        const profRes = await profileApi.getMyProfile();
        const p = profRes?.client || {};
        setProfile(p);

        const initialName =
          p?.company_name ||
          user?.company_name ||
          user?.name ||
          (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) ||
          "";

        if (initialName) setClientName(initialName);
        if (p?.industry) setIndustry(p.industry);
        if (p?.website_url || p?.website) setWebsite(p.website_url || p.website);
        if (p?.team_size || p?.company_size || p?.size) setTeamSize(p.team_size || p.company_size || p.size);
        if (p?.budget_range || p?.budget) setBudget(p.budget_range || p.budget);
        if (p?.project_types) {
          const pt = Array.isArray(p.project_types) ? p.project_types[0] : p.project_types;
          setProjectTypes(pt || "");
        }
        // Spec-required contact + location fields
        if (p?.phone) {
          const split = splitStoredPhone(p.phone);
          setCountryCode(split.dial);
          setPhone(split.national);
        }
        if (p?.country) {
          setCountry(p.country);
          const meta = getCountryMeta(p.country);
          if (meta) setCountryCode(meta.dial);
        }
        if (p?.city) setCity(p.city);
        if (p?.timezone) setTimezone(p.timezone);
        if (p?.logo_url) setLogoUrl(p.logo_url);
      } catch (err) {
        console.warn("Failed to pre-fill client profile:", err);
      }
    }
    loadData();
  }, [user]);

  const goToStep = (stepNum) => {
    const slug = clientStepSlugMap[stepNum] || "company-info";
    navigate(`/client-profile/${slug}`);
  };

  const steps = [
    { number: 1, label: "Agency Information" },
    { number: 2, label: "Services" },
    { number: 3, label: "Review and Submit" },
  ];

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      setStep1Errors((prev) => ({ ...prev, logoFile: "" }));
    }
  };

  const phoneDigits = (phone || "").replace(/\D/g, "").slice(0, 10);
  const isPhoneValid = (v) => {
    const digits = `${v || ""}`.replace(/\D/g, "").slice(0, 10);
    return digits.length === 10;
  };
  const isWebsiteValid = (v) => {
    const trimmed = `${v || ""}`.trim();
    if (!trimmed) return true; // Website is optional
    return /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/.test(trimmed);
  };

  const isStep1Complete =
    clientName.trim() !== "" &&
    /^\+\d{1,4}$/.test(countryCode.trim()) &&
    isPhoneValid(phone) &&
    industry !== "" &&
    isWebsiteValid(website) &&
    country.trim() !== "" &&
    city.trim() !== "" &&
    timezone !== "";
  const isStep2Complete = projectTypes !== "" && budget !== "" && teamSize !== "";

  const handleCancelEdit = () => {
    setIsEditMode(false);
    goToStep(3);
  };

  // Tracks whether Continue was pressed — drives the "Complete the required
  // information" summary banner (reference image #13).
  const [step1Tried, setStep1Tried] = useState(false);
  const [step2Tried, setStep2Tried] = useState(false);

  const isDialValid = (v) => /^\+\d{1,4}$/.test(`${v || ""}`.trim());

  // Live required-field status for the summary banner.
  const step1RequiredStatus = [
    { key: "clientName", label: "Client Name", done: clientName.trim() !== "" },
    { key: "phone", label: "Phone Number", done: isPhoneValid(phone) && isDialValid(countryCode) },
    { key: "industry", label: "Industry", done: industry !== "" },
    { key: "country", label: "Country", done: country.trim() !== "" },
    { key: "city", label: "City", done: city.trim() !== "" },
    { key: "timezone", label: "Time Zone", done: timezone !== "" },
  ];
  const step2RequiredStatus = [
    { key: "projectTypes", label: "Project Types", done: projectTypes !== "" },
    { key: "budget", label: "Budget", done: budget !== "" },
    { key: "teamSize", label: "Team Size", done: teamSize !== "" },
  ];

  const renderRequiredSummary = (items) => {
    if (!items.some((i) => !i.done)) return null;
    return (
      <div className="required-summary" role="alert">
        <div className="required-summary-head">
          <span className="required-summary-badge error" aria-hidden="true">!</span>
          <span className="required-summary-title">Complete the required information</span>
        </div>
        <p className="required-summary-sub">Please complete all required fields before continuing.</p>
        <div className="required-summary-list">
          {items.map((item) => (
            <div key={item.key} className={`required-summary-row ${item.done ? "done" : ""}`}>
              <span
                className={`required-summary-badge ${item.done ? "ok" : "error"}`}
                aria-hidden="true"
              >
                {item.done ? "✓" : "!"}
              </span>
              <span className="required-summary-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Focus the first invalid mandatory field so the cursor lands on it
  // and the red error state is immediately visible (per design reference).
  const focusFirstError = (orderedIds) => {
    requestAnimationFrame(() => {
      for (const id of orderedIds) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus({ preventScroll: true });
          break;
        }
      }
    });
  };

  const STEP1_ERROR_FOCUS_ORDER = [
    ["clientName", "cp-client-name"],
    ["phone", "cp-phone-number"],
    ["countryCode", "cp-phone-number"],
    ["industry", "cp-industry"],
    ["website", "cp-website"],
    ["country", "cp-country"],
    ["city", "cp-city"],
    ["timezone", "cp-timezone"],
  ];

  const STEP2_ERROR_FOCUS_ORDER = [
    ["projectTypes", "cp-project-types"],
    ["budget", "cp-budget"],
    ["teamSize", "cp-team-size"],
  ];

  const handleCountryChange = (value) => {
    setCountry(value);
    const meta = getCountryMeta(value);
    if (meta) setCountryCode(meta.dial);
    setStep1Errors((p) => ({ ...p, country: "" }));
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!clientName.trim()) errors.clientName = "Client name is required.";
    if (!isDialValid(countryCode)) errors.countryCode = "Please enter a valid country code.";
    if (!phoneDigits) errors.phone = "Phone number is required.";
    else if (!isPhoneValid(phone)) errors.phone = "Please enter a valid 10-digit phone number.";
    if (!industry) errors.industry = "Industry is required.";
    if (website.trim() && !isWebsiteValid(website)) errors.website = "Please enter a valid website URL.";
    if (!country.trim()) errors.country = "Country is required.";
    if (!city.trim()) errors.city = "City is required.";
    if (!timezone) errors.timezone = "Time zone is required.";

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      setStep1Tried(true);
      focusFirstError(
        STEP1_ERROR_FOCUS_ORDER.filter(([key]) => errors[key]).map(([, id]) => id)
      );
      return;
    }
    setStep1Errors({});
    setStep1Tried(false);
    if (isEditMode) {
      setIsEditMode(false);
      goToStep(3);
    } else {
      goToStep(2);
    }
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!projectTypes) errors.projectTypes = "Project type is required.";
    if (!budget) errors.budget = "Budget is required.";
    if (!teamSize) errors.teamSize = "Team size is required.";

    if (Object.keys(errors).length > 0) {
      setStep2Errors(errors);
      setStep2Tried(true);
      focusFirstError(
        STEP2_ERROR_FOCUS_ORDER.filter(([key]) => errors[key]).map(([, id]) => id)
      );
      return;
    }
    setStep2Errors({});
    setStep2Tried(false);
    if (isEditMode) {
      setIsEditMode(false);
      goToStep(3);
    } else {
      goToStep(3);
    }
  };

  /**
   * STEPPER COMPONENT:
   * - Component: <Stepper /> imported from "@/Components"
   * - Location: Client Profile Multi-step flow
   * - Purpose: Renders the horizontal 3-step numbered tracker (Agency Info -> Services -> Review & Submit)
   */
  const renderStepper = () => (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      activeColor="#0b38a8"
      className="profile-stepper-container"
    />
  );

  const renderStep1 = () => (
    <form className="profile-step-form" onSubmit={handleStep1Continue}>
      <div className="profile-section-heading">
        <h2 className="section-title">Company Information</h2>
        <p className="section-subtitle">Add your company details</p>
      </div>

      <div className="client-info-row mb-4">
        <div className="client-name-group" style={{ flex: 1 }}>
          <TextInput
            id="cp-client-name"
            label="Client Name"
            placeholder="Enter agency name"
            value={clientName}
            error={step1Errors.clientName}
            required
            rightIcon={step1Errors.clientName ? <Icon name="TriangleAlert" size={ICON_SIZES.SM} color="#dc2626" /> : null}
            onChange={(e) => { setClientName(e.target.value); setStep1Errors((p) => ({ ...p, clientName: "" })); }}
          />
        </div>

        <div className="profile-field-group client-logo-group">
          <label className="field-label">Logo <span className="optional-tag">(Optional)</span></label>
          <div className="upload-btn-wrapper">
            <label
              htmlFor="client-logo-input"
              className="upload-photo-btn cursor-pointer d-inline-flex align-items-center justify-content-center text-white gap-2"
              title={logoFile ? (logoFile.name || "Logo Selected") : "Upload Logo"}
            >
              <span className="upload-btn-text">
                {logoFile ? (logoFile.name || "Logo Selected") : "Upload Logo"}
              </span>
              <Icon name="Upload" size={ICON_SIZES.MD} color="#ffffff" />
            </label>
            <input id="client-logo-input" type="file" accept="image/*" className="hidden-input" onChange={handleLogoUpload} />
          </div>
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Industry</label>
          <div className={`custom-dropdown-box ${step1Errors.industry ? "dropdown-error" : ""}`}>
            <select id="cp-industry" className={`custom-dropdown-select ${industry === "" ? "is-placeholder" : ""}`} value={industry} onChange={(e) => { setIndustry(e.target.value); setStep1Errors((p) => ({ ...p, industry: "" })); }}>
              <option value="" disabled hidden>Select Industry</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Marketing">Marketing</option>
              <option value="Education">Education</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step1Errors.industry && <span className="field-error">{step1Errors.industry}</span>}
        </div>
      </div>

      <div className="mb-4">
        <TextInput
          id="cp-website"
          label="Website"
          placeholder="Enter website URL (optional)"
          value={website}
          error={step1Errors.website}
          rightIcon={step1Errors.website ? <Icon name="TriangleAlert" size={ICON_SIZES.SM} color="#dc2626" /> : null}
          onChange={(e) => { setWebsite(e.target.value); setStep1Errors((p) => ({ ...p, website: "" })); }}
        />
      </div>

      <div className="profile-field-group mb-4">
        <label className="field-label">Phone Number <span className="required-star">*</span></label>
        <div
          ref={phoneBoxRef}
          className={`phone-intl-box ${step1Errors.phone || step1Errors.countryCode ? "dropdown-error" : ""}`}
        >
          <button
            type="button"
            className="phone-flag-btn"
            aria-label="Select country"
            aria-expanded={phonePanelOpen}
            onClick={() => { setPhonePanelOpen((o) => !o); setCountrySearch(""); }}
          >
            <span className="phone-flag" aria-hidden="true">{activeFlag}</span>
            <Icon name="ChevronDown" size={ICON_SIZES.SM} className="phone-flag-chevron" />
          </button>
          <input
            className="phone-dial-input"
            value={countryCode}
            aria-label="Country code"
            placeholder="+91"
            onChange={(e) => {
              const v = e.target.value.replace(/[^+\d]/g, "");
              setCountryCode(v.startsWith("+") ? v : `+${v.replace(/^\+/, "")}`);
              setStep1Errors((p) => ({ ...p, phone: "", countryCode: "" }));
            }}
            style={{ width: `${Math.max((countryCode || "").length, 3)}ch` }}
          />
          <span className="phone-divider" aria-hidden="true" />
          <input
            id="cp-phone-number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className="phone-intl-input"
            placeholder="81234 56789"
            value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setStep1Errors((p) => ({ ...p, phone: "" })); }}
          />
          {step1Errors.phone && (
            <span className="phone-error-icon">
              <Icon name="TriangleAlert" size={ICON_SIZES.SM} color="#dc2626" />
            </span>
          )}
          {phonePanelOpen && (
            <div className="phone-country-panel">
              <input
                type="text"
                className="phone-country-search"
                placeholder="Search country or code"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
              />
              <div className="phone-country-list">
                {filteredCountries.length === 0 && (
                  <span className="phone-country-empty">No countries found.</span>
                )}
                {filteredCountries.map((c) => (
                  <button
                    key={`${c.country}-${c.dial}`}
                    type="button"
                    className={`phone-country-option ${c.country === country ? "selected" : ""}`}
                    onClick={() => selectPhoneCountry(c)}
                  >
                    <span className="phone-flag" aria-hidden="true">{flagOf(c)}</span>
                    <span className="phone-country-name">{c.country}</span>
                    <span className="phone-country-dial">{c.dial}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {step1Errors.phone && <span className="field-error">{step1Errors.phone}</span>}
        {step1Errors.countryCode && <span className="field-error">{step1Errors.countryCode}</span>}
      </div>

      <div className="client-info-row mb-4">
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div className="custom-dropdown-container">
            <label className="field-label">Country <span className="required-star">*</span></label>
            <div className={`custom-dropdown-box ${step1Errors.country ? "dropdown-error" : ""}`}>
              <select
                id="cp-country"
                className={`custom-dropdown-select ${country === "" ? "is-placeholder" : ""}`}
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                <option value="" disabled hidden>Select country</option>
                {COUNTRY_DIAL_LIST.map((c) => (
                  <option key={c.country} value={c.country}>{c.country} ({c.dial})</option>
                ))}
                {country && !getCountryMeta(country) && (
                  <option value={country}>{country}</option>
                )}
              </select>
              <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
            </div>
            {step1Errors.country && <span className="field-error">{step1Errors.country}</span>}
          </div>
        </div>

        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <TextInput
            id="cp-city"
            label="City"
            placeholder="e.g. Pune"
            value={city}
            error={step1Errors.city}
            required
            rightIcon={step1Errors.city ? <Icon name="TriangleAlert" size={ICON_SIZES.SM} color="#dc2626" /> : null}
            onChange={(e) => { setCity(e.target.value); setStep1Errors((p) => ({ ...p, city: "" })); }}
          />
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Time Zone</label>
          <div className={`custom-dropdown-box ${step1Errors.timezone ? "dropdown-error" : ""}`}>
            <select id="cp-timezone" className={`custom-dropdown-select ${timezone === "" ? "is-placeholder" : ""}`} value={timezone} onChange={(e) => { setTimezone(e.target.value); setStep1Errors((p) => ({ ...p, timezone: "" })); }}>
              <option value="" disabled hidden>Select time zone</option>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST/EDT)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
              <option value="Europe/London">Europe/London (GMT/BST)</option>
              <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step1Errors.timezone && <span className="field-error">{step1Errors.timezone}</span>}
        </div>
      </div>

      {step1Tried && renderRequiredSummary(step1RequiredStatus)}

      <div className="profile-form-actions d-flex justify-content-end align-items-center shrink-0 mt-auto gap-3">
        {isEditMode && (
          <SecondaryButton type="button" onClick={handleCancelEdit} text="Cancel" />
        )}
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            text={isEditMode ? "Save Changes" : "Continue"}
            icon={!isEditMode && <Icon name="ArrowRight" size={ICON_SIZES.DEFAULT} color="#ffffff" />}
            iconPosition="right"
          />
        </div>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form className="profile-step-form" onSubmit={handleStep2Continue}>
      <div className="profile-section-heading">
        <h2 className="section-title">Hiring Preferences</h2>
        <p className="section-subtitle">Tell us about your project needs..</p>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Project Types</label>
          <div className={`custom-dropdown-box ${step2Errors.projectTypes ? "dropdown-error" : ""}`}>
            <select id="cp-project-types" className={`custom-dropdown-select ${projectTypes === "" ? "is-placeholder" : ""}`} value={projectTypes} onChange={(e) => { setProjectTypes(e.target.value); setStep2Errors((p) => ({ ...p, projectTypes: "" })); }}>
              <option value="" disabled hidden>Select project types</option>
              <option value="short-term">Short-term Contract</option>
              <option value="long-term">Long-term Contract</option>
              <option value="full-time">Full-time Placement</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.projectTypes && <span className="field-error">{step2Errors.projectTypes}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Budget ({activeSymbol} {activeCurrency})</label>
          <div className={`custom-dropdown-box ${step2Errors.budget ? "dropdown-error" : ""}`}>
            <select id="cp-budget" className={`custom-dropdown-select ${budget === "" ? "is-placeholder" : ""}`} value={budget} onChange={(e) => { setBudget(e.target.value); setStep2Errors((p) => ({ ...p, budget: "" })); }}>
              <option value="" disabled hidden>Select budget range</option>
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.budget && <span className="field-error">{step2Errors.budget}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Team Size</label>
          <div className={`custom-dropdown-box ${step2Errors.teamSize ? "dropdown-error" : ""}`}>
            <select id="cp-team-size" className={`custom-dropdown-select ${teamSize === "" ? "is-placeholder" : ""}`} value={teamSize} onChange={(e) => { setTeamSize(e.target.value); setStep2Errors((p) => ({ ...p, teamSize: "" })); }}>
              <option value="" disabled hidden>Select team size</option>
              <option value="1-5">1-5 Employees</option>
              <option value="6-20">6-20 Employees</option>
              <option value="21-50">21-50 Employees</option>
              <option value="50-plus">50+ Employees</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.teamSize && <span className="field-error">{step2Errors.teamSize}</span>}
        </div>
      </div>

      {step2Tried && renderRequiredSummary(step2RequiredStatus)}

      <div className="profile-form-actions d-flex justify-content-end align-items-center shrink-0 mt-auto gap-3">
        {isEditMode && (
          <SecondaryButton type="button" onClick={handleCancelEdit} text="Cancel" />
        )}
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            text={isEditMode ? "Save Changes" : "Continue"}
            icon={!isEditMode && <Icon name="ArrowRight" size={ICON_SIZES.DEFAULT} color="#ffffff" />}
            iconPosition="right"
          />
        </div>
      </div>
    </form>
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /**
   * Final Submission Handler (POST /v1/profile/client wizard step-save):
   * 1. Uploads company logo file -> captures `logo_url` from UploadLogoResponse.
   * 2. Saves via strict CreateClientProfileRequest body (all 11 keys, no extras).
   *    PATCH /v1/profile/client is used when a profile already exists.
   * 3. Transitions to Step 4 (Completed / Reward Screen) only on success.
   */
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // 1. Upload logo if selected as a File instance
      let resolvedLogoUrl = logoUrl || profile?.logo_url || null;
      if (logoFile instanceof File) {
        const uploadRes = await profileApi.uploadLogo(logoFile);
        resolvedLogoUrl = uploadRes?.logo_url || resolvedLogoUrl;
        if (resolvedLogoUrl) setLogoUrl(resolvedLogoUrl);
      }

      // 2. Persist company & hiring preferences (strict spec body built inside)
      const profileExists = Boolean(profile?.public_url_slug || profile?.company_name);
      await profileApi.saveClientProfile(
        {
          company_name: clientName,
          phone: fullPhone,
          logo_url: resolvedLogoUrl,
          industry,
          website_url: website.trim() || null,
          project_types: projectTypes,
          budget_range: budget,
          team_size: teamSize,
          country,
          city,
          timezone,
        },
        profileExists
      );

      // 3. Navigate to completion step
      goToStep(4);
    } catch (err) {
      console.error("Failed to save client profile:", err);
      setSubmitError(err?.message || "Failed to save profile. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep3 = () => (
    <form className="profile-step-form" onSubmit={handleFinalSubmit}>
      <div className="profile-section-heading">
        <h2 className="section-title">Review & Submit</h2>
        <p className="section-subtitle">Review your information before continuing</p>
      </div>

      {/* 
        CARD COMPONENT: Review Summary Cards
        - Variant: variant="base" (BaseCard)
        - Location: renderStep3() (Review & Submit Step)
        - Purpose: Preview cards displaying completed Company Info & Hiring Preferences sections with Edit shortcuts
      */}
      <div className="d-flex flex-column gap-3 mb-4">
        <Cards variant="base" radius="md" shadow="none" className="review-summary-card" style={{ '--tg-card-shadow': 'none', boxShadow: 'none' }}>
          <span className="review-summary-title">Company Information</span>
          <span className="review-edit-btn" onClick={() => { setIsEditMode(true); goToStep(1); }} role="button">Edit</span>
        </Cards>

        <Cards variant="base" radius="md" shadow="none" className="review-summary-card" style={{ '--tg-card-shadow': 'none', boxShadow: 'none' }}>
          <span className="review-summary-title">Hiring Preferences</span>
          <span className="review-edit-btn" onClick={() => { setIsEditMode(true); goToStep(2); }} role="button">Edit</span>
        </Cards>
      </div>

      <div className="profile-form-actions d-flex justify-content-end align-items-center shrink-0 mt-auto gap-3">
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            text={isSubmitting ? "Submitting..." : "Continue"}
            icon={!isSubmitting && <Icon name="ArrowRight" size={ICON_SIZES.DEFAULT} color="#ffffff" />}
            iconPosition="right"
          />
        </div>
      </div>
      {submitError && (
        <div
          role="alert"
          className="mt-3"
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "0.85rem",
          }}
        >
          {submitError}
        </div>
      )}
    </form>
  );

  const renderCompletionScreen = () => (
    <div className="completion-screen-wrapper d-flex flex-column align-items-center h-100 w-100 py-1">
      <div className="d-flex flex-column align-items-center w-100 my-auto">
        <div className="completion-avatar-circle d-flex align-items-center justify-content-center mb-3">
          <Icon name="User" size={ICON_SIZES.HERO} color="#103CA4" stroke="#103CA4" strokeWidth={2.2} />
        </div>
        <h1 className="completion-main-title fw-bold text-center mb-3">
          Profile Setup Completed<br />Successfully !
        </h1>
        {/* 
          CARD COMPONENT: Completion Reward Banner Card
          - Variant: variant="base" (BaseCard)
          - Location: renderCompletionScreen() (Step 4 / Completed Screen)
          - Purpose: Notification banner displaying +20 Trust Points awarded for profile completion
        */}
        <Cards
          variant="base"
          radius="md"
          bg="#E9F0FF"
          className="completion-reward-banner text-start mb-4"
          style={{ backgroundColor: '#E9F0FF', background: '#E9F0FF', border: 'none', boxShadow: 'none' }}
        >
          <h3 className="reward-banner-title fw-bold mb-0">Profile Completed</h3>
          <p className="reward-banner-subtitle mb-0">You have earned +20 trust points!</p>
        </Cards>

        <div className="completion-stepper-container position-relative w-100 mb-5 mt-3">
          <div className="completion-stepper position-relative d-flex align-items-start justify-content-between w-100">
            <div className="completion-track-line position-absolute">
              <div className="completion-active-line" style={{ width: "33.33%" }}></div>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle active d-flex align-items-center justify-content-center">
                <span className="dot-white"></span>
              </div>
              <span className="completion-step-title fw-bold text-dark mt-2">Email Verified</span>
              <span className="completion-step-points fw-bold text-primary">+10 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle active d-flex align-items-center justify-content-center">
                <span className="dot-white"></span>
              </div>
              <span className="completion-step-title fw-bold text-dark mt-2">Profile Completed</span>
              <span className="completion-step-points fw-bold text-primary">+20 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center bg-white">
                <Icon name="Lock" size={ICON_SIZES.XS} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">Identity Verified</span>
              <span className="completion-step-points text-muted">+40 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center bg-white">
                <Icon name="Lock" size={ICON_SIZES.XS} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">First Project/ Proposal</span>
              <span className="completion-step-points text-muted">+30 Trust Points</span>
            </div>
          </div>
        </div>

        <div className="completion-cta-wrapper d-flex justify-content-center mt-4">
          <PrimaryButton
            text="Continue to Verify Identity"
            onClick={() => navigate("/client-verification-hub")}
            className="completion-cta-btn border-0 text-white fw-bold d-inline-flex align-items-center justify-content-center px-5"
          />
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout
      containerClass="client-profile-page"
      mainWorkspaceClass="d-flex flex-column h-100"
    >
      <div className="profile-page-wrapper">
          {/* 
            CARD COMPONENT: Profile Main Card (Core Layout Container)
            - Variant: variant="base" (BaseCard)
            - Location: Main Workspace
            - Purpose: Main white elevated container enclosing the entire multi-step profile flow (Steps 1-3 & Completion Screen)
          */}
          <Cards variant="base" radius="md" className="profile-main-card" padding="0">
            <div className="profile-card-inner">
              <div className="back-btn-container w-100 d-flex justify-content-start mb-3">
                <button
                  type="button"
                  className="completion-back-btn"
                  onClick={() => {
                    if (isSubmitted) {
                      navigate("/client-whole-profile");
                    } else if (isEditMode) {
                      setIsEditMode(false);
                      goToStep(3);
                    } else if (currentStep > 1) {
                      goToStep(currentStep - 1);
                    } else {
                      navigate("/client-whole-profile");
                    }
                  }}
                  aria-label="Go back"
                >
                  <Icon name="ArrowLeft" size={ICON_SIZES['2XL']} color="#0b38a8" />
                </button>
              </div>

              {isSubmitted ? (
                renderCompletionScreen()
              ) : (
                <div className="profile-content-column">
                  <div className="profile-header-section">
                    <h1 className="profile-main-title">Complete Your Profile</h1>
                    <p className="profile-main-subtitle">Lets build your profile step by step.</p>
                  </div>

                  {renderStepper()}

                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                </div>
              )}
            </div>
          </Cards>
        </div>
    </DashboardLayout>
  );
}
