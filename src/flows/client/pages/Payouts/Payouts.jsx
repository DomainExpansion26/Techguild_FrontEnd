import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DashboardLayout from "@/Components/Common/DashboardLayout/DashboardLayout";
import Icon from "@/Components/icons/Icon";
import { FINANCE_SUBMENU_ITEMS } from "@/constants/navigation";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import "./Payouts.css";

/* Icon tones follow the client-profile pattern (whole_Profile hiringStats):
   badgeBg + iconColor with explicit Icon size/color/stroke/fill props. */
const STATS = [
  {
    id: "project-value",
    label: "Total Project Value",
    value: "₹64,000",
    sub: "across 3 quests",
    icon: "FileText",
    tone: "blue",
    badgeBg: "#EFF6FF",
    iconColor: "#1D4ED8",
    valueClass: "",
  },
  {
    id: "total-paid",
    label: "Total Paid",
    value: "₹32,000",
    sub: "work paid · plus ₹3,066.67 platform fees",
    icon: "Send",
    tone: "green",
    badgeBg: "#F0FDF4",
    iconColor: "#16A34A",
    valueClass: "",
  },
  {
    id: "in-escrow",
    label: "In Escrow",
    value: "₹18,000",
    sub: "held by TechGuild · released on approval",
    icon: "Shield",
    tone: "orange",
    badgeBg: "#FFF7ED",
    iconColor: "#EA580C",
    valueClass: "",
  },
  {
    id: "upcoming",
    label: "Upcoming Payments",
    value: "₹14,000",
    sub: "1 milestone awaiting your payment",
    icon: "Clock",
    tone: "purple",
    badgeBg: "#F5F3FF",
    iconColor: "#9333EA",
    valueClass: "stat-value--purple",
  },
];

const QUICK_ACTIONS = [
  {
    id: "pay-milestone",
    title: "Pay a Milestone",
    desc: "Review and pay approved milestones",
    icon: "Send",
    tone: "blue",
    badgeBg: "#EFF6FF",
    iconColor: "#1D4ED8",
  },
  {
    id: "payment-methods",
    title: "Payment Methods",
    desc: "Manage cards, bank accounts & UPI",
    icon: "CreditCard",
    tone: "purple",
    badgeBg: "#F5F3FF",
    iconColor: "#9333EA",
  },
  {
    id: "tax-docs",
    title: "Tax Documents",
    desc: "GST invoices & Form 16A",
    icon: "FileText",
    tone: "orange",
    badgeBg: "#FFF7ED",
    iconColor: "#EA580C",
  },
];

