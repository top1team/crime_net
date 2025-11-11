### Software Requirements Specifications

#### 1. System Overview
Platform Name: CrimeNet (Safety Platform)
Purpose: AI-powered community security intelligence system for real-time crime reporting, analysis, and response coordination.
Core Value Proposition:

Citizens report security incidents via web or USSD code(this is a feature to be done later)
AI analyzes and categorizes reports
Validated information reaches relevant authorities automatically(relevant authorities need also to be registered with our platform in order to receive the info)
Community members receive localized security alerts

#### 2. User Roles & Access Levels
2.1 Anonymous Reporter (Guest)

Can submit reports without registration
Limited to basic crime reporting
No bounty eligibility
No access to historical data

2.2 Registered Citizen (Authenticated)

Full reporting capabilities
Bounty/reward eligibility
Access to personalized security alerts
View crime heatmaps and trends
Track their report status

2.3 Admin/Analyst (Watch Tower Team)

Review and validate all incoming reports
Manual crime categorization for edge cases
Manage user accounts
Configure system settings
Generate analytics reports

2.4 Police/Authority (Law Enforcement)

View reports assigned to their jurisdiction
Update case status (investigating, resolved, false)
Post Most Wanted notices
Access regional crime analytics
Communicate with Watch Tower team

### 3. Functional Requirements
3.1 User Authentication & Registration
Web Registration
Required Fields:
- Email (must be unique)
- Phone Number (Kenya format: +254...)
- Password (min 8 chars, 1 uppercase, 1 number)
- Residing Region (dropdown: County → Sub-county → Ward)

Optional Fields:
- Full Name
- Profile Picture
- Alternate Contact

Verification:
- Email OTP (6-digit code)
- SMS OTP via Africa's Talking
- Both must be verified within 15 minutes
USSD Registration (Safaricom & Airtel)
Dial: *483*66# (example)

Menu Flow:
1. Welcome to Salama
   [1] Register
   [2] Report Crime
   [3] Check Alerts

If [1] Register:
   - Enter County Code (001-047)
   - Enter Sub-county
   - Confirm via SMS
   - Account created, SMS confirmation sent
Login Methods

Email + Password (web)
Phone + OTP (web & USSD)
"Continue as Guest" (limited features)


3.2 Crime Reporting Module

Route: /report-crime
Form Structure:
FieldTypeRequiredConstraintsNotesReporter NameTextOptionalMax 100 charsAnonymous if blankID NumberTextOptional7-8 digitsNational IDReporter ImageFile UploadOptionalMax 2MB, JPG/PNGFor verified reportsPhone NumberTelOptional+254 formatFor follow-upTime of IncidentDateTimeRequiredNot future dateWhen crime occurredCrime DescriptionTextareaRequired50-500 charsMain report bodyLocationMap + TextRequiredGPS coords + addressAuto-detect or manualEvidence FilesMulti-uploadOptionalMax 10MB totalPhotos/videosWitnessesNumberOptional0-20How many saw itSuspect DescriptionTextareaOptionalMax 300 charsPhysical description
Additional Features:

Voice Recording: 60-second audio description (transcribed by AI)
Anonymous Mode Toggle: One-click to clear all personal fields
Quick Report Templates: Pre-filled forms for common crimes
Draft Saving: Auto-save every 30 seconds
Multi-language Support: English, Swahili, Sheng

3.3 AI Analysis Pipeline
Stage 1: Initial Processing
pythonInput: Raw crime report

Steps:
1. Text Preprocessing
   - Remove profanity/offensive language
   - Correct common Swahili/Sheng spelling
   - Extract key entities (names, locations, times)

2. Language Detection
   - Identify: English, Swahili, Sheng, or mixed
   - Translate to English for analysis

3. Duplicate Detection
   - Check against reports in last 24 hours
   - Flag if >80% similarity in same location
Stage 2: Crime Classification
pythonAI Model: Fine-tuned BERT or GPT for Kenyan context

