import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values, messages) {
  const errors = {}
  if (!values.name.trim()) errors.name = messages.nameRequired
  else if (values.name.trim().length < 2) errors.name = messages.nameShort

  if (!values.email.trim()) errors.email = messages.emailRequired
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = messages.emailInvalid

  if (!values.message.trim()) errors.message = messages.messageRequired
  else if (values.message.trim().length < 10) errors.message = messages.messageShort

  return errors
}

export default function Contact() {
  const { t } = useLanguage()
  const { contact, site, socials } = t
  const validationMessages = contact.validation

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next, validationMessages))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(values, validationMessages))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(values, validationMessages)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(found).length > 0) return

    const subject = encodeURIComponent(contact.form.mailtoSubject(values.name))
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    setSent(true)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative z-10 border-t-2 border-line/20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index={contact.index} title={contact.heading} description={contact.description} />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-7">
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
              {contact.form.fields.map((field) => {
                const hasError = touched[field.name] && errors[field.name]
                const shared = {
                  id: field.id,
                  name: field.name,
                  value: values[field.name],
                  onChange: handleChange,
                  onBlur: handleBlur,
                  placeholder: field.placeholder,
                  'aria-invalid': hasError ? 'true' : 'false',
                  className: `w-full border-2 bg-surface px-4 py-3 font-mono text-fg placeholder:text-muted/60 outline-none transition-colors duration-200 focus:border-accent ${
                    hasError ? 'border-[#ff0033]' : 'border-line/40'
                  }`,
                }

                return (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.id}
                      className="mono-label flex items-center justify-between text-fg"
                    >
                      {field.label}
                      {hasError && (
                        <span className="font-mono text-xs normal-case tracking-normal text-[#ff5577]">
                          {errors[field.name]}
                        </span>
                      )}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea {...shared} rows={5} className={`${shared.className} resize-none`} />
                    ) : (
                      <input type={field.type} {...shared} />
                    )}
                  </div>
                )
              })}

              <button
                type="submit"
                className="group mt-2 inline-flex items-center justify-center gap-3 border-2 border-accent bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-bg transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:bg-transparent hover:text-accent hover:shadow-brutal-accent active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                {contact.form.submitLabel}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              {sent && (
                <p className="font-mono text-sm text-accent" role="status">
                  ▸ {contact.form.successMessage}
                </p>
              )}
            </form>
          </ScrollReveal>

          <div className="lg:col-span-5">
            <ScrollReveal className="border-2 border-line/30 bg-surface p-8">
              <p className="mono-label mb-6 text-muted">{contact.directEmailLabel}</p>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-2 font-display text-base font-bold uppercase transition-colors hover:text-accent sm:text-lg"
              >
                <span className="text-accent">@</span>
                <span className="whitespace-nowrap">{site.email}</span>
              </a>

              <div className="mt-10 flex flex-col gap-px border-2 border-line/30 bg-line/30">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between bg-bg px-5 py-4 transition-colors hover:bg-surface"
                  >
                    <span className="font-mono text-sm font-bold uppercase tracking-widest">
                      {s.label}
                    </span>
                    <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                      {s.handle} ↗
                    </span>
                  </a>
                ))}
              </div>

              <p className="mono-label mt-8 flex items-center gap-2 text-accent">
                <span className="inline-block h-2 w-2 animate-pulse bg-accent" />
                {site.availability}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
