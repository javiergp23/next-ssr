
export async function signOut() {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include', // importante para cookies
    });
  }
  