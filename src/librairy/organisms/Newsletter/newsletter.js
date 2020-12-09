import { useState } from 'react';
import { H2, Paragraph, ButtonPrimary, Subtitle } from '@librairy/atoms';
import nProgress from 'nprogress';
import Link from 'next/link';

export const Newsletter = () => {
  const [emailInput, setEmailInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState({})

  const handleChange = (e) => (
    setEmailInput(e.target.value)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    nProgress.start();
    
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailInput,
        })
      })
      .then(response => {
        console.log(response);

        if (response.status === 200) {
          setSubmissionStatus({
            type: 200,
            message: "Pour valider votre inscription, cliquez sur le lien dans l'email de confirmation que vous avez reçu dans votre boite de réception ou spams."
          });
          setEmailInput('');

        } else {
          switch (response.status) {
            case 400 :
              setSubmissionStatus({
                type: response.status,
                message: "Vous êtes déjà inscrit à la newsletter avec cette adresse mail."
              });
              break;
            case 500 : 
              setSubmissionStatus({
                type: response.status,
                message: "Un problème a eu lieu avec le serveur. Retentez dans quelques minutes. Si le problème persiste, merci de nous contacter."
              });
              break
            default:
              setSubmissionStatus({
                type: response.status,
                message: "Veuillez saisir une adresse mail valide."
              });
              break;
          };
        }
        nProgress.done();
      }).catch (error => {
        console.error(error);
        setSubmissionStatus({
          type: 'err',
          message: "Oups! Quelque chose s'est mal passé, réessayez plus tard. Merci !"
        });
      })
  };

  return (
    <section className="newsletter">
    <H2>La Newsletter</H2>
    <Subtitle>Ne manquez aucune nouveauté</Subtitle>
    <div className="newsletter-content">
      <Paragraph>Derniers produits, promotions, prochain marché artisanal... 
      Inscrivez-vous à notre Newsletter pour rester connecté à l'actualité de Cynydd. 
      Maximum une par mois, garantie sans spam ni partage d'email à des tiers. <Link href="/mentions-legales">Consuler notre politique de confidentialité.</Link></Paragraph>
        <form onSubmit={handleSubmit} method="POST" noValidate>
          <label htmlFor="register-newsletter" className="form-label">Adresse e-mail : </label>
          <input
            className="form-input"
            id="register-newsletter"
            type="email"
            name="email"
            placeholder="votre email ici"
            value={emailInput}
            onChange={handleChange}
            required
          />
          
          <ButtonPrimary type="submit">S'inscrire</ButtonPrimary>
          
        </form>
        <div className="form-message">
          { submissionStatus.type === 200 && <Paragraph label="success">{submissionStatus.message}</Paragraph> }
          { submissionStatus.type !== 200 && <Paragraph label="alert">{submissionStatus.message}</Paragraph> }
        </div>       
      </div>
    </section>
  )
}