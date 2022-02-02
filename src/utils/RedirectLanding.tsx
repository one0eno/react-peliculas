import { Redirect } from 'react-router-dom';

export default function RedirectLanding() {
  return <Redirect to={{ pathname: '/' }} />;
}
