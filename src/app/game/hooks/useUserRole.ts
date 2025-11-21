import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export const useUserRole = () => {
  const [role, setRole] = useState<
    'employee' | 'admin' | 'user' | 'mechanic' | 'master_consultant' | null
  >(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setRole(null);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase

          .from('users')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          console.error(
            'Error fetching user role or user not found in DB:',
            error
          );
          setRole('user'); // Default to USER if error or no data
        } else {
          setRole(data.role);
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        setRole('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { role, loading, isAdmin: role === 'admin' };
};
