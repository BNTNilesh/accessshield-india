import { redirect } from 'next/navigation';

/** Legacy /signup URL — trial signups use the waitlist flow. */
export default function SignupRedirectPage() {
  redirect('/waitlist');
}
