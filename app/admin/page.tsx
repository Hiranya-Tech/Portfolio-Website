export default function AdminPage() {
  return (
    <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-6">Admin Dashboard</h1>
      <p className="text-foreground-muted mb-8">
        Welcome to the admin dashboard. This section is protected by Supabase Auth and restricted
        to your admin email.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-border">
          <h2 className="text-lg font-semibold mb-2">Messages</h2>
          <p className="text-sm text-foreground-muted mb-4">View contact form submissions.</p>
          <div className="text-xs text-foreground-subtle bg-white/5 p-3 rounded-lg font-mono">
            Requires Supabase connection
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-border">
          <h2 className="text-lg font-semibold mb-2">Resume Upload</h2>
          <p className="text-sm text-foreground-muted mb-4">Upload a new ATS-optimized resume PDF.</p>
          <div className="text-xs text-foreground-subtle bg-white/5 p-3 rounded-lg font-mono">
            Requires Supabase connection
          </div>
        </div>
      </div>
    </div>
  )
}
