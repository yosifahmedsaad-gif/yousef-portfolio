# Yousef portfolio

The GitHub Pages site is served from `index.html`, `script.js`, and `style.css`.
The project dashboard uses Supabase Auth, Postgres, and Storage so project
changes are available to every visitor without rebuilding the static site.

## Publish on GitHub Pages

The `Deploy portfolio to GitHub Pages` workflow publishes the static site and
its `public` assets whenever changes are pushed to `main`. The deploy artifact
contains only the static portfolio files; the unused Next.js app is not
published.

## Configure the cloud dashboard

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
   It creates the public projects table, admin-only write policies, the public
   animation bucket, and the five current projects, including Wood-Fire Essence.
3. In Supabase Authentication, disable public sign-ups, enable email sign-in,
   and create your admin user. Copy that user's UUID and run:

   ```sql
   insert into public.admin_users (user_id)
   values ('YOUR-AUTH-USER-UUID');
   ```

4. In Supabase Authentication URL settings, set the GitHub Pages address as
   the site URL and add it to the allowed redirect URLs. Configure email
   delivery so Supabase can send magic links to your admin address.
5. Add the Supabase Project URL and the public `anon`/publishable key to
   `supabase-config.js`. These are browser-visible values protected by the
   database policies. Never put a `service_role` or secret key in this file.
6. Publish the changed files to GitHub Pages. **Studio Y / Send Entry** and
   **Admin login** send a passwordless magic link to the admin email. Opening
   the link returns to the site and opens the dashboard only after the
   `admin_users` authorization check succeeds. Use the dashboard to add, edit,
   or remove projects, upload numbered animation frames, or change account
   settings. Email changes may require confirmation.
   The **Studio Y / Send Entry** form is a shortcut to the control room: it
   opens the dashboard for an already authenticated admin whose email matches
   the submitted address, or sends a sign-in link to that address. The
   submitted name and email never replace email ownership verification or the
   `admin_users` authorization check.
   If you already ran the schema before Wood-Fire Essence was added, run
   `supabase/schema.sql` again to upsert the fifth project. Its 40 numbered
   animation frames are in `public/frameswoodfire` and are served with the
   GitHub Pages site.

The dashboard sorts selected animation files by filename (`001.jpg`, `002.jpg`,
...). Each frame must be at most 10 MB; JPG, PNG, and WebP are supported.
Selecting new frames replaces the existing animation for that project.

Until Supabase is configured, the site shows its bundled preview projects and a
notice that cloud publishing is not yet enabled.

## Local checks

```bash
npm run lint
npm run build
```
