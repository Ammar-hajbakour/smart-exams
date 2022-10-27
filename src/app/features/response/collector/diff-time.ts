export function diffTime(d1: number, d2: number): Date {
  let delta = (d2 - d1) / 1000
  delta -= Math.floor(delta / 86400) * 86400
  var hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600
  var minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60
  var seconds = delta % 60
  const _ = new Date()
  return new Date(_.getFullYear(), _.getMonth(), _.getDate(), hours, minutes, seconds)
}
