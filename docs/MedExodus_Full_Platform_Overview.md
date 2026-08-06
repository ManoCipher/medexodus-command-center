# MedExodus - Full Platform Overview

*Extracted from `MedExodus_Full_Platform_Overview.pdf` (13 pages)*

---


## Page 1

MedExodus Healthcare Solutions
Full RCM Platform Overview — services, specialties, industries, and proposed payer solutions and
automation suite. Expand-on-click copy only, no data points or charts.
Read this first
DATA BUG (carried over from prior handoff): the Industries section's live stat counters currently render 0+ / 0% /
0% / 0 Days / 0%. That's a separate, page-level stats widget (not part of the item cards below) and still needs a real
value wired in — 36+ Healthcare Clients, 98% Clean Claim Rate, 25% Increase in Collections, 15 Days Faster
Reimbursement, 100% HIPAA Aware, or your own current figures.


## Page 2

Section: Services
Anchor: #services
Front-Office Solutions
CLICK TARGET → EXPAND CONTENT
Insurance Verification
Eligibility checks are run through real-time 270/271 EDI transactions against the payer, confirming plan type
(HMO/PPO/EPO), effective and termination dates, coordination of benefits (COB) order, deductible and out-of-pocket
accumulator status, and referral or authorization flags — before the patient is seen, not after the claim is denied.
Discrepancies between what the scheduling system shows and what the payer confirms are resolved same-day.
CLICK TARGET → EXPAND CONTENT
Prior Authorization
Authorization requirements are cross-walked from the scheduled CPT/HCPCS code against each payer's medical policy
(LCD/NCD criteria), submitted with supporting clinical documentation via payer portal or fax/EDI 278, and tracked to
determination — including escalation to peer-to-peer review when a request is pended or denied on medical necessity
grounds.
CLICK TARGET → EXPAND CONTENT
Patient Billing Support
Patient-facing financial workflows — statement generation, balance inquiries, payment plan structuring, and financial
counseling — are run to reduce self-pay AR aging and bad-debt write-off, while keeping communication HIPAA-compliant
and easy for patients to act on.
CLICK TARGET → EXPAND CONTENT
Provider Support
A direct feedback loop between clinicians and the coding/billing team — documentation queries tied to specific payer
requirements, scheduling coordination, and point-of-care prompts — functions as a lightweight clinical documentation
improvement (CDI) layer that catches gaps before they become downstream denials.
Middle-Office Solutions
CLICK TARGET → EXPAND CONTENT
Medical Coding
Certified coders (CPC/CCS-credentialed) assign ICD-10-CM diagnosis codes, CPT/HCPCS Level II procedure codes, and
required modifiers based on clinical documentation, checked against NCCI (National Correct Coding Initiative) edits, MUE
(Medically Unlikely Edit) limits, and specialty-specific payer LCD/NCD policy before the encounter moves to billing.
CLICK TARGET → EXPAND CONTENT
Coding Audits
A sampling methodology (statistically representative, weighted toward high-dollar and high-denial-risk claim types) drives
periodic prospective and retrospective audits, checked against current CMS/OIG Work Plan focus areas, to catch
systematic over- or under-coding before a payer or RAC (Recovery Audit Contractor) audit does.


## Page 3

CLICK TARGET → EXPAND CONTENT
Documentation Review
Structured physician queries (formatted to AHIMA/ACDIS compliant query guidelines) are issued when documentation
doesn't support the code level or specificity required — closing the loop between what was done clinically and what can be
legitimately billed, without leading the provider toward a specific code.
CLICK TARGET → EXPAND CONTENT
HCC / Risk Adjustment Coding
Chronic and complex conditions are identified and coded against the current CMS-HCC risk adjustment model for
Medicare Advantage and ACA-marketplace risk pools, including "suspect condition" analytics that flag likely
undocumented chronic conditions from claims/lab data for provider confirmation (chart chase), directly affecting RAF score
accuracy and plan reimbursement.
CLICK TARGET → EXPAND CONTENT
Quality Assurance
A tiered QA structure — coder self-audit, peer review, and supervisor sign-off on high-dollar or high-risk claims — catches
coding and billing errors before submission, with an error taxonomy tracked over time to identify recurring failure points by
coder, payer, or CPT family.
CLICK TARGET → EXPAND CONTENT
Credentialing Assistance
Provider enrollment and re-credentialing is tracked through CAQH ProView and payer-specific portals (including PECOS
for Medicare), with expiration dates monitored proactively so a lapsed credential — an entirely preventable denial reason
— never blocks a clean claim from being paid.


## Page 4

