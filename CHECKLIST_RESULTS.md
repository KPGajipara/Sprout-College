# Checklist results (manual run)

**Date:** Run completed via script + curl. Group TEST01 ensured in Firestore.

---

## 1. Go to localhost:3000/join → enter TEST01 → does it accept it?

**Done:** Group with code **TEST01** was created in Firestore (script `scripts/ensure-test-group.mjs`).  
**Verified:** `/join` returns 200.  
**You:** Open http://localhost:3000/join, enter **TEST01**, submit → you should see "✓ Code accepted! Redirecting…" and redirect to `/auth`.

---

## 2. Sign up with a real email + password → do you land on questionnaire?

**Verified:** `/auth` returns 200.  
**You:** After join, on `/auth` choose **Participant** → Sign up tab → use a **real email** and password (≥8 chars). Submit → you should land on `/questionnaire`.  
*(Firebase may require a real email; use one you can access if you need forgot-password.)*

---

## 3. Complete all 5 sections → do you land on dashboard?

**Verified:** `/questionnaire` and `/dashboard` exist (unauthenticated request gets 307 redirect, which is correct).  
**You:** Complete all 5 questionnaire sections and submit → you should land on `/dashboard`.

---

## 4. Check Firestore → users collection → does your user appear?

**Not automated.**  
**You:** In Firebase Console → Firestore → `users` collection → find the document with your UID (same as in Authentication → Users). It should have `group_id`, `questionnaire_submitted: true`, etc.

---

## 5. Go to /admin → log in with your ADMIN_PASSWORD → do you see the user?

**Verified:** `/admin` returns 200.  
**Required:** In `.env.local` set:
- `ADMIN_EMAILS=your-admin@email.com` (the same email you use to log in)
- `ADMIN_PASSWORD=your-secret-password`

**You:** Open http://localhost:3000/admin → choose Admin login → enter that email + `ADMIN_PASSWORD` → you should see the admin panel and the user in the list.

---

## 6. Trigger matching → does it run?

**You:** In admin panel, find the group (e.g. **Checklist Test Group** / TEST01) and click **Trigger matching**. It should run without error (and create matches in Firestore `matches` collection).

---

## 7. Go back to dashboard → does it show a match?

**You:** As the participant, go to http://localhost:3000/dashboard. You should see a match card (and link to `/match/[id]`) if matching created a pair/trio including your user.

---

## Summary

| Step | Automated | Result |
|------|-----------|--------|
| 1. Join TEST01 | Group created in Firestore | Ready for you to test in browser |
| 2. Sign up → questionnaire | Routes verified | Manual sign up required |
| 3. Complete 5 sections → dashboard | Routes verified | Manual completion required |
| 4. Firestore users | — | Check in Firebase Console |
| 5. Admin login | `/admin` loads | Set ADMIN_EMAILS + ADMIN_PASSWORD first |
| 6. Trigger matching | — | Manual in admin panel |
| 7. Dashboard shows match | — | After step 6, refresh dashboard |

**One-off script used:** `node --env-file=.env.local scripts/ensure-test-group.mjs` (creates group TEST01 if missing).
