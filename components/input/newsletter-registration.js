import { useState, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const [email, setEmail] = useState('');
  const context = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();

    context.showNotification({
      title:'Signing up...',
      message:'Registration for newsletter.',
      status:'pending'
    })
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) =>{
        if(res.ok){
          return res.json();
        }

       return res.json().then((data)=>{
          throw new Error(data.message || 'Something went wrong')
        })
      }
       )
      .then((data) => {
        console.log('Data', data);
        setEmail('');
         context.showNotification({
      title:'Success',
      message:'Successfully register for newsletter.',
      status:'success'
    })
      }).catch((err)=>{
  context.showNotification({
     title:'Error!',
     message:err.meesage || 'Something went wrong!!!',
     status:'error'
   })
      })
      
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
