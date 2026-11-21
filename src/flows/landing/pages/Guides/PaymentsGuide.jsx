// 03-11-2026
// Guide article explaining escrow, milestones, fees, and withdrawals.
import FullGuideLayout from "./FullGuideLayout";
import {
  GuideSection,
  NumberedList,
  OverviewBox,
  StepsFlow,
  TipsPanel,
} from "./guideArticleParts";

const TOC = [
  { id: 1, label: "Overview" },
  { id: 2, label: "How Payments Work" },
  { id: 3, label: "Escrow System" },
  { id: 4, label: "Milestones and Releases" },
  { id: 5, label: "Platform Fees" },
  { id: 6, label: "Invoices and Statements" },
  { id: 7, label: "Withdraw Earnings" },
  { id: 8, label: "Refunds and Disputes" },
  { id: 9, label: "Tips for Safe Transactions" },
];

const OVERVIEW = [
  { title: "Secure escrow for every project" },
  { title: "Milestone-based payments" },
  { title: "Transparent fees and invoices" },
  { title: "Safe and easy withdrawals" },
];

const PAYMENT_STEPS = [
  {
    title: "Client funds the project",
    text: "The agreed amount is added to escrow.",
  },
  {
    title: "Work is completed in milestones",
    text: "The freelancer submits and the client approves each milestone.",
  },
  {
    title: "Payment is released",
    text: "Funds are released to the freelancer after approval.",
  },
  {
    title: "Withdraw earnings",
    text: "Freelancers can withdraw their earnings to their bank account.",
  },
];

const ESCROW_ITEMS = [
  { title: "Ensures payment security for freelancers" },
  { title: "Funds are released only after milestone approval" },
  { title: "Protects clients and ensures work completion" },
  { title: "Reduces the risk of fraud or non-payment" },
];

const MILESTONES = [
  { label: "Milestone 1", name: "Design Research", amount: "₹8,000" },
  { label: "Milestone 2", name: "Wireframes", amount: "₹12,000" },
  { label: "Milestone 3", name: "UI Design", amount: "₹15,000" },
  { label: "Milestone 4", name: "Final Delivery", amount: "₹5,000" },
];

const MILESTONE_STEPS = [
  {
    title: "Agree on milestones",
    text: "Client and freelancer decide the milestones and amounts before starting.",
  },
  {
    title: "Complete the work",
    text: "Freelancer submits work for each milestone.",
  },
  {
    title: "Client reviews the work",
    text: "Client can request revisions if needed.",
  },
  {
    title: "Payment is released",
    text: "Once approved, the milestone amount is released to the freelancer.",
  },
];

const FEE_ITEMS = [
  { title: "A percentage fee is deducted from each project payment" },
  { title: "The fee is shown clearly before you accept a project" },
  { title: "There are no hidden charges" },
  { title: "The fee helps us maintain a safe and reliable platform" },
];

const INVOICES = [
  { date: "12 Aug 2024", project: "App UI Design", amount: "₹8,000" },
  { date: "28 Aug 2024", project: "Website Redesign", amount: "₹12,000" },
  { date: "10 Sep 2024", project: "Branding Assets", amount: "₹15,000" },
];

const INVOICE_STEPS = [
  {
    title: "Go to Finance",
    text: "Open the Finance section from your dashboard.",
  },
  {
    title: "View invoices",
    text: "See all your project invoices and payment history.",
  },
  {
    title: "Download statement",
    text: "Download your statement in PDF or Excel format for your records.",
  },
];

const WITHDRAW_STEPS = [
  {
    title: "Go to Withdraw",
    text: "Open the Withdraw section in Finance.",
  },
  {
    title: "Add bank details",
    text: "Verify and add your bank account.",
  },
  {
    title: "Enter amount",
    text: "Choose the amount you want to withdraw.",
  },
  {
    title: "Confirm withdrawal",
    text: "The amount will be processed and credited to your bank account.",
  },
];

