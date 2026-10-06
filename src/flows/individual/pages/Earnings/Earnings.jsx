import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/Components/Common/DashboardLayout/DashboardLayout";
import Icon from "@/Components/icons/Icon";
import WalletSvg from "@/assets/icons/wallet.svg?react";
import { INDIVIDUAL_FINANCE_SUBMENU_ITEMS } from "@/constants/navigation";
import { ICON_SIZES } from "@/constants/sizes";
import "./earnings.css";

/* Local icon wrapper — finance flow only (shared Components left untouched).
   Bundled SVGs hardcode #6A717D on inner paths, so color props are ignored;
   the .fin-ic rules in earnings.css remap that gray to currentColor. */
function FinIcon({ name, size = ICON_SIZES.MD, color = "currentColor", stroke, strokeWidth = 1.75, fill = "none", ...rest }) {
  const strokeValue = stroke || color;
  return (
    <span className="fin-ic" style={{ color }}>
      {name === "Wallet" ? (
        <WalletSvg width={size} height={size} aria-hidden="true" {...rest} />
      ) : (
        <Icon name={name} size={size} color={color} stroke={strokeValue} strokeWidth={strokeWidth} fill={fill} {...rest} />
      )}
    </span>
  );
}

const VALID_TABS = INDIVIDUAL_FINANCE_SUBMENU_ITEMS.map((t) => t.id);
const AVAILABLE_TO_WITHDRAW = 18500;
const PENDING_EXCLUDED = 6000;

const inr2 = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ================= Overview data ================= */
const STATS = [
  { id: "available", label: "Total Available Balance", value: "₹22,450", sub: "Available for withdrawal", growth: "+12.8% this month", cta: true },
  { id: "pending", label: "Pending Balance", value: "₹18,000", valueTone: "orange", sub: "Waiting for milestone approval", icon: "Clock", badgeBg: "#FEF3C7", iconColor: "#D97706" },
  { id: "earned", label: "Total Earned", value: "₹8,25,000", sub: "Lifetime earnings", icon: "TrendingUp", badgeBg: "#DCFCE7", iconColor: "#16A34A" },
  { id: "withdrawn", label: "Withdrawn", value: "₹6,75,000", sub: "Transferred to bank", icon: "Building2", badgeBg: "#DBEAFE", iconColor: "#2563EB" },
  { id: "quests", label: "Active Quests", value: "04", sub: "Currently earning", icon: "Briefcase", badgeBg: "#F3E8FF", iconColor: "#9333EA" },
];

const QUICK_ACTIONS = [
  { id: "withdraw-funds", title: "Withdraw Funds", desc: "Transfer money to your bank account", icon: "CreditCard", badgeBg: "#DBEAFE", iconColor: "#2563EB" },
  { id: "payment-methods", title: "Add Bank Account", desc: "Add or manage your bank accounts", icon: "Building2", badgeBg: "#DCFCE7", iconColor: "#16A34A" },
  { id: "payment-methods", title: "Payment Methods", desc: "Manage your payment methods", icon: "CreditCard", badgeBg: "#F3E8FF", iconColor: "#9333EA" },
  { id: "tax-documents", title: "Tax Documents", desc: "Download your tax related documents", icon: "FileText", badgeBg: "#FEF3C7", iconColor: "#D97706" },
];

const RECENT_TXNS = [
  { id: "t1", type: "Milestone Payment", quest: "Website Redesign", date: "30 May 2025", amount: "+₹15,000", amountTone: "green", status: "Completed", icon: "Check", badgeBg: "#DCFCE7", iconColor: "#16A34A" },
  { id: "t2", type: "Withdrawal", quest: "—", date: "28 May 2025", amount: "-₹10,000", amountTone: "", status: "Completed", icon: "ArrowDown", badgeBg: "#DBEAFE", iconColor: "#2563EB" },
  { id: "t3", type: "Refund", quest: "Mobile App Design", date: "25 May 2025", amount: "+₹5,000", amountTone: "green", status: "Completed", icon: "History", badgeBg: "#F3E8FF", iconColor: "#9333EA" },
  { id: "t4", type: "Platform Fee", quest: "Website Redesign", date: "24 May 2025", amount: "-₹500", amountTone: "", status: "Deducted", icon: "Percent", badgeBg: "#FEF3C7", iconColor: "#D97706" },
  { id: "t5", type: "Escrow Release", quest: "Dashboard Development", date: "20 May 2025", amount: "+₹25,000", amountTone: "green", status: "Completed", icon: "ShieldCheck", badgeBg: "#DCFCE7", iconColor: "#16A34A" },
];

const PENDING_RELEASES = [
  { id: "p1", milestone: "Website Dashboard", quest: "Website Redesign", release: "Tomorrow", amount: "₹8,500" },
  { id: "p2", milestone: "Mobile App", quest: "Mobile App Design", release: "3 Days", amount: "₹12,000" },
];

function EarningsChart() {
  const line = "M10,150 C45,143 85,134 120,132 C155,130 195,135 230,138 C265,141 305,130 340,116 C375,102 410,54 445,38 C480,22 515,60 550,104";
  const area = `${line} L550,214 L10,214 Z`;
  const dots = [[120, 132], [230, 138], [340, 116], [445, 38], [550, 104]];
  return (
    <div className="ind-chart-wrap">
      <div className="ind-chart-y"><span>₹160k</span><span>₹120k</span><span>₹80k</span><span>₹40k</span><span>₹0</span></div>
      <div className="ind-chart-svg-wrap">
        <svg viewBox="0 0 560 220" className="ind-chart-svg" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="indEarnFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[20, 65, 110, 155, 200].map((y) => (<line key={y} x1="10" y1={y} x2="550" y2={y} stroke="#E8EDF5" strokeWidth="1" opacity="0.9" />))}
          <path d={area} fill="url(#indEarnFill)" />
          <path d={line} fill="none" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
          {dots.map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="9" fill="#DBEAFE" opacity="0.55" />
              <circle cx={cx} cy={cy} r="4.5" fill="#fff" stroke="#BFDBFE" strokeWidth="3" />
            </g>
          ))}
        </svg>
        <div className="ind-chart-x"><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span></div>
      </div>
    </div>
  );
}

