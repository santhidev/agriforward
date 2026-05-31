# PROTOTYPE: AgriForward UI Variations

**Throwaway code.** Do not merge to production.

## Question being answered

What should the Buyer Create-PO and Seller Submit-Offer screens look like?
Three radically different layout approaches are provided so stakeholders can compare and pick a direction.

## Run

```bash
npm run dev
```

Then open http://localhost:3000

## Screens

| File | Screen |
|------|--------|
| `index.html` | **Screen A** — Buyer Create PO + Select Delivery Option |
| `seller-offer.html` | **Screen B** — Seller Submit Offer + Deposit Calculation |

## Variants

Switch variants via the floating bottom bar or URL search param:

- `?v=minimal` — Minimal / Wizard (one question per step, lots of whitespace)
- `?v=dense` — Dense / Dashboard (everything on one screen, power-user feel)
- `?v=card` — Card / Conversational (card-based, friendly copy, mobile-first)

Keyboard: `←` / `→` arrow keys also cycle variants (when not inside an input).

## Notes

- No persistence. State lives in browser memory only.
- All data is hardcoded mock data.
- UI labels are in Thai; code/comments are in English.
- A debug state panel is visible on every screen so you can see exactly what values are captured.