Back-Office Solutions
CLICK TARGET → EXPAND CONTENT
Medical Billing
The full charge-to-cash lifecycle — charge capture, claim generation (837P/837I EDI transaction sets), clearinghouse
submission, and payment reconciliation — is run as one coordinated process rather than disconnected handoffs between
teams.
CLICK TARGET → EXPAND CONTENT
AR Follow-Up
Outstanding claims are worked by aging bucket (0-30 / 31-60 / 61-90 / 90+ days) with a payer-specific follow-up cadence,
prioritized by dollar value and denial risk, rather than a flat first-in-first-out queue.
CLICK TARGET → EXPAND CONTENT
Denial Management
Every denial is parsed by CARC/RARC (Claim/Remittance Adjustment Reason Code) and root-caused to its origin —
eligibility, authorization, coding, medical necessity, timely filing — corrected, and resubmitted, with the pattern fed back
upstream to front-office and coding so the same denial reason stops recurring.
CLICK TARGET → EXPAND CONTENT
Payment Posting
835 ERA files are auto-posted against expected reimbursement (contracted rate variance flagged automatically), with
manual posting and reconciliation for paper EOBs and exception cases, plus credit-balance identification and resolution.
CLICK TARGET → EXPAND CONTENT
Charge Entry
Charges are reconciled against the scheduling/encounter record and coded service lines, minimizing the lag between date
of service and claim-ready status — a lag that directly extends the revenue cycle and risks timely-filing denials on
slow-moving payers.
CLICK TARGET → EXPAND CONTENT
Claims Submission
Electronic claims are batched and submitted per payer companion-guide specifications via clearinghouse, with
acknowledgment (999/277CA) and rejection reports monitored so a front-end rejection is caught and corrected within the
same billing cycle.
CLICK TARGET → EXPAND CONTENT
Claims Scrubbing
Pre-submission edit logic checks each claim against NCCI/MUE bundling rules, LCD/NCD coverage policy, and
payer-specific formatting requirements — the layer that catches an error before it becomes a rejection or denial rather than
after.


## Page 5

CLICK TARGET → EXPAND CONTENT
Appeals & Reprocessing
Formal appeals are prepared with the supporting clinical documentation and payer-specific appeal format required for
Level 1/Level 2 review, tracked against each payer's appeal filing deadline, with underpayments identified through
contracted-rate variance analysis.
CLICK TARGET → EXPAND CONTENT
Back-Office Support
Correspondence triage, EOB/ERA reconciliation, lockbox matching, and general administrative processing keep the rest of
the revenue cycle running without adding headcount on the client's side.
CLICK TARGET → EXPAND CONTENT
Revenue Cycle Optimization
KPI dashboards (Days in A/R, denial rate, net collection rate, clean claim rate, DNFB) are reviewed on a recurring
cadence to identify bottlenecks across the full cycle and drive targeted workflow changes, rather than optimizing one
function in isolation.


## Page 6

Section: Payer Solutions
Proposed new top-level nav item — suggested anchor: #payer-solutions
PROPOSED SERVICE LINE — NOT ON THE LIVE SITE TODAY. MedExodus currently only markets provider-side
RCM services. Competing RCM firms typically also run a payer-side BPO line (claims operations, benefits
configuration, member services). Adding this widens the addressable market to health plans, not just providers —
but only publish it once MedExodus actually has the staffing/expertise to deliver it.
PROPOSED → NEW SERVICE
Claims Operations Support
Back-office claims intake, data entry, and adjudication-support workflows for health plans, handling both electronic and
paper claim volume with SLA-based turnaround.
PROPOSED → NEW SERVICE
Benefits Configuration Support
Configuration and QA of benefit plan design within the payer's core administration system, ensuring plan rules match what
was sold to the group or member.
PROPOSED → NEW SERVICE
Premium Billing & Collections Support
Member and group premium billing, invoicing, and collections workflows, including grace-period and lapse-processing
support.
PROPOSED → NEW SERVICE
Provider Data Management
Maintenance of the payer's provider directory and network data — demographics, specialties, network status — keeping it
accurate for claims adjudication and member-facing directories.
PROPOSED → NEW SERVICE
Eligibility & Enrollment Support
Processing of member enrollment, disenrollment, and eligibility updates across commercial, Medicare Advantage, and
Medicaid managed care lines.
PROPOSED → NEW SERVICE
Appeals & Grievances Support
Intake, tracking, and resolution-support workflows for member and provider appeals and grievances, within regulatory
turnaround-time requirements.
PROPOSED → NEW SERVICE
Member Experience Support
Omni-channel member service support — phone, chat, and correspondence — for benefits questions, claims status, and
ID card/documentation requests.


## Page 7

