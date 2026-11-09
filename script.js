const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));

const form = document.getElementById('waitlist-form');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submitBtn = form.querySelector('.submit-button');
    if (submitBtn) {
      submitBtn.textContent = 'Joining waitlist...';
      submitBtn.disabled = true;
    }

    const name = form.querySelector('#name')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const season = form.querySelector('#season')?.value || 'Flexible';
    const guests = form.querySelector('#guests')?.value || '';

    const payload = {
      _subject: `New Waitlist Lead — Provence Yoga Escape (${name})`,
      _template: "table",
      _captcha: "false",
      Name: name,
      Email: email,
      "Preferred Retreat Season": season,
      "Places Desired": guests,
      "Retreat Sanctuary": "Provence Yoga Escape (France)"
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/bermondish@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Network error');
    } catch (err) {
      console.error('Waitlist submission notice:', err);
    }

    const success = document.getElementById('form-success');
    if (success) {
      success.textContent = `Merci, ${name}! Your interest in Provence Yoga Escape has been received. You will be among the first to receive dates, suites, and early-bird invitations.`;
      success.classList.add('show');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (submitBtn) {
      submitBtn.textContent = 'Merci — Priority list joined ☼';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.85';
    }
  });
}
