import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uyxrsorlazfyoihsizvg.supabase.co";
const supabaseKey = "sb_publishable_5z6Eq5WLMbMi9YdCEIsUmg_jPUetCoC";

export const supabase = createClient(supabaseUrl, supabaseKey);