import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PrimaryButton,
  SecondaryButton,
  DashboardLayout,
} from "@/Components";
import dashboardBg from "@/assets/dashboard.bg.png";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  LogIn,
  Home,
  Info,
  ShieldCheck,
  Shield,
  FileText,
  LayoutDashboard,
  MessageSquareMore,
  CircleHelp,
  ChevronRight,
  Wifi,
  Signal,
  Plane,
} from "lucide-react";
import "./ErrorPages.css";

/* ==========================================================================
   1. HIGH-FIDELITY VECTOR ILLUSTRATIONS (MATCHING FIGMA SCREENS 1 - 5)
   ========================================================================== */

const GroundShadow = ({ id = "groundGlow" }) => (
  <ellipse cx="260" cy="236" rx="200" ry="18" fill={`url(#${id})`} opacity="0.65" />
);

export function Illustration505({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 520 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tg-error-illustration ${className}`}
      style={{ width: "100%", maxWidth: "480px", height: "auto", maxHeight: "240px", ...style }}
      aria-label="505 Server Error Illustration"
    >
      <defs>
        <radialGradient id="groundGlow505" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="monitorBodyGrad505" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="lensGrad505" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#DBEAFE" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="signGrad505" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#103CA4" />
        </linearGradient>
        <filter id="shadowLight505" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#103CA4" floodOpacity="0.12" />
        </filter>
      </defs>

      <GroundShadow id="groundGlow505" />

      {/* Background Soft Foliage & Decorative Accents */}
      <g opacity="0.45">
        <circle cx="108" cy="180" r="22" fill="#DBEAFE" />
        <circle cx="128" cy="172" r="28" fill="#E0EDFE" />
        <circle cx="150" cy="184" r="20" fill="#DBEAFE" />
        <line x1="128" y1="198" x2="128" y2="236" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />

        <circle cx="410" cy="185" r="18" fill="#DBEAFE" />
        <circle cx="426" cy="178" r="22" fill="#E0EDFE" />
        <line x1="426" y1="200" x2="426" y2="236" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />

        <circle cx="365" cy="80" r="3" fill="#93C5FD" />
        <circle cx="170" cy="100" r="2.5" fill="#BFDBFE" />
        <path d="M125 105 H 131 M128 102 V 108" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M390 120 H 396 M393 117 V 123" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Traffic Cone on Left */}
      <g transform="translate(185, 185)">
        <ellipse cx="14" cy="50" rx="14" ry="4" fill="#0F172A" opacity="0.2" />
        <polygon points="3,48 25,48 23,45 5,45" fill="#1D4ED8" />
        <polygon points="14,12 7,45 21,45" fill="#1D4ED8" />
        <polygon points="11,24 17,24 18,30 10,30" fill="#FFFFFF" />
        <polygon points="9,36 19,36 20,41 8,41" fill="#FFFFFF" />
      </g>

      {/* Monitor Stand & Base */}
      <rect x="246" y="180" width="18" height="34" rx="2" fill="#334155" />
      <path d="M222 214 C222 211 228 210 255 210 C282 210 288 211 288 214 L284 218 H226 Z" fill="#1E293B" />

      {/* Monitor Outer Frame & Inner Screen */}
      <rect x="175" y="55" width="160" height="126" rx="9" fill="url(#monitorBodyGrad505)" filter="url(#shadowLight505)" />
      <rect x="183" y="63" width="144" height="106" rx="5" fill="#FFFFFF" />

      {/* Window bar indicators */}
      <line x1="190" y1="71" x2="198" y2="71" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="316" cy="71" r="2" fill="#CBD5E1" />
      <circle cx="322" cy="71" r="2" fill="#CBD5E1" />

      {/* "505" Digits with middle 0 in vibrant blue */}
      <g style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif", fontWeight: 800 }}>
        <text x="202" y="132" fontSize="42" fill="#0F172A" letterSpacing="-1">5</text>
        <text x="231" y="132" fontSize="42" fill="#1D4ED8" letterSpacing="-1">0</text>
        <text x="264" y="132" fontSize="42" fill="#0F172A" letterSpacing="-1">5</text>
      </g>

      {/* Road Sign on Right: "SOMETHING WENT WRONG" */}
      <g transform="translate(352, 90)">
        <rect x="28" y="15" width="5" height="130" rx="1.5" fill="#475569" />
        <ellipse cx="30.5" cy="144" rx="8" ry="2.5" fill="#0F172A" opacity="0.2" />

        <path d="M6 18 H66 L78 28 L66 38 H6 Z" fill="url(#signGrad505)" filter="url(#shadowLight505)" />
        <text x="12" y="25" fill="#FFFFFF" fontSize="5.2" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.4">
          SOMETHING
        </text>
        <text x="10" y="33" fill="#FFFFFF" fontSize="5.2" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.4">
          WENT WRONG
        </text>
      </g>

      {/* Magnifying Glass Overlap */}
      <g transform="translate(290, 110)">
        <rect x="44" y="44" width="13" height="38" rx="5" transform="rotate(-45 44 44)" fill="#103CA4" />
        <circle cx="34" cy="34" r="32" fill="#FFFFFF" stroke="#103CA4" strokeWidth="8" />
        <circle cx="34" cy="34" r="28" fill="url(#lensGrad505)" />
        <path d="M18 24 A 20 20 0 0 1 42 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </g>
    </svg>
  );
}

export function Illustration404({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 520 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tg-error-illustration ${className}`}
      style={{ width: "100%", maxWidth: "480px", height: "auto", maxHeight: "240px", ...style }}
      aria-label="404 Page Not Found Illustration"
    >
      <defs>
        <radialGradient id="groundGlow404" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="monitorBodyGrad404" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="lensGrad404" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#DBEAFE" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="signGrad404" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#103CA4" />
        </linearGradient>
        <filter id="shadowLight404" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#103CA4" floodOpacity="0.12" />
        </filter>
      </defs>

      <GroundShadow id="groundGlow404" />

      {/* Background Soft Foliage & Decorative Accents */}
      <g opacity="0.45">
        <circle cx="108" cy="180" r="22" fill="#DBEAFE" />
        <circle cx="128" cy="172" r="28" fill="#E0EDFE" />
        <circle cx="150" cy="184" r="20" fill="#DBEAFE" />
        <line x1="128" y1="198" x2="128" y2="236" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />

        <circle cx="410" cy="185" r="18" fill="#DBEAFE" />
        <circle cx="426" cy="178" r="22" fill="#E0EDFE" />
        <line x1="426" y1="200" x2="426" y2="236" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />

        <circle cx="365" cy="80" r="3" fill="#93C5FD" />
        <circle cx="170" cy="100" r="2.5" fill="#BFDBFE" />
        <path d="M125 105 H 131 M128 102 V 108" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M390 120 H 396 M393 117 V 123" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Traffic Cone on Left */}
      <g transform="translate(185, 185)">
        <ellipse cx="14" cy="50" rx="14" ry="4" fill="#0F172A" opacity="0.2" />
        <polygon points="3,48 25,48 23,45 5,45" fill="#1D4ED8" />
        <polygon points="14,12 7,45 21,45" fill="#1D4ED8" />
        <polygon points="11,24 17,24 18,30 10,30" fill="#FFFFFF" />
        <polygon points="9,36 19,36 20,41 8,41" fill="#FFFFFF" />
      </g>

      {/* Monitor Stand & Base */}
      <rect x="246" y="180" width="18" height="34" rx="2" fill="#334155" />
      <path d="M222 214 C222 211 228 210 255 210 C282 210 288 211 288 214 L284 218 H226 Z" fill="#1E293B" />

      {/* Monitor Outer Frame & Inner Screen */}
      <rect x="175" y="55" width="160" height="126" rx="9" fill="url(#monitorBodyGrad404)" filter="url(#shadowLight404)" />
      <rect x="183" y="63" width="144" height="106" rx="5" fill="#FFFFFF" />

      {/* Browser dots */}
      <circle cx="192" cy="71" r="2" fill="#CBD5E1" />
      <circle cx="198" cy="71" r="2" fill="#CBD5E1" />
      <circle cx="204" cy="71" r="2" fill="#CBD5E1" />

      {/* "404" Digits with middle 0 in vibrant blue */}
      <g style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif", fontWeight: 800 }}>
        <text x="202" y="132" fontSize="42" fill="#0F172A" letterSpacing="-1">4</text>
        <text x="231" y="132" fontSize="42" fill="#1D4ED8" letterSpacing="-1">0</text>
        <text x="264" y="132" fontSize="42" fill="#0F172A" letterSpacing="-1">4</text>
      </g>

      {/* Road Sign on Right: "PAGE NOT FOUND" */}
      <g transform="translate(352, 90)">
        <rect x="28" y="15" width="5" height="130" rx="1.5" fill="#475569" />
        <ellipse cx="30.5" cy="144" rx="8" ry="2.5" fill="#0F172A" opacity="0.2" />

        <path d="M6 18 H66 L78 28 L66 38 H6 Z" fill="url(#signGrad404)" filter="url(#shadowLight404)" />
        <text x="16" y="25" fill="#FFFFFF" fontSize="5.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.4">
          PAGE
        </text>
        <text x="10" y="33" fill="#FFFFFF" fontSize="5.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.4">
          NOT FOUND
        </text>
      </g>

      {/* Magnifying Glass Overlap */}
      <g transform="translate(290, 110)">
        <rect x="44" y="44" width="13" height="38" rx="5" transform="rotate(-45 44 44)" fill="#103CA4" />
        <circle cx="34" cy="34" r="32" fill="#FFFFFF" stroke="#103CA4" strokeWidth="8" />
        <circle cx="34" cy="34" r="28" fill="url(#lensGrad404)" />
        <path d="M18 24 A 20 20 0 0 1 42 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </g>
    </svg>
  );
}

