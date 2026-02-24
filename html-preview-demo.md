# HTML Preview Blocks

andocs supports embedding interactive HTML prototypes directly inside markdown documentation using `html-preview` code blocks. This is useful for sharing UI mockups, form prototypes, and interactive demos with your team — without leaving the documentation.

## How It Works

Wrap your HTML in a fenced code block with the `html-preview` language identifier:

```html-preview
<h1>Hello from HTML Preview!</h1>
<p>This is rendered as a live, interactive preview.</p>
```

The HTML is rendered inside a **sandboxed iframe** with JavaScript enabled. Each preview block is completely isolated from the host page and from other preview blocks.

### What You Can Include

- **Full HTML documents** — `<!DOCTYPE html>`, `<html>`, `<head>`, `<style>`, `<body>`
- **Inline CSS** — `<style>` blocks or inline `style` attributes
- **JavaScript** — `<script>` blocks for interactivity (form validation, state, animations)
- **External resources** — CDN links for fonts, CSS frameworks, icon libraries

If you omit the `<!DOCTYPE html>` wrapper, the preview automatically wraps your content in a basic HTML document.

### Toolbar

Each preview block includes a toolbar with three actions:

- **Copy HTML** — copies the raw HTML source to clipboard
- **Open in new tab** — opens the preview in a standalone browser tab
- **Fullscreen** — expands the preview to fill the screen

### Limitations

- **No `allow-same-origin`** — the iframe cannot access the parent page (security)
- **No server-side requests** — fetch/XHR calls to your app's API will be blocked by CORS
- **Height auto-resize** — the preview auto-adjusts height (200px min, 800px max)

---

## Demo: Fintech Loan Application Form

Below is a complex, fully interactive fintech loan application form. It demonstrates form validation, conditional fields, multi-step navigation, real-time calculations, and responsive layout — all running inside an `html-preview` block.