const REFUND_ITEMS = [
  { title: "If a project is cancelled, the escrowed funds are refunded as per our policy." },
  { title: "Both clients and freelancers can raise a dispute." },
  { title: "Our team reviews the case and helps reach a fair resolution." },
  { title: "You will be informed about the decision via email and in your dashboard." },
];

const TIPS = [
  [
    "Always communicate within the platform",
    "Clearly define milestones before starting",
    "Review and approve work carefully",
  ],
  [
    "Keep track of your invoices and statements",
    "Use secure withdrawal methods",
    "Contact support if you face any issues",
  ],
];

function MilestonesMock() {
  return (
    <div className="fg-mock">
      <strong className="fg-table-title">Example Milestone Breakdown</strong>
      <table className="fg-table">
        <tbody>
          {MILESTONES.map((milestone) => (
            <tr key={milestone.label}>
              <td>
                <strong>{milestone.label}</strong> {milestone.name}
              </td>
              <td className="is-amount">{milestone.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InvoicesMock() {
  return (
    <div className="fg-mock">
      <strong className="fg-table-title">Invoices</strong>
      <table className="fg-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Project</th>
            <th className="is-amount">Amount</th>
            <th className="is-status">Status</th>
          </tr>
        </thead>
        <tbody>
          {INVOICES.map((invoice) => (
            <tr key={invoice.project}>
              <td>{invoice.date}</td>
              <td>{invoice.project}</td>
              <td className="is-amount">{invoice.amount}</td>
              <td className="is-status">
                <span className="fg-badge-paid">Paid</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PaymentsGuide() {
  return (
    <FullGuideLayout
      title="Payments and Finance"
      subtitle="A complete guide to secure payments, escrow, milestones, invoices, earnings and withdrawal on TechGuild."
      icon="CreditCard"
      toc={TOC}
      heroVariant="card"
    >
      <GuideSection
        id={1}
        title="Overview"
        subtitle="TechGuild ensures secure, transparent and fair payments for both clients and freelancers."
        boxed
      >
        <OverviewBox label="With TechGuild payments, you get:" items={OVERVIEW} />
      </GuideSection>

      <GuideSection
        id={2}
        title="How Payments Work"
        subtitle="Payments on TechGuild are processed through a secure escrow system."
        boxed
      >
        <StepsFlow steps={PAYMENT_STEPS} />
      </GuideSection>

      <GuideSection
        id={3}
        title="Escrow System"
        subtitle="The full project amount is held securely in escrow before work begins."
        boxed
      >
        <OverviewBox items={ESCROW_ITEMS} />
      </GuideSection>

      <GuideSection
        id={4}
        title="Milestones and Releases"
        subtitle="Projects are divided into milestones for better tracking and secure payments."
        boxed
      >
        <div className="fg-split">
          <MilestonesMock />
          <NumberedList items={MILESTONE_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={5}
        title="Platform Fees"
        subtitle="TechGuild charges a small platform fee to keep the platform running and secure."
        boxed
      >
        <OverviewBox items={FEE_ITEMS} />
      </GuideSection>

      <GuideSection
        id={6}
        title="Invoices and Statements"
        subtitle="You can view and download all your invoices and statements from the Finance section."
        boxed
      >
        <div className="fg-split">
          <InvoicesMock />
          <NumberedList items={INVOICE_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={7}
        title="Withdraw Earnings"
        subtitle="Freelancers can withdraw their earnings to their bank account."
        boxed
      >
        <StepsFlow steps={WITHDRAW_STEPS} />
      </GuideSection>

      <GuideSection
        id={8}
        title="Refunds and Disputes"
        subtitle="In case of any issues, TechGuild provides a fair dispute resolution process."
        boxed
      >
        <OverviewBox items={REFUND_ITEMS} />
      </GuideSection>

      <GuideSection
        id={9}
        title="Tips for Safe Transactions"
        subtitle="Follow these best practices for a smooth and secure payment experience."
        boxed
      >
        <TipsPanel columns={TIPS} />
      </GuideSection>
    </FullGuideLayout>
  );
}