export function IllustrationOffline({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 520 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tg-error-illustration ${className}`}
      style={{ width: "100%", maxWidth: "480px", height: "auto", maxHeight: "240px", ...style }}
      aria-label="No Internet Connection Illustration"
    >
      <defs>
        <radialGradient id="groundGlowOffline" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
        </radialGradient>
        <filter id="shadowOffline" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#103CA4" floodOpacity="0.1" />
        </filter>
      </defs>

      <GroundShadow id="groundGlowOffline" />

      {/* Background Soft Circles */}
      <circle cx="260" cy="130" r="86" fill="#F1F5F9" opacity="0.5" />
      <circle cx="210" cy="140" r="50" fill="#E2E8F0" opacity="0.4" />
      <circle cx="310" cy="140" r="50" fill="#E2E8F0" opacity="0.4" />

      {/* Potted Plant on Left Desk */}
      <g transform="translate(170, 150)">
        <polygon points="12,50 28,50 32,32 8,32" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M20 32 C12 20 6 8 10 2 C16 4 22 14 20 32 Z" fill="#2563EB" />
        <path d="M20 32 C26 22 34 10 38 6 C38 12 30 22 20 32 Z" fill="#3B82F6" />
        <path d="M20 32 C18 16 20 4 24 0 C26 6 24 20 20 32 Z" fill="#60A5FA" />
      </g>

      {/* Laptop Structure */}
      <g transform="translate(185, 48)">
        <rect x="15" y="10" width="160" height="110" rx="8" fill="#0F172A" filter="url(#shadowOffline)" />
        <rect x="23" y="18" width="144" height="94" rx="4" fill="#FFFFFF" />
        <circle cx="95" cy="14" r="1.5" fill="#475569" />

        {/* Globe with Disconnected State */}
        <g transform="translate(95, 54)">
          <circle cx="0" cy="0" r="22" stroke="#64748B" strokeWidth="1.8" fill="#F8FAFC" />
          <ellipse cx="0" cy="0" rx="10" ry="22" stroke="#94A3B8" strokeWidth="1.2" fill="none" />
          <line x1="-22" y1="0" x2="22" y2="0" stroke="#94A3B8" strokeWidth="1.2" />
          <line x1="-19" y1="-10" x2="19" y2="-10" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="-19" y1="10" x2="19" y2="10" stroke="#CBD5E1" strokeWidth="1" />

          {/* Red Slash & Red X Badge */}
          <line x1="-20" y1="-20" x2="20" y2="20" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="6.5" fill="#EF4444" />
          <path d="M13.5 13.5 L18.5 18.5 M18.5 13.5 L13.5 18.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        <text x="95" y="98" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A" fontFamily="system-ui, -apple-system, sans-serif">
          No Internet Connection
        </text>

        <path d="M0 120 L190 120 L180 130 H10 Z" fill="#1E293B" />
        <rect x="76" y="120" width="38" height="4" rx="1" fill="#475569" />
      </g>

      {/* Network Bars with Red X Badge */}
      <g transform="translate(390, 85)">
        <rect x="0" y="24" width="3.5" height="10" rx="1" fill="#94A3B8" />
        <rect x="5.5" y="18" width="3.5" height="16" rx="1" fill="#94A3B8" />
        <rect x="11" y="12" width="3.5" height="22" rx="1" fill="#94A3B8" />
        <rect x="16.5" y="6" width="3.5" height="28" rx="1" fill="#94A3B8" />
        <circle cx="24" cy="5" r="6" fill="#EF4444" />
        <path d="M21.5 2.5 L26.5 7.5 M26.5 2.5 L21.5 7.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Wi-Fi Router with Dual Antennas */}
      <g transform="translate(378, 150)">
        <rect x="0" y="22" width="56" height="18" rx="4" fill="#0F172A" filter="url(#shadowOffline)" />
        <line x1="8" y1="22" x2="4" y2="2" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="22" x2="16" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        <circle cx="36" cy="31" r="1.8" fill="#10B981" />
        <circle cx="42" cy="31" r="1.8" fill="#EF4444" />
        <circle cx="48" cy="31" r="1.8" fill="#3B82F6" />
      </g>
    </svg>
  );
}

export function IllustrationSessionExpired({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 520 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tg-error-illustration ${className}`}
      style={{ width: "100%", maxWidth: "480px", height: "auto", maxHeight: "240px", ...style }}
      aria-label="Session Expired Illustration"
    >
      <defs>
        <radialGradient id="groundGlowSession" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
        </radialGradient>
        <filter id="shadowSession" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#103CA4" floodOpacity="0.12" />
        </filter>
        <linearGradient id="shieldGradSession" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      <GroundShadow id="groundGlowSession" />

      <circle cx="260" cy="130" r="88" fill="#F1F5F9" opacity="0.5" />

      {/* Potted Plant */}
      <g transform="translate(155, 140)">
        <polygon points="12,54 28,54 32,36 8,36" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M20 36 C10 22 4 8 8 2 C15 4 21 16 20 36 Z" fill="#2563EB" />
        <path d="M20 36 C27 24 35 12 39 8 C39 14 31 24 20 36 Z" fill="#3B82F6" />
        <path d="M20 36 C18 18 20 6 24 0 C26 6 24 22 20 36 Z" fill="#60A5FA" />
      </g>

      {/* Laptop with Padlock Shield */}
      <g transform="translate(192, 58)">
        <rect x="0" y="0" width="154" height="106" rx="8" fill="#0F172A" filter="url(#shadowSession)" />
        <rect x="8" y="8" width="138" height="90" rx="4" fill="#FFFFFF" />
        <circle cx="77" cy="4" r="1.5" fill="#475569" />

        <g transform="translate(77, 48)">
          <path d="M-18 -22 C-18 -22 0 -28 0 -28 C0 -28 18 -22 18 -22 V-2 C18 15 0 26 0 26 C0 26 -18 15 -18 -2 Z" fill="url(#shieldGradSession)" />
          <rect x="-8" y="-4" width="16" height="14" rx="2" fill="#FFFFFF" />
          <path d="M-5 -4 V-9 C-5 -12.5 -2.5 -15 0 -15 C2.5 -15 5 -12.5 5 -9 V-4" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="2" r="1.8" fill="#1D4ED8" />
          <line x1="0" y1="3" x2="0" y2="6.5" stroke="#1D4ED8" strokeWidth="1.5" />
        </g>

        <path d="M-14 106 L168 106 L158 116 H-4 Z" fill="#1E293B" />
        <rect x="62" y="106" width="30" height="3" rx="1" fill="#475569" />
      </g>

      {/* Floating Analog Clock */}
      <g transform="translate(350, 40)" filter="url(#shadowSession)">
        <circle cx="42" cy="42" r="42" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="42" cy="42" r="38" fill="#F8FAFC" />

        <line x1="42" y1="8" x2="42" y2="13" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="71" x2="42" y2="76" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="42" x2="13" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="71" y1="42" x2="76" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

        <line x1="42" y1="42" x2="25" y2="25" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <line x1="42" y1="42" x2="62" y2="42" stroke="#103CA4" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="42" cy="42" r="3" fill="#0F172A" />
      </g>

      {/* Steaming Coffee Mug */}
      <g transform="translate(385, 160)">
        <ellipse cx="14" cy="30" rx="14" ry="3" fill="#0F172A" opacity="0.15" />
        <path d="M4 10 H24 V24 C24 28 20 30 14 30 C8 30 4 28 4 24 Z" fill="#103CA4" />
        <path d="M24 13 C29 13 29 23 24 23" stroke="#103CA4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M10 5 C8 3 12 1 10 -2" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M18 6 C16 4 20 2 18 -1" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
      </g>
    </svg>
  );
}

