// Drupal AI Content Moderation Demo App

const demoDataUrl = 'drupal_ai_moderation_demo_data.json';

// --- TABS & ROUTING ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');

tabBtns.forEach(btn => {
  btn.onclick = function() {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabSections.forEach(s => s.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'demo-scenarios') renderScenarios();
    if (btn.dataset.tab === 'submit-content') renderContentForms();
    if (btn.dataset.tab === 'moderation-dashboard') renderDashboard();
    if (btn.dataset.tab === 'analytics') renderAnalytics();
  };
});

window.addEventListener('DOMContentLoaded', () => {
  renderScenarios();
});

let demoData = {};

fetch(demoDataUrl)
  .then(res => res.json())
  .then(data => {
    demoData = data;
    renderScenarios();
    renderContentForms();
    renderDashboard();
    renderAnalytics();
  })
  .catch(() => {});

// --- RENDER SCENARIOS ---
function renderScenarios() {
  const el = document.getElementById('demo-scenarios');
  if (!demoData.demo_scenarios) return;
  el.innerHTML = `<h2>Demo Scenarios</h2>
    <ul>
      ${demoData.demo_scenarios.map(s =>
        `<li>
            <strong>${s.title}:</strong> ${s.description}
            <em>(Expected: ${s.expected_outcome})</em>
         </li>`
      ).join('')}
    </ul>
    <small>Try more using the submit tab.</small>`;
}

// --- RENDER CONTENT FORMS ---
function renderContentForms() {
  const el = document.getElementById('submit-content');
  el.innerHTML = `
    <h2>Submit Content</h2>
    <form id="webform-form">
      <h3>Webform Submission</h3>
      <input type="text" name="name" placeholder="Your Name" required><br>
      <input type="email" name="email" placeholder="Email" required><br>
      <input type="text" name="subject" placeholder="Subject" required><br>
      <textarea name="message" rows="4" placeholder="Message" required></textarea><br>
      <button type="submit">Submit</button>
    </form>
    <div id="webform-result"></div>
    <hr>
    <form id="comment-form">
      <h3>Comment Submission</h3>
      <input type="text" name="author" placeholder="Your Name" required><br>
      <input type="email" name="email" placeholder="Email" required><br>
      <textarea name="content" rows="3" placeholder="Comment..." required></textarea><br>
      <button type="submit">Submit Comment</button>
    </form>
    <div id="comment-result"></div>
    <hr>
    <form id="post-form">
      <h3>Post Submission</h3>
      <input type="text" name="title" placeholder="Title" required><br>
      <textarea name="content" rows="3" placeholder="Post Content..." required></textarea><br>
      <button type="submit">Submit Post</button>
    </form>
    <div id="post-result"></div>
  `;

  document.getElementById('webform-form').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('webform-result').innerHTML = `<span style="color: green;">Submitted! (Demo only)</span>`;
  };
  document.getElementById('comment-form').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('comment-result').innerHTML = `<span style="color: green;">Submitted! (Demo only)</span>`;
  };
  document.getElementById('post-form').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('post-result').innerHTML = `<span style="color: green;">Submitted! (Demo only)</span>`;
  };
}

// --- RENDER DASHBOARD ---
function renderDashboard() {
  const el = document.getElementById('moderation-dashboard');
  el.innerHTML = `<h2>Moderation Dashboard</h2>
    <ul>
      <li><b>Auto-approved:</b> ${demoData.moderation_stats.auto_approved}</li>
      <li><b>Auto-rejected:</b> ${demoData.moderation_stats.auto_rejected}</li>
      <li><b>Pending Review:</b> ${demoData.moderation_stats.pending_review}</li>
      <li><b>Total Submissions:</b> ${demoData.moderation_stats.total_submissions_today}</li>
    </ul>
    <small>Detailed moderation queue simulation.</small>`;
}

// --- RENDER ANALYTICS ---
function renderAnalytics() {
  const el = document.getElementById('analytics');
  el.innerHTML = `<h2>Analytics</h2>
    <ul>
      <li><b>Accuracy Rate:</b> ${demoData.moderation_stats.accuracy_rate * 100}%</li>
      <li><b>False Positive Rate:</b> ${demoData.moderation_stats.false_positive_rate * 100}%</li>
      <li><b>Processing Time (avg):</b> ${demoData.moderation_stats.processing_time_avg} ms</li>
      <li><b>Time Saved:</b> ${demoData.moderation_stats.human_review_time_saved} min</li>
    </ul>
    <small>See more in full implementation guide.</small>`;
}
