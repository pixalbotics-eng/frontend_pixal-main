# cPanel – Files upload ke baad next steps

Standalone files upload ho chuki hain. Ab ye steps follow karo:

---

## 1. Node.js app check karo

1. cPanel me **Setup Node.js App** / **Node.js Selector** open karo.
2. Agar pehle se koi app nahi banaya:
   - **Create Application** par click karo.
   - **Node.js version:** 18 ya 20 select karo.
   - **Application root:** woh folder jahan tumne standalone ki files daali (e.g. `pixal-app` ya `public_html/pixal-app`).
   - **Application URL:** subdomain/domain (e.g. `pixal.yourdomain.com`) ya domain.
   - Save karo.

Agar app pehle se hai to **Edit** karke Application root confirm karo — jahan `server.js` hai wahi root hona chahiye.

---

## 2. Startup file set karo

- **Application startup file:** `server.js` (sirf ye filename, path mat likhna).
- Save karo.

---

## 3. Environment variables daalo

**Environment Variables** section me ye add karo:

| Name | Value |
|------|--------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` (ya wahi port jo cPanel ne diya hai) |
| `NEXT_PUBLIC_API_URL` | `https://pixal-fe5o.onrender.com` |
| **`SITE_URL`** | **Apna live site URL** (e.g. `https://pixalbotics.com` ya `https://yourdomain.com`) – SEO / link share ke liye zaroori |
| `GOOGLE_SITE_VERIFICATION` | (optional) Google Search Console wala verification code |
| `SEO_SAME_AS` | (optional) Social links – comma-separated, e.g. `https://facebook.com/yourpage,https://linkedin.com/company/yourpage` |

**SEO:** `SITE_URL` set karoge to jab koi link share karega tab tumhara logo + title sahi dikhega. `GOOGLE_SITE_VERIFICATION` aur `SEO_SAME_AS` optional hain – baad me bhi add kar sakte ho, restart karke. Standalone folder me **SEO_CPANEL_ENV.txt** bhi hai, usme ye variables likhe hain.

Save karo.

---

## 4. App start / restart karo

- **Start Application** / **Restart** button use karo.
- Logs me error na aaye to app chal raha hai.

---

## 5. Site open karo

- **Application URL** jo set kiya (e.g. `https://pixal.yourdomain.com`) browser me open karo.
- Agar subdomain use kiya hai to **DNS** me us subdomain ko server IP par point karna hoga (cPanel subdomain create karte waqt bata deta hai).

---

## 6. SSL (optional lekin recommended)

- cPanel **SSL/TLS** ya **Let’s Encrypt** se subdomain/domain par free SSL enable karo taake `https://` chal sake.

---

## Short checklist

- [ ] Node.js app ka **Application root** = jahan `server.js` hai
- [ ] **Startup file** = `server.js`
- [ ] Env: `NODE_ENV=production`, `PORT=3000`, `NEXT_PUBLIC_API_URL=...`, **`SITE_URL=` apna domain** (SEO ke liye)
- [ ] **Start / Restart** kiya
- [ ] Browser me URL open kiya
- [ ] SSL on kiya (optional)
- [ ] (Optional) `GOOGLE_SITE_VERIFICATION` / `SEO_SAME_AS` daalo aur restart – SEO ke liye

Agar koi error aaye to cPanel Node.js app ke **logs** check karo (View Logs / Error Log).