export function IllustrationAccessDenied({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 520 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tg-error-illustration ${className}`}
      style={{ width: "100%", maxWidth: "480px", height: "auto", maxHeight: "240px", ...style }}
      aria-label="Access Denied Illustration"
    >
      <defs>
        <radialGradient id="groundGlowDenied" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
        </radialGradient>
        <filter id="shadowDenied" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#103CA4" floodOpacity="0.12" />
        </filter>
        <linearGradient id="shieldGradDenied" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#103CA4" />
        </linearGradient>
      </defs>

      <GroundShadow id="groundGlowDenied" />

      <circle cx="260" cy="130" r="90" fill="#F1F5F9" opacity="0.6" />

      {/* Potted Plant */}
      <g transform="translate(160, 140)">
        <polygon points="12,54 28,54 32,36 8,36" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M20 36 C10 22 4 8 8 2 C15 4 21 16 20 36 Z" fill="#2563EB" />
        <path d="M20 36 C27 24 35 12 39 8 C39 14 31 24 20 36 Z" fill="#3B82F6" />
        <path d="M20 36 C18 18 20 6 24 0 C26 6 24 22 20 36 Z" fill="#60A5FA" />
      </g>

      {/* Browser Window with Security Shield */}
      <g transform="translate(182, 38)">
        <rect x="0" y="0" width="176" height="142" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" filter="url(#shadowDenied)" />
        <rect x="0" y="0" width="176" height="24" rx="8" fill="#F8FAFC" />
        <rect x="0" y="16" width="176" height="8" fill="#F8FAFC" />
        <line x1="0" y1="24" x2="176" y2="24" stroke="#E2E8F0" strokeWidth="1" />

        <circle cx="14" cy="12" r="3" fill="#CBD5E1" />
        <circle cx="23" cy="12" r="3" fill="#CBD5E1" />
        <circle cx="32" cy="12" r="3" fill="#CBD5E1" />
        <rect x="44" y="6" width="88" height="12" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />

        {/* Security Shield */}
        <g transform="translate(88, 78)">
          <path d="M-28 -34 C-28 -34 0 -44 0 -44 C0 -44 28 -34 28 -34 V-2 C28 26 0 42 0 42 C0 42 -28 26 -28 -2 Z" fill="url(#shieldGradDenied)" filter="url(#shadowDenied)" />
          <rect x="-11" y="-6" width="22" height="18" rx="3" fill="#FFFFFF" />
          <path d="M-7 -6 V-14 C-7 -18 -3.5 -21 0 -21 C3.5 -21 7 -18 7 -14 V-6" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="2" r="2.5" fill="#103CA4" />
          <line x1="0" y1="3" x2="0" y2="7" stroke="#103CA4" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* Floating ID Badge Card with Red X */}
      <g transform="translate(325, 68)" filter="url(#shadowDenied)">
        <rect x="0" y="0" width="56" height="66" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <circle cx="28" cy="22" r="10" fill="#E2E8F0" />
        <circle cx="28" cy="19" r="4.5" fill="#94A3B8" />
        <path d="M20 28 C20 25 24 24 28 24 C32 24 36 25 36 28 Z" fill="#94A3B8" />

        <rect x="10" y="38" width="36" height="3" rx="1.5" fill="#CBD5E1" />
        <rect x="14" y="45" width="28" height="2.5" rx="1" fill="#E2E8F0" />
        <rect x="18" y="51" width="20" height="2.5" rx="1" fill="#E2E8F0" />

        <circle cx="52" cy="5" r="8" fill="#EF4444" />
        <path d="M49 2 L55 8 M55 2 L49 8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export const ERROR_ILLUSTRATIONS = {
  "505": Illustration505,
  "500": Illustration505,
  "server": Illustration505,
  "404": Illustration404,
  "not-found": Illustration404,
  "offline": IllustrationOffline,
  "no-internet": IllustrationOffline,
  "network": IllustrationOffline,
  "session-expired": IllustrationSessionExpired,
  "401": IllustrationSessionExpired,
  "access-denied": IllustrationAccessDenied,
  "403": IllustrationAccessDenied,
  "forbidden": IllustrationAccessDenied,
};

/* ==========================================================================
   2. CONFIGURATION & ROLE-AWARE NAVIGATION RESOLVER
   ========================================================================== */

export const ERROR_TYPES = {
  SERVER_ERROR: "505",
  NOT_FOUND: "404",
  OFFLINE: "offline",
  SESSION_EXPIRED: "session-expired",
  ACCESS_DENIED: "access-denied",
};

export function getRoleNavLinks(role = "individual") {
  const normalized = String(role || "individual").toLowerCase();
  switch (normalized) {
    case "client":
      return {
        dashboard: "/client-dashboard",
        questBoard: "/client-quest-board",
        communication: "/client-communication",
        helpSupport: "/client-help-support",
        login: "/login",
      };
    case "agency":
      return {
        dashboard: "/agency/dashboard",
        questBoard: "/agency/projects",
        communication: "/agency/clients",
        helpSupport: "/help-support",
        login: "/login",
      };
    case "admin":
      return {
        dashboard: "/admin/dashboard",
        questBoard: "/admin/projects",
        communication: "/admin/users",
        helpSupport: "/help-support",
        login: "/login",
      };
    case "individual":
    case "freelancer":
    default:
      return {
        dashboard: "/dashboard",
        questBoard: "/quest-board",
        communication: "/communication",
        helpSupport: "/help-support",
        login: "/login",
      };
  }
}

export function getExploreShortcuts(role = "individual") {
  const links = getRoleNavLinks(role);
  return [
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Overview of your activity and progress.",
      to: links.dashboard,
      iconName: "LayoutDashboard",
      iconColor: "#2563EB",
      bgColor: "#EFF6FF",
    },
    {
      id: "quest-board",
      title: "Quest Board",
      description: "Find and apply for exciting opportunities.",
      to: links.questBoard,
      iconName: "FileText",
      iconColor: "#059669",
      bgColor: "#ECFDF5",
    },
    {
      id: "communication",
      title: "Communication",
      description: "Chat with clients and team members.",
      to: links.communication,
      iconName: "MessageSquareMore",
      iconColor: "#7C3AED",
      bgColor: "#F5F3FF",
    },
    {
      id: "help-support",
      title: "Help & Support",
      description: "Get help or contact our support team.",
      to: links.helpSupport,
      iconName: "CircleHelp",
      iconColor: "#D97706",
      bgColor: "#FFFBEB",
    },
  ];
}

export const OFFLINE_TROUBLESHOOTING_TIPS = [
  {
    id: "check-connection",
    title: "Check Your Connection",
    description: "Make sure Wi-Fi or mobile data is turned on and working.",
    iconName: "Wifi",
    iconColor: "#7C3AED",
    bgColor: "#F5F3FF",
  },
  {
    id: "restart-router",
    title: "Restart Your Router",
    description: "Try restarting your router or modem and reconnect.",
    iconName: "RotateCcw",
    iconColor: "#059669",
    bgColor: "#ECFDF5",
  },
  {
    id: "switch-network",
    title: "Switch Network",
    description: "Try switching to a different Wi-Fi or mobile network.",
    iconName: "Signal",
    iconColor: "#D97706",
    bgColor: "#FFFBEB",
  },
  {
    id: "airplane-mode",
    title: "Airplane Mode",
    description: "Turn airplane mode on and off to reset your connection.",
    iconName: "Plane",
    iconColor: "#2563EB",
    bgColor: "#EFF6FF",
  },
];

export const ERROR_PAGES_CONFIG = {
  "505": {
    id: "505",
    statusCode: "505",
    type: ERROR_TYPES.SERVER_ERROR,
    illustrationKey: "505",
    heading: "Something Went Wrong !",
    description: "Our team has been notified and is working to fix the issue.",
    primaryAction: {
      label: "Back to Dashboard",
      iconName: "ArrowLeft",
      iconPosition: "left",
      actionType: "dashboard",
    },
    secondaryAction: {
      label: "Try Again",
      actionType: "retry",
    },
    infoSection: null,
    helpSection: {
      type: "shortcuts",
      title: "Need help finding something?",
      subtitle: "Here are some popular sections you can explore.",
    },
  },
  "404": {
    id: "404",
    statusCode: "404",
    type: ERROR_TYPES.NOT_FOUND,
    illustrationKey: "404",
    heading: "Oops! Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    primaryAction: {
      label: "Back to Dashboard",
      iconName: "ArrowLeft",
      iconPosition: "left",
      actionType: "dashboard",
    },
    secondaryAction: {
      label: "Go Back",
      iconName: "ArrowRight",
      iconPosition: "right",
      actionType: "back",
    },
    infoSection: null,
    helpSection: {
      type: "shortcuts",
      title: "Need help finding something?",
      subtitle: "Here are some popular sections you can explore.",
    },
  },
  "offline": {
    id: "offline",
    statusCode: null,
    type: ERROR_TYPES.OFFLINE,
    illustrationKey: "offline",
    heading: "No Internet Connection",
    description: "It looks like you're offline. Please check your internet connection and try again.",
    primaryAction: {
      label: "Try Again",
      iconName: "RotateCcw",
      iconPosition: "left",
      actionType: "retry",
    },
    secondaryAction: {
      label: "Go Back",
      iconName: "ArrowLeft",
      iconPosition: "left",
      actionType: "back",
    },
    infoSection: null,
    helpSection: {
      type: "troubleshooting",
      title: "What you can do?",
      subtitle: "Here are a few things you can try:",
      items: OFFLINE_TROUBLESHOOTING_TIPS,
    },
  },
  "session-expired": {
    id: "session-expired",
    statusCode: "401",
    type: ERROR_TYPES.SESSION_EXPIRED,
    illustrationKey: "session-expired",
    heading: "Session Expired",
    description: "Your session has expired due to inactivity. Please log in again to continue where you left off.",
    primaryAction: {
      label: "Log In Again",
      iconName: "LogIn",
      iconPosition: "left",
      actionType: "login",
    },
    secondaryAction: {
      label: "Go to Login Page",
      iconName: "ArrowLeft",
      iconPosition: "left",
      actionType: "login",
    },
    infoSection: {
      columns: 2,
      items: [
        {
          id: "why",
          title: "Why did this happen?",
          description: "For your security, we automatically log you out after a period of inactivity.",
          iconName: "Info",
          iconColor: "#2563EB",
          bgColor: "#EFF6FF",
        },
        {
          id: "safe",
          title: "Your data is safe",
          description: "All your data and progress are securely saved. You won't lose anything.",
          iconName: "ShieldCheck",
          iconColor: "#2563EB",
          bgColor: "#EFF6FF",
        },
      ],
    },
    helpSection: {
      type: "shortcuts",
      title: "While you're here, explore TechGuild",
      subtitle: "Here are some popular sections you can explore.",
    },
  },
  "access-denied": {
    id: "access-denied",
    statusCode: "403",
    type: ERROR_TYPES.ACCESS_DENIED,
    illustrationKey: "access-denied",
    heading: "Access Denied",
    description: "You don't have permission to access this page or perform this action.",
    primaryAction: {
      label: "Go to Dashboard",
      iconName: "Home",
      iconPosition: "left",
      actionType: "dashboard",
    },
    secondaryAction: {
      label: "Go Back",
      iconName: "ArrowLeft",
      iconPosition: "left",
      actionType: "back",
    },
    infoSection: {
      columns: 3,
      items: [
        {
          id: "why",
          title: "Why am I seeing this?",
          description: "You may not have the required permissions, or your role may not allow access to this resource.",
          iconName: "Info",
          iconColor: "#2563EB",
          bgColor: "#EFF6FF",
        },
        {
          id: "what-to-do",
          title: "What can you do?",
          description: "Contact your guild admin or team owner to request access to this resource.",
          iconName: "Shield",
          iconColor: "#2563EB",
          bgColor: "#EFF6FF",
        },
        {
          id: "still-help",
          title: "Still need help?",
          description: "Our support team is here to help you with any issues.",
          iconName: "FileText",
          iconColor: "#2563EB",
          bgColor: "#EFF6FF",
        },
      ],
    },
    helpSection: {
      type: "shortcuts",
      title: "Explore other sections",
      subtitle: "Here are some popular sections you can explore.",
    },
  },
};

ERROR_PAGES_CONFIG["500"] = ERROR_PAGES_CONFIG["505"];
ERROR_PAGES_CONFIG["server"] = ERROR_PAGES_CONFIG["505"];
ERROR_PAGES_CONFIG["not-found"] = ERROR_PAGES_CONFIG["404"];
ERROR_PAGES_CONFIG["no-internet"] = ERROR_PAGES_CONFIG["offline"];
ERROR_PAGES_CONFIG["401"] = ERROR_PAGES_CONFIG["session-expired"];
ERROR_PAGES_CONFIG["403"] = ERROR_PAGES_CONFIG["access-denied"];
ERROR_PAGES_CONFIG["forbidden"] = ERROR_PAGES_CONFIG["access-denied"];

export function getErrorConfig(typeOrCode = "404") {
  const key = String(typeOrCode).toLowerCase();
  return ERROR_PAGES_CONFIG[key] || ERROR_PAGES_CONFIG["404"];
}

/* ==========================================================================
   3. INTERNAL REUSABLE SUBCOMPONENTS
   ========================================================================== */

function resolveActionIcon(iconName, size = 18) {
  if (!iconName) return null;
  if (React.isValidElement(iconName)) return iconName;
  switch (String(iconName).toLowerCase()) {
    case "arrowleft":
    case "arrow-left":
    case "back":
      return <ArrowLeft size={size} />;
    case "arrowright":
    case "arrow-right":
      return <ArrowRight size={size} />;
    case "rotateccw":
    case "rotate-ccw":
    case "refresh":
    case "retry":
      return <RotateCcw size={size} />;
    case "login":
    case "log-in":
      return <LogIn size={size} />;
    case "home":
    case "dashboard":
      return <Home size={size} />;
    default:
      return null;
  }
}

export function ErrorPageActions({
  primaryAction,
  secondaryAction,
  userRole = "individual",
  onRetry,
  isRetrying = false,
  className = "",
}) {
  const navigate = useNavigate();
  const roleLinks = getRoleNavLinks(userRole);

  const handleAction = (action) => {
    if (!action) return;
    if (typeof action.onClick === "function") {
      action.onClick();
      return;
    }
    if (action.to) {
      navigate(action.to);
      return;
    }
    switch (action.actionType) {
      case "dashboard":
        navigate(roleLinks.dashboard);
        break;
      case "login":
        navigate(roleLinks.login);
        break;
      case "back":
        if (window.history.length > 2) {
          navigate(-1);
        } else {
          navigate(roleLinks.dashboard);
        }
        break;
      case "retry":
        if (typeof onRetry === "function") {
          onRetry();
        } else {
          window.location.reload();
        }
        break;
      default:
        navigate(roleLinks.dashboard);
        break;
    }
  };

  return (
    <div className={`tg-error-actions ${className}`}>
      {primaryAction && (
        <PrimaryButton
          className="tg-error-btn tg-error-btn-primary"
          onClick={() => handleAction(primaryAction)}
          icon={resolveActionIcon(primaryAction.iconName || primaryAction.icon)}
          iconPosition={primaryAction.iconPosition || "left"}
          disabled={isRetrying}
        >
          {isRetrying && primaryAction.actionType === "retry"
            ? "Retrying..."
            : primaryAction.label}
        </PrimaryButton>
      )}

      {secondaryAction && (
        <SecondaryButton
          className="tg-error-btn tg-error-btn-secondary"
          onClick={() => handleAction(secondaryAction)}
          icon={resolveActionIcon(secondaryAction.iconName || secondaryAction.icon)}
          iconPosition={secondaryAction.iconPosition || "left"}
        >
          {secondaryAction.label}
        </SecondaryButton>
      )}
    </div>
  );
}

export function ErrorPageHero({
  illustrationKey = "404",
  customIllustration = null,
  heading = "Oops! Page not found",
  description = "The page you're looking for doesn't exist or has been moved.",
  primaryAction,
  secondaryAction,
  userRole = "individual",
  onRetry,
  isRetrying = false,
  className = "",
}) {
  const IllustrationComponent =
    ERROR_ILLUSTRATIONS[illustrationKey] || ERROR_ILLUSTRATIONS["404"];

  return (
    <div className={`tg-error-card tg-error-hero-card ${className}`}>
      <div className="tg-error-illustration-wrap">
        {customIllustration ? customIllustration : <IllustrationComponent />}
      </div>

      <div className="tg-error-hero-content">
        <h1 className="tg-error-title">{heading}</h1>
        <p className="tg-error-desc">{description}</p>

        <ErrorPageActions
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          userRole={userRole}
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      </div>
    </div>
  );
}

function resolveInfoIcon(iconName, color = "#2563EB", size = 20) {
  switch (String(iconName).toLowerCase()) {
    case "info":
      return <Info size={size} color={color} />;
    case "shieldcheck":
      return <ShieldCheck size={size} color={color} />;
    case "shield":
      return <Shield size={size} color={color} />;
    case "filetext":
      return <FileText size={size} color={color} />;
    default:
      return <Info size={size} color={color} />;
  }
}

export function ErrorPageInfoSection({ infoSection, className = "" }) {
  if (!infoSection || !Array.isArray(infoSection.items) || infoSection.items.length === 0) {
    return null;
  }
  const columns = infoSection.columns || infoSection.items.length || 2;

  return (
    <div className={`tg-error-card tg-error-info-card tg-error-info-cols-${columns} ${className}`}>
      {infoSection.items.map((item, idx) => (
        <div key={item.id || idx} className="tg-error-info-item">
          <div
            className="tg-error-info-icon-box"
            style={{ backgroundColor: item.bgColor || "#EFF6FF" }}
          >
            {resolveInfoIcon(item.iconName, item.iconColor || "#2563EB")}
          </div>
          <div className="tg-error-info-text">
            <h3 className="tg-error-info-title">{item.title}</h3>
            <p className="tg-error-info-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function resolveSectionIcon(iconName, color = "#2563EB", size = 20) {
  switch (String(iconName).toLowerCase()) {
    case "layoutdashboard":
      return <LayoutDashboard size={size} color={color} />;
    case "filetext":
      return <FileText size={size} color={color} />;
    case "messagesquaremore":
      return <MessageSquareMore size={size} color={color} />;
    case "circlehelp":
    case "circlequestionmark":
      return <CircleHelp size={size} color={color} />;
    case "wifi":
      return <Wifi size={size} color={color} />;
    case "rotateccw":
      return <RotateCcw size={size} color={color} />;
    case "signal":
      return <Signal size={size} color={color} />;
    case "plane":
      return <Plane size={size} color={color} />;
    default:
      return <CircleHelp size={size} color={color} />;
  }
}

export function ErrorPageHelpSection({
  helpSection,
  userRole = "individual",
  className = "",
}) {
  if (!helpSection) return null;

  const isTroubleshooting = helpSection.type === "troubleshooting";
  const items = isTroubleshooting
    ? helpSection.items || []
    : getExploreShortcuts(userRole);

  return (
    <div className={`tg-error-card tg-error-help-card ${className}`}>
      <div className="tg-error-help-header">
        <h2 className="tg-error-help-title">{helpSection.title}</h2>
        {helpSection.subtitle && (
          <p className="tg-error-help-subtitle">{helpSection.subtitle}</p>
        )}
      </div>

      <div className="tg-error-help-grid">
        {items.map((item) => {
          const iconNode = resolveSectionIcon(item.iconName, item.iconColor);

          if (item.to) {
            return (
              <Link key={item.id} to={item.to} className="tg-error-shortcut-item">
                <div
                  className="tg-error-shortcut-icon-box"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {iconNode}
                </div>
                <div className="tg-error-shortcut-content">
                  <span className="tg-error-shortcut-title">{item.title}</span>
                  <span className="tg-error-shortcut-desc">{item.description}</span>
                </div>
                <div className="tg-error-shortcut-arrow">
                  <ChevronRight size={16} color="#9CA3AF" />
                </div>
              </Link>
            );
          }

          return (
            <div key={item.id} className="tg-error-troubleshoot-item">
              <div
                className="tg-error-shortcut-icon-box"
                style={{ backgroundColor: item.bgColor }}
              >
                {iconNode}
              </div>
              <div className="tg-error-shortcut-content">
                <span className="tg-error-shortcut-title">{item.title}</span>
                <span className="tg-error-shortcut-desc">{item.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ErrorPageLayout({
  children,
  standalone = false,
  userRole,
  navbarItems,
  hideNavbar = false,
  hideHeader = false,
  className = "",
  style = {},
}) {
  const { role: contextRole } = useAuth();
  const effectiveRole = userRole || contextRole || "individual";

  if (standalone) {
    return (
      <div
        className={`tg-error-standalone-layout ${className}`}
        style={{
          backgroundImage: `url(${dashboardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          ...style,
        }}
      >
        <div className="tg-error-container tg-error-standalone-container">
          {children}
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      userRole={effectiveRole}
      navbarItems={navbarItems}
      hideNavbar={hideNavbar}
      hideHeader={hideHeader}
      mainWorkspaceClass={`tg-error-workspace ${className}`.trim()}
      containerClass="tg-error-layout-container"
      style={style}
    >
      <div className="tg-error-container">
        {children}
      </div>
    </DashboardLayout>
  );
}

