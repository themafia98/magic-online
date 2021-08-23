// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import classes from './Registration.module.scss';
import handleLoad from './Registration.events';
import clsx from 'clsx';
import scriptInjection from '../ScriptInjection';

const REGISTRATION_TEMPLATE = `
${scriptInjection(handleLoad)}
<div class=${classes.root}>
  <form
    name="regForm"
    class=${classes.regForm}
  >
    <h1
      class=${classes.title}
    >
      Create new account
    </h1>
    <input
      class=${classes.input}
      name="email"
      type="email"
      placeholder="email"
    />
    <input
      class=${classes.input}
      name="username"
      type="text"
      placeholder="username"
    />
    <input
      class=${classes.input}
      name="name"
      type="text"
      placeholder="name"
    />
    <input
      class=${classes.input}
      name="password"
      type="password"
      placeholder="password"
    />
     <div class=${classes.action}>
      <button
        type="submit"
        class=${classes.button}
      >
        Submit
      </button>
      <button
        data-id="return"
        type="button"
        class="${clsx(classes.button, classes.returnButton)}"
      >
        Return
      </button>
    </div>
  </form>
</div>
`;

export default REGISTRATION_TEMPLATE;
