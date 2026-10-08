import React from "react";
import IndividualFlow from "@/flows/client/pages/VerificationHub/individualflow";

/**
 * Verification Component (Individual Verification Flow)
 * Integrates the consolidated IndividualFlow featuring all 9 Figma screens:
 * - Intro (Identity benefits overview)
 * - Step 1: Choose Verification Document (Cards, dynamic selection)
 * - Step 2: Upload Documents (Dropzone Cards, encryption security badge)
 * - Step 3: Take Selfie (Live camera feed / captured photo check)
 * - Step 4: Review Information (Summary Cards, edit triggers)
 * - Submitted (Status confirmation Card)
 * - Under Review (Timeline Card, What happens next Card, submitted document badges)
 * - Complete (Verified banner Card, perks overview)
 * - Success (Trust points celebration Card, 4-stage stepper)
 */
export default function Verification(props) {
  return <IndividualFlow {...props} />;
}