/* ==========================================================================
   4. UNIVERSAL ERROR PAGE RENDERER
   ========================================================================== */

export default function ErrorPage({
  type = "404",
  heading,
  description,
  primaryAction,
  secondaryAction,
  infoSection,
  helpSection,
  customIllustration,
  standalone = false,
  userRole,
  navbarItems,
  onRetry,
  children,
  className = "",
  style = {},
}) {
  const baseConfig = getErrorConfig(type);

  const resolvedHeading = heading || baseConfig.heading;
  const resolvedDescription = description || baseConfig.description;
  const resolvedPrimaryAction = primaryAction || baseConfig.primaryAction;
  const resolvedSecondaryAction = secondaryAction || baseConfig.secondaryAction;
  const resolvedInfoSection = infoSection !== undefined ? infoSection : baseConfig.infoSection;
  const resolvedHelpSection = helpSection !== undefined ? helpSection : baseConfig.helpSection;
  const illustrationKey = baseConfig.illustrationKey;

  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      if (typeof onRetry === "function") {
        await onRetry();
      } else {
        window.location.reload();
      }
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <ErrorPageLayout
      standalone={standalone}
      userRole={userRole}
      navbarItems={navbarItems}
      className={className}
      style={style}
    >
      <ErrorPageHero
        illustrationKey={illustrationKey}
        customIllustration={customIllustration}
        heading={resolvedHeading}
        description={resolvedDescription}
        primaryAction={resolvedPrimaryAction}
        secondaryAction={resolvedSecondaryAction}
        userRole={userRole}
        onRetry={handleRetry}
        isRetrying={isRetrying}
      />

      {resolvedInfoSection && (
        <ErrorPageInfoSection infoSection={resolvedInfoSection} />
      )}

      {resolvedHelpSection && (
        <ErrorPageHelpSection
          helpSection={resolvedHelpSection}
          userRole={userRole}
        />
      )}

      {children}
    </ErrorPageLayout>
  );
}