Section: Automation Platform — “MedExodus IQ”
Proposed new top-level nav item — suggested anchor: #medexodus-iq
PROPOSED PLATFORM CONCEPT — NOT AN EXISTING PRODUCT. This names and structures a product suite
MedExodus could build or white-label, for the site to reference once it exists in some real form. Don't publish this as
a live product until there's a real tool behind each name — claiming a nonexistent platform is a straightforward
misrepresentation to prospective clients evaluating the technology, not just an aggressive marketing claim.
PROPOSED → NEW PLATFORM MODULE
IQ Bot
Robotic process automation for repetitive, rules-based revenue cycle tasks — eligibility checks, status-check queries,
batch data entry — freeing staff for exception-handling work.
PROPOSED → NEW PLATFORM MODULE
IQ Code
AI-assisted coding support that pre-suggests ICD-10-CM/CPT codes from clinical documentation for coder review and
sign-off, rather than fully autonomous coding, keeping a human in the loop on every claim.
PROPOSED → NEW PLATFORM MODULE
IQ Remit
Automated ERA/EOB processing — auto-posting payments against expected reimbursement and flagging variances for
manual review.
PROPOSED → NEW PLATFORM MODULE
IQ Insights
Revenue cycle analytics dashboards covering Days in A/R, denial rate, net collection rate, and clean claim rate, with
drill-down by payer, provider, and service line.
PROPOSED → NEW PLATFORM MODULE
IQ Shield
A governance and audit-trail layer over the automated workflows above, logging what each bot touched and why, to
support compliance review.


## Page 8

Section: Specialties
Anchor: #specialties
CLICK TARGET → EXPAND CONTENT
Emergency Department (ED)
High-volume, time-pressured coding covering E/M leveling (99281–99285), trauma team activations, critical care time
(99291/99292), and ED-specific procedure coding — one of the highest audit-scrutiny and denial-risk areas in outpatient
medicine due to leveling subjectivity.
CLICK TARGET → EXPAND CONTENT
IP-DRG
Inpatient coding and MS-DRG assignment requires correct principal-diagnosis selection, CC/MCC
(complication/comorbidity) capture, and procedure sequencing — each of which moves the DRG weight and therefore
facility reimbursement directly.
CLICK TARGET → EXPAND CONTENT
HCC / Risk Adjustment
Chronic-condition capture for CMS-HCC risk models, with suspect-condition analytics surfacing likely undocumented
diagnoses for provider confirmation before the risk-adjustment submission deadline.
CLICK TARGET → EXPAND CONTENT
Surgery
Modifier accuracy (-25, -51, -59, -RT/-LT) and global-period compliance are the two biggest denial levers in surgical coding
— bundling and unbundling rules are checked against NCCI edits on every multi-procedure claim.
CLICK TARGET → EXPAND CONTENT
Evaluation & Management
E/M level-of-service coding under current CMS 2021+ MDM/time-based documentation guidelines, balanced against audit
risk from consistent over-leveling or under-leveling.
CLICK TARGET → EXPAND CONTENT
Physical Therapy
Unit-based billing (8-minute rule) and therapy-specific modifiers (-GP, -59, -KX) drive most PT denials when applied
inconsistently across a treatment plan of care.
CLICK TARGET → EXPAND CONTENT
Behavioral Health
Time-based psychotherapy codes (90832/90834/90837) and add-on codes require precise session-length documentation;
parity-law payer rules add another layer of specialty-specific denial risk.
CLICK TARGET → EXPAND CONTENT
Radiology
Professional (-26) vs. technical (-TC) component splits and modality-specific coding (CT/MRI/US/interventional) are the
core accuracy drivers for radiology claims.


## Page 9

CLICK TARGET → EXPAND CONTENT
Anesthesia
Time-unit and base-unit calculation tied to the linked surgical CPT code, plus qualifying circumstance add-ons, determines
correct anesthesia reimbursement — a coding model unique to this specialty.
CLICK TARGET → EXPAND CONTENT
Orthopedics
Global-period tracking across staged and related procedures, plus correct modifier sequencing on multi-site
musculoskeletal claims, are the primary denial drivers.
CLICK TARGET → EXPAND CONTENT
Cardiology
Bundling-edit compliance on cath-lab and interventional procedures, plus device/implant coding accuracy, are checked
against frequently updated NCCI edits specific to cardiology.
CLICK TARGET → EXPAND CONTENT
Internal Medicine
A broad E/M and chronic-care-management (CCM) coding mix, where CCM time-tracking compliance is a frequent
under-captured revenue opportunity.
CLICK TARGET → EXPAND CONTENT
Gastroenterology
Screening-vs-diagnostic colonoscopy coding (modifier -33/-PT) directly determines patient cost-share under ACA
preventive-care rules, making this one of the highest-complaint-risk distinctions in GI billing.
CLICK TARGET → EXPAND CONTENT
Dermatology
Medical-vs-cosmetic service differentiation and lesion-based procedure coding (size, location, malignancy status) are the
specialty's core accuracy drivers.
CLICK TARGET → EXPAND CONTENT
Pediatrics
Vaccine administration coding (CPT + CVX crosswalk) and age-banded well-child visit coding require precise alignment
with ACIP schedules and payer preventive-care policy.
CLICK TARGET → EXPAND CONTENT
Family Medicine
The widest service mix of any specialty — preventive visits, chronic disease management, and minor in-office procedures
— each with distinct coding rules applied within the same encounter.
CLICK TARGET → EXPAND CONTENT
Pathology
Professional/technical component splits and specimen-level coding accuracy (number of specimens, complexity) drive
correct lab and pathology reimbursement.


