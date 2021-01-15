import { useForm, FormProvider } from "react-hook-form";
import { useState } from 'react';
import { Paragraph, Input, Textarea, FormButton } from '@librairy/atoms';
import nProgress from 'nprogress';
import { H2 } from "../Texts";

export const Form = () => {
  const methods = useForm();
  const [buttonText, setButtonText] = useState('Envoyer le message');
  const [error, setError] = useState(false);
  const [honeypot, setHoneypot] = useState();

  const sendContactMail = (formValues) => {
    nProgress.start();
    fetch('/api/contact',{
      method: 'POST',
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        object: formValues.object,
        message: formValues.message
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        methods.reset();
        nProgress.done();
        setButtonText('Merci !');
        setTimeout(() => {
          setButtonText('Envoyer le message')
        }, 4000);
      } else {
        setError(true);
      }
    }).catch(error => {
      setError(true);
      console.error(error);
    })
};

  const onSubmit = (values) => {
    if(honeypot) {
      return;
    } else {
      sendContactMail(values);
      setButtonText('Envoi en cours...')
    }
  };

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
        <H2>Formulaire de contact</H2>
        <input
          name="honeypot"
          ref={methods.register}
          type="text"
          autoComplete="off"
          value={honeypot} 
          onChange={e => setHoneypot(e.target.value)}
          hidden />

        <Input
          label="Nom complet *"
          name="name"
          type="text"
          placeholder="Votre nom et prénom ici."
          required
        />
        <Input
          label="Adresse e-mail *"
          name="email"
          type="email"
          placeholder="Adresse à laquelle nous répondrons."
          required
        />
        <Input
          label="Objet"
          name="object"
          type="text"
          placeholder="Sujet de votre message ici."
        />
        <Textarea 
          label="Message *"
          name="message"
          placeholder="Votre message ici."
          required
        />
        <div className="form-infos">
          <Paragraph>
            Les champs marqués d'un astérie (*) sont requis pour valider l'envoi du message. <br />
            Studio Cynydd traite les données recueillies pour répondre au mieux à vos questions et ne les partage à aucun tiers. Pour en savoir plus sur la gestion de vos données personnelles et pour exercer vos droits, reportez-vous aux règles de confidentialité du site indiquées à la page <a href="/mentions-legales">mentions légales</a>.
          </Paragraph>
        </div>
        <FormButton type="submit">{buttonText}</FormButton>
        {
          error && <Paragraph label='alert'>Le formulaire n'a pas pu être envoyé, vérifiez que tous les champs soient renseignés, sinon contactez-nous directement à l'adresse contact@studiocynydd.fr.</Paragraph>
        }
      </form>
    </FormProvider>
  )
}