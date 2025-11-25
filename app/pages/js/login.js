import { supabase } from './supabase.js'

const form = document.getElementById('loginForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    alert(error.message)
  } else {
    // Redirigir según rol
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile.role === 'admin') window.location.href = 'admin.html'
    else if (profile.role === 'docente') window.location.href = 'teacher.html'
    else window.location.href = 'student.html'
  }
})