/* ==========================================================================
   5. ALL 5 DEDICATED SCREEN COMPONENTS IN THIS SAME FILE
   ========================================================================== */

/**
 * Screen 1: 505 / Server Error ("Something Went Wrong !")
 */
export function ServerError(props) {
  return <ErrorPage type="505" {...props} />;
}

/**
 * Screen 2: 404 / Page Not Found ("Oops! Page not found")
 */
export function NotFound(props) {
  return <ErrorPage type="404" {...props} />;
}

/**
 * Screen 3: Offline / No Internet Connection ("No Internet Connection")
 */
export function OfflineError(props) {
  return <ErrorPage type="offline" {...props} />;
}

/**
 * Screen 4: 401 / Session Expired ("Session Expired")
 */
export function SessionExpired(props) {
  return <ErrorPage type="session-expired" {...props} />;
}

/**
 * Screen 5: 403 / Access Denied ("Access Denied")
 */
export function AccessDenied({ message, ...props }) {
  return (
    <ErrorPage
      type="access-denied"
      description={message || "You don't have permission to access this page or perform this action."}
      {...props}
    />
  );
}

/* ==========================================================================
   6. ERROR BOUNDARY (FOR AUTOMATIC 505 CATCHING)
   ========================================================================== */

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("TechGuild ErrorBoundary caught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof this.props.onReset === "function") {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === "function"
          ? this.props.fallback(this.state.error, this.handleReset)
          : this.props.fallback;
      }
      return (
        <ErrorPage
          type="505"
          onRetry={this.handleReset}
          userRole={this.props.userRole}
          standalone={this.props.standalone}
        />
      );
    }
    return this.props.children;
  }
}