```html-preview
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      line-height: 1.6;
      padding: 32px 24px;
    }

    .app {
      max-width: 720px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .header p {
      font-size: 14px;
      color: #64748b;
    }

    /* Progress Steps */
    .progress {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 32px;
    }
    .progress-step {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #94a3b8;
    }
    .progress-step.active { color: #2563eb; }
    .progress-step.completed { color: #16a34a; }
    .progress-dot {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      background: #e2e8f0;
      color: #64748b;
      flex-shrink: 0;
    }
    .progress-step.active .progress-dot {
      background: #2563eb;
      color: white;
    }
    .progress-step.completed .progress-dot {
      background: #16a34a;
      color: white;
    }
    .progress-line {
      width: 40px;
      height: 2px;
      background: #e2e8f0;
      align-self: center;
    }
    .progress-line.completed { background: #16a34a; }

    /* Card */
    .card {
      background: white;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      padding: 28px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .card-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .card-desc {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 24px;
    }

    /* Form */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-grid .full { grid-column: 1 / -1; }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field label {
      font-size: 13px;
      font-weight: 500;
      color: #374151;
    }
    .field label .req { color: #ef4444; }

    .field input, .field select, .field textarea {
      padding: 9px 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      color: #1e293b;
      background: white;
      transition: border-color 0.15s, box-shadow 0.15s;
      outline: none;
    }
    .field input:focus, .field select:focus, .field textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    }
    .field input.error, .field select.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
    }
    .field .error-msg {
      font-size: 12px;
      color: #ef4444;
      min-height: 16px;
    }
    .field .hint {
      font-size: 12px;
      color: #94a3b8;
    }

    /* Range slider */
    .range-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .range-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .range-value {
      font-size: 20px;
      font-weight: 700;
      color: #2563eb;
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: #e2e8f0;
      outline: none;
      border: none;
      padding: 0;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #2563eb;
      cursor: pointer;
      box-shadow: 0 1px 4px rgba(37,99,235,0.3);
    }
    .range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }

    /* Loan summary */
    .summary-box {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;
    }
    .summary-box h3 {
      font-size: 14px;
      font-weight: 600;
      color: #0369a1;
      margin-bottom: 12px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .summary-item {
      display: flex;
      flex-direction: column;
    }
    .summary-item .label {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .summary-item .value {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
    }

    /* Checkbox / Radio */
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .checkbox-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
    }
    .checkbox-item input[type="checkbox"],
    .checkbox-item input[type="radio"] {
      width: 18px;
      height: 18px;
      margin-top: 2px;
      flex-shrink: 0;
      accent-color: #2563eb;
    }
    .checkbox-item .cb-label {
      font-size: 13px;
      color: #374151;
      line-height: 1.4;
    }
    .checkbox-item .cb-label strong {
      font-weight: 600;
    }

    /* Buttons */
    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 28px;
      gap: 12px;
    }
    .btn {
      padding: 10px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      border: none;
      transition: all 0.15s;
    }
    .btn-primary {
      background: #2563eb;
      color: white;
    }
    .btn-primary:hover { background: #1d4ed8; }
    .btn-primary:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
    .btn-secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }
    .btn-secondary:hover { background: #f9fafb; }

    /* Success state */
    .success {
      text-align: center;
      padding: 40px 20px;
    }
    .success-icon {
      width: 64px;
      height: 64px;
      background: #dcfce7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 28px;
    }
    .success h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .success p {
      font-size: 14px;
      color: #64748b;
      max-width: 400px;
      margin: 0 auto;
    }
    .ref-number {
      display: inline-block;
      margin-top: 16px;
      padding: 8px 16px;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #0369a1;
      font-family: monospace;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.2s;
      z-index: 100;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    .hidden { display: none !important; }

    @media (max-width: 600px) {
      body { padding: 16px; }
      .form-grid { grid-template-columns: 1fr; }
      .summary-grid { grid-template-columns: 1fr; }
      .progress-step span { display: none; }
    }
  </style>
</head>
<body>
  <div class="app">
    <div class="header">
      <h1>Business Loan Application</h1>
      <p>Complete all steps to submit your loan application</p>
    </div>

    <!-- Progress -->
    <div class="progress">
      <div class="progress-step active" id="prog-1">
        <div class="progress-dot">1</div>
        <span>Loan Details</span>
      </div>
      <div class="progress-line" id="line-1"></div>
      <div class="progress-step" id="prog-2">
        <div class="progress-dot">2</div>
        <span>Business Info</span>
      </div>
      <div class="progress-line" id="line-2"></div>
      <div class="progress-step" id="prog-3">
        <div class="progress-dot">3</div>
        <span>Review</span>
      </div>
    </div>

    <!-- Step 1: Loan Details -->
    <div class="card" id="step-1">
      <div class="card-title">Loan Details</div>
      <div class="card-desc">Configure your desired loan parameters</div>

      <div class="form-grid">
        <div class="field full">
          <label>Loan Purpose <span class="req">*</span></label>
          <select id="purpose">
            <option value="">Select a purpose...</option>
            <option value="working_capital">Working Capital</option>
            <option value="equipment">Equipment Purchase</option>
            <option value="expansion">Business Expansion</option>
            <option value="real_estate">Commercial Real Estate</option>
            <option value="refinance">Debt Refinancing</option>
            <option value="inventory">Inventory Financing</option>
          </select>
          <div class="error-msg" id="purpose-error"></div>
        </div>

        <div class="field full">
          <div class="range-wrapper">
            <div class="range-header">
              <label>Loan Amount <span class="req">*</span></label>
              <div class="range-value" id="amount-display">$150,000</div>
            </div>
            <input type="range" id="amount" min="10000" max="2000000" step="5000" value="150000" />
            <div class="range-labels">
              <span>$10,000</span>
              <span>$2,000,000</span>
            </div>
          </div>
        </div>

        <div class="field full">
          <div class="range-wrapper">
            <div class="range-header">
              <label>Repayment Term</label>
              <div class="range-value" id="term-display">36 months</div>
            </div>
            <input type="range" id="term" min="6" max="120" step="6" value="36" />
            <div class="range-labels">
              <span>6 months</span>
              <span>10 years</span>
            </div>
          </div>
        </div>

        <div class="field">
          <label>Preferred Rate Type</label>
          <select id="rate-type">
            <option value="fixed">Fixed Rate</option>
            <option value="variable">Variable Rate</option>
          </select>
        </div>

        <div class="field">
          <label>Collateral Available</label>
          <select id="collateral">
            <option value="none">No Collateral</option>
            <option value="real_estate">Real Estate</option>
            <option value="equipment">Equipment</option>
            <option value="inventory">Inventory</option>
            <option value="receivables">Accounts Receivable</option>
          </select>
        </div>
      </div>

      <div class="summary-box">
        <h3>Estimated Loan Summary</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="label">Monthly Payment</span>
            <span class="value" id="monthly-payment">$4,580</span>
          </div>
          <div class="summary-item">
            <span class="label">Interest Rate (est.)</span>
            <span class="value" id="interest-rate">6.5%</span>
          </div>
          <div class="summary-item">
            <span class="label">Total Interest</span>
            <span class="value" id="total-interest">$14,880</span>
          </div>
          <div class="summary-item">
            <span class="label">Total Repayment</span>
            <span class="value" id="total-repayment">$164,880</span>
          </div>
        </div>
      </div>

      <div class="actions">
        <div></div>
        <button class="btn btn-primary" onclick="goToStep(2)">Continue to Business Info</button>
      </div>
    </div>

    <!-- Step 2: Business Info -->
    <div class="card hidden" id="step-2">
      <div class="card-title">Business Information</div>
      <div class="card-desc">Tell us about your business</div>

      <div class="form-grid">
        <div class="field full">
          <label>Legal Business Name <span class="req">*</span></label>
          <input type="text" id="biz-name" placeholder="Acme Corporation Ltd." />
          <div class="error-msg" id="biz-name-error"></div>
        </div>

        <div class="field">
          <label>Registration Number <span class="req">*</span></label>
          <input type="text" id="reg-number" placeholder="e.g. 12345678" />
          <div class="error-msg" id="reg-number-error"></div>
        </div>

        <div class="field">
          <label>Year Established <span class="req">*</span></label>
          <input type="number" id="year-est" placeholder="2015" min="1900" max="2026" />
          <div class="error-msg" id="year-est-error"></div>
        </div>

        <div class="field">
          <label>Industry <span class="req">*</span></label>
          <select id="industry">
            <option value="">Select industry...</option>
            <option value="technology">Technology</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="healthcare">Healthcare</option>
            <option value="construction">Construction</option>
            <option value="services">Professional Services</option>
            <option value="food">Food & Beverage</option>
            <option value="transport">Transportation & Logistics</option>
          </select>
          <div class="error-msg" id="industry-error"></div>
        </div>

        <div class="field">
          <label>Number of Employees</label>
          <select id="employees">
            <option value="1-10">1 - 10</option>
            <option value="11-50">11 - 50</option>
            <option value="51-200">51 - 200</option>
            <option value="201-500">201 - 500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        <div class="field">
          <label>Annual Revenue <span class="req">*</span></label>
          <select id="revenue">
            <option value="">Select range...</option>
            <option value="under_100k">Under $100,000</option>
            <option value="100k_500k">$100,000 - $500,000</option>
            <option value="500k_1m">$500,000 - $1M</option>
            <option value="1m_5m">$1M - $5M</option>
            <option value="5m_25m">$5M - $25M</option>
            <option value="over_25m">Over $25M</option>
          </select>
          <div class="error-msg" id="revenue-error"></div>
        </div>

        <div class="field full">
          <label>Business Address</label>
          <input type="text" id="address" placeholder="123 Business Park, Suite 100, Prague" />
        </div>

        <div class="field">
          <label>Contact Email <span class="req">*</span></label>
          <input type="email" id="email" placeholder="finance@acme.com" />
          <div class="error-msg" id="email-error"></div>
        </div>

        <div class="field">
          <label>Phone Number</label>
          <input type="tel" id="phone" placeholder="+420 123 456 789" />
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-secondary" onclick="goToStep(1)">Back</button>
        <button class="btn btn-primary" onclick="goToStep(3)">Review Application</button>
      </div>
    </div>

    <!-- Step 3: Review -->
    <div class="card hidden" id="step-3">
      <div class="card-title">Review & Submit</div>
      <div class="card-desc">Please review your application before submitting</div>

      <div id="review-content"></div>

      <div style="margin-top: 24px;">
        <div class="checkbox-group">
          <label class="checkbox-item">
            <input type="checkbox" id="consent-terms" />
            <span class="cb-label"><strong>Terms & Conditions</strong> — I confirm that all information provided is accurate and complete. I understand that providing false information may result in application rejection.</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="consent-credit" />
            <span class="cb-label"><strong>Credit Check Authorization</strong> — I authorize the lender to perform a credit check and verify the business information provided in this application.</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="consent-data" />
            <span class="cb-label"><strong>Data Processing</strong> — I consent to the processing of my personal and business data in accordance with the Privacy Policy and GDPR regulations.</span>
          </label>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-secondary" onclick="goToStep(2)">Back</button>
        <button class="btn btn-primary" id="submit-btn" disabled onclick="submitApplication()">Submit Application</button>
      </div>
    </div>

    <!-- Success -->
    <div class="card hidden" id="step-success">
      <div class="success">
        <div class="success-icon">&#10003;</div>
        <h2>Application Submitted</h2>
        <p>Your loan application has been received. Our team will review it and contact you within 2 business days.</p>
        <div class="ref-number" id="ref-number">REF-2026-XXXXXX</div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    // ── State ──
    let currentStep = 1;

    // ── Helpers ──
    function fmt(n) {
      return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2500);
    }

    // ── Loan Calculator ──
    function getBaseRate() {
      const collateral = document.getElementById('collateral').value;
      const rateType = document.getElementById('rate-type').value;
      let base = 7.5;
      if (collateral !== 'none') base -= 1.5;
      if (rateType === 'variable') base -= 0.5;
      return base;
    }

    function updateLoanSummary() {
      const amount = parseInt(document.getElementById('amount').value);
      const months = parseInt(document.getElementById('term').value);
      const annualRate = getBaseRate();
      const monthlyRate = annualRate / 100 / 12;

      document.getElementById('amount-display').textContent = fmt(amount);
      document.getElementById('term-display').textContent = months + ' months';

      let monthly;
      if (monthlyRate === 0) {
        monthly = amount / months;
      } else {
        monthly = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                  (Math.pow(1 + monthlyRate, months) - 1);
      }

      const totalRepayment = monthly * months;
      const totalInterest = totalRepayment - amount;

      document.getElementById('monthly-payment').textContent = fmt(Math.round(monthly));
      document.getElementById('interest-rate').textContent = annualRate.toFixed(1) + '%';
      document.getElementById('total-interest').textContent = fmt(Math.round(totalInterest));
      document.getElementById('total-repayment').textContent = fmt(Math.round(totalRepayment));
    }

    // ── Validation ──
    function clearErrors() {
      document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
      document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }

    function setError(id, msg) {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(id + '-error');
      if (input) input.classList.add('error');
      if (errorEl) errorEl.textContent = msg;
    }

    function validateStep1() {
      clearErrors();
      let valid = true;
      if (!document.getElementById('purpose').value) {
        setError('purpose', 'Please select a loan purpose');
        valid = false;
      }
      return valid;
    }

    function validateStep2() {
      clearErrors();
      let valid = true;

      const name = document.getElementById('biz-name').value.trim();
      if (!name) { setError('biz-name', 'Business name is required'); valid = false; }

      const reg = document.getElementById('reg-number').value.trim();
      if (!reg) { setError('reg-number', 'Registration number is required'); valid = false; }

      const year = document.getElementById('year-est').value;
      if (!year || year < 1900 || year > 2026) { setError('year-est', 'Enter a valid year (1900-2026)'); valid = false; }

      if (!document.getElementById('industry').value) { setError('industry', 'Please select an industry'); valid = false; }
      if (!document.getElementById('revenue').value) { setError('revenue', 'Please select a revenue range'); valid = false; }

      const email = document.getElementById('email').value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Enter a valid email address'); valid = false; }

      return valid;
    }

    // ── Navigation ──
    function goToStep(step) {
      if (step === 2 && currentStep === 1 && !validateStep1()) {
        showToast('Please fix the errors before continuing');
        return;
      }
      if (step === 3 && currentStep === 2 && !validateStep2()) {
        showToast('Please fix the errors before continuing');
        return;
      }

      if (step === 3) buildReview();

      // Hide all steps
      for (let i = 1; i <= 3; i++) {
        document.getElementById('step-' + i).classList.add('hidden');
      }
      document.getElementById('step-' + step).classList.remove('hidden');

      // Update progress
      for (let i = 1; i <= 3; i++) {
        const prog = document.getElementById('prog-' + i);
        prog.classList.remove('active', 'completed');
        if (i < step) prog.classList.add('completed');
        if (i === step) prog.classList.add('active');
      }
      for (let i = 1; i <= 2; i++) {
        const line = document.getElementById('line-' + i);
        line.classList.toggle('completed', i < step);
      }

      currentStep = step;
    }

    // ── Review Builder ──
    function buildReview() {
      const purposeEl = document.getElementById('purpose');
      const purpose = purposeEl.options[purposeEl.selectedIndex]?.text || '—';
      const amount = document.getElementById('amount-display').textContent;
      const term = document.getElementById('term-display').textContent;
      const rate = document.getElementById('interest-rate').textContent;
      const monthly = document.getElementById('monthly-payment').textContent;
      const total = document.getElementById('total-repayment').textContent;

      const bizName = document.getElementById('biz-name').value;
      const regNum = document.getElementById('reg-number').value;
      const yearEst = document.getElementById('year-est').value;
      const industryEl = document.getElementById('industry');
      const industry = industryEl.options[industryEl.selectedIndex]?.text || '—';
      const email = document.getElementById('email').value;

      document.getElementById('review-content').innerHTML = `
        <div class="summary-box" style="margin-top:0; margin-bottom:16px;">
          <h3>Loan Parameters</h3>
          <div class="summary-grid">
            <div class="summary-item"><span class="label">Purpose</span><span class="value">${purpose}</span></div>
            <div class="summary-item"><span class="label">Amount</span><span class="value">${amount}</span></div>
            <div class="summary-item"><span class="label">Term</span><span class="value">${term}</span></div>
            <div class="summary-item"><span class="label">Est. Rate</span><span class="value">${rate}</span></div>
            <div class="summary-item"><span class="label">Monthly Payment</span><span class="value">${monthly}</span></div>
            <div class="summary-item"><span class="label">Total Repayment</span><span class="value">${total}</span></div>
          </div>
        </div>
        <div class="summary-box" style="background:#f0fdf4; border-color:#bbf7d0; margin-top:0;">
          <h3 style="color:#15803d;">Business Details</h3>
          <div class="summary-grid">
            <div class="summary-item"><span class="label">Company</span><span class="value">${bizName}</span></div>
            <div class="summary-item"><span class="label">Reg. Number</span><span class="value">${regNum}</span></div>
            <div class="summary-item"><span class="label">Established</span><span class="value">${yearEst}</span></div>
            <div class="summary-item"><span class="label">Industry</span><span class="value">${industry}</span></div>
            <div class="summary-item"><span class="label">Contact</span><span class="value">${email}</span></div>
          </div>
        </div>
      `;
    }

    // ── Consent Logic ──
    function updateSubmitButton() {
      const allChecked =
        document.getElementById('consent-terms').checked &&
        document.getElementById('consent-credit').checked &&
        document.getElementById('consent-data').checked;
      document.getElementById('submit-btn').disabled = !allChecked;
    }

    // ── Submit ──
    function submitApplication() {
      const ref = 'REF-2026-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      document.getElementById('ref-number').textContent = ref;

      document.getElementById('step-3').classList.add('hidden');
      document.getElementById('step-success').classList.remove('hidden');
      document.querySelector('.progress').classList.add('hidden');

      showToast('Application submitted successfully!');
    }

    // ── Auto-resize for iframe ──
    function postHeight() {
      const h = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'html-preview-height', height: h }, '*');
    }

    // ── Init ──
    document.getElementById('amount').addEventListener('input', updateLoanSummary);
    document.getElementById('term').addEventListener('input', updateLoanSummary);
    document.getElementById('collateral').addEventListener('change', updateLoanSummary);
    document.getElementById('rate-type').addEventListener('change', updateLoanSummary);
    document.getElementById('consent-terms').addEventListener('change', updateSubmitButton);
    document.getElementById('consent-credit').addEventListener('change', updateSubmitButton);
    document.getElementById('consent-data').addEventListener('change', updateSubmitButton);

    updateLoanSummary();

    // Post height on load and on resize
    postHeight();
    new MutationObserver(postHeight).observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener('resize', postHeight);
  </script>
</body>
</html>
```

---

## Tips

- **Keep it self-contained** — include all CSS and JS inline or via CDN. The iframe has no access to the host page styles.
- **Auto-resize** — for best results, send a `postMessage` with `{ type: 'html-preview-height', height: ... }` from your script. The preview will auto-adjust its height.
- **Mobile-friendly** — add `<meta name="viewport" ...>` and responsive CSS if your prototype should work on narrow screens.
- **Multiple blocks** — you can have multiple `html-preview` blocks in a single document, interleaved with regular markdown.
