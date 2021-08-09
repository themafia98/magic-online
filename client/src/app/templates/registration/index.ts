// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import classes from './Registration.module.scss';

const REGISTRATION_TEMPLATE = `
<form class={classes.regForm}>
  <input name="email" type="email" placeholder="email" />
  <input name="password" type="password" placeholder="password" />
  <button>Submit</button>
</form>
`;

export default REGISTRATION_TEMPLATE;
