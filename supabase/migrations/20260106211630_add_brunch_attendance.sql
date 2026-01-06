/*
  # Add Brunch Attendance Field
  
  1. Changes
    - Add `brunch_attendance` column to `rsvps` table
    - This column tracks whether guests will attend the farewell brunch on April 26, 2026
  
  2. Notes
    - Uses same format as ceremony attendance field
    - Allows guests to RSVP separately for ceremony and brunch
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'brunch_attendance'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN brunch_attendance text DEFAULT 'no';
  END IF;
END $$;