/* ==========================================================================
   7. INTERACTIVE PREVIEW & TESTING SHOWCASE
   ========================================================================== */

export function ErrorPreviewPage() {
  const [selectedType, setSelectedType] = useState("505");
  const [selectedRole, setSelectedRole] = useState("individual");
  const [isStandalone, setIsStandalone] = useState(false);

  const screens = [
    { id: "505", label: "505 - Server Error" },
    { id: "404", label: "404 - Not Found" },
    { id: "offline", label: "Offline - No Internet" },
    { id: "session-expired", label: "401 - Session Expired" },
    { id: "access-denied", label: "403 - Access Denied" },
  ];

  const roles = [
    { id: "individual", label: "Freelancer / Individual" },
    { id: "client", label: "Client" },
    { id: "agency", label: "Agency" },
    { id: "admin", label: "Admin" },
  ];

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 9999,
          background: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(12px)",
          color: "#FFFFFF",
          padding: "12px 16px",
          borderRadius: "14px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
        }}
      >
        <span style={{ fontWeight: 700, color: "#93C5FD", marginRight: "4px" }}>
          Error Preview:
        </span>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            background: "#1E293B",
            color: "#FFFFFF",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "5px 10px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {screens.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{
            background: "#1E293B",
            color: "#FFFFFF",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "5px 10px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            fontSize: "12px",
            marginLeft: "6px",
          }}
        >
          <input
            type="checkbox"
            checked={isStandalone}
            onChange={(e) => setIsStandalone(e.target.checked)}
          />
          Standalone
        </label>
      </div>

      <ErrorPage
        key={`${selectedType}-${selectedRole}-${isStandalone}`}
        type={selectedType}
        userRole={selectedRole}
        standalone={isStandalone}
        onRetry={() => alert("Retry handler executed successfully!")}
      />
    </div>
  );
}
