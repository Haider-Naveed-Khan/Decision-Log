export function formatDate(value, compact = false) {
  const date = new Date(`${value}T12:00:00`)
  const options = compact
    ? { month: 'short', day: '2-digit' }
    : { month: 'long', day: 'numeric', year: 'numeric' }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
