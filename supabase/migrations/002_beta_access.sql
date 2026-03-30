-- Beta access grant for hello@mindscript.app
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  '{{"is_beta": true, "plan": "enterprise", "plan_active": true}}'::jsonb
WHERE email = 'hello@mindscript.app';

-- Grant enterprise to hello@mindscript.app org
INSERT INTO orgs (name, owner_id, plan, plan_active, limits)
SELECT 'Mindscript AI', id, 'enterprise', true,
  '{{"roles":999,"resumes":99999,"interviews":999}'::jsonb
FROM auth.users WHERE email = 'hello@mindscript.app'
ON CONFLICT (owner_id) DO UPDATE SET
  plan = 'enterprise', plan_active = true,
  limits = '{{"roles":999,"resumes":99999,"interviews":999}'::jsonb;

SELECT email, raw_user_meta_data->>'plan' as plan, raw_user_meta_data->>'is_beta' as is_beta
FROM auth.users WHERE email = 'hello@mindscript.app';