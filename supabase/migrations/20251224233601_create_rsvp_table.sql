/*
  # Create RSVP Table for Wedding Website

  1. New Tables
    - `rsvps`
      - `id` (uuid, primary key) - Unique identifier for each RSVP
      - `full_name` (text) - Guest's full name
      - `email` (text) - Guest's email address
      - `attendance` (text) - Yes or No attendance status
      - `guest_count` (integer) - Number of guests attending
      - `message` (text, optional) - Dietary restrictions or special message
      - `created_at` (timestamptz) - Submission timestamp

  2. Security
    - Enable RLS on `rsvps` table
    - Add policy for public to insert their own RSVPs
    - Add policy for authenticated users to view all RSVPs (for couple to manage)
*/

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  attendance text NOT NULL,
  brunch_attendance text DEFAULT 'no',
  guest_count integer DEFAULT 1,
  message text,
  created_at timestamptz DEFAULT now()
);

alter table rsvps enable row level security;

create policy "Allow public RSVP inserts"
on rsvps
for insert
to anon
with check (true);
