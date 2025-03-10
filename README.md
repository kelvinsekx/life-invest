# Life Invest Assessment
This is an assessment for the myeazipay hiring process. The website is publicly available at https://life-invest-wheat.vercel.app/.

Stack being used are vue, tailwindcss, pinia and chartjs. I added body-scroll-lock to avoid creating multiple pages and easily disabling scroll for parent components. Body-scroll... do not count as a stack as it is only a simple convenience.

This app is best experienced in desktop view, although it should do on mobile too.

```bash
"dependencies": {
    "body-scroll-lock": "^4.0.0-beta.0",
    "chart.js": "^4.4.8",
    "pinia": "^3.0.1",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  }
```

## Key Notes
1. Data Visualization is static
   
   Either of the APIs are being used as Free. This comes with limitation in hitting their endpoints especially API that can help with this visualization do not fall under the Free spec. To limit unnecessary errors, I referred to using a static placeholder, simulated real world use. As seen in pinia store, the logic to fetch these trends are already implemented.

## Features of this app
1. List selected stocks in real time by hitting the finnhub api. On visit to the app, it fetches some data when component mounts.
2. Search existing stocks. This behaves like it hits an API and is being debounced. But I'm only filtering existing stocks at the back, simulating real world endpoint.
3. Click a listed stock row to see the details page (a modal actually). Just a simple convenience to add the stock to waitlist.
4. Click the waitlist tabs to see your waitlists.

