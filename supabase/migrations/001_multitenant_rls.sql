-- Enable RLS on core tables
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orgs ENABLE ROW LEVEL SECURITY;

-- Org policies
DROP POLICY IF EXISTS "org_owner" ON orgs;
CREATE POLICY "org_owner" ON orgs FOR ALL USING (owner_id = auth.uid());

-- Candidates: user sees only their own
DROP POLICY PFÒ EXISTS "user_candidates" ON candidates;
CREATE POLICY "user_candidates" ON candidates FOR ALL USING (user_id = auth.uid());

-- Conversations
DROP POLICY IF EXISTS "user_conversations" ON conversations;
CREATE POLICY "user_conversations" ON conversations FOR ALL USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Jobs
DROP POLICY IF EXISTS "user_jobs" ON jobs;
CREATE POLICY "user_jobs" ON jobs FOR ALL USING (user_id = auth.uid());

-- Agent memory
DROP POLICY IF EXISTS "user_memory" ON agent_memory;
CREATE POLICY "user_memory" ON agent_memory FOR ALL USING (user_id = auth.uid());

-- Agent tasks
DROP POLICY IF EXISTS "user_tasks" ON agent_tasks;
CREATE POLICY "user_tasks" ON agent_tasks FOR ALL USING (user_id = auth.uid());

-- Platform connections
DROP POLICY IF EXISTS "user_platforms" ON platform_connections;
CREATE POLICY "user_platforms" ON platform_connections FOR ALL USING (service_user_id = auth.uid());

-- Outreach templates
DROP POLICY IF EXISTS "user_templates" ON outreach_templates;
CREATE POLICY "user_templates" ON outreach_templates FOR ALL USING (user_id = auth.uid() OR user_id IS NULL);

-- Interview sessions
DROP POLICY IF EXISTS "user_interviews" ON interview_sessions;
CREATE POLICY "user_interviews" ON interview_sessions FOR ALL USING (interviewer_id = auth.uid());

SELECT 'RLS policies created' as status;