// assets/auth.js
const supabaseUrl = 'https://qwoqpwyjugfsiwlwvmlf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3b3Fwd3lqdWdmc2l3bHd2bWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NzkzNDAsImV4cCI6MjA3NTA1NTM0MH0.36cfavBebNeF4SLuar3jUTRORYnhaOhc6A5xuF4HvLw';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Auth guard for protected pages
function requireAuth(redirectTo = 'login.html') {
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
            window.location.href = redirectTo;
        }
    });
}

// Get current user
async function getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user;
}

// Logout function
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}

// Check if user is admin (basic implementation)
async function isAdmin() {
    // In a real app, you'd check user role from database
    const user = await getCurrentUser();
    // For demo, let's assume admin is a specific email
    return user?.email === 'admin@earnzy.com';
}
