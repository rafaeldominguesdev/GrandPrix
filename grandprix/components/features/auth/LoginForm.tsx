"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

/* ── Input animado letra por letra ── */
function AnimatedInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  icon,
  rightElement,
  showValue = false,
}: {
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  icon: React.ReactNode
  rightElement?: React.ReactNode
  showValue?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [chars, setChars] = useState<{ ch: string; id: number }[]>([])
  const [focused, setFocused] = useState(false)
  const counter = useRef(0)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value
      onChange(newVal)
      setChars((prev) => {
        if (newVal.length > prev.length) {
          const added = newVal.slice(prev.length)
          const newChars = added.split("").map((ch) => ({ ch, id: counter.current++ }))
          return [...prev, ...newChars]
        }
        return prev.slice(0, newVal.length)
      })
    },
    [onChange]
  )

  const isPassword = type === "password"
  const showBullet = isPassword && !showValue

  return (
    <div className={`field-wrap ${focused ? "focused" : ""}`} onClick={() => inputRef.current?.focus()}>
      <div className="field-icon">{icon}</div>
      <div className="field-display">
        {value.length === 0 && <span className="field-ph">{placeholder}</span>}
        {chars.map((c, i) =>
          i < value.length ? (
            <span key={c.id} className="field-char">{showBullet ? "•" : c.ch}</span>
          ) : null
        )}
        {focused && <span className="field-cursor" />}
      </div>
      <input
        ref={inputRef}
        type={showBullet ? "password" : "text"}
        value={value}
        onChange={handleChange}
        required={required}
        className="field-real"
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {rightElement && <div className="field-right">{rightElement}</div>}
    </div>
  )
}

