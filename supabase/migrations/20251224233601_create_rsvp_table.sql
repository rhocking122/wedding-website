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
  guest_count integer DEFAULT 1,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an RSVP
CREATE POLICY "Anyone can submit RSVP"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all RSVPs (for the couple to manage)
CREATE POLICY "Authenticated users can view all RSVPs"
  ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);