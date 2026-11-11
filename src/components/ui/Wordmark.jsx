import { useId } from 'react';

// AreaConnector wordmark: a big "A" and "C" interlock (the C cuts a gap
// through the A's leg via a mask, so it works on any background), and small
// "rea" / "onnector" complete each word.
//
//   A rea
//    C onnector
//
// height sets the size; ink is the "Area" colour, accent the "Connector" one.
export default function Wordmark({ height = 34, ink = '#0F172A', accent = '#10B981', className = '', title = 'AreaConnector' }) {
  const id = useId().replace(/:/g, '');
  const font = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700 };
  const C = (props) => <text x="12" y="40" fontSize="30" {...font} {...props}>C</text>;
  return (
    <svg viewBox="0 0 97 44" height={height} width={(height * 97) / 44} className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <mask id={`ac-cut-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="97" height="44">
          <rect width="97" height="44" fill="#fff" />
          <C fill="#000" stroke="#000" strokeWidth="3.6" strokeLinejoin="round" />
        </mask>
      </defs>
      <text x="2" y="25" fontSize="30" fill={ink} mask={`url(#ac-cut-${id})`} {...font}>A</text>
      <C fill={accent} />
      <text x="22" y="15.5" fontSize="14" fill={ink} {...font}>rea</text>
      <text x="34.5" y="40" fontSize="14" fill={accent} {...font}>onnector</text>
    </svg>
  );
}