## Page 10

CLICK TARGET → EXPAND CONTENT
Multi-specialty Denials
Cross-department denial analysis traces root causes that a single-specialty review would miss — a front-office eligibility
gap surfacing as denials across five different departments, for example.


## Page 11

Section: Industries
Anchor: #industries
CLICK TARGET → EXPAND CONTENT
Hospitals
End-to-end RCM sized for hospital-scale claim volume and complexity — inpatient MS-DRG coding, outpatient facility
billing, and the higher-stakes appeals workload that comes with facility-level reimbursement.
SUB-ITEM → EXPAND CONTENT
Multi-specialty Hospitals
Coordinated coding and billing across many departments simultaneously, keeping specialty-specific coding rules
consistent hospital-wide instead of siloed by department.
SUB-ITEM → EXPAND CONTENT
Outpatient Hospitals
Facility-fee billing for hospital-based outpatient departments, with correct APC (Ambulatory Payment Classification)
assignment separate from physician professional billing.
SUB-ITEM → EXPAND CONTENT
Community Hospitals
RCM support scaled for smaller hospital systems, where a lean in-house billing team benefits most from outsourced
overflow capacity and denial management support.
CLICK TARGET → EXPAND CONTENT
Clinics
Billing and coding support sized for multi-provider outpatient clinics across the full mix of E/M, procedural, and ancillary
service lines billed day to day.
CLICK TARGET → EXPAND CONTENT
Laboratories
Coding and billing for diagnostic and clinical labs, with medical-necessity documentation and correct
panel-vs-individual-test billing as the primary denial-prevention focus.
CLICK TARGET → EXPAND CONTENT
Rural Health Clinics (RHC)
RCM support built around RHC cost-based, encounter-rate reimbursement — structurally different from standard
fee-for-service billing and easy to bill incorrectly without RHC-specific expertise.
CLICK TARGET → EXPAND CONTENT
Federally Qualified Health Centers (FQHC)
Support aligned to FQHC Prospective Payment System (PPS) billing and sliding-fee-scale documentation requirements,
both of which differ from standard commercial billing.
Additional Segments


## Page 12

CLICK TARGET → EXPAND CONTENT
Ambulatory Surgery Centers (ASC)
Coding and billing for ASC procedures and facility fees, with correct multiple-procedure discounting applied per
ASC-specific payer rules.
CLICK TARGET → EXPAND CONTENT
Telehealth Providers
Billing support for virtual-visit coding under shifting payer telehealth policy, including correct place-of-service (POS 02/10)
and modifier (-95/-GT) requirements.
CLICK TARGET → EXPAND CONTENT
Outpatient Facilities
Revenue cycle support for standalone outpatient service lines operating outside a hospital setting.
CLICK TARGET → EXPAND CONTENT
Medical Billing Companies
Overflow and outsourced coding/billing capacity for billing companies needing to scale without hiring, on standard
SLA-based turnaround.
New Segments (previously missing from the live site)
NEW ITEM → ADD TO SITE
Orthopaedic Care
Dedicated RCM support for standalone orthopaedic practices and orthopaedic-driven ASCs, covering DME (durable
medical equipment) billing alongside procedural coding, global-period tracking across staged musculoskeletal treatment
plans, and correct linkage between surgeon professional billing and ASC facility billing when the same case spans both.
NEW ITEM → ADD TO SITE
Ancillary Services
RCM support for ancillary providers — imaging centers, DME suppliers, infusion/injection services, sleep labs — where
correct medical-necessity documentation, modality-specific coding, and payer-specific prior-authorization rules differ
meaningfully from standard physician-office billing.
NEW ITEM → ADD TO SITE
Home Health
Billing support built around the Medicare Home Health Prospective Payment System (PDGM) — OASIS-driven case-mix
(HHRG) grouping, physician certification and recertification tracking, and 30-day period-of-care billing rules that are
structurally different from fee-for-service claims.
NEW ITEM → ADD TO SITE
Dental
RCM support for dental practices and DSOs — CDT (Current Dental Terminology) coding, dental-specific eligibility and
benefits verification, UCR (Usual, Customary, and Reasonable) fee schedule management, and procedure-bundling rules
that differ from medical claim adjudication.


## Page 13

Prepared for MedExodus Healthcare Solutions Pvt Ltd. All descriptive copy is original. Sections marked PROPOSED/NEW are recommendations, not
existing live capability.
