import { Link } from 'react-router-dom'

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="NightLum documentation home">
      <img src="assets/logos/nightlum-mark.svg" alt="" />
      <span>NightLum <b>Docs</b></span>
    </Link>
  )
}
