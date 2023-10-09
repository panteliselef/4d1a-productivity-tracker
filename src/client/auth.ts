import { clerkJSInstance as clerk } from '../astro-clerk/client';

await clerk.load();

async function updateUI() {
	if (clerk.user) {
		const targetDiv = document.querySelector<HTMLDivElement>('.clerk');

		if (!targetDiv) {
			// window.location.href = '/track';
			return;
		}

		clerk.mountUserButton(targetDiv, {
			afterSignOutUrl: '/',
			appearance: {
				elements: {
					avatarBox: {
						aspectRatio: 1,
						border: '1px solid var(--color-border)',
						height: 'auto',
						width: 'clamp(30px, 6.5vw, 50px)',
					},
				},
			},
		});
		return;
	}

	// not logged in; show a sign in button
	const url = await clerk.buildSignInUrl({ redirectUrl: '/track' });
	const btns = document.querySelectorAll('[data-clerk-login]');

	btns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();

			window.location.href = url;
		});
	});
}

await updateUI();
