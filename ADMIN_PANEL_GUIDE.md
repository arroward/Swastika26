# Admin Panel & Backend Integration Guide
## Proshow Ticket Management System (Updated)

This guide outlines the architecture and workflow for the Admin Panel to handle ticket verification, generation, and delivery, reflecting the latest multi-pass cart system.

### 1. Firestore Database Schema
The database uses a collection named `proshow_passes`.

#### Document Structure
Each document represents a single booking request, which may contain multiple tickets.

```typescript
interface TicketBooking {
  // --- User Submitted Data ---
  id: string;               // Document ID (Auto-generated)
  name: string;             // Full Name
  email: string;            // User Email (Critical for delivery)
  phone: string;            // Contact Number
  transactionId: string;    // UPI Transaction ID / UTR
  
  // --- Cart System (New) ---
  tickets: {
      day1: number;         // Count of Day 1 passes
      day2: number;         // Count of Day 2 passes
      combo: number;        // Count of Combo passes
  };
  
  // Legacy Support (Old Schema)
  ticketType?: 'day1' | 'day2' | 'combo'; 
  count?: number;

  totalAmount: number;      // Total price in INR
  createdAt: Timestamp;     // Submission time
  
  // --- Admin / System Fields ---
  status: 'pending' | 'verified' | 'rejected';
  
  // Admission Tracking (New Integer Logic)
  admitted: {
      day1: number;         // Number of people already admitted for Day 1
      day2: number;         // Number of people already admitted for Day 2
      [key: string]: any;   // Timestamps for last scans (e.g., 'last_scan_day1')
  };
  
  // Mailing Status
  mailStatus: 'pending' | 'sent' | 'failed';
  
  // Verification Details
  rejectionReason?: string; // If status is 'rejected'
  verifiedAt?: Timestamp;   // Time of verification
}
```

### 2. Admin Panel Workflow

The Admin Panel (`/admin/tickets`) allows administrators to filter requests by status.

#### Step A: Verification
1.  **View Request**: Admin sees the user's name, total amount, and UTR.
2.  **Verify Payment**: Admin cross-checks the `transactionId` and `totalAmount`.
    *   *Note*: The UI now displays a breakdown of tickets (e.g., "D1:2, D2:1") in the verification queue.
3.  **Action**:
    *   **Approve**: Updates `status` to `'verified'`. Triggers the email sending API.
    *   **Reject**: Updates `status` to `'rejected'` with a reason.

#### Step B: Ticket Generation & Mailing (API Key Logic)
The endpoint `/api/admin/verify-and-send` handles this process.

**Logic Flow:**
1.  **Generate Email Content**:
    *   Uses dynamic `TicketTemplate` component.
    *   Fetches Artist/Event details dynamically from `@/data/content` to ensure tickets match current event info.
2.  **Send Email**:
    *   Sends an HTML email with the ticket details to the user.
    *   Includes a unique QR Code generated via `api.qrserver.com`.
3.  **QR Payload Format**:
    *   Format: `SW26:{BookingID}:{TicketType}:{Count}` (Legacy format kept for compatibility, but BookingID is the key).

### 3. Scanner Logic (Gate Entry)

The `TicketScanner` component handles entry management.

**Validation Logic:**
1.  **Status Check**: Must be `'verified'`.
2.  **Day Check**: 
    *   Calculates `totalAllowed` for the specific scanning day (e.g., Day 1).
    *   `totalAllowed = tickets.day1 + tickets.combo` (or legacy `count` if type matches).
3.  **Admission Check**:
    *   Compares `admitted[scanDay]` (integer) against `totalAllowed`.
    *   If `admitted < totalAllowed`, **ACCESS GRANTED**.
    *   If `admitted >= totalAllowed`, **ALREADY ENTERED**.
4.  **Update**:
    *   Increments `admitted[scanDay]` by 1.
    *   Updates timestamp.

### 4. Recommendations
*   **Email Service**: Ensure the API route is connected to a real sender (Resend/Nodemailer) in production.
*   **Security**: Update Firestore rules to restrict `update` access to authenticated admins only.
