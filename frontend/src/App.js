import { useEffect, useState } from 'react';
import { supabase } from './auth/supabaseClient';
import Auth from './auth/auth';
import Account from './components/Account';
import './App.css';

function App() {

  const [session, setSession] = useState(null)

  useEffect(() =>{
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    }) // if auth state changes
  }, [])

  return (
    <div className="container mx-auto">
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  );
}

export default App;