Crime Categories (Aligned with Kenyan Penal Code):
1. Violent Crimes
   - Murder (red #FF0000)
   - Assault/GBV (purple #800080)
   - Robbery with violence (dark red #8B0000)
   - Kidnapping (orange #FF4500)

2. Property Crimes
   - Theft (yellow #FFD700)
   - Burglary (amber #FFBF00)
   - Vandalism (light orange #FFA500)
   - Car theft (brown #8B4513)

3. Fraud & Cybercrime
   - M-Pesa fraud (pink #FF69B4)
   - Fake goods (magenta #FF00FF)
   - Identity theft (lavender #E6E6FA)

4. Drug-Related
   - Drug trafficking (dark green #006400)
   - Drug possession (lime #32CD32)

5. Public Disorder
   - Noise disturbance (light blue #87CEEB)
   - Illegal dumping (grey #808080)

6. Traffic Incidents
   - Accident (teal #008080)
   - Hit-and-run (navy #000080)

7. Suspicious Activity
   - Unknown (white #FFFFFF)

Confidence Threshold: >85% for auto-classification
If <85%: Route to Watch Tower for manual review
Stage 3: Validation & Enrichment
pythonAutomated Checks:
- Cross-reference with existing Most Wanted database
- Check location against known crime hotspots
- Verify time consistency (day/night crimes)
- Assess evidence quality (image clarity, metadata)

Risk Scoring (1-10):
- Severity of crime: +3 for violent, +1 for property
- Evidence quality: +2 if has photos/videos
- Reporter credibility: +1 if verified user
- Location history: +2 if hotspot, -1 if new area
- Time sensitivity: +1 if within last hour

Auto-escalation: Risk score >7 → Immediate police notification
Stage 4: Response Routing
pythonDecision Tree:

IF crime_type == "Murder" OR risk_score > 8:
    → Send to Police Control Room (SMS + Dashboard alert)
    → Notify nearest patrol car
    → Alert Watch Tower for monitoring

ELIF crime_type IN ["Fraud", "Cybercrime"]:
    → Route to DCI Cyber Crime Unit
    → Flag if matches known scam patterns

ELIF crime_type == "GBV":
    → Send to Gender-Based Violence Unit
    → Include victim support resources

ELSE:
    → Standard routing to nearest police station
    → Add to public heatmap after 2-hour delay
```

---

### **3.4 Watch Tower (Admin Dashboard)**

#### **Route: `/admin/watchtower`**

**Features:**

**1. Report Queue**
```
Tabs:
- [Pending Review] (AI confidence <85%)
- [Auto-Classified] (AI confidence >85%, awaiting validation)
- [Escalated] (Risk score >7)
- [Disputed] (User flagged AI classification as wrong)
- [Archived] (Resolved/Closed)

Table Columns:
| Report ID | Time | Location | Category (AI) | Confidence | Risk Score | Actions |

Filters:
- County/Sub-county
- Crime Type
- Date Range
- Evidence Availability (has photos/videos)
- Reporter Type (anonymous/verified)
- Status (pending/approved/rejected)

Bulk Actions:
- Approve selected
- Reject with reason
- Reassign category
- Merge duplicates
```

**2. Manual Classification Interface**
```
Left Panel: Report Details
- Full text
- Evidence gallery
- Location map
- Timeline

Center Panel: Classification Form
- Crime Category (dropdown with search)
- Sub-category
- Severity (Low/Medium/High/Critical)
- Tags (auto-suggested + manual)
- Notes for police

Right Panel: AI Suggestions
- "AI thinks this is: Robbery (78%)"
- Similar past reports
- Recommended action
```

**3. Analytics Dashboard**
```
Metrics:
- Reports per hour/day/week
- AI accuracy rate (% correct classifications)
- Average validation time
- Reports by category (pie chart)
- Geographic distribution (map view)
- Response time by police station

Alerts:
- Unusual spike in reports from one area
- Potential crime wave detected (pattern matching)
- Accuracy drop below 80%
```

**4. User Management**
```
- View all registered users
- Ban/suspend accounts (spam/fake reports)
- Verify reporter credentials
- Manage police/authority accounts
- Audit log of all actions
```

---

### **3.5 Crime Heatmap**

#### **Route: `/heatmap`**

**Features:**

**1. Interactive Map (Mapbox/Leaflet)**
```
Base Layers:
- Satellite view
- Street map
- Terrain

Data Layers:
- Crime density (heatmap overlay)
- Individual crime markers (clustered)
- Police station locations (blue pins)
- Safe zones (green overlay)
- High-risk zones (red overlay)

Crime-Specific Layers (toggle on/off):
- Murder (red heatmap)
- Assault/GBV (purple)
- Theft (yellow)
- Fraud (pink)
- Drug-related (green)
- Traffic (teal)
```

**2. Time-based Filtering**
```
Quick Filters:
- Last 24 hours
- Last 7 days
- Last 30 days
- Custom date range

Time-of-day Heatmap:
- Morning (6am-12pm)
- Afternoon (12pm-6pm)
- Evening (6pm-12am)
- Night (12am-6am)
```

**3. Crime Statistics Panel**
```
For selected area:
- Total reports: 145
- Most common crime: Theft (35%)
- Trend: ↑ 12% vs last week
- Safety Score: 6.5/10
- Last incident: 2 hours ago

Top 5 Hotspots (table):
| Location | Reports | Most Common Crime | Trend |
```

**4. Alert Subscription**
```
Users can:
- Draw custom boundary on map
- Get SMS/email when crime reported in that area
- Set alert threshold (only high-risk crimes)
- Mute during certain hours
```

**5. Export Options**
```
- Download as PDF report
- Export to CSV (for researchers/NGOs)
- Share specific view (generates shareable link)
```

---

### **3.6 Police/Authority Dashboard**

#### **Route: `/police/dashboard`**

**Features:**

**1. Assigned Reports**
```
Filter by:
- Jurisdiction (auto-filtered to their station)
- Status (New/Investigating/Resolved/False)
- Priority (Critical/High/Medium/Low)

Actions:
- Mark as "Investigating"
- Request more information from reporter
- Upload investigation notes
- Mark as "Resolved" (requires closing notes)
- Mark as "False Report" (requires justification)
```

**2. Most Wanted Management**
```
[Post New Most Wanted]

Form:
- Name
- Photo
- Crimes committed
- Last seen location
- Bounty amount (KES)
- Contact info for tips
- Urgency level

Published profiles appear on:
- Public website
- Heatmap (if location known)
- SMS alerts to users in that region
```

**3. Case Management**
```
For each report:
- Timeline of actions taken
- Evidence chain of custody
- Communication log with Watch Tower
- Linked reports (if part of pattern)
- Court case reference (if filed)
```

**4. Performance Metrics**
```
Station Dashboard:
- Cases assigned: 45
- Cases resolved: 38 (84%)
- Average response time: 2.3 hours
- Community rating: 4.2/5 stars

Leaderboard (optional):
- Top performing stations
- Fastest response times
- Highest resolution rates