import { useEffect, useRef, useState } from 'react'
import { decisionAreas } from '../data/decisions'
import { Close } from './Icons'

const emptyDecision = () => ({
  title: '',
  outcome: '',
  rationale: '',
  date: new Date().toISOString().slice(0, 10),
  area: 'Product',
  status: 'active',
  supersededBy: '',
})

const fieldClass = 'w-full rounded-md border border-mist bg-white px-3 py-2.5 text-[13px] leading-6 text-ink outline-none transition placeholder:text-slate-400 focus:border-periwinkle focus:ring-4 focus:ring-periwinkle/15 aria-[invalid=true]:border-red-400'

export default function DecisionFormModal({ decision, onClose, onSave }) {
  const isEditing = Boolean(decision)
  const titleRef = useRef(null)
  const [values, setValues] = useState(() => decision || emptyDecision())
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.body.classList.add('modal-open')
    titleRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {
      ...(!values.title.trim() && { title: 'Give this decision a short title.' }),
      ...(!values.outcome.trim() && { outcome: 'Describe what the team decided.' }),
      ...(!values.rationale.trim() && { rationale: 'Capture why this was the right call.' }),
      ...(!values.date && { date: 'Choose the decision date.' }),
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    onSave({
      ...values,
      title: values.title.trim(),
      outcome: values.outcome.trim(),
      rationale: values.rationale.trim(),
      supersededBy: values.status === 'superseded' ? values.supersededBy.trim() : '',
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-y-auto bg-ink/55 px-4 py-8 backdrop-blur-[2px] sm:items-start"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="m-auto w-full max-w-2xl overflow-hidden rounded-xl border border-lavender bg-canvas shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="decision-form-title"
      >
        <header className="flex items-start justify-between border-b border-mist px-5 py-5 sm:px-7">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-periwinkle">
              {isEditing ? 'Update the record' : 'Capture the context'}
            </span>
            <h2 id="decision-form-title" className="mt-1 font-display text-3xl tracking-tight">
              {isEditing ? 'Edit decision' : 'New decision'}
            </h2>
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-mist text-slate-500 transition hover:border-lavender hover:bg-mist/50 hover:text-ink"
            type="button"
            onClick={onClose}
            aria-label="Close decision form"
          >
            <Close />
          </button>
        </header>

        <form className="px-5 pt-5 sm:px-7" onSubmit={handleSubmit} noValidate>
          <FormField label="Decision title" error={errors.title} errorId="decision-title-error">
            <input
              ref={titleRef}
              id="decision-title"
              className={fieldClass}
              value={values.title}
              onChange={(event) => update('title', event.target.value)}
              placeholder="e.g. Launch without a credit card"
              aria-describedby={errors.title ? 'decision-title-error' : undefined}
              aria-invalid={Boolean(errors.title)}
            />
          </FormField>

          <FormField label="What did you decide?" error={errors.outcome} errorId="decision-outcome-error">
            <textarea
              id="decision-outcome"
              className={`${fieldClass} min-h-24 resize-y`}
              value={values.outcome}
              onChange={(event) => update('outcome', event.target.value)}
              placeholder="State the decision in clear, final language."
              aria-describedby={errors.outcome ? 'decision-outcome-error' : undefined}
              aria-invalid={Boolean(errors.outcome)}
            />
          </FormField>

          <FormField label="Why did you choose it?" error={errors.rationale} errorId="decision-rationale-error">
            <textarea
              id="decision-rationale"
              className={`${fieldClass} min-h-28 resize-y`}
              value={values.rationale}
              onChange={(event) => update('rationale', event.target.value)}
              placeholder="Capture the constraints, evidence, and tradeoffs."
              aria-describedby={errors.rationale ? 'decision-rationale-error' : undefined}
              aria-invalid={Boolean(errors.rationale)}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Decision date" error={errors.date} errorId="decision-date-error">
              <input
                id="decision-date"
                className={fieldClass}
                type="date"
                value={values.date}
                onChange={(event) => update('date', event.target.value)}
                aria-describedby={errors.date ? 'decision-date-error' : undefined}
                aria-invalid={Boolean(errors.date)}
              />
            </FormField>
            <FormField label="Area">
              <select
                id="decision-area"
                className={fieldClass}
                value={values.area}
                onChange={(event) => update('area', event.target.value)}
              >
                {decisionAreas.map((area) => <option value={area} key={area}>{area}</option>)}
              </select>
            </FormField>
          </div>

          <fieldset className="mb-5">
            <legend className="mb-2 text-xs font-semibold">Status</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <StatusOption
                value="active"
                selected={values.status === 'active'}
                title="Active"
                description="Still guides the team"
                onChange={(value) => update('status', value)}
              />
              <StatusOption
                value="superseded"
                selected={values.status === 'superseded'}
                title="Superseded"
                description="Kept for context"
                onChange={(value) => update('status', value)}
              />
            </div>
          </fieldset>

          {values.status === 'superseded' && (
            <div className="mb-5 rounded-md border-l-2 border-periwinkle bg-mist/55 p-4">
              <label className="mb-2 block text-xs font-semibold" htmlFor="superseded-note">
                What replaced it? <span className="font-normal text-slate-500">Optional</span>
              </label>
              <input
                id="superseded-note"
                className={fieldClass}
                value={values.supersededBy}
                onChange={(event) => update('supersededBy', event.target.value)}
                placeholder="Describe the new direction"
              />
            </div>
          )}

          <footer className="-mx-5 mt-2 flex justify-end gap-2 border-t border-mist bg-mist/35 px-5 py-4 sm:-mx-7 sm:px-7">
            <button className="rounded-md px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-white" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="rounded-md bg-ink px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#52658f]" type="submit">
              {isEditing ? 'Save changes' : 'Add decision'} <span aria-hidden="true">↗</span>
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}

function FormField({ label, error, errorId, children }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-xs font-semibold" htmlFor={children.props.id}>{label}</label>
      {children}
      {error && <span className="mt-1.5 block text-[11px] text-red-600" id={errorId} data-testid="field-error">{error}</span>}
    </div>
  )
}

function StatusOption({ value, selected, title, description, onChange }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition ${
      selected ? 'border-periwinkle bg-white ring-2 ring-periwinkle/15' : 'border-mist bg-mist/25 hover:bg-white'
    }`}>
      <input
        className="sr-only"
        type="radio"
        name="decision-status"
        value={value}
        checked={selected}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className={`h-2 w-2 rounded-full ${value === 'active' ? 'bg-periwinkle' : 'bg-slate-400'}`} />
      <span>
        <strong className="block text-xs">{title}</strong>
        <small className="text-[10px] text-slate-500">{description}</small>
      </span>
    </label>
  )
}