function OverviewPanel({ onNavigate, onPay }) {
  return (
    <>
      <div className="fin-stats">
        {STATS.map((s) => (
          <div key={s.id} className="fin-card fin-stat">
            <div className="fin-stat-top">
              <span className="fin-stat-label">{s.label}</span>
              <span
                className={`fin-stat-icon ${s.tone}`}
                style={{ backgroundColor: s.badgeBg, color: s.iconColor }}
              >
                <Icon
                  name={s.icon}
                  size={ICON_SIZES.MD}
                  color={s.iconColor}
                  stroke={s.iconColor}
                  fill="none"
                />
              </span>
            </div>
            <div className={`fin-stat-value ${s.valueClass}`}>{s.value}</div>
            <div className="fin-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="fin-middle">
        <div className="fin-card fin-upcoming">
          <div className="fin-card-head">
            <h3>Upcoming Payments</h3>
            <button
              type="button"
              className="fin-link"
              onClick={() => onNavigate("escrow")}
            >
              Escrow <Icon name="ChevronRight" size={ICON_SIZES.XS} color="#2563eb" stroke="#2563eb" fill="none" />
            </button>
          </div>

          <div className="fin-upcoming-row">
            <div className="fin-upcoming-left">
              <div className="fin-project-name">AI Chatbot Prototype</div>
              <div className="fin-project-meta">M2 · Prototype build · Futura Labs</div>
            </div>
            <div className="fin-upcoming-right">
              <div className="fin-amount-row">
                <span className="fin-amount">₹15,066.67</span>
                <span className="fin-badge">Awaiting Payment</span>
              </div>
              <div className="fin-breakup">work ₹14,000 + 10% platform fee</div>
              <div className="fin-breakup fin-breakup-amount">₹1,066.67</div>
            </div>
          </div>

          <div className="fin-pay-wrap">
            <button type="button" className="fin-pay-btn" onClick={onPay}>
              <Icon name="Send" size={ICON_SIZES.XS} color="#ffffff" stroke="#ffffff" fill="none" /> Pay Now
            </button>
          </div>
        </div>

        <div className="fin-card fin-summary">
          <h3>Payment Summary</h3>
          <div className="fin-summary-row">
            <span>Total charged so far</span>
            <strong>₹35,066.67</strong>
          </div>
          <div className="fin-summary-row">
            <span>Work paid to parties</span>
            <strong>₹32,000</strong>
          </div>
          <div className="fin-summary-row">
            <span>Platform fees paid</span>
            <strong>₹3,066.67</strong>
          </div>
        </div>
      </div>

      <div className="fin-quick-head">
        <h3>Quick Actions</h3>
      </div>
      <div className="fin-quick">
        {QUICK_ACTIONS.map((q) => (
          <button
            key={q.id}
            type="button"
            className="fin-card fin-qa"
            onClick={() =>
              onNavigate(
                q.id === "pay-milestone"
                  ? "escrow"
                  : q.id === "payment-methods"
                    ? "payment-methods"
                    : "tax-documents"
              )
            }
          >
            <span
              className={`fin-qa-icon ${q.tone}`}
              style={{ backgroundColor: q.badgeBg, color: q.iconColor }}
            >
              <Icon
                name={q.icon}
                size={ICON_SIZES.MD}
                color={q.iconColor}
                stroke={q.iconColor}
                fill="none"
              />
            </span>
            <span className="fin-qa-title">{q.title}</span>
            <span className="fin-qa-desc">{q.desc}</span>
          </button>
        ))}
      </div>
    </>
  );
}

const ESCROW_STATS = [
  {
    id: "esc-value",
    label: "Total Project Value",
    value: "₹64,000",
    sub: "amount for the work (to freelancer)",
    icon: "FileText",
    tone: "blue",
    badgeBg: "#EFF6FF",
    iconColor: "#1D4ED8",
    valueClass: "",
  },
  {
    id: "esc-paid",
    label: "Total Paid (Incl. 5% Fee)",
    value: "₹32,000",
    sub: "paid from your wallet",
    icon: "ArrowUp",
    tone: "green",
    badgeBg: "#F0FDF4",
    iconColor: "#16A34A",
    valueClass: "",
  },
  {
    id: "esc-remaining",
    label: "Total Remaining (Incl. 5% Fee)",
    value: "₹32,000",
    sub: "yet to be paid",
    icon: "Clock",
    tone: "orange",
    badgeBg: "#FFF7ED",
    iconColor: "#EA580C",
    valueClass: "stat-value--purple",
  },
];

const ESCROW_PROJECTS = [
  {
    id: "esc-1042",
    name: "AI Chatbot Prototype",
    meta: "Futura AI · ESC-1042",
    status: "Active",
    paidPct: 25,
    summary: [
      { label: "Project Value", value: "₹32,000" },
      { label: "Platform Fee (5%)", value: "₹1,600", sub: "(₹533.33 per milestone)" },
      { label: "Total Amount", value: "₹33,600" },
      { label: "Paid So Far", value: "₹8,800" },
      { label: "Remaining To Pay", value: "₹24,800" },
    ],
    milestones: [
      {
        id: "M1",
        name: "M1 - Research & wireframes",
        note: "Released on 10 Nov 2024",
        feeLine: "₹8,000 + ₹400 fee",
        amount: "₹8,000 paid",
        amountTone: "green",
        breakdown: "₹8,000 to freelancer · ₹400 platform fee",
        badge: "Paid",
        badgeTone: "success",
        action: null,
      },
      {
        id: "M2",
        name: "M2 - Prototype build",
        note: "Approved on 18 Nov 2024",
        extra: "Ready for payment",
        feeLine: "₹14,000 + ₹700 fee",
        amount: "₹14,000",
        amountTone: "",
        breakdown: "₹14,000 to freelancer · ₹700 platform fee",
        badge: "Awaiting payment",
        badgeTone: "warn",
        action: "pay",
      },
      {
        id: "M3",
        name: "M3 - Handover & documentation",
        note: "Pending your approval",
        feeLine: "₹10,000 + ₹500 fee",
        amount: "₹10,000",
        amountTone: "",
        breakdown: "₹10,000 to freelancer · ₹500 platform fee",
        badge: "Upcoming",
        badgeTone: "muted",
        action: "disabled",
      },
    ],
  },
  {
    id: "esc-1031",
    name: "SaaS Dashboard Design",
    meta: "Nebula Pay · ESC-1031",
    status: "Active",
    paidPct: 53,
    summary: [
      { label: "Project Value", value: "₹24,000" },
      { label: "Platform Fee (5%)", value: "₹1,200", sub: "(₹400 per milestone)" },
      { label: "Total Amount", value: "₹25,200" },
      { label: "Paid So Far", value: "₹13,400" },
      { label: "Remaining To Pay", value: "₹11,800" },
    ],
    milestones: [
      {
        id: "M1",
        name: "M1 - Wireframes & style guide",
        note: "Released on 30 Oct 2024",
        feeLine: "₹6,000 + ₹400 fee",
        amount: "₹6,000 paid",
        amountTone: "green",
        breakdown: "₹6,000 to freelancer · ₹400 platform fee",
        badge: "Paid",
        badgeTone: "success",
        action: null,
      },
      {
        id: "M2",
        name: "M2 - Dashboard screens",
        note: "Approved on 12 Nov 2024",
        extra: "Ready for payment",
        feeLine: "₹12,000 + ₹400 fee",
        amount: "₹12,000",
        amountTone: "",
        breakdown: "₹12,000 to freelancer · ₹400 platform fee",
        badge: "Awaiting payment",
        badgeTone: "warn",
        action: "pay",
      },
      {
        id: "M3",
        name: "M3 - Final delivery & handover",
        note: "Pending your approval",
        feeLine: "₹6,000 + ₹400 fee",
        amount: "₹6,000",
        amountTone: "",
        breakdown: "₹6,000 to freelancer · ₹400 platform fee",
        badge: "Upcoming",
        badgeTone: "muted",
        action: "disabled",
      },
    ],
  },
];

/* Pay-review info shared by the escrow Pay Now buttons and the Review Payment
   modal (Image 2). Amounts are parsed from the milestone feeLine so the modal
   always matches the row that was clicked. */
const inr0 = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const toPayInfo = (projectName, m) => {
  const nums = String(m?.feeLine || "")
    .replace(/[^0-9,]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => Number(s.replace(/,/g, "")));
  const subtotal = nums[0] || 0;
  const fee = nums[1] || 0;
  return {
    project: projectName,
    milestone: String(m?.name || "").replace(/\s*-\s*/, " · "),
    approved: [m?.note, m?.extra].filter(Boolean).join(" • "),
    subtotal: inr0(subtotal),
    fee: inr0(fee),
    total: inr0(subtotal + fee),
  };
};

/* Fallback when Pay Now carries no milestone (overview panel) — Figma values. */
const DEFAULT_PAY = {
  project: "AI Chatbot Prototype",
  milestone: "M2 · Prototype build",
  approved: "Approved on 18 Nov 2024 • Ready for payment",
  subtotal: "₹8,000",
  fee: "₹400",
  total: "₹8,400",
};

function EscrowPanel({ onPay }) {
  return (
    <div className="escrow-wrap">
      <div className="fin-stats cols-3">
        {ESCROW_STATS.map((s) => (
          <div key={s.id} className="fin-card fin-stat">
            <div className="fin-stat-top">
              <span className="fin-stat-label">{s.label}</span>
              <span
                className={`fin-stat-icon ${s.tone}`}
                style={{ backgroundColor: s.badgeBg, color: s.iconColor }}
              >
                <Icon
                  name={s.icon}
                  size={ICON_SIZES.MD}
                  color={s.iconColor}
                  stroke={s.iconColor}
                  fill="none"
                />
              </span>
            </div>
            <div className={`fin-stat-value ${s.valueClass}`}>{s.value}</div>
            <div className="fin-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {ESCROW_PROJECTS.map((p) => (
        <div key={p.id} className="fin-card escrow-project">
          <div className="escrow-project-head">
            <div>
              <div className="escrow-project-name">{p.name}</div>
              <div className="fin-project-meta">{p.meta}</div>
            </div>
            <div className="escrow-project-actions">
              <span className="esc-badge esc-badge--active">{p.status}</span>
              <button type="button" className="esc-quest-btn">Go to Quest Board</button>
            </div>
          </div>

          <div className="esc-progress">
            <span style={{ width: `${p.paidPct}%` }} />
          </div>

          <div className="esc-summary">
            {p.summary.map((s) => (
              <div key={s.label} className="esc-summary-cell">
                <span className="esc-summary-label">{s.label}</span>
                <strong className="esc-summary-value">{s.value}</strong>
                {s.sub && <span className="esc-summary-sub">{s.sub}</span>}
              </div>
            ))}
          </div>

          <div className="esc-milestones">
            {p.milestones.map((m) => (
              <div key={m.id} className="esc-ms-row">
                <div className="esc-ms-left">
                  <div className="esc-ms-name">{m.name}</div>
                  <div className="fin-project-meta">{m.note}</div>
                  {m.extra && <div className="esc-ms-ready">{m.extra}</div>}
                </div>
                <div className="esc-ms-right">
                  <div className="esc-ms-amount">{m.amount}</div>
                  <span className={`esc-badge esc-badge--${m.badgeTone}`}>{m.badge}</span>
                  {m.action === "pay" && (
                    <button type="button" className="esc-pay-btn" onClick={() => onPay(toPayInfo(p.name, m))}>Pay Now</button>
                  )}
                  {m.action === "disabled" && (
                    <button type="button" className="esc-pay-btn esc-pay-btn--disabled" disabled>
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const TXN_FILTERS = [
  { id: "all", label: "All" },
  { id: "milestone", label: "Milestone Payments" },
  { id: "fee", label: "Platform Fees" },
  { id: "refund", label: "Refunds" },
  { id: "failed", label: "Failed Payments" },
];

const TRANSACTIONS = [
  {
    id: "TXN-2025-000120",
    kind: "milestone",
    typeLabel: "Milestone Payment",
    icon: "Send",
    tone: "blue",
    badgeBg: "#EFF6FF",
    iconColor: "#1D4ED8",
    project: "SaaS Dashboard Design",
    ref: "M1 · Wireframes & design",
    date: "27 May 2025",
    time: "11:10 AM",
    amount: "−₹6,400",
    amountNum: 6400,
    amountTone: "",
    status: "Completed",
  },
  {
    id: "TXN-2025-000124",
    kind: "fee",
    typeLabel: "Platform Fee",
    icon: "Percent",
    tone: "purple",
    badgeBg: "#F5F3FF",
    iconColor: "#9333EA",
    project: "AI Chatbot Prototype",
    ref: "M2 · Prototype build",
    date: "30 May 2025",
    time: "04:25 PM",
    amount: "−₹700",
    amountNum: 700,
    amountTone: "",
    status: "Completed",
  },
  {
    id: "TXN-2025-000118",
    kind: "refund",
    typeLabel: "Refund",
    icon: "History",
    tone: "green",
    badgeBg: "#F0FDF4",
    iconColor: "#16A34A",
    project: "Mobile App Redesign",
    ref: "M2 · Development (Cancelled)",
    date: "20 May 2025",
    time: "02:10 PM",
    amount: "+₹5,000",
    amountNum: 5000,
    amountTone: "green",
    status: "Completed",
  },
  {
    id: "TXN-2025-000110",
    kind: "milestone",
    typeLabel: "Milestone Payment",
    icon: "Send",
    tone: "blue",
    badgeBg: "#EFF6FF",
    iconColor: "#1D4ED8",
    project: "SaaS Dashboard Design",
    ref: "M2 · Dashboard screens",
    date: "15 May 2025",
    time: "09:40 AM",
    amount: "−₹12,400",
    amountNum: 12400,
    amountTone: "",
    status: "Completed",
  },
  {
    id: "TXN-2025-000109",
    kind: "failed",
    typeLabel: "Failed Payment",
    icon: "History",
    tone: "red",
    badgeBg: "#FDECEC",
    iconColor: "#DC2626",
    project: "Mobile App Redesign",
    ref: "M1 · Research & discovery",
    date: "12 May 2025",
    time: "10:20 AM",
    amount: "−₹8,400",
    amountNum: 8400,
    amountTone: "",
    status: "Failed",
  },
];

const TXN_STATS = [
  { id: "paid", label: "Total Paid", value: "₹35,000", sub: "5 Transactions", icon: "Send", tone: "blue", badgeBg: "#EFF6FF", iconColor: "#1D4ED8" },
  { id: "fees", label: "Total Platform Fees", value: "₹3,500", sub: "5 Transactions", icon: "Percent", tone: "purple", badgeBg: "#F5F3FF", iconColor: "#9333EA" },
  { id: "refunds", label: "Total Refunds", value: "₹5,000", sub: "1 Transaction", icon: "History", tone: "green", badgeBg: "#F0FDF4", iconColor: "#16A34A" },
  { id: "count", label: "Total Transactions", value: "6", sub: "Payments + Refunds", icon: "FileText", tone: "amber", badgeBg: "#FFF7ED", iconColor: "#EA580C" },
];

const FEATURED_TXN_DETAIL = {
  id: "TXN-2025-000123",
  quest: "Website Redesign for Acme Corp",
  milestone: "Milestone 2 – UI/UX Design",
  from: "Acme Corp (Client)",
  to: "PixelCraft Solutions (Your Party)",
  amount: "−₹15,000",
  fee: "−₹450",
  total: "−₹15,450",
  steps: [
    { label: "Initiated", time: "30 May 2025, 04:10 PM" },
    { label: "Processing", time: "30 May 2025, 04:12 PM" },
    { label: "Payment Confirmed", time: "30 May 2025, 04:20 PM" },
    { label: "Completed", time: "30 May 2025, 04:25 PM" },
  ],
  failed: false,
  relatedMilestone: "Milestone 2 – UI/UX Design",
  relatedSub: "Completed on 30 May 2025",
};

function shiftMinutes(timeStr, delta) {
  const m = timeStr.match(/^(\d+):(\d+)\s(AM|PM)$/);
  if (!m) return timeStr;
  let mins = (parseInt(m[1], 10) % 12) + (m[3] === "PM" ? 12 : 0);
  mins = mins * 60 + parseInt(m[2], 10) + delta;
  mins = ((mins % 1440) + 1440) % 1440;
  const h24 = Math.floor(mins / 60);
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mm = String(mins % 60).padStart(2, "0");
  return `${h12}:${mm} ${h24 >= 12 ? "PM" : "AM"}`;
}

function buildTxnDetail(t) {
  if (!t || t.id === FEATURED_TXN_DETAIL.id) return FEATURED_TXN_DETAIL;
  const failed = t.status === "Failed";
  const n = t.amountNum || 0;
  const fee = Math.round(n * 0.03);
  const inr = (v) => `₹${v.toLocaleString("en-IN")}`;
  const sign = t.kind === "refund" ? "+" : "−";
  return {
    id: t.id,
    quest: t.project,
    milestone: t.ref,
    from: t.kind === "refund" ? "TechGuild Escrow" : "You (Client)",
    to: t.kind === "refund" ? "You (Client)" : `${t.project} Team (Party)`,
    amount: `${sign}${inr(n)}`,
    fee: `${sign}${inr(fee)}`,
    total: `${sign}${inr(n + fee)}`,
    steps: failed
      ? [
          { label: "Initiated", time: `${t.date}, ${shiftMinutes(t.time, -15)}` },
          { label: "Processing", time: `${t.date}, ${shiftMinutes(t.time, -13)}` },
          { label: "Failed", time: `${t.date}, ${t.time}`, failed: true },
        ]
      : [
          { label: "Initiated", time: `${t.date}, ${shiftMinutes(t.time, -15)}` },
          { label: "Processing", time: `${t.date}, ${shiftMinutes(t.time, -13)}` },
          { label: "Payment Confirmed", time: `${t.date}, ${shiftMinutes(t.time, -5)}` },
          { label: "Completed", time: `${t.date}, ${t.time}` },
        ],
    failed,
    relatedMilestone: t.ref,
    relatedSub: `${t.status} on ${t.date}`,
  };
}

function TxnDetail({ detail, onBack }) {
  return (
    <div className="txn-detail-wrap">
      <div className="txn-detail-title-row">
        <div>
          <h1 className="finance-title txn-detail-title">Transaction Details</h1>
          <p className="txn-subtitle">View complete information about this transaction.</p>
        </div>
        <button type="button" className="txn-outline-btn">
          <Icon name="Download" size={ICON_SIZES.SM} color="#1D4ED8" stroke="#1D4ED8" fill="none" />
          Download Receipt
        </button>
      </div>

      <div className="txn-detail-grid">
        <div className="fin-card txn-info-card">
          <h3>Transaction Information</h3>
          <div className="txn-info-row">
            <span>Transaction ID</span>
            <strong className="txn-mono">
              {detail.id}
              <Icon name="Copy" size={ICON_SIZES.XS} color="#9AA3B5" stroke="#9AA3B5" fill="none" />
            </strong>
          </div>
          <div className="txn-info-row">
            <span>Quest / Project</span>
            <strong className="txn-link">
              {detail.quest}
              <Icon name="ExternalLink" size={ICON_SIZES.XS} color="#2563EB" stroke="#2563EB" fill="none" />
            </strong>
          </div>
          <div className="txn-info-row">
            <span>Milestone</span>
            <strong>{detail.milestone}</strong>
          </div>
          <div className="txn-info-row">
            <span>From</span>
            <strong className="txn-link">
              {detail.from}
              <Icon name="ExternalLink" size={ICON_SIZES.XS} color="#2563EB" stroke="#2563EB" fill="none" />
            </strong>
          </div>
          <div className="txn-info-row">
            <span>To</span>
            <strong className="txn-link">
              {detail.to}
              <Icon name="ExternalLink" size={ICON_SIZES.XS} color="#2563EB" stroke="#2563EB" fill="none" />
            </strong>
          </div>
          <div className="txn-info-row">
            <span>Milestone Amount</span>
            <strong>{detail.amount}</strong>
          </div>
          <div className="txn-info-row">
            <span>TechGuild Platform Fee</span>
            <strong>{detail.fee}</strong>
          </div>
          <div className="txn-info-row txn-info-total">
            <span>Total Paid</span>
            <strong>{detail.total}</strong>
          </div>
        </div>

        <div className="fin-card txn-status-card">
          <h3>Transaction Status</h3>
          <div className="txn-steps">
            {detail.steps.map((s) => (
              <div key={s.label} className="txn-step">
                <span className={`txn-step-dot ${s.failed ? "txn-step-dot--failed" : ""}`}>
                  <Icon
                    name={s.failed ? "X" : "Check"}
                    size={ICON_SIZES.XS}
                    color="#ffffff"
                    stroke="#ffffff"
                    fill="none"
                  />
                </span>
                <div>
                  <div className="txn-step-label">{s.label}</div>
                  <div className="txn-step-time">{s.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={`txn-result-box ${detail.failed ? "txn-result-box--failed" : ""}`}>
            <Icon
              name={detail.failed ? "CircleX" : "CheckCircle2"}
              size={ICON_SIZES.MD}
              color={detail.failed ? "#DC2626" : "#16A34A"}
              stroke={detail.failed ? "#DC2626" : "#16A34A"}
              fill="none"
            />
            <span>
              {detail.failed
                ? "This payment could not be processed. Please try again or use a different method."
                : "Your payment has been successfully processed."}
            </span>
          </div>
        </div>
      </div>

      <div className="txn-note">
        <Icon name="Info" size={ICON_SIZES.MD} color="#2563EB" stroke="#2563EB" fill="none" />
        <div>
          <strong>Important Note</strong>
          <p>This payment includes the milestone amount and your allocated TechGuild Platform Fee. The platform fee is paid by you on top of the milestone amount and does not reduce the freelancer&apos;s earnings.</p>
        </div>
      </div>

      <div className="txn-bottom-grid">
        <div className="fin-card txn-bottom-card">
          <span className="txn-bottom-ico txn-bottom-ico--purple">
            <Icon name="FileText" size={ICON_SIZES.MD} color="#9333EA" stroke="#9333EA" fill="none" />
          </span>
          <h4>Related Milestone</h4>
          <strong>{detail.relatedMilestone}</strong>
          <span className="txn-bottom-sub">{detail.relatedSub}</span>
          <button type="button" className="txn-white-btn">View Milestone</button>
        </div>
        <div className="fin-card txn-bottom-card">
          <span className="txn-bottom-ico txn-bottom-ico--blue">
            <Icon name="Headphones" size={ICON_SIZES.MD} color="#1D4ED8" stroke="#1D4ED8" fill="none" />
          </span>
          <h4>Need Help?</h4>
          <span className="txn-bottom-sub">If you have any questions about this payment, our support team is here.</span>
          <button type="button" className="txn-white-btn">
            Contact Support
            <Icon name="ExternalLink" size={ICON_SIZES.XS} color="#111F3A" stroke="#111F3A" fill="none" />
          </button>
        </div>
      </div>

      <button type="button" className="txn-back-btn" onClick={onBack}>
        <Icon name="ArrowLeft" size={ICON_SIZES.SM} color="#111F3A" stroke="#111F3A" fill="none" />
        Back to Transactions
      </button>
    </div>
  );
}

function TransactionsPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const txnId = new URLSearchParams(location.search).get("txn");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const openTxn = (id) => navigate(`${location.pathname}?tab=transactions&txn=${id}`);

  if (txnId) {
    const txn = TRANSACTIONS.find((t) => t.id === txnId);
    return (
      <TxnDetail
        detail={buildTxnDetail(txn || null)}
        onBack={() => navigate(`${location.pathname}?tab=transactions`)}
      />
    );
  }

  const visible = TRANSACTIONS.filter((t) => {
    const matchesFilter = filter === "all" || t.kind === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      t.id.toLowerCase().includes(q) ||
      t.project.toLowerCase().includes(q) ||
      t.ref.toLowerCase().includes(q) ||
      t.typeLabel.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="txn-wrap">
      <div className="txn-title-row">
        <div>
          <h1 className="finance-title txn-title">Transaction History</h1>
          <p className="txn-subtitle">View and track all your payment transactions, including milestone payments, platform fees, and refunds.</p>
        </div>
        <button type="button" className="txn-outline-btn">
          <Icon name="Download" size={ICON_SIZES.SM} color="#1D4ED8" stroke="#1D4ED8" fill="none" />
          Export Statement
        </button>
      </div>

      <div className="fin-card txn-filter-card">
        <div className="txn-filter-row">
          <label className="txn-search">
            <Icon name="Search" size={ICON_SIZES.MD} color="#9AA3B5" stroke="#9AA3B5" fill="none" />
            <input
              type="text"
              placeholder="Search by project name, transaction ID, or milestone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <button type="button" className="txn-tool-btn">
            <Icon name="Funnel" size={ICON_SIZES.SM} color="#4B5563" stroke="#4B5563" fill="none" />
            Filters
          </button>
          <button type="button" className="txn-tool-btn">
            <Icon name="Calendar" size={ICON_SIZES.SM} color="#4B5563" stroke="#4B5563" fill="none" />
            24 May 2025 – 30 May 2025
            <Icon name="ChevronDown" size={ICON_SIZES.XS} color="#4B5563" stroke="#4B5563" fill="none" />
          </button>
        </div>
        <div className="txn-pills">
          {TXN_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`txn-pill ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="txn-stats">
        {TXN_STATS.map((s) => (
          <div key={s.id} className="fin-card txn-stat">
            <span
              className={`txn-ico ${s.tone}`}
              style={{ backgroundColor: s.badgeBg, color: s.iconColor }}
            >
              <Icon
                name={s.icon}
                size={ICON_SIZES.MD}
                color={s.iconColor}
                stroke={s.iconColor}
                fill="none"
              />
            </span>
            <div>
              <span className="txn-stat-label">{s.label}</span>
              <div className="txn-stat-value">{s.value}</div>
              <span className="txn-stat-sub">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="fin-card txn-table-card">
        <div className="txn-table-head">
          <span>Transaction</span>
          <span>Project / Reference</span>
          <span>Date &amp; Time</span>
          <span className="txn-col-amount">Amount</span>
          <span>Status</span>
          <span className="txn-col-action">Actions</span>
        </div>
        {visible.map((t) => (
          <div key={t.id} className="txn-row" onClick={() => openTxn(t.id)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openTxn(t.id); }}>
            <div className="txn-cell-txn">
              <span
                className={`txn-ico txn-ico--sm ${t.tone}`}
                style={{ backgroundColor: t.badgeBg, color: t.iconColor }}
              >
                <Icon
                  name={t.icon}
                  size={ICON_SIZES.MD}
                  color={t.iconColor}
                  stroke={t.iconColor}
                  fill="none"
                />
              </span>
              <div>
                <div className="txn-row-name">{t.typeLabel}</div>
                <div className="txn-row-sub">{t.id}</div>
              </div>
            </div>
            <div>
              <div className="txn-row-name">{t.project}</div>
              <div className="txn-row-sub">{t.ref}</div>
            </div>
            <div>
              <div className="txn-row-name">{t.date}</div>
              <div className="txn-row-sub">{t.time}</div>
            </div>
            <div className={`txn-row-amount ${t.amountTone === "green" ? "txn-row-amount--green" : ""}`}>
              {t.amount}
            </div>
            <div>
              <span className={`txn-status-pill ${t.status === "Failed" ? "txn-status-pill--failed" : ""}`}>
                <Icon
                  name={t.status === "Failed" ? "CircleX" : "CheckCircle2"}
                  size={ICON_SIZES.XS}
                  color={t.status === "Failed" ? "#DC2626" : "#16A34A"}
                  stroke={t.status === "Failed" ? "#DC2626" : "#16A34A"}
                  fill="none"
                />
                {t.status}
              </span>
            </div>
            <div className="txn-col-action">
              <span className="txn-action-btn">
                <Icon name="ChevronRight" size={ICON_SIZES.MD} color="#9AA3B5" stroke="#9AA3B5" fill="none" />
              </span>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="txn-empty">No transactions match your filters.</div>
        )}
      </div>

      <div className="txn-footnote">
        <Icon name="Info" size={ICON_SIZES.MD} color="#2563EB" stroke="#2563EB" fill="none" />
        <p>Transactions are updated in real-time. If you don&apos;t see your recent transaction, please refresh the page.</p>
      </div>
    </div>
  );
}

const INITIAL_BANKS = [
  { id: "hdfc", bank: "HDFC Bank", detail: "A/C ··4821 · IFSC HDFC0001234 · Arjun Mehta", last4: "4821", ifsc: "HDFC0001234", primary: true, verified: true },
  { id: "icici", bank: "ICICI Bank", detail: "A/C ··9034 · IFSC ICIC0000789 · Arjun Mehta", last4: "9034", ifsc: "ICIC0000789", primary: false, verified: false },
];

const INITIAL_UPIS = [
  { id: "upi1", handle: "arjun@okhdfc", detail: "UPI · arjun@okhdfc", verified: true },
];

function PaymentMethodsPanel({ banks, upis, onVerifyBank, onRemoveBank, onRemoveUpi, onAdd }) {
  return (
    <div className="pm-wrap">
      <div className="txn-title-row">
        <div>
          <h1 className="finance-title txn-title">Payment Methods</h1>
        </div>
        <button type="button" className="txn-outline-btn" onClick={() => onAdd("card")}>
          <Icon name="Plus" size={ICON_SIZES.SM} color="#1D4ED8" stroke="#1D4ED8" fill="none" />
          Add Payment Method
        </button>
      </div>

      <div className="fin-card pm-card">
        <div className="pm-info">
          <Icon name="ShieldCheck" size={ICON_SIZES.MD} color="#2563EB" stroke="#2563EB" fill="none" />
          <p>Bank accounts are verified with a <strong>₹1 test deposit</strong> before they can be used for withdrawals. Your details are encrypted and never shared with clients.</p>
        </div>

        <div className="pm-section-head">
          <h3>Bank Accounts</h3>
          <button type="button" className="pm-add-btn" onClick={() => onAdd("bank")}>
            <Icon name="Plus" size={ICON_SIZES.XS} color="#334155" stroke="#334155" fill="none" />
            Add Bank Account
          </button>
        </div>

        {banks.map((b) => (
          <div key={b.id} className="pm-row">
            <span className="pm-row-icon pm-ico--blue">
              <Icon name="Landmark" size={ICON_SIZES.DEFAULT} color="#1D4ED8" stroke="#1D4ED8" fill="none" />
            </span>
            <div className="pm-row-text">
              <div className="pm-row-name">{b.bank}</div>
              <div className="pm-row-sub">{b.detail}</div>
            </div>
            <div className="pm-row-right">
              {b.primary && <span className="pm-pill pm-pill--primary">Primary</span>}
              {b.verified ? (
                <span className="pm-pill pm-pill--verified">Verified</span>
              ) : (
                <>
                  <span className="pm-pill pm-pill--unverified">Unverified</span>
                  <button type="button" className="pm-text-btn pm-text-btn--verify" onClick={() => onVerifyBank(b.id)}>
                    Verify
                  </button>
                </>
              )}
              <button type="button" className="pm-text-btn pm-text-btn--remove" onClick={() => onRemoveBank(b.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="pm-section-head">
          <h3>UPI IDs</h3>
          <button type="button" className="pm-add-btn" onClick={() => onAdd("upi")}>
            <Icon name="Plus" size={ICON_SIZES.XS} color="#334155" stroke="#334155" fill="none" />
            Add UPI ID
          </button>
        </div>

        {upis.map((u) => (
          <div key={u.id} className="pm-row">
            <span className="pm-row-icon pm-ico--purple">
              <Icon name="Smartphone" size={ICON_SIZES.DEFAULT} color="#9333EA" stroke="#9333EA" fill="none" />
            </span>
            <div className="pm-row-text">
              <div className="pm-row-name">{u.handle}</div>
              <div className="pm-row-sub">{u.detail}</div>
            </div>
            <div className="pm-row-right">
              <span className="pm-pill pm-pill--verified">Verified</span>
              <button type="button" className="pm-text-btn pm-text-btn--remove" onClick={() => onRemoveUpi(u.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaxDocumentsPanel() {
  return (
    <div className="fin-card fin-panel">
      <div className="fin-card-head">
        <h3>Tax Documents</h3>
      </div>
      <div className="fin-list">
        <div className="fin-list-item">
          <div>
            <div className="fin-project-name">GST Invoices — FY 2026-27</div>
            <div className="fin-project-meta">All platform fee invoices in one place</div>
          </div>
          <button type="button" className="fin-link">Download</button>
        </div>
        <div className="fin-list-item">
          <div>
            <div className="fin-project-name">Form 16A — TDS Certificates</div>
            <div className="fin-project-meta">Issued quarterly for contractor payouts</div>
          </div>
          <button type="button" className="fin-link">Download</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Payment flow modals ---------------- */

function ChooseMethodModal({ banks, upis, selectedId, onSelect, onVerify, onClose, onContinue }) {
  return (
    <div className="pm-modal-backdrop" onClick={onClose}>
      <div className="pm-modal pm-modal--wide" onClick={(e) => e.stopPropagation()}>
        <h3 className="pm-modal-title">Choose Payment Method :</h3>
        <div className="pm-modal-label">Bank Accounts</div>
        {banks.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`pm-choose-row ${selectedId === b.id ? "selected" : ""}`}
            onClick={() => onSelect(b.id)}
          >
            <span className={`pm-radio ${selectedId === b.id ? "on" : ""}`} />
            <span className="pm-row-icon pm-ico--blue">
              <Icon name="Landmark" size={ICON_SIZES.DEFAULT} color="#1D4ED8" stroke="#1D4ED8" fill="none" />
            </span>
            <span className="pm-choose-text">
              <span className="pm-row-name">{b.bank}</span>
              <span className="pm-row-sub">{b.detail}</span>
            </span>
            <span className="pm-row-right">
              {b.primary && <span className="pm-pill pm-pill--primary">Primary</span>}
              {b.verified ? (
                <span className="pm-pill pm-pill--verified">Verified</span>
              ) : (
                <>
                  <span className="pm-pill pm-pill--unverified">Unverified</span>
                  <span
                    className="pm-text-btn pm-text-btn--verify"
                    onClick={(e) => { e.stopPropagation(); onVerify(b.id); }}
                  >
                    Verify
                  </span>
                </>
              )}
            </span>
          </button>
        ))}
        <div className="pm-modal-label">UPI IDs</div>
        {upis.map((u) => (
          <button
            key={u.id}
            type="button"
            className={`pm-choose-row ${selectedId === u.id ? "selected" : ""}`}
            onClick={() => onSelect(u.id)}
          >
            <span className={`pm-radio ${selectedId === u.id ? "on" : ""}`} />
            <span className="pm-row-icon pm-ico--purple">
              <Icon name="Smartphone" size={ICON_SIZES.DEFAULT} color="#9333EA" stroke="#9333EA" fill="none" />
            </span>
            <span className="pm-choose-text">
              <span className="pm-row-name">{u.handle}</span>
              <span className="pm-row-sub">{u.detail}</span>
            </span>
            <span className="pm-row-right">
              <span className="pm-pill pm-pill--verified">Verified</span>
            </span>
          </button>
        ))}
        <div className="pm-choose-foot">
          <button
            type="button"
            className={`pm-btn-primary ${!selectedId ? "pm-btn-disabled" : ""}`}
            disabled={!selectedId}
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

/* Review Payment modal (Figma Image 2) — shown after a payment method is
   chosen, before the payment is initiated. */
function ReviewPayModal({ pay, onClose, onBack, onContinue }) {
  const p = pay || DEFAULT_PAY;
  return (
    <div className="pm-modal-backdrop" onClick={onClose}>
      <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rv-head">
          <div>
            <h3 className="pm-modal-title">Review Payment</h3>
            <p className="pm-modal-sub pm-modal-sub--left">Review the payment details before continuing.</p>
          </div>
          <button type="button" className="rv-close" onClick={onClose} aria-label="Close">
            <Icon name="X" size={ICON_SIZES.MD} color="#64748B" stroke="#64748B" fill="none" />
          </button>
        </div>

        <div className="rv-quest">
          <span className="rv-quest-ico">
            <Icon name="FileText" size={ICON_SIZES.DEFAULT} color="#1D4ED8" stroke="#1D4ED8" fill="none" />
          </span>
          <span className="rv-quest-text">
            <span className="rv-quest-name">{p.project}</span>
            <span className="rv-quest-ms">{p.milestone}</span>
            {p.approved && <span className="rv-quest-note">{p.approved}</span>}
          </span>
        </div>

        <div className="rv-rows">
          <div className="rv-row">
            <span>Milestone Amount (Subtotal)</span>
            <strong>{p.subtotal}</strong>
          </div>
          <div className="rv-row">
            <span>Platform Fee (5%)</span>
            <strong>{p.fee}</strong>
          </div>
        </div>

        <div className="rv-total">
          <span>Total Amount</span>
          <strong>{p.total}</strong>
        </div>

        <div className="pm-modal-actions">
          <button type="button" className="pm-btn-cancel" onClick={onBack}>
            Cancel
          </button>
          <button type="button" className="pm-btn-primary pm-btn--with-icon" onClick={onContinue}>
            Continue
            <Icon name="ArrowRight" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" fill="none" />
          </button>
        </div>
      </div>
    </div>
  );
}

const ADD_TABS = [
  { id: "card", label: "Card", icon: "CreditCard" },
  { id: "upi", label: "UPI", icon: "Smartphone" },
  { id: "bank", label: "Bank", icon: "Landmark" },
];

function AddMethodModal({ initialTab, onClose, onSave }) {
  const [tab, setTab] = useState(initialTab || "card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [remember, setRemember] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [accName, setAccName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [err, setErr] = useState("");

  const switchTab = (id) => { setTab(id); setErr(""); };
  const digits = (v) => v.replace(/\D/g, "");

  const handleSave = () => {
    if (tab === "card") {
      if (!cardName.trim()) return setErr("Please enter the card name.");
      if (digits(cardNumber).length < 12) return setErr("Please enter a valid card number.");
      if (digits(cvc).length < 3) return setErr("Please enter a valid CVC.");
      if (!expiry.trim()) return setErr("Please enter the expiry date.");
      onSave({ kind: "card", title: cardName.trim() });
    } else if (tab === "upi") {
      if (!upiId.includes("@")) return setErr("Please enter a valid UPI ID (e.g. name@bank).");
      onSave({ kind: "upi", handle: upiId.trim() });
    } else {
      if (!accName.trim() || !accNumber.trim() || !ifsc.trim())
        return setErr("Please fill bank name, account number and IFSC.");
      onSave({ kind: "bank", bank: accName.trim(), number: accNumber.trim(), ifsc: ifsc.trim().toUpperCase() });
    }
  };

  return (
    <div className="pm-modal-backdrop" onClick={onClose}>
      <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="pm-modal-title pm-modal-title--center">Add Payment Method</h3>
        <div className="pm-type-tabs">
          {ADD_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`pm-type-tab ${tab === t.id ? "active" : ""}`}
              onClick={() => switchTab(t.id)}
            >
              <Icon
                name={t.icon}
                size={ICON_SIZES.DEFAULT}
                color={tab === t.id ? "#1D4ED8" : "#64748B"}
                stroke={tab === t.id ? "#1D4ED8" : "#64748B"}
                fill="none"
              />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {tab === "card" && (
          <>
            <label className="pm-field">
              <span className="pm-label">Card Name <i>*</i></span>
              <input
                className="pm-input"
                placeholder="XYZ"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </label>
            <label className="pm-field">
              <span className="pm-label">Card Number <i>*</i></span>
              <span className="pm-input-wrap">
                <input
                  className="pm-input"
                  placeholder="2345 - 4567 - 8794 - 2345"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <span className="pm-brand-dots"><i className="b1" /><i className="b2" /><i className="b3" /></span>
              </span>
            </label>
            <div className="pm-row2">
              <label className="pm-field">
                <span className="pm-label">CVC <i>*</i></span>
                <input
                  className="pm-input"
                  placeholder="XYZ"
                  inputMode="numeric"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </label>
              <label className="pm-field">
                <span className="pm-label">Expiry Date <i>*</i></span>
                <input
                  className="pm-input"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </label>
            </div>
            <label className="pm-check-row">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Remember this card for future use</span>
            </label>
          </>
        )}

        {tab === "upi" && (
          <label className="pm-field">
            <span className="pm-label">Enter UPI ID <i>*</i></span>
            <input
              className="pm-input"
              placeholder="e.g., name@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <span className="pm-hint">Enter correct format (name@bank)</span>
          </label>
        )}

        {tab === "bank" && (
          <>
            <label className="pm-field">
              <span className="pm-label">Account Holder Name <i>*</i></span>
              <input
                className="pm-input"
                placeholder="XYZ"
                value={accName}
                onChange={(e) => setAccName(e.target.value)}
              />
            </label>
            <label className="pm-field">
              <span className="pm-label">Account Number <i>*</i></span>
              <input
                className="pm-input"
                placeholder="2345 - 4567 - 8794 - 2345"
                inputMode="numeric"
                value={accNumber}
                onChange={(e) => setAccNumber(e.target.value)}
              />
            </label>
            <label className="pm-field">
              <span className="pm-label">IFSC Code <i>*</i></span>
              <input
                className="pm-input"
                placeholder="2345 - 4567 - 8794 - 2345"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
              />
            </label>
          </>
        )}

        {err && <div className="pm-err">{err}</div>}

        <div className="pm-modal-actions">
          <button type="button" className="pm-btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="pm-btn-primary" onClick={handleSave}>Save &amp; Verify</button>
        </div>
      </div>
    </div>
  );
}

function BankVerifyModal({ last4, ifsc, onCancel, onVerify }) {
  const [busy, setBusy] = useState(false);
  const mounted = React.useRef(true);
  React.useEffect(() => () => { mounted.current = false; }, []);

  const handleVerify = () => {
    setBusy(true);
    setTimeout(() => {
      if (mounted.current) onVerify();
    }, 1200);
  };

  return (
    <div className="pm-modal-backdrop" onClick={onCancel}>
      <div className="pm-modal pm-modal--sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="pm-modal-title pm-modal-title--center">Verify Bank Account</h3>
        <div className="pm-upi-line">
          <span className="pm-mini-check">
            <Icon name="Check" size={ICON_SIZES.XS} color="#ffffff" stroke="#ffffff" fill="none" />
          </span>
          <span>We&apos;re validating your account ending ****{last4} with IFSC {ifsc}</span>
        </div>
        <div className="pm-upi-note">
          • This process is instant and secure.<br />
          • No money will be deducted.
        </div>
        <div className="pm-modal-actions">
          <button type="button" className="pm-btn-cancel" onClick={onCancel}>Cancel</button>
          <button
            type="button"
            className={`pm-btn-primary ${busy ? "pm-btn-disabled" : ""}`}
            disabled={busy}
            onClick={handleVerify}
          >
            {busy ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UpiVerifyModal({ handle, onCancel, onConfirm, onExpire }) {
  const expireRef = React.useRef(onExpire);
  React.useEffect(() => {
    expireRef.current = onExpire;
  });
  React.useEffect(() => {
    const t = setTimeout(() => expireRef.current?.(), 10000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pm-modal-backdrop" onClick={onCancel}>
      <div className="pm-modal pm-modal--sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="pm-modal-title pm-modal-title--center">Verify UPI ID</h3>
        <div className="pm-upi-line">
          <span className="pm-mini-check">
            <Icon name="Check" size={ICON_SIZES.XS} color="#ffffff" stroke="#ffffff" fill="none" />
          </span>
          <span>We&apos;re initiating a ₹1 deduction request to your UPI ID ({handle})</span>
        </div>
        <div className="pm-upi-note">
          • Please open your UPI app within 10 seconds and approve the request.<br />
          • The ₹1 will be refunded back into your account within 24 hours.
        </div>
        <div className="pm-modal-actions">
          <button type="button" className="pm-btn-cancel" onClick={onCancel}>Cancel</button>
          <button type="button" className="pm-btn-primary" onClick={onConfirm}>Confirm Success</button>
        </div>
      </div>
    </div>
  );
}

const DEMO_OTP = "163802";

function VerifyOtpModal({ title, onCancel, onVerified }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const boxes = React.useRef([]);

  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 5) boxes.current[i + 1]?.focus();
  };

  const onKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) boxes.current[i - 1]?.focus();
  };

  const complete = digits.every(Boolean);

  return (
    <div className="pm-modal-backdrop" onClick={onCancel}>
      <div className="pm-modal pm-modal--sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="pm-modal-title pm-modal-title--center">{title}</h3>
        <p className="pm-modal-sub">Enter 6 Digit OTP</p>
        <div className="pm-otp-row">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { boxes.current[i] = el; }}
              className="pm-otp-box"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
            />
          ))}
        </div>
        <div className="pm-modal-actions">
          <button type="button" className="pm-btn-cancel" onClick={onCancel}>Cancel</button>
          <button
            type="button"
            className={`pm-btn-primary ${!complete ? "pm-btn-disabled" : ""}`}
            disabled={!complete}
            onClick={() => onVerified(digits.join("") === DEMO_OTP)}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultModal({ ok, title, message, onClose, onRetry }) {
  return (
    <div className="pm-modal-backdrop" onClick={onClose}>
      <div className="pm-modal pm-modal--sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="pm-modal-title pm-modal-title--center">{title}</h3>
        <div className="pm-modal-divider" />
        <span className={`pm-result-circle ${ok ? "pm-result-circle--success" : "pm-result-circle--failed"}`}>
          <Icon
            name={ok ? "Check" : "X"}
            size={ICON_SIZES["4XL"]}
            color="#ffffff"
            stroke="#ffffff"
            fill="none"
          />
        </span>
        <p className="pm-result-text">{message}</p>
        {!ok && (
          <div className="pm-modal-actions">
            <button type="button" className="pm-btn-cancel" onClick={onClose}>Cancel</button>
            <button type="button" className="pm-btn-primary" onClick={onRetry}>Retry Verification</button>
          </div>
        )}
      </div>
    </div>
  );
}

const VERIFY_TITLES = {
  card: "Verify card",
  bank: "Verify bank account",
  upi: "Verify UPI ID",
};

export default function Payouts() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tabParam = new URLSearchParams(location.search).get("tab");
  const activeTab = FINANCE_SUBMENU_ITEMS.some((t) => t.id === tabParam)
    ? tabParam
    : "overview";
  const goTab = (id) => navigate(`${location.pathname}?tab=${id}`);

  const [banks, setBanks] = useState(INITIAL_BANKS);
  const [upis, setUpis] = useState(INITIAL_UPIS);
  const [chooseOpen, setChooseOpen] = useState(false);
  const [chosenId, setChosenId] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [pendingPay, setPendingPay] = useState(DEFAULT_PAY);
  const [addTab, setAddTab] = useState(null);
  const [verifyCtx, setVerifyCtx] = useState(null);
  const [result, setResult] = useState(null);

  const openPay = (pay) => {
    setPendingPay(pay || DEFAULT_PAY);
    setChooseOpen(true);
  };

  const startVerify = (ctx) => {
    if (chooseOpen) {
      setChooseOpen(false);
      setVerifyCtx({ ...ctx, returnTo: "choose" });
    } else {
      setVerifyCtx({ ...ctx, returnTo: null });
    }
  };

  const handleOtpVerified = (ok) => {
    const ctx = verifyCtx;
    setVerifyCtx(null);
    if (!ok) {
      const isUpi = ctx.kind === "upi";
      setResult({
        ok: false,
        title: isUpi ? "We couldn't verify your UPI ID" : "Verification Failed",
        message: isUpi
          ? "Please check your UPI app and try again."
          : "We couldn't verify your card. Please try again.",
        retry: () => {
          setResult(null);
          setVerifyCtx(ctx);
        },
      });
      return;
    }
    if (ctx.kind === "upi") {
      if (ctx.payload) {
        setUpis((prev) => [
          ...prev,
          { id: `upi-${Date.now()}`, handle: ctx.payload.handle, detail: `UPI · ${ctx.payload.handle}`, verified: true },
        ]);
      }
      setResult({ ok: true, title: "Payment Method Updated", message: "UPI ID verified successfully." });
    } else {
      setResult({ ok: true, title: "Payment Method Updated", message: "Your card has been verified successfully." });
    }
  };

  const handleBankVerify = () => {
    const ctx = verifyCtx;
    setVerifyCtx(null);
    const stored = ctx.bankId ? banks.find((b) => b.id === ctx.bankId) : null;
    const num = ctx.payload ? ctx.payload.number : stored?.last4 || "";
    const code = (ctx.payload ? ctx.payload.ifsc : stored?.ifsc || "").toUpperCase();
    const valid = num.replace(/\D/g, "").length >= 9 && /^[A-Z]{4}0[A-Z0-9]{6}$/.test(code);
    if (!valid) {
      setResult({
        ok: false,
        title: "We couldn't verify your bank account.",
        message: "We couldn't verify your account. Please check details and try again.",
        retry: () => {
          setResult(null);
          setVerifyCtx(ctx);
        },
      });
      return;
    }
    if (ctx.payload) {
      const last4 = ctx.payload.number.replace(/\D/g, "").slice(-4);
      setBanks((prev) => [
        ...prev,
        {
          id: `bank-${Date.now()}`,
          bank: ctx.payload.bank,
          detail: `A/C ··${last4} · IFSC ${ctx.payload.ifsc.toUpperCase()} · Arjun Mehta`,
          last4,
          ifsc: ctx.payload.ifsc.toUpperCase(),
          primary: false,
          verified: true,
        },
      ]);
    } else if (ctx.bankId) {
      setBanks((prev) => prev.map((b) => (b.id === ctx.bankId ? { ...b, verified: true } : b)));
    }
    if (ctx.returnTo === "choose") {
      setChooseOpen(true);
    } else {
      setResult({ ok: true, title: "Payment Method Updated", message: "Bank account verified successfully." });
    }
  };

  const handleAddSave = (payload) => {
    setAddTab(null);
    startVerify({ kind: payload.kind, payload, bankId: null });
  };

  const handleChooseContinue = () => {
    const method = [...banks, ...upis].find((x) => x.id === chosenId);
    if (method && method.verified === false) {
      startVerify({ kind: "bank", bankId: method.id, payload: null });
      return;
    }
    setChooseOpen(false);
    setReviewOpen(true);
  };

  const handleReviewBack = () => {
    setReviewOpen(false);
    setChooseOpen(true);
  };

  const handleReviewContinue = () => {
    const method = [...banks, ...upis].find((x) => x.id === chosenId);
    setReviewOpen(false);
    dispatch(showSnackbar({
      message: `Milestone payment initiated with ${method ? method.bank || method.handle : "selected method"}.`,
      type: "success",
    }));
  };

  return (
    <DashboardLayout
      searchPlaceholder="Search projects, clients, or freelancers..."
      mainWorkspaceClass="client-finance-workspace"
    >
      <div className="finance-page">
        <div className="finance-main">
          {activeTab !== "transactions" && activeTab !== "payment-methods" && (
            <h1 className="finance-title">
              {activeTab === "overview"
                ? "Finance Overview"
                : FINANCE_SUBMENU_ITEMS.find((t) => t.id === activeTab)?.label}
            </h1>
          )}

          {activeTab === "overview" && <OverviewPanel onNavigate={goTab} onPay={openPay} />}
          {activeTab === "escrow" && <EscrowPanel onPay={openPay} />}
          {activeTab === "transactions" && <TransactionsPanel />}
          {activeTab === "payment-methods" && (
            <PaymentMethodsPanel
              banks={banks}
              upis={upis}
              onVerifyBank={(bankId) => startVerify({ kind: "bank", bankId, payload: null })}
              onRemoveBank={(bankId) => setBanks((prev) => prev.filter((b) => b.id !== bankId))}
              onRemoveUpi={(upiId) => setUpis((prev) => prev.filter((u) => u.id !== upiId))}
              onAdd={(tab) => setAddTab(tab)}
            />
          )}
          {activeTab === "tax-documents" && <TaxDocumentsPanel />}

          {chooseOpen && (
            <ChooseMethodModal
              banks={banks}
              upis={upis}
              selectedId={chosenId}
              onSelect={setChosenId}
              onVerify={(bankId) => startVerify({ kind: "bank", bankId, payload: null })}
              onClose={() => setChooseOpen(false)}
              onContinue={handleChooseContinue}
            />
          )}
          {reviewOpen && (
            <ReviewPayModal
              pay={pendingPay}
              onClose={() => setReviewOpen(false)}
              onBack={handleReviewBack}
              onContinue={handleReviewContinue}
            />
          )}
          {addTab && (
            <AddMethodModal
              initialTab={addTab}
              onClose={() => setAddTab(null)}
              onSave={handleAddSave}
            />
          )}
          {verifyCtx && verifyCtx.kind === "upi" && (
            <UpiVerifyModal
              handle={verifyCtx.payload?.handle || ""}
              onCancel={() => {
                setVerifyCtx(null);
                if (verifyCtx.returnTo === "choose") setChooseOpen(true);
              }}
              onConfirm={() => handleOtpVerified(true)}
              onExpire={() => handleOtpVerified(false)}
            />
          )}
          {verifyCtx && verifyCtx.kind === "bank" && (
            <BankVerifyModal
              last4={verifyCtx.payload
                ? verifyCtx.payload.number.replace(/\D/g, "").slice(-4)
                : banks.find((b) => b.id === verifyCtx.bankId)?.last4 || ""}
              ifsc={verifyCtx.payload
                ? verifyCtx.payload.ifsc.toUpperCase()
                : banks.find((b) => b.id === verifyCtx.bankId)?.ifsc || ""}
              onCancel={() => {
                setVerifyCtx(null);
                if (verifyCtx.returnTo === "choose") setChooseOpen(true);
              }}
              onVerify={handleBankVerify}
            />
          )}
          {verifyCtx && verifyCtx.kind === "card" && (
            <VerifyOtpModal
              title={VERIFY_TITLES[verifyCtx.kind] || "Verify card"}
              onCancel={() => {
                setVerifyCtx(null);
                if (verifyCtx.returnTo === "choose") setChooseOpen(true);
              }}
              onVerified={handleOtpVerified}
            />
          )}
          {result && (
            <ResultModal
              ok={result.ok}
              title={result.title}
              message={result.message}
              onClose={() => setResult(null)}
              onRetry={result.retry}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