/* ── Componente principal ── */
export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (email === "admin@example.com" && password === "123456") {
        router.push("/")
      } else {
        setError("Email ou senha incorretos.")
      }
    } catch {
      setError("Erro ao fazer login.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          background: linear-gradient(135deg, #eef4f0 0%, #f5f7f5 50%, #fdf9ee 100%);
          padding: 24px;
          position: relative;
        }

        /* Decoração sutil de fundo */
        .login-root::before {
          content: '';
          position: absolute;
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,127,63,0.07) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }
        .login-root::after {
          content: '';
          position: absolute;
          bottom: -150px; right: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,198,50,0.1) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Card ── */
        .login-card {
          width: 100%;
          max-width: 480px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(0,127,63,0.1);
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 12px 40px rgba(0,0,0,0.08),
            0 0 0 1px rgba(255,255,255,0.9) inset;
          padding: 48px 44px 44px;
          position: relative;
          z-index: 1;
          animation: cardIn 0.5s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes cardIn {
          from { opacity:0; transform: translateY(20px) scale(0.98); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }

        /* Faixa verde topo do card */
        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #007F3F 0%, #00a84f 50%, #FFC632 100%);
          border-radius: 20px 20px 0 0;
        }

        /* ── Header ── */
        .login-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .login-logo-ring {
          width: 72px; height: 72px;
          border-radius: 18px;
          background: linear-gradient(135deg, #007F3F 0%, #00a84f 100%);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 8px 24px rgba(0,127,63,0.25);
        }

        .login-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0d1f14;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .login-subtitle {
          font-size: .78rem;
          color: #6b7c6e;
          font-weight: 400;
          letter-spacing: .01em;
        }

        /* ── Inputs ── */
        .field-label {
          display: block;
          font-size: .7rem;
          font-weight: 700;
          color: #3d5a44;
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .field-group {
          margin-bottom: 20px;
        }

        .field-wrap {
          position: relative;
          display: flex;
          align-items: center;
          background: #f7f9f7;
          border: 1.5px solid #dde8df;
          border-radius: 12px;
          padding: 0 14px;
          height: 52px;
          cursor: text;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }

        .field-wrap.focused {
          border-color: #007F3F;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0,127,63,0.08);
        }

        .field-icon {
          color: #9ab59f;
          flex-shrink: 0;
          margin-right: 12px;
          display: flex;
          align-items: center;
          transition: color .2s;
        }

        .field-wrap.focused .field-icon {
          color: #007F3F;
        }

        .field-display {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: .88rem;
          font-weight: 600;
          color: #0d1f14;
          letter-spacing: .02em;
          min-height: 100%;
          position: relative;
          overflow: hidden;
        }

        .field-ph {
          color: #b0c4b4;
          font-weight: 400;
          font-style: italic;
          font-size: .84rem;
        }

        .field-char {
          display: inline-block;
          animation: charIn .15s cubic-bezier(.34,1.56,.64,1) both;
        }

        @keyframes charIn {
          from { opacity:0; transform: translateY(6px) scale(0.8); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }

        .field-cursor {
          display: inline-block;
          width: 2px; height: 1.1em;
          background: #007F3F;
          margin-left: 1px;
          border-radius: 2px;
          vertical-align: middle;
          animation: blink .9s step-end infinite;
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .field-real {
          position: absolute;
          inset: 0;
          opacity: 0;
          border: none;
          outline: none;
          background: transparent;
          cursor: text;
          z-index: 1;
          width: 100%;
          height: 100%;
        }

        .field-right {
          position: relative;
          z-index: 2;
          margin-left: 8px;
          display: flex;
          align-items: center;
        }

        .eye-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #9ab59f;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color .2s, background .2s;
        }
        .eye-btn:hover { color: #007F3F; background: rgba(0,127,63,0.08); }

        /* ── Bottom row ── */
        .login-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 4px 0 28px;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: .72rem;
          color: #5a7060;
          font-weight: 500;
          cursor: pointer;
          user-select: none;
        }

        .remember-box {
          width: 16px; height: 16px;
          border-radius: 5px;
          border: 1.5px solid #007F3F;
          background: rgba(0,127,63,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .forgot-link {
          font-size: .72rem;
          font-weight: 700;
          color: #007F3F;
          text-decoration: none;
          letter-spacing: .02em;
          transition: opacity .2s;
        }
        .forgot-link:hover { opacity: .7; }

        /* ── Botão ── */
        .btn-login {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #007F3F 0%, #00a350 100%);
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: .8rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .25s;
          box-shadow: 0 6px 20px rgba(0,127,63,0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,127,63,0.35);
        }

        .btn-login:active:not(:disabled) {
          transform: translateY(0px);
        }

        .btn-login:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        /* Brilho no hover */
        .btn-login::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left .4s;
        }
        .btn-login:hover::after { left: 150%; }

        /* ── Erro ── */
        .error-box {
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 12px 14px;
          font-size: .74rem;
          color: #dc2626;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Rodapé ── */
        .login-footer {
          text-align: center;
          margin-top: 24px;
          font-size: .68rem;
          color: #a0b5a5;
          letter-spacing: .03em;
        }

        .login-footer a {
          color: #007F3F;
          font-weight: 700;
          text-decoration: none;
        }
        .login-footer a:hover { text-decoration: underline; }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          {/* Header */}
          <div className="login-header">
            <div className="login-logo-ring">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-subtitle">Faça login para acessar o AcessívelBR Hub</p>
          </div>

          {/* Erro */}
          {error && (
            <div className="error-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Email</label>
              <AnimatedInput
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={setEmail}
                required
                icon={<Mail size={17} />}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Senha</label>
              <AnimatedInput
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={setPassword}
                showValue={showPassword}
                required
                icon={<Lock size={17} />}
                rightElement={
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                }
              />
            </div>

            <div className="login-bottom-row">
              <label className="remember-label">
                <div className="remember-box">
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="#007F3F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Lembrar de mim
              </label>
              <a href="#" className="forgot-link">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? "Autenticando..." : "Entrar"}
            </button>
          </form>

          <p className="login-footer">
            Precisa de ajuda?{" "}
            <a href="#">Suporte Interno</a>
          </p>
        </div>
      </div>
    </>
  )
}