function OverviewPanel({ onNavigate, onWithdraw, onDownload }) {
  const [range, setRange] = useState("Last 6 Months");
  return (
    <>
      <div className="ind-fin-head">
        <div><h1 className="ind-fin-title">Finance Dashboard</h1><p className="ind-fin-sub">Manage your earnings, withdrawals and transactions.</p></div>
        <button type="button" className="ind-outline-btn ind-outline-btn--blue" onClick={onDownload}>
          <FinIcon name="Download" size={ICON_SIZES.SM} color="#1D4ED8" stroke="#1D4ED8" fill="none" /> Download Statement
        </button>
      </div>
      <div className="ind-fin-stats">
        {STATS.map((s) => s.cta ? (
          <div key={s.id} className="ind-card ind-stat ind-stat--balance">
            <div className="ind-stat-label">{s.label}<FinIcon name="Eye" size={ICON_SIZES.XS} color="#9AA3B5" stroke="#9AA3B5" fill="none" /></div>
            <div className="ind-stat-value">{s.value}</div>
            <div className="ind-stat-sub">{s.sub}</div>
            <div className="ind-growth-pill">↗ {s.growth}</div>
            <button type="button" className="ind-primary-btn" onClick={onWithdraw}>
              <FinIcon name="Wallet" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" fill="none" /> Withdraw Funds
            </button>
          </div>
        ) : (
          <div key={s.id} className="ind-card ind-stat">
            <div className="ind-stat-top"><span className="ind-stat-ico" style={{ backgroundColor: s.badgeBg, color: s.iconColor }}><FinIcon name={s.icon} size={ICON_SIZES.LG} color={s.iconColor} stroke={s.iconColor} fill="none" /></span></div>
            <div className="ind-stat-label">{s.label}</div>
            <div className={`ind-stat-value ${s.valueTone === "orange" ? "orange" : ""}`}>{s.value}</div>
            <div className="ind-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="ind-fin-middle">
        <div className="ind-card ind-chart-card">
          <div className="ind-card-head">
            <div><h3>Monthly Earnings</h3><p>Track your income over time.</p></div>
            <label className="ind-range">
              <select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Select range">
                <option>Last 6 Months</option><option>Last 3 Months</option><option>Last 12 Months</option>
              </select>
              <FinIcon name="ChevronDown" size={ICON_SIZES.XS} color="#6B7280" stroke="#6B7280" fill="none" />
            </label>
          </div>
          <EarningsChart />
        </div>
        <div className="ind-card ind-qa-card">
          <h3>Quick Actions</h3>
          {QUICK_ACTIONS.map((q) => (
            <button key={q.title} type="button" className="ind-qa-row" onClick={() => onNavigate(q.id)}>
              <span className="ind-qa-ico" style={{ backgroundColor: q.badgeBg, color: q.iconColor }}><FinIcon name={q.icon} size={ICON_SIZES.MD} color={q.iconColor} stroke={q.iconColor} fill="none" /></span>
              <span className="ind-qa-text"><strong>{q.title}</strong><small>{q.desc}</small></span>
              <FinIcon name="ChevronRight" size={ICON_SIZES.MD} color="#C3CAD6" stroke="#C3CAD6" fill="none" />
            </button>
          ))}
        </div>
      </div>
      <div className="ind-fin-bottom">
        <div className="ind-card ind-txn-card">
          <div className="ind-card-head"><h3>Recent Transactions</h3><button type="button" className="ind-link" onClick={() => onNavigate("transactions")}>View All</button></div>
          <div className="ind-txn-head"><span>TRANSACTION</span><span>QUEST / MILESTONE</span><span>DATE</span><span className="r">AMOUNT</span><span className="r">STATUS</span></div>
          {RECENT_TXNS.map((t) => (
            <div key={t.id} className="ind-txn-row">
              <span className="ind-txn-name"><span className="ind-txn-ico" style={{ backgroundColor: t.badgeBg, color: t.iconColor }}><FinIcon name={t.icon} size={ICON_SIZES.XS} color={t.iconColor} stroke={t.iconColor} fill="none" /></span>{t.type}</span>
              <span className="ind-txn-quest">{t.quest}</span><span className="ind-txn-date">{t.date}</span>
              <span className="ind-txn-amt r">{t.amount}</span>
              <span className="r"><span className={`ind-pill ${t.status === "Deducted" ? "muted" : "success"}`}>{t.status}</span></span>
            </div>
          ))}
        </div>
        <div className="ind-card ind-insight-card">
          <h3>Earnings Insights</h3>
          <div className="ind-insight-label">HIGHEST EARNING MONTH</div>
          <div className="ind-insight-month">April</div>
          <div className="ind-insight-value">₹1,00,000</div>
          <div className="ind-insight-note"><FinIcon name="TrendingUp" size={ICON_SIZES.XS} color="#16A34A" stroke="#16A34A" fill="none" /><span>Great job! Your earnings are growing.</span></div>
          <div className="ind-insight-div" />
          <div className="ind-card-head"><h4>Pending Releases</h4><button type="button" className="ind-link" onClick={() => onNavigate("escrow")}>View All</button></div>
          <div className="ind-rel-head"><span>MILESTONE</span><span>QUEST</span><span>RELEASE</span><span className="r">AMOUNT</span></div>
          {PENDING_RELEASES.map((p) => (
            <div key={p.id} className="ind-rel-row"><span className="ind-rel-m">{p.milestone}</span><span className="ind-rel-q">{p.quest}</span><span className="ind-rel-r warn">{p.release}</span><span className="ind-rel-a r">{p.amount}</span></div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ================= Withdraw wizard ================= */
const WITHDRAW_METHODS = [
  { id: "hdfc", kind: "bank", title: "HDFC Bank", sub: "A/C ··4821 · IFSC HDFC0001234", tags: [{ label: "Primary", tone: "primary" }, { label: "Verified", tone: "success" }], verified: true, icon: "Landmark", badgeBg: "#DBEAFE", iconColor: "#2563EB", destLine: "HDFC Bank · A/C ••4821" },
  { id: "upi", kind: "upi", title: "arjun@okhdfc", sub: "UPI · arjun@okhdfc", tags: [{ label: "Verified", tone: "success" }], verified: true, icon: "Smartphone", badgeBg: "#F3E8FF", iconColor: "#9333EA", destLine: "arjun@okhdfc · UPI · arjun@okhdfc" },
  { id: "icici", kind: "bank", title: "ICICI Bank", sub: "A/C ··9034 · IFSC ICIC0000789", tags: [{ label: "Unverified", tone: "warn" }], verified: false, icon: "Landmark", badgeBg: "#DBEAFE", iconColor: "#2563EB", destLine: "ICICI Bank · A/C ••9034" },
];

function WithdrawStepper({ step }) {
  const items = [{ n: 1, label: "Amount" }, { n: 2, label: "Method" }, { n: 3, label: "Review" }];
  return (
    <div className="wd-stepper">
      {items.map((it, i) => {
        const active = step === it.n;
        const done = step > it.n;
        const state = done || active ? "on" : "";
        return (
          <React.Fragment key={it.n}>
            <div className={`wd-step ${state}`}>
              <span className="wd-dot">{it.n}</span>
              <span className="wd-label">{it.label}</span>
            </div>
            {i < items.length - 1 && <span className={`wd-line ${step > it.n ? "on" : ""}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function WithdrawShell({ step, children }) {
  return (
    <div className="ind-finance-inner wd-page">
      <h1 className="ind-fin-title">Withdraw Funds</h1>
      <p className="ind-fin-sub">Withdraw your funds into your bank account.</p>
      <div className="wd-card">
        <WithdrawStepper step={step} />
        {children}
      </div>
      <div className="wd-bottom-note">
        <FinIcon name="Info" size={ICON_SIZES.XS} color="#D97706" stroke="#D97706" fill="none" />
        <span>Please ensure your payment details are correct. Withdrawals to incorrect accounts may be delayed.</span>
      </div>
    </div>
  );
}

function AmountStep({ amount, setAmount, onCancel, onContinue }) {
  const num = Number(String(amount).replace(/[^0-9.]/g, "")) || 0;
  const canGo = num > 0 && num <= AVAILABLE_TO_WITHDRAW;
  const quick = (pct) => String(Math.round((AVAILABLE_TO_WITHDRAW * pct) / 1));
  return (
    <WithdrawShell step={1}>
      <div className="wd-info-box">
        <FinIcon name="Info" size={ICON_SIZES.SM} color="#2563EB" stroke="#2563EB" fill="none" />
        <p>Available to withdraw: <strong>{inr2(AVAILABLE_TO_WITHDRAW)}</strong> · This excludes <strong>{inr2(PENDING_EXCLUDED)} pending</strong> and anything held in escrow.</p>
      </div>
      <div className="wd-label-bold">Enter amount</div>
      <div className={`wd-amount-box ${num > 0 ? "filled" : ""}`}>
        <span className="wd-rs">₹</span>
        <input
          value={amount === "0" || amount === "0.00" ? "" : amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0.00"
          inputMode="decimal"
          aria-label="Enter amount"
        />
      </div>
      <div className="wd-chips">
        <button type="button" className="wd-chip" onClick={() => setAmount(quick(0.25))}>25%</button>
        <button type="button" className="wd-chip" onClick={() => setAmount(quick(0.5))}>50%</button>
        <button type="button" className="wd-chip" onClick={() => setAmount(String(AVAILABLE_TO_WITHDRAW))}>Full amount</button>
      </div>
      {num > AVAILABLE_TO_WITHDRAW && <div className="wd-err">Amount cannot exceed {inr2(AVAILABLE_TO_WITHDRAW)}.</div>}
      <div className="wd-actions">
        <button type="button" className="wd-btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="button" className={`wd-btn-continue ${canGo ? "enabled" : ""}`} disabled={!canGo} onClick={onContinue}>
          Continue <FinIcon name="ChevronRight" size={ICON_SIZES.XS} color={canGo ? "#fff" : "#fff"} stroke={canGo ? "#fff" : "#fff"} fill="none" />
        </button>
      </div>
    </WithdrawShell>
  );
}

function MethodStep({ selectedId, setSelectedId, onAddBank, onAddUpi, onContinue }) {
  const sel = WITHDRAW_METHODS.find((m) => m.id === selectedId);
  const canGo = sel && sel.verified;
  return (
    <WithdrawShell step={2}>
      <div className="wd-methods">
        {WITHDRAW_METHODS.map((m) => {
          const checked = selectedId === m.id;
          return (
            <button key={m.id} type="button" className={`wd-method ${checked ? "selected" : ""}`} onClick={() => setSelectedId(m.id)}>
              <span className={`wd-radio ${checked ? "on" : ""}`}>{checked && <span />}</span>
              <span className="wd-method-ico" style={{ backgroundColor: m.badgeBg, color: m.iconColor }}>
                <FinIcon name={m.icon} size={ICON_SIZES.MD} color={m.iconColor} stroke={m.iconColor} fill="none" />
              </span>
              <span className="wd-method-text"><strong>{m.title}</strong><small>{m.sub}</small></span>
              <span className="wd-tags">
                {m.tags.map((t) => (<span key={t.label} className={`ind-pill ${t.tone}`}>{t.label}</span>))}
              </span>
            </button>
          );
        })}
      </div>
      <div className="wd-actions wd-actions--method">
        <div className="wd-add-row">
          <button type="button" className="wd-add-btn" onClick={onAddBank}>+ Add Bank Account</button>
          <button type="button" className="wd-add-btn" onClick={onAddUpi}>+ Add UPI ID</button>
        </div>
        <button type="button" className={`wd-btn-continue ${canGo ? "enabled" : ""}`} disabled={!canGo} onClick={onContinue}>
          {canGo ? (<>Continue <FinIcon name="ChevronRight" size={ICON_SIZES.XS} color="#fff" stroke="#fff" fill="none" /></>) : "Select a verified method"}
        </button>
      </div>
    </WithdrawShell>
  );
}

function ReviewStep({ amount, method, confirmed, setConfirmed, onConfirm }) {
  const num = Number(String(amount).replace(/[^0-9.]/g, "")) || 0;
  return (
    <WithdrawShell step={3}>
      <div className="wd-info-box">
        <FinIcon name="Info" size={ICON_SIZES.SM} color="#2563EB" stroke="#2563EB" fill="none" />
        <p><strong>Check everything carefully. Once confirmed, the money leaves your Available Balance immediately.</strong></p>
      </div>
      <div className="wd-review">
        <div className="wd-review-row"><span>Withdrawal amount</span><strong>{inr2(num)}</strong></div>
        <div className="wd-review-row"><span>Destination</span><strong className="wd-dest">{method ? method.destLine : "—"}</strong></div>
        <div className="wd-review-row"><span>Withdrawal fee</span><strong>{inr2(0)}</strong></div>
        <div className="wd-review-row"><span>You&apos;ll receive</span><strong className="green">{inr2(num)}</strong></div>
        <div className="wd-review-row"><span>Expected arrival</span><strong>1–3 business days</strong></div>
      </div>
      <button type="button" className="wd-confirm-line" onClick={() => setConfirmed(!confirmed)}>
        <span className={`wd-check ${confirmed ? "on" : ""}`}>{confirmed && <FinIcon name="Check" size={ICON_SIZES["2XS"]} color="#fff" stroke="#fff" fill="none" />}</span>
      </button>
      <div className="wd-confirm-text">I confirm the destination details above are correct.</div>
      <div className="wd-actions wd-actions--right">
        <button type="button" className={`wd-btn-confirm ${confirmed ? "enabled" : ""}`} disabled={!confirmed} onClick={onConfirm}>
          <FinIcon name="Send" size={ICON_SIZES.XS} color="#fff" stroke="#fff" fill="none" /> Confirm Withdrawal
        </button>
      </div>
    </WithdrawShell>
  );
}

function SuccessStep({ amount, method, refCode, onViewStatus, onBackOverview }) {
  const num = Number(String(amount).replace(/[^0-9.]/g, "")) || 0;
  return (
    <div className="ind-finance-inner wd-page">
      <h1 className="ind-fin-title">Withdraw Funds</h1>
      <p className="ind-fin-sub">Withdraw your funds into your bank account.</p>
      <div className="wd-card wd-success">
        <div className="wd-success-ico"><FinIcon name="Send" size={ICON_SIZES["3XL"]} color="#16A34A" stroke="#16A34A" fill="none" /></div>
        <h2>Withdrawal submitted</h2>
        <p className="wd-success-line"><strong>{inr2(num)}</strong> is on its way to <strong>{method ? method.destLine : ""}</strong>.</p>
        <span className="wd-ref">Ref {refCode}</span>
        <p className="wd-success-sub">Expected arrival: 1–3 business days. We&apos;ll notify you at every step — no need to keep this page open.</p>
        <div className="wd-success-actions">
          <button type="button" className="wd-btn-view" onClick={onViewStatus}>View Status</button>
          <button type="button" className="wd-btn-back" onClick={onBackOverview}>Back to Overview</button>
        </div>
      </div>
      <div className="wd-bottom-note">
        <FinIcon name="Info" size={ICON_SIZES.XS} color="#D97706" stroke="#D97706" fill="none" />
        <span>Please ensure your payment details are correct. Withdrawals to incorrect accounts may be delayed.</span>
      </div>
    </div>
  );
}

function WithdrawFundsPanel({ goTab, goOverview }) {
  const [wstep, setWstep] = useState(1);
  const [amount, setAmount] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [refCode, setRefCode] = useState("WDL-3399");
  const [toast, setToast] = useState("");

  const method = WITHDRAW_METHODS.find((m) => m.id === selectedId) || null;

  const handleAdd = (kind) => {
    setToast(kind === "bank" ? "Bank account form — use Payment Methods tab to add." : "UPI form — use Payment Methods tab to add.");
    setTimeout(() => setToast(""), 2200);
  };

  if (wstep === 4) {
    return (<><SuccessStep amount={amount} method={method} refCode={refCode} onViewStatus={() => goTab("withdrawal-history")} onBackOverview={goOverview} />{toast && <div className="ind-toast">{toast}</div>}</>);
  }
  return (
    <>
      {wstep === 1 && <AmountStep amount={amount} setAmount={setAmount} onCancel={goOverview} onContinue={() => setWstep(2)} />}
      {wstep === 2 && <MethodStep selectedId={selectedId} setSelectedId={setSelectedId} onAddBank={() => handleAdd("bank")} onAddUpi={() => handleAdd("upi")} onContinue={() => { setConfirmed(false); setWstep(3); }} />}
      {wstep === 3 && <ReviewStep amount={amount} method={method} confirmed={confirmed} setConfirmed={setConfirmed} onConfirm={() => { setRefCode(`WDL-${Math.floor(1000 + Math.random() * 9000)}`); setWstep(4); }} />}
      {toast && <div className="ind-toast">{toast}</div>}
    </>
  );
}

/* ================= Withdrawal History (Image 3) ================= */
const WD_STATS = [
  { id: "total", label: "Total Withdrawn", value: "₹6,75,000.00", sub: "12 Withdrawals", icon: "CreditCard", badgeBg: "#DCFCE7", iconColor: "#16A34A" },
  { id: "proc", label: "Processing", value: "₹50,000.00", sub: "1 Withdrawal", icon: "Clock", badgeBg: "#FEF3C7", iconColor: "#D97706" },
  { id: "comp", label: "Completed", value: "₹6,15,000.00", sub: "9 Withdrawals", icon: "CheckCircle2", badgeBg: "#DBEAFE", iconColor: "#2563EB" },
  { id: "fail", label: "Failed", value: "₹10,000.00", sub: "1 Withdrawal", icon: "CircleX", badgeBg: "#FDECEC", iconColor: "#DC2626" },
];

const WD_ROWS = [
  { id: "WD-2025-05-06790", bank: "ICICI Bank ···· 4587", amount: "₹25,000.00", req: "29 May 2025", exp: "31 May 2025", status: "Completed" },
  { id: "WD-2025-05-06789", bank: "ICICI Bank ···· 4587", amount: "₹50,000.00", req: "30 May 2025", exp: "1 Jun 2025", status: "Processing" },
  { id: "WD-2025-05-06788", bank: "HDFC Bank ···· 1234", amount: "₹75,000.00", req: "28 May 2025", exp: "30 May 2025", status: "Completed" },
  { id: "WD-2025-05-06787", bank: "Axis Bank ···· 9676", amount: "₹10,000.00", req: "27 May 2025", exp: "—", status: "Failed" },
];

function WithdrawalHistoryPanel({ flash }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All Status");
  const [method, setMethod] = useState("All Payment Methods");
  const visible = WD_ROWS.filter((r) => {
    const okQ = q.trim() === "" || r.id.toLowerCase().includes(q.trim().toLowerCase());
    const okS = status === "All Status" || r.status === status;
    const okM = method === "All Payment Methods" || r.bank.toLowerCase().includes(method.split(" ")[0].toLowerCase());
    return okQ && okS && okM;
  });
  const clearAll = () => { setQ(""); setStatus("All Status"); setMethod("All Payment Methods"); };
  return (
    <div className="ind-finance-inner">
      <div className="ind-fin-head">
        <div><h1 className="ind-fin-title">Withdrawal History</h1><p className="ind-fin-sub">Track all your withdrawal requests and their current processing status.</p></div>
        <div className="ind-head-btns">
          <button type="button" className="ind-outline-btn" onClick={() => flash("Statement export started.")}><FinIcon name="Download" size={ICON_SIZES.XS} color="#334155" stroke="#334155" fill="none" /> Export Statement</button>
          <button type="button" className="ind-outline-btn" onClick={() => flash("CSV download started.")}><FinIcon name="Download" size={ICON_SIZES.XS} color="#334155" stroke="#334155" fill="none" /> Download CSV</button>
        </div>
      </div>
      <div className="ind-card wd-filter-bar">
        <label className="wd-search"><FinIcon name="Search" size={ICON_SIZES.SM} color="#9AA3B5" stroke="#9AA3B5" fill="none" /><input placeholder="Search withdrawal ID" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <button type="button" className="wd-pill-select"><FinIcon name="Calendar" size={ICON_SIZES.XS} color="#64748B" stroke="#64748B" fill="none" /> 01 May 2025 – 31 May 2025 <FinIcon name="ChevronDown" size={ICON_SIZES["2XS"]} color="#64748B" stroke="#64748B" fill="none" /></button>
        <label className="wd-select-wrap"><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All Status</option><option>Completed</option><option>Processing</option><option>Failed</option></select><FinIcon name="ChevronDown" size={ICON_SIZES["2XS"]} color="#64748B" stroke="#64748B" fill="none" /></label>
        <label className="wd-select-wrap"><select value={method} onChange={(e) => setMethod(e.target.value)}><option>All Payment Methods</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option></select><FinIcon name="ChevronDown" size={ICON_SIZES["2XS"]} color="#64748B" stroke="#64748B" fill="none" /></label>
        <button type="button" className="wd-clear" onClick={clearAll}><FinIcon name="History" size={ICON_SIZES.XS} color="#1D4ED8" stroke="#1D4ED8" fill="none" /> Clear Filters</button>
      </div>
      <div className="wd-stats">
        {WD_STATS.map((s) => (
          <div key={s.id} className="ind-card wd-stat">
            <span className="wd-stat-ico" style={{ backgroundColor: s.badgeBg, color: s.iconColor }}><FinIcon name={s.icon} size={ICON_SIZES.DEFAULT} color={s.iconColor} stroke={s.iconColor} fill="none" /></span>
            <span className="wd-stat-text"><small>{s.label}</small><strong>{s.value}</strong><em>{s.sub}</em></span>
          </div>
        ))}
      </div>
      <div className="wd-list">
        {visible.map((r) => (
          <div key={r.id} className="ind-card wd-row">
            <div className="wd-cell wd-id"><strong>{r.id}</strong><small>{r.bank}</small></div>
            <div className="wd-cell"><small className="lbl">Amount</small><strong>{r.amount}</strong></div>
            <div className="wd-cell"><small className="lbl">Requested On</small><strong>{r.req}</strong></div>
            <div className="wd-cell"><small className="lbl">Expected Arrival</small><strong>{r.exp}</strong></div>
            <div className="wd-cell wd-status-cell"><small className="lbl">Status</small><span className="wd-status-line"><span className={`ind-pill ${r.status === "Completed" ? "success" : r.status === "Processing" ? "processing" : "failed"}`}>{r.status}</span><FinIcon name="ChevronDown" size={ICON_SIZES.XS} color="#9AA3B5" stroke="#9AA3B5" fill="none" /></span></div>
          </div>
        ))}
        {visible.length === 0 && <div className="ind-card ind-empty-card">No withdrawals match your filters.</div>}
      </div>
    </div>
  );
}

/* ================= Escrow (Image 4) ================= */
const ESCROW_TOP = [
  { id: "funded", label: "Total Funded", value: "₹64,000", sub: "project value funded by clients", icon: "Shield", badgeBg: "#DBEAFE", iconColor: "#2563EB" },
  { id: "released", label: "Total Released", value: "₹32,000", sub: "paid to your wallet", icon: "Lock", badgeBg: "#DCFCE7", iconColor: "#16A34A" },
  { id: "remain", label: "Total Remaining", value: "₹32,000", sub: "held by TechGuild", icon: "Clock", badgeBg: "#FEF3C7", iconColor: "#D97706" },
];

const ESCROW_PROJECTS = [
  {
    id: "esc1", name: "AI Chatbot Prototype", meta: "Futura AI · ESC-1052", pct: 34,
    vals: [{ l: "PROJECT VALUE", v: "₹32,000" }, { l: "RELEASED TO YOU", v: "₹8,000" }, { l: "REMAINING HELD", v: "₹24,000" }, { l: "CLIENT PAYS", v: "₹35,200", purple: true }],
    ms: [
      { t: "M1 - Research & wireframes", s: "Released on 10 Nov 2024", amt: "₹7,466.67", pill: "Released", tone: "success" },
      { t: "M2 - Prototype build", s: "Funds held by TechGuild until the client approves", amt: "₹13,466.67", pill: "Awaiting M1 approval", tone: "warn" },
      { t: "M3 - Handover & documentation", s: "Scheduled after M2 approval", amt: "₹9,466.67", pill: "Hold", tone: "hold" },
    ],
  },
  {
    id: "esc2", name: "SaaS Dashboard Design", meta: "Nebula Pay · ESC-1031", pct: 72,
    vals: [{ l: "PROJECT VALUE", v: "₹24,000" }, { l: "RELEASED TO YOU", v: "₹18,000" }, { l: "REMAINING HELD", v: "₹6,000" }, { l: "CLIENT PAYS", v: "₹26,400", purple: true }],
    ms: [
      { t: "M1 - Wireframes & style guide", s: "Released on 20 Oct 2024", amt: "₹5,600", pill: "Released", tone: "success" },
      { t: "M2 - Dashboard screens", s: "Released on 12 Nov 2024", amt: "₹11,600", pill: "Released", tone: "success" },
      { t: "M3 - Final delivery & handover", s: "Approved by client — moves to Pending Balance on release", amt: "₹5,600", pill: "Awaiting release", tone: "warn" },
    ],
  },
];

function EscrowPanel() {
  return (
    <div className="ind-finance-inner esc-page">
      <h1 className="ind-fin-title">Escrow</h1>
      <div className="esc-top">
        {ESCROW_TOP.map((s) => (
          <div key={s.id} className="ind-card esc-top-card">
            <div className="esc-top-head"><span className="esc-label">{s.label}</span><span className="esc-top-ico" style={{ backgroundColor: s.badgeBg, color: s.iconColor }}><FinIcon name={s.icon} size={ICON_SIZES.XS} color={s.iconColor} stroke={s.iconColor} fill="none" /></span></div>
            <div className="esc-top-val">{s.value}</div>
            <div className="esc-top-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      {ESCROW_PROJECTS.map((p) => (
        <div key={p.id} className="ind-card esc-card">
          <div className="esc-card-head">
            <div><div className="esc-name">{p.name}</div><div className="esc-meta">{p.meta}</div></div>
            <div className="esc-head-right"><span className="ind-pill esc-active">Active</span><button type="button" className="esc-quest-btn">Go to Quest Board</button></div>
          </div>
          <div className="esc-bar"><span style={{ width: `${p.pct}%` }} /></div>
          <div className="esc-vals">
            {p.vals.map((v) => (<div key={v.l} className="esc-val"><small>{v.l}</small><strong className={v.purple ? "purple" : ""}>{v.v}</strong></div>))}
          </div>
          <div className="esc-ms">
            {p.ms.map((m) => (
              <div key={m.t} className="esc-ms-row">
                <div className="esc-ms-left"><div className="esc-ms-t">{m.t}</div><div className="esc-ms-s">{m.s}</div></div>
                <div className="esc-ms-right"><span className="esc-ms-amt">{m.amt}</span><span className={`ind-pill pill-${m.tone}`}>{m.pill}</span></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= Transactions (Images 5 + 6) ================= */
const TXN_CATS = [
  { id: "all", label: "All" },
  { id: "income", label: "Income" },
  { id: "withdrawals", label: "Withdrawals" },
  { id: "refunds", label: "Refunds" },
  { id: "escrow", label: "Escrow Release" },
];

const TXNS = [
  { id: "TXN-2025-000123", cat: "income", type: "Milestone Payment", quest: "Website Redesign", ref: "TXN-2025-000123", date: "30 May 2025", time: "04:25 PM", amount: "+₹15,000", icon: "Check", badgeBg: "#DCFCE7", iconColor: "#16A34A", status: "Completed" },
  { id: "TXN-2025-000124", cat: "income", type: "Platform Fee", quest: "AI Chatbot Prototype", ref: "TXN-2025-000124 · M2 · Prototype build", date: "30 May 2025", time: "04:25 PM", amount: "−₹700", icon: "Percent", badgeBg: "#FEF3C7", iconColor: "#D97706", status: "Completed" },
  { id: "TXN-2025-000120", cat: "withdrawals", type: "Withdrawal", quest: "ICICI Bank ···· 4587", ref: "TXN-2025-000120", date: "27 May 2025", time: "", amount: "−₹10,000", icon: "ArrowDown", badgeBg: "#DBEAFE", iconColor: "#2563EB", status: "Completed" },
  { id: "TXN-2025-000119", cat: "refunds", type: "Refund", quest: "Mobile App Design", ref: "TXN-2025-000119", date: "25 May 2025", time: "11:10 AM", amount: "+₹3,000", icon: "History", badgeBg: "#F3E8FF", iconColor: "#9333EA", status: "Completed" },
  { id: "TXN-2025-000118", cat: "escrow", type: "Escrow Release", quest: "Dashboard Development", ref: "TXN-2025-000118", date: "20 May 2025", time: "06:30 PM", amount: "+₹8,500", icon: "ShieldCheck", badgeBg: "#DCFCE7", iconColor: "#16A34A", status: "Completed" },
];

const TXN_SUMMARY = [
  { id: "inc", label: "Total Income", value: "₹23,500", sub: "2 Transactions", icon: "Check", badgeBg: "#DCFCE7", iconColor: "#16A34A" },
  { id: "wd", label: "Total Withdrawn", value: "₹10,000", sub: "1 Transaction", icon: "ArrowUp", badgeBg: "#FDECEC", iconColor: "#DC2626" },
  { id: "fee", label: "Total Fees", value: "₹500", sub: "1 Transaction", icon: "IndianRupee", badgeBg: "#FEF3C7", iconColor: "#D97706" },
  { id: "ref", label: "Total Refunds", value: "₹3,000", sub: "1 Transaction", icon: "History", badgeBg: "#DBEAFE", iconColor: "#2563EB" },
];

function TransactionsPanel({ onOpen, flash }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const visible = useMemo(() => TXNS.filter((t) => {
    const okC = cat === "all" || t.cat === cat;
    const s = q.trim().toLowerCase();
    const okQ = s === "" || `${t.type} ${t.quest} ${t.id}`.toLowerCase().includes(s);
    return okC && okQ;
  }), [q, cat]);
  return (
    <div className="ind-finance-inner txn-page">
      <div className="ind-fin-head">
        <div><h1 className="ind-fin-title">Transaction History</h1><p className="ind-fin-sub">View and track all your financial transactions.</p></div>
        <button type="button" className="ind-outline-btn" onClick={() => flash("Statement export started.")}><FinIcon name="Download" size={ICON_SIZES.XS} color="#334155" stroke="#334155" fill="none" /> Export Statement</button>
      </div>
      <div className="txn-filter-row">
        <label className="txn-search"><FinIcon name="Search" size={ICON_SIZES.SM} color="#9AA3B5" stroke="#9AA3B5" fill="none" /><input placeholder="Search by quest name, transaction ID..." value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <button type="button" className="txn-filter-btn" onClick={() => flash("Filters — coming soon.")}><FinIcon name="Funnel" size={ICON_SIZES.XS} color="#475569" stroke="#475569" fill="none" /> Filters</button>
        <button type="button" className="wd-pill-select txn-date"><FinIcon name="Calendar" size={ICON_SIZES.XS} color="#64748B" stroke="#64748B" fill="none" /> 24 May 2025 – 30 May 2025</button>
      </div>
      <div className="txn-cats">{TXN_CATS.map((c) => (<button key={c.id} type="button" className={`txn-cat ${cat === c.id ? "active" : ""}`} onClick={() => setCat(c.id)}>{c.label}</button>))}</div>
      <div className="ind-card txn-summary">
        {TXN_SUMMARY.map((s) => (
          <div key={s.id} className="txn-sum-cell">
            <span className="wd-stat-ico" style={{ backgroundColor: s.badgeBg, color: s.iconColor }}><FinIcon name={s.icon} size={ICON_SIZES.XS} color={s.iconColor} stroke={s.iconColor} fill="none" /></span>
            <span className="txn-sum-text"><small>{s.label}</small><strong>{s.value}</strong><em>{s.sub}</em></span>
          </div>
        ))}
      </div>
      <div className="ind-card txn-table">
        <div className="txn-thead"><span>TRANSACTION</span><span>QUEST / REFERENCE</span><span>DATE &amp; TIME</span><span className="r">AMOUNT</span><span>STATUS</span><span className="r">ACTIONS</span></div>
        {visible.map((t) => (
          <div key={t.id} className="txn-trow" onClick={() => onOpen(t.id)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") onOpen(t.id); }}>
            <span className="txn-tname"><span className="wd-stat-ico sm" style={{ backgroundColor: t.badgeBg, color: t.iconColor }}><FinIcon name={t.icon} size={ICON_SIZES.XS} color={t.iconColor} stroke={t.iconColor} fill="none" /></span><span><strong>{t.type}</strong><small>{t.ref}</small></span></span>
            <span className="txn-tquest">{t.quest}</span>
            <span className="txn-tdate">{t.date}{t.time ? <small>{t.time}</small> : null}</span>
            <span className="txn-tamt r">{t.amount}</span>
            <span><span className="ind-pill success"><FinIcon name="Check" size={ICON_SIZES["2XS"]} color="#15803D" stroke="#15803D" fill="none" /> {t.status}</span></span>
            <span className="r"><span className="txn-go"><FinIcon name="ChevronRight" size={ICON_SIZES.XS} color="#9AA3B5" stroke="#9AA3B5" fill="none" /></span></span>
          </div>
        ))}
        {visible.length === 0 && <div className="ind-empty">No transactions found.</div>}
      </div>
      <div className="txn-foot"><FinIcon name="Info" size={ICON_SIZES.XS} color="#2563EB" stroke="#2563EB" fill="none" /><p>Transactions are updated in real-time. If you don&apos;t see your recent transaction, please refresh the page.</p></div>
    </div>
  );
}

const TXN_DETAIL = {
  id: "TXN-2025-000123", quest: "Website Redesign for Acme Corp", milestone: "Milestone 2 – UI/UX Design",
  from: "Acme Corp (Client)", to: "PixelCraft Solutions (Your Party)", amount: "+₹15,000", fee: "−₹450", receive: "+₹14,550",
  steps: [{ l: "Initiated", t: "30 May 2025, 04:10 PM" }, { l: "Processing", t: "30 May 2025, 04:12 PM" }, { l: "Released", t: "30 May 2025, 04:20 PM" }, { l: "Completed", t: "30 May 2025, 04:25 PM" }],
};

function TxnDetailPanel({ txnId, onBack, flash }) {
  const d = TXN_DETAIL;
  void txnId;
  return (
    <div className="ind-finance-inner txn-detail-page">
      <div className="ind-fin-head">
        <div><h1 className="ind-fin-title">Transaction Details</h1><p className="ind-fin-sub">View complete information about this transaction.</p></div>
        <button type="button" className="ind-outline-btn" onClick={() => flash("Receipt download started.")}><FinIcon name="Download" size={ICON_SIZES.XS} color="#1D4ED8" stroke="#1D4ED8" fill="none" /> Download Receipt</button>
      </div>
      <div className="txn-detail-grid">
        <div className="ind-card txn-info">
          <h3>Transaction Information</h3>
          <div className="txn-info-row"><span>Transaction ID</span><strong className="mono">{d.id} <FinIcon name="Copy" size={ICON_SIZES["2XS"]} color="#9AA3B5" stroke="#9AA3B5" fill="none" /></strong></div>
          <div className="txn-info-row"><span>Quest / Project</span><strong className="link">{d.quest} <FinIcon name="ExternalLink" size={ICON_SIZES["2XS"]} color="#2563EB" stroke="#2563EB" fill="none" /></strong></div>
          <div className="txn-info-row"><span>Milestone</span><strong>{d.milestone}</strong></div>
          <div className="txn-info-row"><span>From</span><strong className="link">{d.from} <FinIcon name="ExternalLink" size={ICON_SIZES["2XS"]} color="#2563EB" stroke="#2563EB" fill="none" /></strong></div>
          <div className="txn-info-row"><span>To</span><strong className="link">{d.to} <FinIcon name="ExternalLink" size={ICON_SIZES["2XS"]} color="#2563EB" stroke="#2563EB" fill="none" /></strong></div>
          <div className="txn-info-row"><span>Amount</span><strong className="green">{d.amount}</strong></div>
          <div className="txn-info-row"><span>Platform Fee</span><strong>{d.fee}</strong></div>
          <div className="txn-info-row highlight"><span>You Receive</span><strong className="green">{d.receive}</strong></div>
        </div>
        <div className="ind-card txn-status">
          <h3>Transaction Status</h3>
          <div className="txn-steps">
            {d.steps.map((s) => (
              <div key={s.l} className="txn-step">
                <span className="txn-step-dot"><FinIcon name="Check" size={ICON_SIZES["2XS"]} color="#fff" stroke="#fff" fill="none" /></span>
                <div><div className="txn-step-l">{s.l}</div><div className="txn-step-t">{s.t}</div></div>
              </div>
            ))}
          </div>
          <div className="txn-success-box"><FinIcon name="CheckCircle2" size={ICON_SIZES.SM} color="#16A34A" stroke="#16A34A" fill="none" /><span>The amount has been successfully added to your available balance.</span></div>
        </div>
      </div>
      <div className="txn-note-box"><FinIcon name="Info" size={ICON_SIZES.XS} color="#2563EB" stroke="#2563EB" fill="none" /><div><strong>Important Note</strong><p>This amount has been added to your available balance. You can withdraw it anytime to your bank account or UPI.</p></div></div>
      <div className="txn-bottom-grid">
        <div className="ind-card txn-bottom-card">
          <span className="txn-bottom-ico purple"><FinIcon name="FileText" size={ICON_SIZES.SM} color="#9333EA" stroke="#9333EA" fill="none" /></span>
          <h4>Related Milestone</h4><strong>Milestone 2 – UI/UX Design</strong><small>Completed on 30 May 2025</small>
          <button type="button" className="txn-white-btn" onClick={() => flash("Opening milestone...")}>View Milestone</button>
        </div>
        <div className="ind-card txn-bottom-card">
          <span className="txn-bottom-ico blue"><FinIcon name="Headphones" size={ICON_SIZES.SM} color="#1D4ED8" stroke="#1D4ED8" fill="none" /></span>
          <h4>Need Help?</h4><small>If you have any questions about this transaction, our support team is here.</small>
          <button type="button" className="txn-white-btn" onClick={() => flash("Opening support...")}>Contact Support <FinIcon name="ExternalLink" size={ICON_SIZES["2XS"]} color="#111F3A" stroke="#111F3A" fill="none" /></button>
        </div>
      </div>
      <button type="button" className="txn-back" onClick={onBack}><FinIcon name="ArrowLeft" size={ICON_SIZES.XS} color="#475569" stroke="#475569" fill="none" /> Back to Transactions</button>
    </div>
  );
}

/* ================= Payment Methods (Image 7) ================= */
function PaymentMethodsPanel({ flash }) {
  const [banks, setBanks] = useState([
    { id: "hdfc", name: "HDFC Bank", sub: "A/C ··4821 · IFSC HDFC0001234 · Arjun Mehta", primary: true, verified: true },
    { id: "icici", name: "ICICI Bank", sub: "A/C ··9034 · IFSC ICIC0000789 · Arjun Mehta", primary: false, verified: false },
  ]);
  const verify = (id) => setBanks((p) => p.map((b) => (b.id === id ? { ...b, verified: true } : b)));
  const remove = (id) => setBanks((p) => p.filter((b) => b.id !== id));
  return (
    <div className="ind-finance-inner pm-page">
      <h1 className="ind-fin-title">Payment Methods</h1>
      <div className="pm-info-box"><FinIcon name="ShieldCheck" size={ICON_SIZES.MD} color="#2563EB" stroke="#2563EB" fill="none" /><p>Bank accounts are verified with a <strong>₹1 test deposit</strong> before they can be used for withdrawals. Your details are encrypted and never shared with clients.</p></div>
      <div className="pm-sec-head"><h3>Bank Accounts</h3><button type="button" className="pm-add-top" onClick={() => flash("Add bank account — form opening.")}>+ Add Bank Account</button></div>
      {banks.map((b) => (
        <div key={b.id} className="ind-card pm-row">
          <span className="pm-bank-ico"><FinIcon name="Landmark" size={ICON_SIZES.DEFAULT} color="#2563EB" stroke="#2563EB" fill="none" /></span>
          <span className="pm-text"><strong>{b.name}</strong><small>{b.sub}</small></span>
          <span className="pm-right">
            {b.primary && <span className="ind-pill primary">Primary</span>}
            {b.verified ? <span className="ind-pill success">Verified</span> : <><span className="ind-pill warn">Unverified</span><button type="button" className="pm-verify" onClick={() => verify(b.id)}>Verify</button></>}
            <button type="button" className="pm-remove" onClick={() => remove(b.id)}>Remove</button>
          </span>
        </div>
      ))}
      <div className="pm-sec-head"><h3>UPI IDs</h3><button type="button" className="pm-add-top" onClick={() => flash("Add UPI ID — form opening.")}>+ Add UPI ID</button></div>
      <div className="ind-card pm-row">
        <span className="pm-upi-ico"><FinIcon name="Smartphone" size={ICON_SIZES.DEFAULT} color="#9333EA" stroke="#9333EA" fill="none" /></span>
        <span className="pm-text"><strong>arjun@okhdfc</strong><small>UPI · arjun@okhdfc</small></span>
        <span className="pm-right"><span className="ind-pill success">Verified</span><button type="button" className="pm-remove" onClick={() => flash("UPI removed.")}>Remove</button></span>
      </div>
    </div>
  );
}

function TaxDocumentsPanel({ flash }) {
  return (
    <div className="ind-finance-inner">
      <h1 className="ind-fin-title">Tax Documents</h1>
      <p className="ind-fin-sub">Download Form 16A, GST invoices and earning statements.</p>
      <div className="ind-card ind-pad">
        {[{ t: "Form 16A — FY 2025-26", d: "TDS certificates for all payouts" }, { t: "GST Invoices — FY 2025-26", d: "Platform fee invoices" }, { t: "Annual Earning Statement", d: "April 2025 – March 2026 summary" }].map((r) => (
          <div key={r.t} className="ind-pm-row">
            <span className="ind-qa-ico" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}><FinIcon name="FileText" size={ICON_SIZES.MD} color="#D97706" stroke="#D97706" fill="none" /></span>
            <span className="ind-qa-text"><strong>{r.t}</strong><small>{r.d}</small></span>
            <button type="button" className="ind-link" onClick={() => flash("Document download started.")}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Earnings() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tabParam = params.get("tab");
  const txnId = params.get("txn");
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : "overview";
  const goTab = (id) => navigate(`${location.pathname}?tab=${id}`);
  const goOverview = () => navigate(`${location.pathname}?tab=overview`);
  const [toast, setToast] = useState("");
  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  return (
    <DashboardLayout searchPlaceholder="Search projects, clients, or freelancers..." mainWorkspaceClass="ind-finance-workspace">
      <div className="ind-fin-page">
        <div className="ind-fin-main">
          {activeTab === "overview" && <OverviewPanel onNavigate={goTab} onWithdraw={() => goTab("withdraw-funds")} onDownload={() => flash("Statement download started.")} />}
          {activeTab === "withdraw-funds" && <WithdrawFundsPanel goTab={goTab} goOverview={goOverview} />}
          {activeTab === "withdrawal-history" && <WithdrawalHistoryPanel flash={flash} />}
          {activeTab === "escrow" && <EscrowPanel />}
          {activeTab === "transactions" && (txnId
            ? <TxnDetailPanel txnId={txnId} onBack={() => goTab("transactions")} flash={flash} />
            : <TransactionsPanel onOpen={(id) => navigate(`${location.pathname}?tab=transactions&txn=${id}`)} flash={flash} />)}
          {activeTab === "payment-methods" && <PaymentMethodsPanel flash={flash} />}
          {activeTab === "tax-documents" && <TaxDocumentsPanel flash={flash} />}
        </div>
      </div>
      {toast && <div className="ind-toast">{toast}</div>}
    </DashboardLayout>
  );
}
