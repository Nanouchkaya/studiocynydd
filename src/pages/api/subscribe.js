import mailchimp from '@mailchimp/mailchimp_marketing';
import handler from './handler';

// Configure Mailchimp account access
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_APIKEY,
  server: 'us16',
});

const listId = "bb1617605b";

export default handler.post(async (req, res) => {
  const result = await mailchimp.lists.addListMember(listId, {
    email_address: req.body.emailInput,
    status: "pending",
  });
  
  res.status(200).end(result);
  throw new Error('Oups! Something happened! Sorry!');
})