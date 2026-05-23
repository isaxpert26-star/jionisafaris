# mwongozo wa kuweka jioni safaris mtandaoni (deployment guide) 🌍🦁 TSwana

Hongera sana kwa kufanya maboresho kwenye programu ya **Jioni Safaris**! Ili kuweza kuweka na kuratibu mfumo huu kwenye majukwaa ya kisasa ya kuhost kama **Vercel**, **Netlify**, au **GitHub Pages** bila kupata changamoto, tumeweka maandalizi yote muhimu (`vercel.json`, `netlify.toml`, n.k.) ili uweze kupeleka Live kwa hatua chache rahisi sana.

---

## 🛠️ nini tumetayarisha kwa ajili yako?
Ili kuzuia changamoto ambazo huwa zinawapata watengenezaji wengi wanapoweka React Single Page Applications (SPA) mtandaoni (kama vile matatizo ya "404 Page Not Found" pindi ukurasa uki-refresh au unavomigrate link):
1. **`vercel.json`** - Inadhibiti na kuelekeza vizuri njia (routing rules) zote kurudi kwenye index wakati wa uratibu wa Vercel.
2. **`netlify.toml`** - Inafanya kazi hiyo hiyo ya uratibu unapoweka programu hiyo Netlify kwa kubofya mara moja tu.

---

## 🐙 Hatua ya 1: Jinsi ya Kuipeleka GitHub (GitHub Upload)
Kabla ya kuwekwa kwenye mifumo ya hosting, kuipeleka GitHub ndiyo njia bora zaidi kwani inaruhusu maboresho ya kiotomatiki (Continuous Deployment).

1. Ingia kwenye akaunti yako ya **[GitHub](https://github.com)**.
2. Bonyeza **New** kutengeneza Repository mpya ya GitHub:
   - Weka jina (Mfano: `jioni-safaris`).
   - Seta kama **Public** au **Private**.
   - **Usiongeze** README, `.gitignore` au License wakati unatengeneza (tayari zipo huku kwenye folder letu).
3. Fungua Terminal kwenye kompyuta yako na uendeshe amri zifuatazo ili kuunganisha folder lako la Jioni Safaris na GitHub:

```bash
# Anzisha Git kwenye folder lako la mradi (ikiwa bado kufanyika)
git init

# Ongeza faili zote kwenye maandalizi ya kupush
git add .

# Weka ujumbe wa kwanza (commit)
git commit -m "feat: jioni safaris release - optimized deployment"

# Seta jina la tawi kuu kuwa 'main'
git branch -M main

# Unganisha folder lako na Link ya repository yako ya GitHub (Badilisha na link yako ya GitHub)
git remote add origin https://github.com/USERNAME/jioni-safaris.git

# Push faili zote kwenda GitHub
git push -u origin main
```

---

## ⚡ Hatua ya 2: Kuweka Mtandaoni Kupitia Vercel (Fastest & Easiest)
Vercel ndiyo jukwaa rahisi na lenye kasi kubwa zaidi kwa programu za Vite na React.

### Njia ya Kwanza: Kupitia GitHub Integration (Inapendekezwa sana)
1. Nenda kwenye **[Vercel Dashboard](https://vercel.com/)** na uingie na akaunti yako ya GitHub.
2. Bonyeza **Add New...** kisha chagua **Project**.
3. Utaona orodha ya repository zako za GitHub. Bonyeza **Import** pembeni ya `jioni-safaris`.
4. Kwenye ukurasa unaofuata:
   - **Framework Preset**: Vercel itatambua kiotomatiki kuwa ni **Vite** au **Other**.
   - **Root Directory**: Chagua root `./`.
   - **Build and Output Settings**: Huna haja ya kubadilisha kitu (itaendesha `npm run build` na deploy kutoka `dist` kiotomatiki).
5. Bonyeza **Deploy**! Ndani ya sekunde chache, tovuti yako itakuwa tayari na utapewa link ya Live bure (`https://jioni-safaris.vercel.app`).

### Njia ya Pili: Kupitia Vercel CLI (Moja kwa moja kutoka Kwenye Terminal yako)
Kwenye folder lako la mradi kwenye kompyuta yako, unaweza kufanya hivi:
```bash
# Sakinisha Vercel duniani kote kwenye mashine yako (kama huna tayari)
npm install -g vercel

# Login kwenye akaunti yako
vercel login

# Anzisha deployment
vercel
```
Fuata maelekezo ya kwenye skrini yako, kisha andika `vercel --prod` kukamilisha na kupata link rasmi ya uzalishaji (Production Live).

---

## 🌌 Hatua ya 3: Kuweka Mtandaoni Kupitia Netlify
Netlify ni chaguo jingine bora kabisa lenye faida nyingi.

### Njia ya Kwanza: GitHub Integration (Inapendekezwa)
1. Fungua **[Netlify Dashboard](https://www.netlify.com/)** na uingie kupitia akaunti yako ya GitHub.
2. Bonyeza **Add new site** -> Chagua **Import an existing project**.
3. Chagua **GitHub** kama git provider na ruhusu ufikiaji wa repository ya `jioni-safaris`.
4. Netlify itasoma faili letu la `netlify.toml` tuliloweka tayati na kusanidi kila kitu kiotomatiki:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Bonyeza **Deploy site** na kila kitu kitakuwa Live hivi punde!

---

## ☁️ Chaguo mbadala: Cloudflare Pages
Ikiwa ungependa kutumia utendaji mzuri na wa bure usio na kikomo wa **Cloudflare**, unaweza kuweka kwa kutumia **Cloudflare Pages**:
1. Ingia kwenye dashibodi yako ya Cloudflare.
2. Nenda kwenye sehemu ya **Workers & Pages** -> **Create...** -> **Pages** -> **Connect to Git**.
3. Chagua repository ya `jioni-safaris` kutoka GitHub yako.
4. Kwenye mipangilio ya mradi, chagua **Vite** kama framework preset yako.
5. Bonyeza **Save and Deploy**. Itafanya kazi hiyo hiyo kwa usalama mkubwa sana na routing thabiti.

---

## 📌 Vidokezo Muhimu vya Kumbuka (Things to keep in mind)
- **Hafidhi ya Ndani (Local Storage Persistence)**: Programu hii imesanidiwa kuhifadhi taarifa zote za safari, kadi za malipo za kupenda, fomu za maoni, na barua pepe za kisimulizi kwenye kache ya kivinjari chako (`localStorage`). Kwa hivyo, hata ukiihost bure popote bila kuwa na database ya nje, mteja atakuwa na uwezo kamili wa kutumia programu hiyo, kuandika maombi, kukamilisha uwekaji wa nafasi (checkout), na kuona simulator ya email bila makosa yoyote!
- **Kutumia Domain Binafsi (Custom Domain)**: Kwenye mifumo hiyo yote miwili (Vercel na Netlify), unaweza kuweka Domain yako binafsi kirahisi (Mfano: `jionisafaris.com`) kwa kufuata maelekezo ya DNS yaliyopo kwenye sehemu ya "Domain Settings" ya jukwaa husika.

Sasa umeshajizatiti kirahisi! Kazi njema katika usimamizi wa Utalii na Jioni Safaris Tanzania! 🐆🇹🇿
