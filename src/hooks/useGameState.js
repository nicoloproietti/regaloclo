import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { GAME_SESSION_ID } from '../config'

const DEFAULT_STATE = {
  id: GAME_SESSION_ID,
  current_step: 'intro',
  letters_unlocked: {},
  step1_progress: {},
}

export function useGameState() {
  const [state, setState] = useState(DEFAULT_STATE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      const { data } = await supabase
        .from('game_state')
        .select('*')
        .eq('id', GAME_SESSION_ID)
        .maybeSingle()

      if (active && data) setState(data)
      if (active) setLoading(false)
    }

    load()

    const channel = supabase
      .channel('game_state_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'game_state',
          filter: `id=eq.${GAME_SESSION_ID}`,
        },
        (payload) => {
          if (active) setState(payload.new)
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  const updateState = useCallback(async (patch) => {
    const { data, error } = await supabase
      .from('game_state')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', GAME_SESSION_ID)
      .select()
      .maybeSingle()

    if (!error && data) setState(data)
    return { data, error }
  }, [])

  const setStep = useCallback(
    (step) => updateState({ current_step: step }),
    [updateState]
  )

  const setLetter = useCallback(
    (letter, status) =>
      updateState({
        letters_unlocked: { ...state.letters_unlocked, [letter]: status },
      }),
    [updateState, state.letters_unlocked]
  )

  const setProgress = useCallback(
    (patch) =>
      updateState({
        step1_progress: { ...state.step1_progress, ...patch },
      }),
    [updateState, state.step1_progress]
  )

  return { state, loading, updateState, setStep, setLetter, setProgress }
}
