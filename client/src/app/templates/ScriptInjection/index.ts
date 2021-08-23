// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import classes from './ScriptInjection.module.scss';
import clsx from 'clsx';

export const SCRIPT_LOADER_KEY: Readonly<string> = 'script-loader';

const scriptInjection = (target: () => any) => `
<pre class="${clsx(classes.script, SCRIPT_LOADER_KEY)}">
    ${target() || ''}
  </pre>
 `;

export default scriptInjection;
