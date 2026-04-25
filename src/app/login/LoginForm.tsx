"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { attemptLogin, type LoginState } from "./actions";
import { DashboardClass } from "~/components/dashboard/DashboardClass";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(attemptLogin, {});
  return (
    <>
      <DashboardClass />
      <div className="login-wrap">
        <form className="login-card" action={formAction}>
          <h1>Dashboard sign in</h1>
          <p>Enter the admin password to manage your portfolio content.</p>
          {state.error && <div className="flash err">{state.error}</div>}
          <div className="field">
            <label htmlFor="pwd">Password</label>
            <input
              id="pwd"
              name="password"
              type="password"
              autoFocus
              autoComplete="current-password"
              required
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </>
  );
}
